import React, { createContext, useContext, useState } from "react";

const NodePositionsContext = createContext();

export const NodePositionsProvider = ({ children }) => {
  const [positions, setPositions] = useState([]);

  return (
    <NodePositionsContext.Provider value={{ positions, setPositions }}>
      {children}
    </NodePositionsContext.Provider>
  );
};

export const useNodePositions = () => useContext(NodePositionsContext);
