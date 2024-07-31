import React from "react";
import {
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Box,
} from "@mui/material";
import "../App.css";

const TeamsComponent = ({ draftedPlayers }) => {
  const style = {
    table: {
      backgroundColor: "white",
      borderRadius: "8px",
      border: "10px solid #1976d2",
      color: "black",
    },
    tablecell: {
      color: "black",
    },
  };
  return (
    <div className="App-comp">
      <h3>Current Teams</h3>

      <Box display="flex">
        <Grid container spacing={0}>
          {draftedPlayers.map((team) => (
            <Grid item xs={12} sm={6} md={4} key={team.teamid}>
              <div style={{ marginRight: "20px", marginBottom: "20px" }}>
                <TableContainer
                  component={Paper}
                  style={{ backgroundColor: "white" }}
                >
                  <Table style={style.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell style={style.tablecell} align="center">
                          {team.teamname}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {team.Players.map((player) => (
                        <TableRow key={player.playerid}>
                          <TableCell style={style.tablecell} align="center">
                            {player.playername}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};
export default TeamsComponent;
