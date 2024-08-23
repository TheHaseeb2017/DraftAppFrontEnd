import React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Grid } from "@mui/material";

import "../App.css";

const SumPicksComponent = ({ picks }) => {
  const [isXsScreen, setIsXsScreen] = useState(window.innerWidth <= 600);

  const style = {
    textField: {
      color: "#CC5500",
      textShadow:
        "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black",
    },
  };
  const columns = [
    {
      field: "roundnumber",
      headerName: "Round",
      width: "100",
      cellClassName: "Data-grid-cell",
    },
    {
      field: "picknumber",
      headerName: "Pick",
      width: "100",
      cellClassName: "Data-grid-cell",
    },
    {
      field: "playername",
      headerName: "Player Name",
      width: 200,
      cellClassName: "Data-grid-cell",
    },

    {
      field: "teamname",
      headerName: "Team Name",
      width: 200,
      cellClassName: "Data-grid-cell",
    },
  ];

  const rows = picks.map((pick) => ({
    id: pick.draftpickid,
    roundnumber: pick.roundnumber,
    picknumber: pick.picknumber,
    playername: pick.Player.playername,
    teamname: pick.Team.teamname,
  }));

  useEffect(() => {
    const handleResize = () => {
      setIsXsScreen(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="App-comp">
      <h3 style={style.textField}>Draft Picks</h3>

      <Box display="flex" flexDirection="column" alignItems="center">
        <Grid item xs={12}>
          <DataGrid
            style={{
              backgroundColor: "white",
              width: isXsScreen ? "375px" : "650px",
              height: 400,
              border: "10px solid #1976d2",
            }}
            className="Data-grid"
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 40]}
          />
        </Grid>
      </Box>
    </div>
  );
};
export default SumPicksComponent;
