import { useState, useContext, useEffect } from "react";
import React from "react";
import { TextareaAutosize, Button } from "@mui/material";
import DraftCodeContext from "../DraftCodeContext";

function PlayerForm({ setShowPF, setShowDC }) {
  const [players, setPlayers] = useState([]);

  const { draftCode } = useContext(DraftCodeContext);

  const [isXsScreen, setIsXsScreen] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsXsScreen(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const textAreaStyle = {
    backgroundColor: "whiteSmoke",
    margin: "8px",
    borderRadius: "8px",
    width: isXsScreen ? "300px" : "500px",
    height: "250px",
  };

  function handlePlayersChange(event) {
    setPlayers(event.target.value);
  }

  const handleTeamSubmit = () => {
    const lines = players.split("\n");
    lines.forEach((line) => {
      createPlayers(line);
    });
    setPlayers("");
    setShowPF(false);
    setShowDC(true);
  };

  async function createPlayers(playersItem) {
    const team = {
      playername: playersItem,
      draftcode: draftCode,
    };

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(team),
    };
    try {
      const responce = await fetch(
        `http://backend.eba-mfjaqd2a.us-east-1.elasticbeanstalk.com/play`,
        options
      );
      console.log(responce); // Log the response
      const data = await responce.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App-header">
      <h1>Add Players</h1>
      <form>
        <TextareaAutosize
          value={players}
          onChange={handlePlayersChange}
          placeholder="Enter one player per line..."
          style={textAreaStyle}
        />
        <div className="Center-element">
          <Button onClick={handleTeamSubmit}>Submit</Button>
        </div>
      </form>
    </div>
  );
}
export default PlayerForm;
