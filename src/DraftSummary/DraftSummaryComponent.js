import "../App.css";
import { Grid } from "@mui/material";

const style = {
  textField: {
    marginTop: "100px",
    color: "#CC5500",
    textShadow:
      "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black",
  },
};

const DraftSummaryComponent = ({ draftName }) => {
  return (
    <div className="App-comp">
      <h3 style={style.textField}>{draftName} Results</h3>
    </div>
  );
};
export default DraftSummaryComponent;
