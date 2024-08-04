import EnterDraftSummaryComponent from "./EnterDraftSummaryComponent";
import DraftSummaryComponent from "./DraftSummaryComponent";
import SumPicksComponent from "./SumPicksComponent";
import React, { useState, useEffect, useContext } from "react";
import { Grid, Box, duration } from "@mui/material";
import "../App.css";
import SumTeamComponent from "./SumTeamsComponent";

const EnterDraftSummary = () => {
  const textFieldStyle = {
    backgroundColor: "whiteSmoke",
    margin: "8px",
    borderRadius: "8px",
  };

  const [draftCode, setDraftCode] = useState("");
  const [draftName, setDraftName] = useState("");
  const [showDraftSummary, setShowDraftSummary] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [picks, setPicks] = useState([]);
  const [teams, setTeams] = useState([]);

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
        `https://1vzae36dp1.execute-api.us-east-1.amazonaws.com/dev/drafts/validate/${draftCode}`,
        options
      );

      console.log(responce); // Log the response
      const data = await responce.json();
      setErrorMessage("");
      setDraftName(data[0].draftname);
      setShowDraftSummary(true);
    } catch (error) {
      console.log(error);
      setErrorMessage(
        `The draft code you entered does not exist: ${draftCode} please try again!!!`
      );
      setShowDraftSummary(false);
    }
  }

  async function getPicks() {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const responce = await fetch(
        `https://1vzae36dp1.execute-api.us-east-1.amazonaws.com/dev/drafts/draftpicks/${draftCode}`,
        options
      );
      console.log(responce); // Log the response
      const data = await responce.json();
      setPicks(data);
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
        `https://1vzae36dp1.execute-api.us-east-1.amazonaws.com/dev/drafts/playerandteam/${draftCode}`,
        options
      );
      console.log(responce); // Log the response
      const data = await responce.json();
      console.log("These are the teams data: " + data);
      setTeams(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App-header">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          {!showDraftSummary && (
            <div className="App-comp">
              <EnterDraftSummaryComponent
                setDraftCode={setDraftCode}
                validateDraftCode={validateDraftCode}
                errorMessage={errorMessage}
                textFieldStyle={textFieldStyle}
                getPicks={getPicks}
                getTeams={getTeams}
              />
            </div>
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          {showDraftSummary && <DraftSummaryComponent draftName={draftName} />}
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          {showDraftSummary && <SumPicksComponent picks={picks} />}
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          {showDraftSummary && <SumTeamComponent teams={teams} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default EnterDraftSummary;
