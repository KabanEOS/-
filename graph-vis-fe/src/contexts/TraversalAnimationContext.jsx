import React, { createContext, useContext, useState } from "react";
import { generateTraversalSequence } from "../services/api"; // Adjust the import path as needed

// Create the context
const TraversalAnimationContext = createContext();

// Custom hook to use the animation context
export const useAnimation = () => useContext(TraversalAnimationContext);

// Animation provider component
export const TraversalAnimationProvider = ({ children }) => {
  const [traversedNodes, setTraversedNodes] = useState([]);
  const [traversedEdges, setTraversedEdges] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [animationSpeed, setAnimationSpeed] = useState(50); // Default speed
  const [graph, setGraph] = useState(null);

  // Function to start traversal animation
  const startTraversalAnimation = (sequence) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index >= sequence.length) {
        clearInterval(interval);
        return;
      }
      const { type, id } = sequence[index];
      if (type === "node") {
        setTraversedNodes((prev) => [...prev, id]);
        setCurrentNode(id);
      } else if (type === "edge") {
        setTraversedEdges((prev) => [...prev, id]);
      }
      index += 1;
    }, 100 - animationSpeed);
  };

  const requestAndStartTraversal = async (
    graph,
    startNode,
    algorithm,
    goalNode
  ) => {
    setGraph(setGraph);
    console.log("🚀 ~ requestAndStartTraversal ~ goalNode:", goalNode);
    console.log("🚀 ~ requestAndStartTraversal ~ algorithm:", algorithm);
    if (!graph) {
      console.error("Graph data is not set");
      return;
    }
    try {
      const response = await generateTraversalSequence(
        graph,
        startNode,
        algorithm,
        goalNode
      );
      console.log("Traversal sequence response:", response);
      startTraversalAnimation(response);
    } catch (error) {
      console.error("Error generating traversal sequence:", error);
    }
  };

  return (
    <TraversalAnimationContext.Provider
      value={{
        traversedNodes,
        traversedEdges,
        currentNode,
        animationSpeed,
        setAnimationSpeed,
        requestAndStartTraversal, // Provide the new function
        setGraph,
      }}
    >
      {children}
    </TraversalAnimationContext.Provider>
  );
};
