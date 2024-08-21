import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DraftForm from "./DraftCreation/DraftForm";
import TeamForm from "./DraftCreation/TeamForm";
import PlayerForm from "./DraftCreation/PlayerForm";
import DraftCreated from "./DraftCreation/DraftCreated";
import EnterDraft from "./DraftBoard/EnterDraft";
import EnterDraftSummary from "./DraftSummary/EnterDraftSummary";
import EnterDraftSetting from "./DraftSettings/EnterDraftSettings";
import NavBar from "./NavBar";
import { DraftCodeProvider } from "./DraftCodeContext";

function App() {
  const [showDF, setShowDF] = useState(true);
  const [showTF, setShowTF] = useState(false);
  const [showPF, setShowPF] = useState(false);
  const [showDC, setShowDC] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div>
      <DraftCodeProvider>
        <Router>
          <NavBar />
          <Routes>
            {showDF && (
              <Route
                path="/"
                element={
                  <DraftForm
                    setShowDF={setShowDF}
                    setShowTF={setShowTF}
                    setEmail={setEmail}
                  />
                }
              />
            )}
            {showTF && (
              <Route
                path="/"
                element={
                  <TeamForm setShowTF={setShowTF} setShowPF={setShowPF} />
                }
              />
            )}
            {showPF && (
              <Route
                path="/"
                element={
                  <PlayerForm setShowPF={setShowPF} setShowDC={setShowDC} />
                }
              />
            )}
            {showDC && (
              <Route
                path="/"
                element={
                  <DraftCreated
                    setShowDC={setShowDC}
                    setShowDF={setShowDF}
                    email={email}
                  />
                }
              />
            )}

            <Route path="/enterdraft" element={<EnterDraft />} />
            <Route path="/draftsummary" element={<EnterDraftSummary />} />
            <Route path="/draftsetting" element={<EnterDraftSetting />} />
          </Routes>
        </Router>
      </DraftCodeProvider>
    </div>
  );
}

export default App;
