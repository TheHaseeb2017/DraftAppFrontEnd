import EnterDraftSettingComponent from "./EnterDraftSettingComponent";
import DraftSettingSettingComponent from "./DraftSettingSettingComponent";
import DraftSettingsHeader from "./DraftSettingHeader";
import PlayerFormDraftSettings from "./PlayerFormDraftSettings";
import PlayersDraftSettings from "./PlayersDraftSettings";
import TeamsDraftSettings from "./TeamsDraftSettings";
import TeamFormDraftSettings from "./TeamFormDraftSettings";
import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import "../App.css";

const DraftSettings = () => {
  const textFieldStyle = {
    backgroundColor: "whiteSmoke",
    margin: "8px",
    borderRadius: "8px",
  };

  const [showDraftSettings, setShowDraftSettings] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [picks, setPicks] = useState([]);
  const [draftSettings, setDraftSettings] = useState([]);
  const [draftCode, setDraftCode] = useState("");
  const [draftName, setDraftName] = useState("");
  const [draftDate, setDraftDate] = useState();
  const [timer, setTimer] = useState();
  const [isactive, setIsActive] = useState();
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    getTeams();
    getPlayersWithTeam();
  }, []);

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
        `http://backend.eba-mfjaqd2a.us-east-1.elasticbeanstalk.com/drafts/validate/${draftCode}`,
        options
      );

      console.log(responce); // Log the response
      const data = await responce.json();

      setDraftSettings(data);
      setErrorMessage("");
      setDraftName(data[0].draftname);
      setDraftDate(data[0].draftdate);
      setTimer(data[0].duration);
      setIsActive(data[0].isactive);
      setShowDraftSettings(true);
    } catch (error) {
      console.log(error);
      setErrorMessage(
        `The draft code you entered does not exist: ${draftCode} please try again!!!`
      );
      setShowDraftSettings(false);
    }
  }

  async function updateDraft() {
    const update = {
      draftname: draftName,
      draftdate: draftDate,
      duration: timer,
      isactive: isactive,
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
        `http://backend.eba-mfjaqd2a.us-east-1.elasticbeanstalk.com/draftsetting/update/${draftCode}`,
        options
      );
      console.log(responce); // Log the response
      const data = await responce.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getPlayersWithTeam() {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const responce = await fetch(
        `http://backend.eba-mfjaqd2a.us-east-1.elasticbeanstalk.com/drafts/playerwithteam/${draftCode}`,
        options
      );
      console.log(responce); // Log the response
      const data = await responce.json();
      setPlayers(data);
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
        `http://backend.eba-mfjaqd2a.us-east-1.elasticbeanstalk.com/teams/draftorder/${draftCode}`,
        options
      );
      console.log(responce); // Log the response
      const data = await responce.json();
      setTeams(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePlayer(playerids) {
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerids }),
    };
    try {
      console.log("Here is the players ids " + playerids);
      const responce = await fetch(
        `http://backend.eba-mfjaqd2a.us-east-1.elasticbeanstalk.com/delete-players`,
        options
      );
      console.log(responce);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTeams(teamids) {
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teamids }),
    };
    try {
      console.log("Here is the team ids " + teamids);
      const responce = await fetch(
        `http://backend.eba-mfjaqd2a.us-east-1.elasticbeanstalk.com/delete-teams`,
        options
      );
      console.log(responce);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App-header">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          {!showDraftSettings && (
            <div className="App-comp">
              <EnterDraftSettingComponent
                setDraftCode={setDraftCode}
                validateDraftCode={validateDraftCode}
                errorMessage={errorMessage}
                textFieldStyle={textFieldStyle}
                getPlayersWithTeam={getPlayersWithTeam}
                getTeams={getTeams}
                draftCode={draftCode}
                socket={socket}
                setSocket={setSocket}
              />
            </div>
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <div className="">
            {showDraftSettings && <DraftSettingsHeader draftName={draftName} />}
          </div>
        </Grid>

        <Grid item xs={12} sm={4} md={4}>
          {showDraftSettings && (
            <PlayerFormDraftSettings
              draftCode={draftCode}
              getPlayersWithTeam={getPlayersWithTeam}
            />
          )}

          {showDraftSettings && (
            <TeamFormDraftSettings draftCode={draftCode} getTeams={getTeams} />
          )}
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          {showDraftSettings && (
            <DraftSettingSettingComponent
              draftSettings={draftSettings}
              textFieldStyle={textFieldStyle}
              draftName={draftName}
              draftDate={draftDate}
              timer={timer}
              isactive={isactive}
              setDraftName={setDraftName}
              setDraftDate={setDraftDate}
              setTimer={setTimer}
              setIsActive={setIsActive}
              updateDraft={updateDraft}
              socket={socket}
              setSocket={setSocket}
              getTeams={getTeams}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          {showDraftSettings && (
            <PlayersDraftSettings
              players={players}
              deletePlayer={deletePlayer}
              getPlayersWithTeam={getPlayersWithTeam}
            />
          )}

          {showDraftSettings && (
            <TeamsDraftSettings
              teams={teams}
              deleteTeams={deleteTeams}
              getTeams={getTeams}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default DraftSettings;
