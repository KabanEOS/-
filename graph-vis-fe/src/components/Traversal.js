import React, { useState, useEffect, useRef } from "react";
import {
  getBfsTraversal,
  getDfsTraversal,
  generateRandomGraph,
} from "../services/api";
import Graph from "./Graph";

const Traversal = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [sequence, setSequence] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [speed, setSpeed] = useState(1000);
  const [traversalName, setTraversalName] = useState("");
  const [numNodes, setNumNodes] = useState(10);

  const graphRef = useRef(null);

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

  const fetchRandomGraph = async () => {
    try {
      const graph = await generateRandomGraph(numNodes);
      const viewportWidth = graphRef.current.clientWidth;
      const viewportHeight = graphRef.current.clientHeight;
      const nodesWithPositions = calculateNodePositions(
        graph.nodes,
        graph.edges,
        viewportWidth,
        viewportHeight
      );
      setNodes(nodesWithPositions);
      setEdges(graph.edges);
      setSequence([]);
      setCurrentStep(0);
      setTraversalName("");
    } catch (error) {
      console.error("Error generating random graph:", error);
    }
  };

  const calculateNodePositions = (
    nodes,
    edges,
    viewportWidth,
    viewportHeight
  ) => {
    const nodeMap = new Map(
      nodes.map((node) => [node.id, { ...node, children: [] }])
    );
    edges.forEach((edge) => {
      nodeMap.get(edge.source).children.push(nodeMap.get(edge.target));
    });

    const root = nodeMap.get(nodes[0].id);
    const positions = {};

    // Calculate levels
    const levels = [];
    const buildLevels = (node, depth = 0) => {
      if (!levels[depth]) {
        levels[depth] = [];
      }
      levels[depth].push(node);
      node.children.forEach((child) => buildLevels(child, depth + 1));
    };

    buildLevels(root);

    const depthCount = levels.length;
    const levelSeparation = Math.min(100, viewportHeight / (depthCount + 1)); // Adjust based on graph depth and viewport height
    let nodeSeparation;

    if (nodes.length <= 50) {
      nodeSeparation = Math.min(100, viewportWidth / (nodes.length + 1)); // Adjust based on node count and viewport width
    } else {
      nodeSeparation = viewportWidth / (nodes.length * 0.35); // Make nodes more compact for larger graphs
    }

    levels.forEach((nodesAtLevel, depth) => {
      const levelWidth = nodesAtLevel.length * nodeSeparation;
      const startX = Math.max(0, (viewportWidth - levelWidth) / 2);

      nodesAtLevel.forEach((node, index) => {
        positions[node.id] = {
          x: Math.round(startX + index * nodeSeparation), // Round to nearest integer
          y: Math.round((depth + 1) * levelSeparation), // Round to nearest integer
        };
      });
    });

    return nodes.map((node) => ({
      ...node,
      ...positions[node.id],
    }));
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
      <input
        type="number"
        min="1"
        value={numNodes}
        onChange={(e) => setNumNodes(Number(e.target.value))}
        placeholder="Number of nodes"
      />
      <button onClick={fetchRandomGraph}>Generate Random Graph</button>
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
      <div ref={graphRef} style={{ width: "100vw", height: "80vh" }}>
        <Graph
          nodes={nodes}
          edges={edges}
          setNodes={setNodes}
          setEdges={setEdges}
          currentNode={currentNode}
          visitedNodes={sequence.slice(0, currentStep + 1)}
        />
      </div>
    </div>
  );
};

export default Traversal;
