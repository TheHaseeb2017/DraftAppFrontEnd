import { useState, useContext, useEffect } from "react";
import React from "react";
import { TextareaAutosize, Button } from "@mui/material";

function PlayerFormDraftSettings({ draftCode, getPlayersWithTeam }) {
  const [players, setPlayers] = useState([]);

  const [isXsScreen, setIsXsScreen] = useState(window.innerWidth <= 600);

  const style = {
    textAreaStyle: {
      border: "10px solid #1976d2",
      backgroundColor: "whiteSmoke",
      margin: "8px",
      borderRadius: "8px",
      width: isXsScreen ? "300px" : "500px",
      height: "250px",
    },

    button: {
      border: "1px solid #1976d2",
      color: "white",
    },

    textField: {
      color: "#CC5500",
      textShadow:
        "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black",
    },
  };

  useEffect(() => {
    const handleResize = () => {
      setIsXsScreen(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handlePlayersChange(event) {
    setPlayers(event.target.value);
  }

  const handleTeamSubmit = () => {
    const lines = players.split("\n");
    lines.forEach((line) => {
      createPlayers(line);
    });

    setPlayers("");
    getPlayersWithTeam();
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
    <div className="App-comp">
      <h3 style={style.textField}>Add Players</h3>
      <form>
        <TextareaAutosize
          value={players}
          onChange={handlePlayersChange}
          placeholder="Enter one player per line..."
          style={style.textAreaStyle}
        />
        <div className="Center-element">
          <Button style={style.button} onClick={handleTeamSubmit}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
export default PlayerFormDraftSettings;
