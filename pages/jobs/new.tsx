import React, { useContext, useState, ChangeEvent, useCallback } from "react";
import {
  Input,
  FormLabel,
  Textarea,
  Checkbox,
  Button,
  Flex,
} from "@chakra-ui/core";

import { Work, Task } from "../../types";
import { UserContext } from "../../components/UserContext";
import { fetchFromAirTable } from "../../utils/fetchFromAirTable";

/** @todo This ugly. Let's pretty it up. */
const NewJob = () => {
  const { me } = useContext(UserContext);
  const [requestState, setRequestState] = useState<
    "initial" | "loading" | "error"
  >("initial");
  const [error, setError] = useState("");

  const [draft, setDraft] = useState<Work>({
    canContact: false,
    user: me?.sub ?? "",
    donateLink: "",
    description: "",
    tasks: [],
  });

  const updateTask = (newTask: Task) => (taskIndex: number) => {
    setDraft({
      ...draft,
      tasks: [
        ...draft.tasks.slice(0, taskIndex),
        newTask,
        ...draft.tasks.slice(taskIndex + 1),
      ],
    });
  };

  const addJob = useCallback(async () => {
    try {
      setRequestState("loading");
      const { tasks, ...workDraftWithoutTasks } = draft;

      const returnedTasks = await fetchFromAirTable("tasks", {
        method: "POST",
        body: JSON.stringify({ records: tasks.map((fields) => ({ fields })) }),
      });

      await fetchFromAirTable("work", {
        method: "POST",
        body: JSON.stringify({
          fields: {
            ...workDraftWithoutTasks,
            tasks: returnedTasks.records.map((t: { id: string }) => t.id),
          },
        }),
      });

      setRequestState("initial");
    } catch (e) {
      setRequestState("error");
      if (e instanceof Response) {
        const errorText = await e.json();
        setError(JSON.stringify(errorText));
      } else {
        setError(String(error));
      }
    }
  }, [draft]);

  return (
    <div className="container">
      <FormLabel>
        <Checkbox
          onChange={() => setDraft({ ...draft, canContact: !draft.canContact })}
          isChecked={draft.canContact}
        />
        Can Contact?
      </FormLabel>
      <FormLabel>
        Donate Link
        <Input
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDraft({ ...draft, donateLink: e.target.value })
          }
        />
      </FormLabel>
      <FormLabel>
        Description
        <Textarea
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDraft({ ...draft, donateLink: e.target.value })
          }
        />
      </FormLabel>
      <fieldset title="Tasks">
        {draft.tasks.map((t, i) => (
          <Flex key={i}>
            <FormLabel>
              Name
              <Input
                type="text"
                value={t.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateTask({ ...t, name: e.target.value })(i)
                }
              ></Input>
            </FormLabel>
            <FormLabel>
              Price
              <Input
                type="number"
                value={t.price}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateTask({ ...t, price: parseFloat(e.target.value) })(i)
                }
              ></Input>
            </FormLabel>
          </Flex>
        ))}
        <Button
          isDisabled={
            draft.tasks.length ===
            10 /* AirTable allows up to 10 elements at a time */
          }
          onClick={() =>
            setDraft({
              ...draft,
              tasks: [...draft.tasks, { name: "", price: 0, type: "" }],
            })
          }
        >
          + Add task
        </Button>
      </fieldset>
      {requestState === "loading" && "Loading..."}
      {requestState === "error" && error}
      <Button onClick={() => addJob()}>Add Job</Button>
    </div>
  );
};

export default NewJob;
