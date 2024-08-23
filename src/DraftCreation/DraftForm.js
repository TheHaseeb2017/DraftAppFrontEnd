import { useContext, useState } from "react";
import React from "react";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import "../App.css";
import DraftCodeContext from "../DraftCodeContext";

const textFieldStyle = {
  backgroundColor: "whiteSmoke",
  margin: "8px",
  borderRadius: "8px",
};

function DraftForm({ setShowDF, setShowTF, setEmail }) {
  const [draftName, setDraftName] = useState("");
  const [draftDate, setDraftDate] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(null);
  const { setDraftCode } = useContext(DraftCodeContext);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

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
        `http://backend2.eba-pzytpusd.us-east-1.elasticbeanstalk.com/drafts`,
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
          `http://backend2.eba-pzytpusd.us-east-1.elasticbeanstalk.com/drafts`
      );
    }
  }

  return (
    <Grid container spacing={1} className="App-header">
  <div className="App-header">
    <h1>Create a Draft</h1>
    <form>
      <Grid item xs={12} className="Center-element">
        <TextField
          value={draftName}
          onChange={handleDraftNameChange}
          placeholder="Draft Name..."
          style={textFieldStyle}
        />
      </Grid>
      <Grid item xs={12} className="Center-element">
        <TextField
          value={draftDate}
          onChange={handleDraftDateChange}
          placeholder="Draft Date..."
          style={textFieldStyle}
        />
      </Grid>
      <Grid item xs={12} className="Center-element">
        <TextField
          onChange={handleDraftTimerChange}
          placeholder="Draft Timer in Minutes..."
          style={textFieldStyle}
        />
      </Grid>
      <Grid item xs={12} className="Center-element">
        <TextField
          onChange={handleEmailChange}
          placeholder="Email Address..."
          style={textFieldStyle}
        />
      </Grid>
      <Grid item xs={12} className="Center-element">
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
      </Grid>
      <Grid item xs={12} className="Center-element">
        <div className="Center-element">
          <Button onClick={createDraft}>Submit</Button>
        </div>
      </Grid>
    </form>
  </div>
</Grid>

  );
}
export default DraftForm;
