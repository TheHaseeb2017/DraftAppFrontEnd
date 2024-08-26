import "../App.css";
import { Grid } from "@mui/material";

const DraftSettingsHeader = ({ draftName }) => {
  const style = {
    textField: {
      color: "#CC5500",
      textShadow:
        "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black",
      marginTop: "120px",
      marginBottom: "40px",
    },
  };

  return (
    <div className="App-comp">
      <h2 style={style.textField}>{draftName} Settings</h2>
    </div>
  );
};
export default DraftSettingsHeader;
