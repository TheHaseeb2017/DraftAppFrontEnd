import "../App.css";
import { Grid } from "@mui/material";

const DraftComponent = ({ draftName, teams, index }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6}>
        {
          <div className="App-comp">
            <h3>Welcome To: {draftName}</h3>
          </div>
        }
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        {
          <div className="App-comp">
            <h3>On the clock: {teams[index].teamname}</h3>
          </div>
        }
      </Grid>
    </Grid>
  );
};
export default DraftComponent;