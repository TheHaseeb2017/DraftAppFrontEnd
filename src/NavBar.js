import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import DraftCodeContext from "./DraftCodeContext";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const style = {
    navbar: {
      margin: "auto", 
      borderRadius: "8px",
      paddingBottom: "20px", 
    },
  };
  
  return (
    <AppBar positiion="static">
      <Toolbar style={style.navbar}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          DraftApp
        </Typography>
        <Button component={Link} to="/" color="inherit">
          {" "}
          Home Page
        </Button>
        <Button component={Link} to="/enterdraft" color="inherit">
          {" "}
          Enter Draft
        </Button>
        <Button component={Link} to="/draftsummary" color="inherit">
          {" "}
          Draft Summary
        </Button>
        <Button component={Link} to="/draftsetting" color="inherit">
          {" "}
          Draft Settings
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
