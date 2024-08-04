import { useContext, useEffect, useState } from "react";
import React from "react";
import { Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "../App.css";
import { Link } from "react-router-dom";
import DraftCodeContext from "../DraftCodeContext";

const style = {
  button: {
    border: "1px solid #1976d2",
    color: "white",
    margin: "10px",
  },
};

function DraftCreated({ setShowDC, setShowDF }) {
  const { draftCode } = useContext(DraftCodeContext);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamID, setTeamID] = useState([]);

  useEffect(() => {
    getPlayers();
    getTeams();
  }, []);

  function handleButtonClick() {
    setShowDC(false);
    setShowDF(true);
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
        `https://1vzae36dp1.execute-api.us-east-1.amazonaws.com/dev/player/notdrafted/${draftCode}`,
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
        `https://1vzae36dp1.execute-api.us-east-1.amazonaws.com/dev/teams/indraft/${draftCode}`,
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

  const playerscolumns = [
    {
      field: "playername",
      headerName: "Player Name",
      width: "200",
      cellClassName: "Data-grid-cell",
    },
  ];

  const playersrows = players.map((player) => ({
    id: player.playerid,
    playername: player.playername,
  }));

  const teamsscolumns = [
    {
      field: "teamname",
      headerName: "Team Name",
      width: "200",
      cellClassName: "Data-grid-cell",
    },
  ];

  const teamsrows = teams.map((team) => ({
    id: team.teamid,
    teamname: team.teamname,
  }));

  return (
    <div className="App-header">
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={6}>
          <div className="App-grid">
            <h3 style={{ textAlign: "center", marginTop: "150px" }}>
              Teams in Draft
            </h3>
            <Grid item xs={12} sm={6} md={6}>
              <DataGrid
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: 400,
                  border: "10px solid #1976d2",
                }}
                className="Data-grid"
                rows={teamsrows}
                columns={teamsscolumns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10, 20, 40]}
              />
            </Grid>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <div className="App-grid">
            <h3 style={{ textAlign: "center", marginTop: "150px" }}>
              Players in Draft
            </h3>
            <Grid item xs={12}>
              <DataGrid
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: 400,
                  border: "10px solid #1976d2",
                }}
                className="Data-grid"
                rows={playersrows}
                columns={playerscolumns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10, 20, 40]}
              />
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <div className="App-message">
            <h3 style={{ textAlign: "center", margin: "2px" }}>
              DrafCode: <h3 style={{ color: "Green" }}>{draftCode}</h3>
            </h3>

            <div style={{ margin: "2px" }}>
              <Button style={style.button} component={Link} to="/enterdraft">
                {" "}
                Enter Draft
              </Button>
              <Button style={style.button} onClick={handleButtonClick}>
                {" "}
                Home Page
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
export default DraftCreated;
