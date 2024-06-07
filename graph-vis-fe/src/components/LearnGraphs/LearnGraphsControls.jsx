import React from "react";

const LearnGraphsControls = ({
  numNodes,
  handleNumNodesChange,
  numEdges,
  handleNumEdgesChange,
  optimalDistance,
  setOptimalDistance,
  maxIterations,
  setMaxIterations,
  nodeSize,
  setNodeSize,
  connectivity,
  handleConnectivityChange,
  fetchAndGenerateGraph,
  infoMessage,
  error,
}) => {
  return (
    <div>
      <label>
        Number of Nodes:
        <input
          type="number"
          value={numNodes}
          onChange={handleNumNodesChange}
          min="1"
          max="100"
        />
      </label>
      <label>
        Number of Edges:
        <input
          type="number"
          value={numEdges}
          onChange={handleNumEdgesChange}
          min="1"
          max="100"
          // @ts-ignore
          placeholder={
            connectivity === "complete"
              ? Math.floor((numNodes * (numNodes - 1)) / 2)
              : ""
          }
          readOnly={connectivity === "complete"}
        />
      </label>
      <label>
        Optimal Distance:
        <input
          type="number"
          value={optimalDistance}
          onChange={(e) => setOptimalDistance(Number(e.target.value))}
          min="1"
          max="300"
        />
      </label>
      <label>
        Max Iterations:
        <input
          type="number"
          value={maxIterations}
          onChange={(e) => setMaxIterations(Number(e.target.value))}
          min="1"
          max="5000"
        />
      </label>
      <label>
        Node Size:
        <input
          type="number"
          value={nodeSize}
          onChange={(e) => setNodeSize(Number(e.target.value))}
          min="1"
          max="20"
        />
      </label>
      <label>
        Connectivity:
        <select value={connectivity} onChange={handleConnectivityChange}>
          <option value="random">Random</option>
          <option value="tree">Tree</option>
          <option value="complete">Complete</option>
        </select>
      </label>
      <button onClick={fetchAndGenerateGraph}>Generate External Graph</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {infoMessage && (
        <p
          style={{ color: "blue" }}
          dangerouslySetInnerHTML={{ __html: infoMessage }}
        ></p>
      )}
    </div>
  );
};

export default LearnGraphsControls;
