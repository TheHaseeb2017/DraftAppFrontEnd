import "../App.css";
import { Grid } from "@mui/material";

const DraftComponent = ({ draftName, teams, index, draftActive }) => {
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
            <h5 style={{ color: "red", outlineColor: "white" }}>
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
