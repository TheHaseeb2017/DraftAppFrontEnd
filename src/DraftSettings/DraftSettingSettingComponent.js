import React, { useState, useEffect } from "react";
import { TextField, Button, FormControlLabel, Checkbox } from "@mui/material";
import io from "socket.io-client";
import "../App.css";

const DraftSettingSettingComponent = ({
  draftName,
  draftDate,
  timer,
  isActive,
  setDraftName,
  setDraftDate,
  setTimer,
  setIsActive,
  updateDraft,
  socket,
  setSocket,
}) => {
  const style = {
    table: {
      border: "10px solid #1976d2",
      margin: "8px",
      width: "auto",
      backgroundColor: "white",
      borderRadius: "8px",
      color: "#FFFFFF",
    },
    button: {
      border: "1px solid #1976d2",
      color: "white",
      margin: "5px",
    },

    checkbox: {
      color: "white",
      margin: "2px",
    },
  };
  return (
    <div className="App-comp">
      <h3>Draft Settings </h3>
      <TextField
        defaultValue={draftName}
        onChange={(event) => setDraftName(event.target.value)}
        style={style.table}
        helperText="Draft Name"
      />
      <TextField
        defaultValue={draftDate}
        onChange={(event) => setDraftDate(event.target.value)}
        style={style.table}
        helperText="Draft Date"
      />
      <TextField
        defaultValue={timer / 60}
        onChange={(event) => setTimer(event.target.value * 60)}
        style={style.table}
        helperText="Draft Duration"
      />{" "}
      <FormControlLabel
        control={
          <Checkbox
            style={style.checkbox}
            type="checkbox"
            checked={isActive}
            onChange={(event) => setIsActive(event.target.checked)}
          />
        }
        label="Is Active? "
      />
      <Button
        style={style.button}
        onClick={async (event) => {
          await updateDraft();
          socket.emit("updateDraft");
        }}
      >
        Change Settings
      </Button>
    </div>
  );
};
export default DraftSettingSettingComponent;
