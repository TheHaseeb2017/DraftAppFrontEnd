import { TextField, Button } from "@mui/material";
import "../App.css";
import io from "socket.io-client";
import React, { useState, useEffect, useContext } from "react";

const EnterDraftComponent = ({
  draftCode,
  setDraftCode,
  teamCode,
  setTeamCode,
  textFieldStyle,
  validateTeamCode,
  errorMessage,
  setSocket,
  socket,
  returnDraftCode,
}) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const newSocket = io.connect(`http://localhost:8080/`);
    setSocket(newSocket);
  }, []);

  async function handleConnect() {

    const localDraftCode = await returnDraftCode(); 
    console.log("This is the draft code from handle " + localDraftCode);
    socket.emit("connectToDraft", localDraftCode);

    socket.on("connected", () => {
      setConnected(true);
    });
  }

  return (
    <div className="App-header">
      <h1> Enter Draft </h1>{" "}
      <TextField
        placeholder="Enter team code here ..."
        onChange={(event) => setTeamCode(event.target.value)}
        style={textFieldStyle}
      />
      <Button
        onClick={(event) => {
          validateTeamCode(event);
          handleConnect();
        }}
      >
        Submit
      </Button>
      <h3>{errorMessage} </h3>
    </div>
  );
};

export default EnterDraftComponent;
