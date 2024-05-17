import React, { useState, useEffect } from "react";
import { getBfsTraversal, getDfsTraversal } from "../services/api";
import Graph from "./Graph";

const Traversal = ({ nodes, edges }) => {
  const [sequence, setSequence] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [speed, setSpeed] = useState(1000);
  const [traversalName, setTraversalName] = useState("");

  const fetchBfsTraversal = async () => {
    try {
      const traversal = await getBfsTraversal({ nodes, edges });
      setSequence(traversal);
      setCurrentStep(0);
      setTraversalName("BFS");
    } catch (error) {
      console.error("Error during BFS traversal:", error);
    }
  };

  const fetchDfsTraversal = async () => {
    try {
      const traversal = await getDfsTraversal({ nodes, edges });
      setSequence(traversal);
      setCurrentStep(0);
      setTraversalName("DFS");
    } catch (error) {
      console.error("Error during DFS traversal:", error);
    }
  };

  useEffect(() => {
    if (sequence.length > 0) {
      const id = setInterval(() => {
        setCurrentStep((prev) =>
          prev < sequence.length - 1 ? prev + 1 : prev
        );
      }, speed);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [sequence, speed]);

  const currentNode = sequence.length > 0 ? sequence[currentStep] : null;

  return (
    <div>
      <button onClick={fetchBfsTraversal}>Run BFS</button>
      <button onClick={fetchDfsTraversal}>Run DFS</button>
      <input
        type="range"
        min="100"
        max="2000"
        step="100"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
      />
      <p>Traversal: {traversalName}</p>
      <Graph
        nodes={nodes}
        edges={edges}
        setNodes={() => {}}
        setEdges={() => {}}
        currentNode={currentNode}
        visitedNodes={sequence.slice(0, currentStep + 1)}
      />
    </div>
  );
};

export default Traversal;
