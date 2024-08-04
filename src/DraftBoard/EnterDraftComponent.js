import { TextField, Button } from "@mui/material";
import "../App.css";
import io from "socket.io-client";
import React, { useState, useEffect, useContext } from "react";

const EnterDraftComponent = ({
  draftCode,
  setDraftCode,
  textFieldStyle,
  validateDraftCode,
  errorMessage,
  setSocket,
  socket,
}) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const newSocket = io.connect(`https://jcwsy5gsg0.execute-api.us-east-1.amazonaws.com/dev/`);
    setSocket(newSocket);
  }, []);

  const handleConnect = () => {
    socket.emit("connectToDraft", draftCode);

    socket.on("connected", () => {
      setConnected(true);
    });
  };

  return (
    <div className="App-header">
      <h1> Enter Draft </h1>{" "}
      <TextField
        placeholder="Enter draft code here ..."
        onChange={(event) => setDraftCode(event.target.value)}
        style={textFieldStyle}
      />
      <Button
        onClick={(event) => {
          validateDraftCode(event);
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
