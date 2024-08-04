import EnterDraftSettingComponent from "./EnterDraftSettingComponent";
import DraftSettingSettingComponent from "./DraftSettingSettingComponent";
import DraftSettingsHeader from "./DraftSettingHeader";
import PlayerFormDraftSettings from "./PlayerFormDraftSettings";
import PlayersDraftSettings from "./PlayersDraftSettings";
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
  const [teams, setTeams] = useState([]);
  const [draftSettings, setDraftSettings] = useState([]);
  const [draftCode, setDraftCode] = useState("");
  const [draftName, setDraftName] = useState("");
  const [draftDate, setDraftDate] = useState();
  const [timer, setTimer] = useState();
  const [isactive, setIsActive] = useState();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
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
        `https://jcwsy5gsg0.execute-api.us-east-1.amazonaws.com/dev/drafts/validate/${draftCode}`,
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
        `https://jcwsy5gsg0.execute-api.us-east-1.amazonaws.com/dev/draftsetting/update/${draftCode}`,
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
        `https://jcwsy5gsg0.execute-api.us-east-1.amazonaws.com/dev/drafts/playerwithteam/${draftCode}`,
        options
      );
      console.log(responce); // Log the response
      const data = await responce.json();
      setPlayers(data);
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
        `https://jcwsy5gsg0.execute-api.us-east-1.amazonaws.com/dev/delete-players`,
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
                draftCode={draftCode}
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
            />
          )}
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          {showDraftSettings && (
            <PlayerFormDraftSettings
              draftCode={draftCode}
              getPlayersWithTeam={getPlayersWithTeam}
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
        </Grid>
      </Grid>
    </div>
  );
};

export default DraftSettings;
