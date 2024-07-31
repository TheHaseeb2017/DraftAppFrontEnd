import { TextField, Button } from "@mui/material";
import "../App.css";

import React from "react";

const EnterDraftSummaryComponent = ({
  setDraftCode,
  validateDraftCode,
  errorMessage,
  textFieldStyle,
  getPicks,
  getTeams,
}) => {
  return (
    <div className="App-header">
      <h1> View Draft Sumary </h1>{" "}
      <TextField
        placeholder="Enter draft code here ..."
        onChange={(event) => setDraftCode(event.target.value)}
        style={textFieldStyle}
      />
      <Button
        onClick={(event) => {
          validateDraftCode(event);
          getPicks();
          getTeams();
        }}
      >
        Submit
      </Button>
      <h3>{errorMessage} </h3>
    </div>
  );
};

export default EnterDraftSummaryComponent;
