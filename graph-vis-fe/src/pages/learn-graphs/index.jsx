import React, { useRef, useState, useEffect } from "react";
import { generateRandomBuildGraph } from "../../services/api";
import BuildGraph from "../../components/BuildGraph";
import { calculateNodePositions } from "../../utils/calculateNodePositions";
import "../../styles/shared.styles.scss";
import "../../styles/learnGraph.styles.scss";

const LearnGraphs = () => {
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [error, setError] = useState(null);
  const [numNodes, setNumNodes] = useState(Math.floor(Math.random() * 21) + 10); // 10 to 30 nodes
  const [numEdges, setNumEdges] = useState(Math.floor(Math.random() * 21) + 10); // 10 to 30 edges
  const [maxIterations, setMaxIterations] = useState(1000);
  const [optimalDistance, setOptimalDistance] = useState(100);
  const [containerWidth, setContainerWidth] = useState(70);
  const [containerHeight, setContainerHeight] = useState(70);

  const graphRef = useRef(null);

  const fetchRandomBuildGraph = async () => {
    const connectivity = "random";

    try {
      const data = await generateRandomBuildGraph(
        numNodes,
        numEdges,
        connectivity
      );
      console.log("🚀 ~ fetchRandomBuildGraph ~ data:", data);
      if (graphRef.current) {
        const viewportWidth =
          (graphRef.current.clientWidth * containerWidth) / 100;
        const viewportHeight =
          (graphRef.current.clientHeight * containerHeight) / 100;
        const nodeSize = Math.max(10, Math.min(30, 1000 / numNodes));
        const nodesWithPositions = calculateNodePositions(
          data.nodes,
          data.edges,
          viewportWidth,
          viewportHeight,
          nodeSize,
          maxIterations,
          optimalDistance
        );
        console.log("🚀 ~ nodesWithPositions:", nodesWithPositions);
        setGraphData({ nodes: nodesWithPositions, edges: data.edges });
      }
    } catch (err) {
      console.error("🚀 ~ fetchRandomBuildGraph ~ error:", err);
      setError("Failed to fetch external graph data");
    }
  };

  useEffect(() => {
    fetchRandomBuildGraph();
  }, [
    numNodes,
    numEdges,
    maxIterations,
    optimalDistance,
    containerWidth,
    containerHeight,
  ]);

  return (
    <div className="show-over-shadow">
      <h2>Learn Graphs</h2>
      <p>
        Here you can learn about different graph algorithms, representations,
        and use cases.
      </p>
      <div>
        <label>
          Number of Nodes:
          <input
            type="number"
            value={numNodes}
            onChange={(e) => setNumNodes(Number(e.target.value))}
            min="10"
            max="30"
          />
        </label>
        <label>
          Number of Edges:
          <input
            type="number"
            value={numEdges}
            onChange={(e) => setNumEdges(Number(e.target.value))}
            min="10"
            max="30"
          />
        </label>
        <label>
          Optimal Distance:
          <input
            type="number"
            value={optimalDistance}
            onChange={(e) => setOptimalDistance(Number(e.target.value))}
            min="10"
            max="300"
          />
        </label>
        <label>
          Max Iterations:
          <input
            type="number"
            value={maxIterations}
            onChange={(e) => setMaxIterations(Number(e.target.value))}
            min="100"
            max="5000"
          />
        </label>
        <label>
          Container Width (%):
          <input
            type="number"
            value={containerWidth}
            onChange={(e) => setContainerWidth(Number(e.target.value))}
            min="10"
            max="100"
          />
        </label>
        <label>
          Container Height (%):
          <input
            type="number"
            value={containerHeight}
            onChange={(e) => setContainerHeight(Number(e.target.value))}
            min="10"
            max="100"
          />
        </label>
        <button onClick={fetchRandomBuildGraph}>Generate External Graph</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div
        ref={graphRef}
        style={{
          width: "100vw",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: `${containerWidth}%`,
            height: `${containerHeight}%`,
            border: "1px solid black",
            position: "relative",
          }}
        >
          <BuildGraph nodes={graphData.nodes} edges={graphData.edges} />
        </div>
      </div>
    </div>
  );
};

export default LearnGraphs;
