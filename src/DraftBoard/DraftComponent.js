import "../App.css";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";

const DraftComponent = ({ draftName, teams, index, draftActive }) => {
  const [isXsScreen, setIsXsScreen] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsXsScreen(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6}>
        {draftActive && (
          <div className="App-comp">
            <h3>Welcome To: {draftName}</h3>
          </div>
        )}
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        {draftActive && (
          <div className="App-comp">
            <h3>On the clock: {teams[index].teamname}</h3>
          </div>
        )}
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        {!draftActive && (
          <div className="App-comp">
            <h5
              style={{
                color: "red",
                textShadow:
                  "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black",
                  width: isXsScreen ? "300px" : "800px",
              }}
            >
              Draft is currently inactive, request draft admin to activate to
              begin !!!
            </h5>
          </div>
        )}
      </Grid>
    </Grid>
  );
};
export default DraftComponent;
