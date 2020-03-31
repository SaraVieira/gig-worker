import React, { useContext, useState, ChangeEvent, useCallback } from "react";
import {
  Input,
  FormLabel,
  FormControl,
  Textarea,
  Checkbox,
  Button,
  FormHelperText,
  Flex,
  Box,
  Heading,
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
  const initialState = {
    canContact: false,
    user: me?.sub ?? "",
    donateLink: "",
    description: "",
    tasks: [],
  };
  const [error, setError] = useState("");

  const [draft, setDraft] = useState<Work>(initialState);

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
      setDraft(initialState);
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
    <Box maxWidth={"80%"} width="1200" margin="auto">
      <Heading paddingY={6}>Add yourself</Heading>
      <FormControl maxWidth="600">
        <FormLabel htmlFor="description">
          Give us some information about yourself
        </FormLabel>
        <Textarea
          id="description"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDraft({ ...draft, description: e.target.value })
          }
        />
      </FormControl>
      <FormControl maxWidth="600" marginTop={4}>
        <FormLabel htmlFor="donate">
          Can we donate you some money? If so where?
        </FormLabel>
        <Input
          id="donate"
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDraft({ ...draft, donateLink: e.target.value })
          }
        />
        <FormHelperText id="donate">
          This allows us to help you even if there are no tasks you can do at
          the moment
        </FormHelperText>
      </FormControl>
      <FormControl maxWidth="600" marginTop={4}>
        <Checkbox
          onChange={() => setDraft({ ...draft, canContact: !draft.canContact })}
          isChecked={draft.canContact}
        >
          Is it okay to show your email?
        </Checkbox>
      </FormControl>
      <fieldset title="Tasks">
        <Heading marginY={6} size="md">
          Add all the jobs you can do
        </Heading>
        {draft.tasks.map((t, i) => (
          <Flex key={i} marginTop={4}>
            <FormControl maxWidth="600" marginTop={4} marginRight={2}>
              <FormLabel>What is the job?</FormLabel>
              <Input
                type="text"
                value={t.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateTask({ ...t, name: e.target.value })(i)
                }
              ></Input>
            </FormControl>
            <FormControl maxWidth="600" marginTop={4}>
              <FormLabel>How much do you charge?</FormLabel>
              <Input
                type="number"
                value={t.price}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateTask({ ...t, price: parseFloat(e.target.value) })(i)
                }
              ></Input>
            </FormControl>
          </Flex>
        ))}
        <Button
          marginTop={4}
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
          + Add job
        </Button>
      </fieldset>
      {requestState === "error" && error}
      <Button
        variant="solid"
        marginTop={6}
        isDisabled={requestState === "loading"}
        onClick={() => addJob()}
        variantColor="blue"
      >
        {requestState === "loading" ? "Loading..." : "Add Yourself"}
      </Button>
    </Box>
  );
};

export default NewJob;
