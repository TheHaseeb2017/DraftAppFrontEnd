import React, { useState, useEffect, useContext } from "react";
import { Grid, Box, duration } from "@mui/material";
import "../App.css";
import EnterDraftComponent from "./EnterDraftComponent";
import DraftComponent from "./DraftComponent";
import PlayersComponent from "./PlayersComponent";
import TeamsComponent from "./TeamsComponent";
import DraftOrder from "./DraftOrderComponent";
import CountDownTimer from "./CountDownComponent";
import { Socket } from "socket.io-client";

const EnterDraft = () => {
  const [draftCode, setDraftCode] = useState("");
  const [timer, setTimer] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [draftedPlayers, setDraftedPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [draftName, setDraftName] = useState("");
  const [showDraft, setShowDraft] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [teamID, setTeamID] = useState([]);
  let [index, setIndex] = useState(0);
  let [pick, setPick] = useState(0);
  let [round, setRound] = useState(1);
  const [socket, setSocket] = useState(null);

  const textFieldStyle = {
    backgroundColor: "whiteSmoke",
    margin: "8px",
    borderRadius: "8px",
  };

  useEffect(() => {
    getPlayers();
    getDraftedPlayers();
  }, [draftCode, pick]);

  useEffect(() => {
    getTeams();
  }, [draftCode]);

  async function validateDraftCode(event) {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const responce = await fetch(
        `DraftAppBackend-env.eba-ycxmbsvk.us-east-1.elasticbeanstalk.com/drafts/validate/${draftCode}`,
        options
      );

      console.log(responce); // Log the response
      const data = await responce.json();
      setErrorMessage("");
      setDraftName(data[0].draftname);
      setTimer(data[0].duration);
      setShowDraft(true);

      getPlayers(event);
      getTeams(event);
    } catch (error) {
      console.log(error);
      setErrorMessage(
        `The draft code you entered does not exist: ${draftCode} please try again!!!`
      );
      setShowDraft(false);
    }
  }

  async function getPlayers() {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const responce = await fetch(
        `DraftAppBackend-env.eba-ycxmbsvk.us-east-1.elasticbeanstalk.com/player/notdrafted/${draftCode}`,
        options
      );
      console.log(responce); // Log the response
      const data = await responce.json();
      setPlayers(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleIteration() {
    let emittedIndex;
    let emittedTeams;
    if (index === teams.length - 1) {
      emittedTeams = [...teams].reverse();
      emittedIndex = 0;
      setTeams([...emittedTeams]);
      setIndex(emittedIndex);

      socket.emit("updateDraftOrder", emittedTeams);
      socket.emit("updateIndex", emittedIndex);
    } else {
      emittedIndex = index + 1;
      setIndex(emittedIndex);

      socket.emit("updateIndex", emittedIndex);
    }
  }
  async function updatePlayerTeam(PlayerID) {
    if (players.length !== 0) {
      console.log(
        "This is the index " +
          index +
          " This the length of teams " +
          teams.length
      );

      const update = {
        teamid: teams[index].teamid,
      };

      const options = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      };

      try {
        const responce = await fetch(
          `DraftAppBackend-env.eba-ycxmbsvk.us-east-1.elasticbeanstalk.com/player/addteam/${PlayerID}`,
          options
        );
        console.log(responce); // Log the response
        const data = await responce.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }

      handleIteration();
    } else {
      console.log("The Draft is over no more players to be drated");
    }
  }

  async function addPickedPlayer(PlayerID) {
    if ((pick + 1) % teams.length === 0) {
      setRound(round + 1);
    }

    if (players.length != 0) {
      const draftpick = {
        draftcode: draftCode,
        roundnumber: round,
        playerid: PlayerID,
        picknumber: pick + 1,
        teamid: teams[index].teamid,
      };

      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(draftpick),
      };
      try {
        const responce = await fetch(
          `DraftAppBackend-env.eba-ycxmbsvk.us-east-1.elasticbeanstalk.com/draftpicks`,
          options
        );
        console.log(responce); // Log the response
        const data = await responce.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("The Draft is over no more players to be drated");
    }
  }

  async function getDraftedPlayers() {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const responce = await fetch(
        `DraftAppBackend-env.eba-ycxmbsvk.us-east-1.elasticbeanstalk.com/drafts/playerandteam/${draftCode}`,
        options
      );
      console.log(responce); // Log the response
      const data = await responce.json();
      setDraftedPlayers(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTeams() {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const responce = await fetch(
        `DraftAppBackend-env.eba-ycxmbsvk.us-east-1.elasticbeanstalk.com/teams/draftorder/${draftCode}`,
        options
      );
      console.log(responce); // Log the response
      const data = await responce.json();
      setTeams(data);
      setTeamID(data.map((team) => team.teamid));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App-header">
      {!showDraft && (
        <EnterDraftComponent
          draftCode={draftCode}
          setDraftCode={setDraftCode}
          textFieldStyle={textFieldStyle}
          validateDraftCode={validateDraftCode}
          errorMessage={errorMessage}
          setSocket={setSocket}
          socket={socket}
        />
      )}

      <div className="App-comp">
        {showDraft && (
          <Box
            component="section"
            sx={{
              p: 2,
              border: "2px solid black",
              backgroundColor: "lightblue",
              borderRadius: "8px",
            }}
          >
            <CountDownTimer
              duration={timer}
              updatePlayerTeam={updatePlayerTeam}
              addPickedPlayer={addPickedPlayer}
              players={players}
              pick={pick}
              setPick={setPick}
              socket={socket}
              getPlayers={getPlayers}
              getDraftedPlayers={getDraftedPlayers}
            />
          </Box>
        )}
        {showDraft && (
          <DraftComponent draftName={draftName} teams={teams} index={index} />
        )}

        <Grid container spacing={1}>
          <Grid item xs={12} sm={4} md={4}>
            {showDraft && (
              <Box
                component="section"
                sx={{
                  p: 2,
                  border: "8px solid gray",
                  borderRadius: "8px",
                }}
              >
                <TeamsComponent teams={teams} draftedPlayers={draftedPlayers} />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Box
              component="section"
              sx={{
                p: 2,
                border: "8px solid gray",
                borderRadius: "8px",
              }}
            >
              {" "}
              {showDraft && (
                <DraftOrder teams={teams} setTeams={setTeams} socket={socket} />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            {showDraft && (
              <Box
                component="section"
                sx={{
                  p: 2,
                  border: "8px solid gray",
                  borderRadius: "8px",
                }}
              >
                {" "}
                <PlayersComponent
                  players={players}
                  getDraftedPlayers={getDraftedPlayers}
                  getPlayers={getPlayers}
                  updatePlayerTeam={updatePlayerTeam}
                  addPickedPlayer={addPickedPlayer}
                  pick={pick}
                  setPick={setPick}
                  socket={socket}
                  setPlayers={setPlayers}
                  handleIteration={handleIteration}
                  index={index}
                  teams={teams}
                  setTeams={setTeams}
                  setIndex={setIndex}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default EnterDraft;
