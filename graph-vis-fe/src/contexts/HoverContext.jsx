// src/context/HoverContext.js
import React, { createContext, useContext, useState, useCallback } from "react";

const HoverContext = createContext();

export const HoverProvider = ({ children }) => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredConnection, setHoveredConnection] = useState(null);

  const handleMouseEnterNode = useCallback((node) => {
    setHoveredNode(node.toString());
    setHoveredConnection(null);
  }, []);

  const handleMouseEnterConnection = useCallback((connection) => {
    if (connection && connection.source && connection.target) {
      setHoveredConnection({
        source: connection.source.toString(),
        target: connection.target.toString(),
      });
      setHoveredNode(null);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredNode(null);
    setHoveredConnection(null);
  }, []);

  return (
    <HoverContext.Provider
      value={{
        hoveredNode,
        hoveredConnection,
        handleMouseEnterNode,
        handleMouseEnterConnection,
        handleMouseLeave,
      }}
    >
      {children}
    </HoverContext.Provider>
  );
};

export const useHover = () => useContext(HoverContext);
