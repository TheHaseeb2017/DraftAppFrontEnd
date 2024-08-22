import React, { useEffect } from "react";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import "../App.css";

const DraftOrder = ({ teams }) => {
  const style = {
    textField: {
      color: "#CC5500",
      textShadow:
        "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black",
    },
  };
  return (
    <div className="App-comp">
      <h3 style={style.textField}>Draft Order</h3>
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
