import "../App.css";
import { Grid } from "@mui/material";

const DraftSummaryComponent = ({ draftName }) => {
  return (
    <div className="App-comp">
      <h3 style={{ marginTop: "100px" }}>{draftName} Results</h3>
    </div>
  );
};
export default DraftSummaryComponent;
