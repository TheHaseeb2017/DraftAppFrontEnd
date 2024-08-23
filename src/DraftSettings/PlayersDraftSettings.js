import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Grid, IconButton } from "@mui/material";
import "../App.css";

const PlayersDraftSettings = ({
  players,
  deletePlayer,
  getPlayersWithTeam,
}) => {
  const [selectionModel, setSelectionModel] = useState([]);
  const [isXsScreen, setIsXsScreen] = useState(window.innerWidth <= 600);

  const style = {
    table: {
      margin: "8px",
      width: "auto",
      backgroundColor: "#282c34",
      borderRadius: "8px",
    },

    textField: {
      color: "#CC5500",
      textShadow:
        "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black",
    },

    gridStyle: {
      backgroundColor: "white",
      width: isXsScreen ? "350px" : "550px",
      height: 400,
      border: "10px solid #1976d2",
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

  async function handleDeletePlayer(playerid) {
    console.log("This is the is " + playerid);
    await deletePlayer(playerid);
    getPlayersWithTeam();
    setSelectionModel([]);
  }

  const columns = [
    {
      field: "id",
      headerName: "Player ID",
      width: "100",
      cellClassName: "Data-grid-cell",
    },
    {
      field: "playername",
      headerName: "Player Name",
      width: "150",
      cellClassName: "Data-grid-cell",
    },
    {
      field: "teamname",
      headerName: "Team Name",
      width: 150,
      cellClassName: "Data-grid-cell",
    },
    {
      field: "delete",
      width: 50,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => {
        return (
          <IconButton
            onClick={() => {
              const selectedIDs = selectionModel;
              console.log("This is the selected ids " + selectedIDs);
              handleDeletePlayer(selectedIDs);
              getPlayersWithTeam();
              // and get the latest results after the deletion
              // then call setRows() to update the data locally here
            }}
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  const rows = players.map((player) => ({
    id: player.playerid,
    playername: player.playername,
    teamname: player.Team ? player.Team.teamname : "Not Team Assigned",
  }));

  return (
    <div className="App-comp">
      <h3 style={style.textField}>Players in the Draft</h3>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Grid item xs={12}>
          <DataGrid
            style={style.gridStyle}
            className="Data-grid"
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 40]}
            checkboxSelection
            onRowSelectionModelChange={(newSelection) => {
              console.log("This is the new selection " + newSelection);
              setSelectionModel(newSelection);
            }}
            selectionModel={selectionModel}
          />
        </Grid>
      </Box>
    </div>
  );
};

export default PlayersDraftSettings;
