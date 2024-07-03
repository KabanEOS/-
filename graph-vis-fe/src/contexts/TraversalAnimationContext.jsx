import React, { createContext, useContext, useState, useRef } from "react";
import { generateTraversalSequence } from "../services/api"; // Adjust the import path as needed

// Create the context
const TraversalAnimationContext = createContext();

// Custom hook to use the animation context
export const useAnimation = () => useContext(TraversalAnimationContext);

// Animation provider component
export const TraversalAnimationProvider = ({ children }) => {
  const [isTraversalAnimationActive, setTraversalAnimationActive] =
    useState(false);
  const [traversedNodes, setTraversedNodes] = useState([]);
  const [traversedEdges, setTraversedEdges] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [animationSpeed, setAnimationSpeed] = useState(50); // Default speed
  const [graph, setGraph] = useState(null);
  const intervalRef = useRef(null);

  // Function to start traversal animation
  const startTraversalAnimation = (sequence) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index >= sequence.length) {
        clearInterval(interval);
        setTraversalAnimationActive(false);
        return;
      }
      const nodeId = sequence[index];
      setTraversedNodes((prev) => {
        const updatedNodes = [...prev, nodeId];
        console.log("Traversed Nodes: ", updatedNodes);
        return updatedNodes;
      });
      setCurrentNode(nodeId);
      console.log("Current Node: ", nodeId);

      if (index > 0) {
        const edgeId = { source: sequence[index - 1], target: nodeId };
        setTraversedEdges((prev) => {
          const updatedEdges = [...prev, edgeId];
          console.log("Traversed Edges: ", updatedEdges);
          return updatedEdges;
        });
      }

      index += 1;
    }, 2 * animationSpeed);

    intervalRef.current = interval; // Store interval ID in ref
    setTraversalAnimationActive(true);
  };

  const requestAndStartTraversal = async (
    graph,
    startNode,
    algorithm,
    goalNode
  ) => {
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

  const stopTraversalAnimation = () => {
    setTraversalAnimationActive(false);
    setCurrentNode(null);
    setTraversedNodes([]);
    setTraversedEdges([]);
    clearInterval(intervalRef.current); // Clear interval using ref
  };

  return (
    <TraversalAnimationContext.Provider
      value={{
        setTraversalAnimationActive,
        isTraversalAnimationActive,
        traversedNodes,
        traversedEdges,
        currentNode,
        animationSpeed,
        setAnimationSpeed,
        requestAndStartTraversal,
        stopTraversalAnimation,
        setGraph,
      }}
    >
      {children}
    </TraversalAnimationContext.Provider>
  );
};
