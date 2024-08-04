import { useState, useContext } from "react";
import React from "react";
import { TextareaAutosize, Button } from "@mui/material";
import DraftCodeContext from "../DraftCodeContext";

const textAreaStyle = {
  backgroundColor: "whiteSmoke",
  margin: "8px",
  borderRadius: "8px",
  width: "500px",
  height: "250px",
};

function TeamForm({ setShowTF, setShowPF }) {
  const [teams, setTeams] = useState([]);
  let draftOrder = [];

  const { draftCode } = useContext(DraftCodeContext);

  function handleTeamsChange(event) {
    setTeams(event.target.value);
  }

  const handleTeamSubmit = () => {
    const lines = teams.split("\n");
    let number = 1;

    lines.forEach((line) => {
      draftOrder.push(number);
      number++;
    });

    draftOrder = [...draftOrder].sort(() => Math.random() - 0.5);
    lines.forEach((line) => {
      createTeams(line);
    });
    setTeams("");
    setShowTF(false);
    setShowPF(true);
  };

  async function createTeams(teamsItem) {
    const team = {
      teamname: teamsItem,
      draftorder: draftOrder.pop(),
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
      const responce = await fetch(`https://jcwsy5gsg0.execute-api.us-east-1.amazonaws.com/dev/teams`, options);
      console.log(responce); // Log the response
      const data = await responce.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App-header">
      <h1>Add Teams</h1>
      <form>
        <TextareaAutosize
          value={teams}
          onChange={handleTeamsChange}
          placeholder="Enter one team per line..."
          style={textAreaStyle}
        />
        <div className="Center-element">
          <Button onClick={handleTeamSubmit}>Submit</Button>
        </div>
      </form>
    </div>
  );
}
export default TeamForm;
