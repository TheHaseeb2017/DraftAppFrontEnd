import React, { useEffect } from "react";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import "../App.css";

const DraftOrder = ({ teams }) => {
  return (
    <div className="App-comp">
      <h3>Draft Order</h3>
      <List>
        {teams.map((team, index) => (
          <ListItem key={team.teamid}>
            <ListItemText primary={`${index + 1}. ${team.teamname}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DraftOrder;
