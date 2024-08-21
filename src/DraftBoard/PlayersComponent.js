import React, { useEffect, useState } from "react";
import { Button, Grid, Box, backdropClasses } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "../App.css";

const PlayersComponent = ({
  players,
  getDraftedPlayers,
  getPlayers,
  updatePlayerTeam,
  addPickedPlayer,
  pick,
  setPick,
  socket,
  setTeams,
  setIndex,
  updateCanDraft,
  canDraft,
  getCanDraft,
}) => {
  const style = {
    table: {
      margin: "8px",
      width: "auto",
      backgroundColor: "#282c34",
      borderRadius: "8px",
    },
    buttonEnabled: {
      border: "1px solid #1976d2",
      color: "white",
      margin: "10px",
      backgroundColor: "green",
    },
    buttonDisabled: {
      border: "1px solid #1976d2",
      color: "white",
      margin: "10px",
      backgroundColor: "red",
    },
  };

  const playerscolumns = [
    {
      field: "playername",
      headerName: "Player Name",
      width: "200",
      cellClassName: "Data-grid-cell",
    },
    {
      field: "draftbutton",
      headerName: "Click to Draft",
      width: 150,
      renderCell: (params) => (
        <Button
          disabled={!canDraft}
          onClick={() => handlePlayerClick(params.row.id)}
          style={canDraft ? style.buttonEnabled : style.buttonDisabled}
        >
          Draft
        </Button>
      ),
    },
  ];

  const playersrows = players.map((player) => ({
    id: player.playerid,
    playername: player.playername,
  }));

  const handlePlayerClick = async (playerId) => {
    await updatePlayerTeam(playerId);
    await addPickedPlayer(playerId);
    await getPlayers();
    await getDraftedPlayers();
    await updateCanDraft();
    const pickNumber = pick + 1;
    setPick(pickNumber);
    await socket.emit("updatePlayers");
  };

  useEffect(() => {
    socket.on("recUpdateIndex", (updatedIndex) => {
      setIndex(updatedIndex);
    });

    return () => {
      socket.off("recUpdateIndex");
    };
  }, [setIndex]);

  useEffect(() => {
    socket.on("recUpdatedPlayers", () => {
      getPlayers();
      getDraftedPlayers();
      getCanDraft();
    });

    return () => {
      socket.off("recUpdatedPlayers");
    };
  }, [getPlayers]);

  useEffect(() => {
    socket.on("recUpdatedDraftOrder", (updatedTeams) => {
      setTeams([...updatedTeams]);
    });

    return () => {
      socket.off("recUpdatedDraftOrder");
    };
  }, [setTeams]);

  return (
    <div className="App-comp">
      <h3> Undrafted Players</h3>
      <Box display="flex">
        <Grid container spacing={0} justifyContent="center" alignItems="center">
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
        </Grid>
      </Box>
    </div>
  );
};
export default PlayersComponent;
