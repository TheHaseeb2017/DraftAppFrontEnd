import { useState, useContext, useEffect } from "react";
import React from "react";
import { TextareaAutosize, Button } from "@mui/material";

function TeamFormDraftSettings({ draftCode, getTeams }) {
  const [teams, setTeams] = useState([]);
  const maxDraftOrder = 0;

  const [isXsScreen, setIsXsScreen] = useState(window.innerWidth <= 600);
  let draftOrder = [];

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

  function handleTeamsChange(event) {
    setTeams(event.target.value);
  }

  const handleTeamSubmit = async () => {
    const lines = teams.split("\n");

    let number = (await getMaxDraftOrder()) + 1;

    console.log("This is the number " + number);

    lines.forEach((line) => {
      draftOrder.push(number);
      number++;
    });

    draftOrder = [...draftOrder].sort(() => Math.random() - 0.5);

    await Promise.all(
      lines.map(async (line) => {
        await createTeam(line);
      })
    );

    setTeams("");
    await getTeams();
  };

  async function createTeam(teamItem) {
    const team = {
      teamname: teamItem,
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
      const responce = await fetch(
        `http://backend.eba-mfjaqd2a.us-east-1.elasticbeanstalk.com/teams`,
        options
      );
      console.log(responce); // Log the response
      const data = await responce.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getMaxDraftOrder() {
    let max = 0;

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(
        `http://backend.eba-mfjaqd2a.us-east-1.elasticbeanstalk.com/teams/draftorder/${draftCode}`,
        options
      );

      console.log("Team response ", response); // Log the response object
      const data = await response.json();

      if (data.length === 0) {
        console.log("No teams found in the draft");
        return max;
      }

      const index = data.length - 1;
      max = data[index].draftorder;

      console.log("Here is max ", max);
      return max;
    } catch (error) {
      console.log("Hitting the catch ");
      console.log(error);
      return max; // Return 0 in case of an error
    }
  }

  return (
    <div className="App-comp">
      <h3 style={style.textField}>Add Teams</h3>
      <form>
        <TextareaAutosize
          value={teams}
          onChange={handleTeamsChange}
          placeholder="Enter one team per line..."
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
export default TeamFormDraftSettings;
