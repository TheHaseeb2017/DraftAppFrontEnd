import {
  TextField,
  Button,
  getPaginationItemUtilityClass,
} from "@mui/material";
import { useEffect } from "react";
import io from "socket.io-client";
import "../App.css";

import React from "react";

const EnterDraftSettingComponent = ({
  setDraftCode,
  validateDraftCode,
  errorMessage,
  textFieldStyle,
  getPlayersWithTeam,
  getTeams, 
  draftCode,
  socket,
  setSocket,
}) => {
  useEffect(() => {
    const newSocket = io("http://backend.eba-mfjaqd2a.us-east-1.elasticbeanstalk.com/", {
      transports: ["websocket", "polling"],
    });
    setSocket(newSocket);
  }, []);

  async function handleConnect() {
    const localDraftCode = draftCode;
    console.log("This is the draft code from handle " + localDraftCode);
    socket.emit("connectToDraft", localDraftCode);
  }

  return (
    <div className="App-header">
      <h1> Draft Settings </h1>{" "}
      <TextField
        placeholder="Enter draft code here ..."
        onChange={(event) => setDraftCode(event.target.value)}
        style={textFieldStyle}
      />
      <Button
        onClick={(event) => {
          console.log("This is the draftcode : " + draftCode);
          validateDraftCode(event);
          getTeams(); 
          getPlayersWithTeam();
          handleConnect();
        }}
      >
        Submit
      </Button>
      <h3>{errorMessage} </h3>
    </div>
  );
};

export default EnterDraftSettingComponent;
