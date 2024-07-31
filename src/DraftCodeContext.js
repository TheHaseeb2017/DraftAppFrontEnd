import React, { createContext, useState } from "react";

const DraftCodeContext = createContext();

export const DraftCodeProvider = ({ children }) => {
  const [draftCode, setDraftCode] = useState(null);
  return (
    <DraftCodeContext.Provider value={{ draftCode, setDraftCode }}>
      {children}
    </DraftCodeContext.Provider>
  );
};

export default DraftCodeContext;
