import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";



function CountDownTimer({
  duration,
  updatePlayerTeam,
  addPickedPlayer,
  players,
  pick,
  setPick,
  socket,
  getPlayers,
  getDraftedPlayers,
}) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [timeLeftDisplay, setTimeLeftDisplay] = useState(duration);
  const [draftStarted, setDraftStarted] = useState(false);
  const [draftCom, setDraftCom] = useState(false);

  useEffect(() => {
    socket.on("recAutoTimer", (emittedTimeLeft) => {
      setTimeLeftDisplay(emittedTimeLeft);
    });

    return () => {
      socket.off("recAutoTimer");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("recAutoUpPlayer", async (autoUpPlayer) => {
      getPlayers();
      getDraftedPlayers();
    });

    return () => {
      socket.off("recAutoUpPlayer");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("recUpdateDraftCom", (updatedStartButton) => {
      setDraftCom(updatedStartButton);
    });

    return () => {
      socket.off("recUpdateDraftCom");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("recUpdateDraftStatus", (updatedDraftStatus) => {
      setDraftStarted(updatedDraftStatus);
    });

    return () => {
      socket.off("recUpdateDraftStatus");
    };
  }, [socket]);

  useEffect(() => {
    console.log("Other use effect");
    let intervalId;

    if (draftStarted) {
      intervalId = setInterval(() => {
        socket.emit("autoTimer", timeLeft - 1);
        setTimeLeft((timeLeft) => timeLeft - 1);
        setTimeLeftDisplay((timeLeft) => timeLeft - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timeLeft, draftStarted]);

  useEffect(() => {
    console.log("every second");
    if (timeLeft === 0 && draftStarted) {
      if (players.length !== 0) {
        socket.emit("autoTimer", duration);
        draftPlayer();
        setTimeLeft(duration);
        setTimeLeftDisplay(duration);
        setPick(pick + 1);
      } else {
        setDraftStarted(false);
      }
    }
  }, [timeLeft]);

  const handleButtonClick = () => {
    socket.emit("updateDraftCom", true);
    socket.emit("updateDraftStatus", false);
    console.log("The handleButtonClick was triggered");
    setDraftCom(true);
    setDraftStarted(true);
  };

  const handleButtonClickStop = () => {
    console.log("The handleButtonClickStop was triggered");
    setDraftStarted(false);
    setDraftCom(false);
    socket.emit("updateDraftStatus", false);
    socket.emit("updateDraftCom", false);
  };

  async function draftPlayer() {
    const randomIndex = Math.floor(Math.random() * players.length);
    const player = players[randomIndex].playerid;
    await updatePlayerTeam(player);
    await addPickedPlayer(player);
    socket.emit("autoUpPlayer");
  }

  const hours = Math.floor(timeLeftDisplay / 3600);
  const minutes = Math.floor((timeLeftDisplay % 3600) / 60);
  const seconds = timeLeftDisplay % 60;

  return (
    <div>
      <Typography variant="h4" style={{ marginTop: 100, color: "black" }}>
        {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </Typography>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={draftCom ? handleButtonClickStop : handleButtonClick}>
          {draftCom ? "Stop Draft" : "Start Draft"}
        </Button>
      </div>
    </div>
  );
}

export default CountDownTimer;
