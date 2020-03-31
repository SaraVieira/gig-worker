import React, { useContext, useState, ChangeEvent, useCallback } from "react";
import { Input, FormLabel, Textarea, Checkbox, Button } from "@chakra-ui/core";

import { Work } from "../../types";
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
    tasks: [] /** @todo add tasks from here */,
  });

  const addJob = useCallback(() => {
    setRequestState("loading");
    fetchFromAirTable("work", {
      method: "POST",
      body: JSON.stringify({
        fields: draft,
      }),
    })
      .then(() => {
        setRequestState("initial");
      })
      .catch((e) => {
        setRequestState("error");
        e.json().then((errorJson: Record<string, string>) =>
          setError(JSON.stringify(errorJson))
        );
      });
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
      {requestState === "loading" && "Loading..."}
      {requestState === "error" && error}
      <Button onClick={() => addJob()}>Add Job</Button>
    </div>
  );
};

export default NewJob;
