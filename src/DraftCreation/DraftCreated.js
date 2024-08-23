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

function DraftCreated({ setShowDC, setShowDF, email }) {
  const { draftCode } = useContext(DraftCodeContext);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamID, setTeamID] = useState([]);

  const [isXsScreen, setIsXsScreen] = useState(window.innerWidth <= 600);

  const gridStyle = {
    backgroundColor: "white",
    width: isXsScreen ? "300px" : "500px",
    height: 400,
    border: "10px solid #1976d2",
  };

  const gridStyle2 = {
    backgroundColor: "white",
    width: isXsScreen ? "350px" : "500px",
    height: 400,
    border: "10px solid #1976d2",
  };

  useEffect(() => {
    const handleResize = () => {
      setIsXsScreen(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getPlayers();
    getTeams();
    sendDraftCodeEmail();
  }, []);

  function handleButtonClick() {
    setShowDC(false);
    setShowDF(true);
  }

  async function sendDraftCodeEmail() {
    const response = await fetch(
      "http://backend.eba-mfjaqd2a.us-east-1.elasticbeanstalk.com/send-draft-code",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: email,
          draftCode: draftCode,
        }),
      }
    );

    if (response.ok) {
      console.log("Email sent successfully");
    } else {
      console.log("Failed to send email");
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
        `http://backend.eba-mfjaqd2a.us-east-1.elasticbeanstalk.com/player/notdrafted/${draftCode}`,
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
        `http://backend.eba-mfjaqd2a.us-east-1.elasticbeanstalk.com/teams/indraft/${draftCode}`,
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

    {
      field: "teamcode",
      headerName: "Team Code",
      width: "200",
      cellClassName: "Data-grid-cell",
    },

    {
      field: "draftorder",
      headerName: "Draft Order",
      width: "200",
      cellClassName: "Data-grid-cell",
    },
  ];

  const teamsrows = teams.map((team) => ({
    id: team.teamid,
    teamname: team.teamname,
    teamcode: team.teamcode,
    draftorder: team.draftorder,
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
                style={gridStyle2}
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
                style={gridStyle}
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
