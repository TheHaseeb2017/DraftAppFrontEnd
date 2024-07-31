import "../App.css";
import { Grid } from "@mui/material";

const DraftSettingsHeader = ({ draftName }) => {
  return (
    <div className="Center-element">
      <h2 style={{ marginTop: "0px", marginBottom: "120px" }}>{draftName} Settings</h2>
    </div>
  );
};
export default DraftSettingsHeader;
