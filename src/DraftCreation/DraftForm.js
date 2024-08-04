import { useContext, useState } from "react";
import React from "react";
import { Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import "../App.css";
import DraftCodeContext from "../DraftCodeContext";

const textFieldStyle = {
  backgroundColor: "whiteSmoke",
  margin: "8px",
  borderRadius: "8px",
};

function DraftForm({ setShowDF, setShowTF }) {
  const [draftName, setDraftName] = useState("");
  const [draftDate, setDraftDate] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(null);
  const { setDraftCode } = useContext(DraftCodeContext);

  function handleDraftNameChange(event) {
    setDraftName(event.target.value);
  }

  function handleDraftDateChange(event) {
    setDraftDate(event.target.value);
  }

  function handleDraftTimerChange(event) {
    setDuration(event.target.value * 60);
  }

  function handleIsActiveChange(event) {
    setIsActive(event.target.checked);
  }

  async function createDraft(event) {
    event.preventDefault();
    const draft = {
      draftname: draftName,
      draftdate: draftDate,
      isactive: isActive,
      duration: duration,
    };


    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(draft),
    };

    

    try {
      const responce = await fetch(
        `https://3cawebgrzd.execute-api.us-east-1.amazonaws.com/main/drafts`,
        options
      );
      const data = await responce.json();
      setDraftName("");
      setDraftDate("");
      setDuration("");
      setShowDF(false);
      setShowTF(true);
      setDraftCode(data.draftcode);
      console.log(data);
    } catch (error) {
      console.log(error);

      console.log(
        "This is the url: " +
          `https://3cawebgrzd.execute-api.us-east-1.amazonaws.com/main/drafts`
      );
    }
  }

  return (
    <div className="App-header">
      <h1>Create a Draft</h1>
      <form>
        <TextField
          value={draftName}
          onChange={handleDraftNameChange}
          placeholder="Draft Name..."
          style={textFieldStyle}
        />
        <TextField
          value={draftDate}
          onChange={handleDraftDateChange}
          placeholder="Draft Date..."
          style={textFieldStyle}
        />
        <TextField
          onChange={handleDraftTimerChange}
          placeholder="Draft Timer in Minutes..."
          style={textFieldStyle}
        />
        <FormControlLabel
          label="Is Active? "
          control={
            <Checkbox
              type="checkbox"
              checked={isActive}
              onChange={handleIsActiveChange}
            />
          }
        />

        <div className="Center-element">
          <Button onClick={createDraft}>Submit</Button>
        </div>
      </form>
    </div>
  );
}
export default DraftForm;
