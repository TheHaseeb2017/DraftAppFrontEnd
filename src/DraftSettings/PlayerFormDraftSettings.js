import { useState, useContext } from "react";
import React from "react";
import { TextareaAutosize, Button } from "@mui/material";

const style = {
  textAreaStyle: {
    border: "10px solid #1976d2",
    backgroundColor: "whiteSmoke",
    margin: "8px",
    borderRadius: "8px",
    width: "500px",
    height: "250px",
  },

  button: {
    border: "1px solid #1976d2",
    color: "white",
  },
};

function PlayerFormDraftSettings({ draftCode, getPlayersWithTeam }) {
  const [players, setPlayers] = useState([]);

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
        `https://0uhiqop80b.execute-api.us-east-1.amazonaws.com/dev/play`,
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
      <h3>Add Players</h3>
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
