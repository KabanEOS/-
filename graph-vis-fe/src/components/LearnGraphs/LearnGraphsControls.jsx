import React from "react";
import ControlDrawerUnit from "./../../components/ControlDrawer/ControlDrawerUnit";
import { defaultControls, minMaxValues, descriptions } from "./controlSettings";
import ButtonControl from "../ButtonControl";

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
      <ControlDrawerUnit
        type="numeric"
        name="NUMBER_OF_NODES"
        value={numNodes}
        min={minMaxValues.NUMBER_OF_NODES.min}
        max={minMaxValues.NUMBER_OF_NODES.max}
        description={descriptions.NUMBER_OF_NODES}
        onChange={(name, value) =>
          handleNumNodesChange({ target: { name, value } })
        }
        buttonChangeValue={minMaxValues.NUMBER_OF_NODES.buttonChangeValue}
      />
      <ControlDrawerUnit
        type="numeric"
        name="NUMBER_OF_EDGES"
        value={numEdges}
        min={minMaxValues.NUMBER_OF_EDGES.min}
        max={minMaxValues.NUMBER_OF_EDGES.max}
        description={descriptions.NUMBER_OF_EDGES}
        onChange={(name, value) =>
          handleNumEdgesChange({ target: { name, value } })
        }
        buttonChangeValue={minMaxValues.NUMBER_OF_EDGES.buttonChangeValue}
      />
      <ControlDrawerUnit
        type="numeric"
        name="OPTIMAL_DISTANCE"
        value={optimalDistance}
        min={minMaxValues.OPTIMAL_DISTANCE.min}
        max={minMaxValues.OPTIMAL_DISTANCE.max}
        description={descriptions.OPTIMAL_DISTANCE}
        onChange={(name, value) => setOptimalDistance(value)}
        buttonChangeValue={minMaxValues.OPTIMAL_DISTANCE.buttonChangeValue}
      />
      <ControlDrawerUnit
        type="numeric"
        name="MAX_ITERATIONS"
        value={maxIterations}
        min={minMaxValues.MAX_ITERATIONS.min}
        max={minMaxValues.MAX_ITERATIONS.max}
        description={descriptions.MAX_ITERATIONS}
        onChange={(name, value) => setMaxIterations(value)}
        buttonChangeValue={minMaxValues.MAX_ITERATIONS.buttonChangeValue}
      />
      <ControlDrawerUnit
        type="numeric"
        name="NODE_SIZE"
        value={nodeSize}
        min={minMaxValues.NODE_SIZE.min}
        max={minMaxValues.NODE_SIZE.max}
        description={descriptions.NODE_SIZE}
        onChange={(name, value) => setNodeSize(value)}
        buttonChangeValue={minMaxValues.NODE_SIZE.buttonChangeValue}
      />
      <ControlDrawerUnit
        type="dropdown"
        name="CONNECTIVITY"
        value={connectivity}
        options={["random", "tree", "complete"]}
        description="Sets the connectivity of the graph."
        onChange={(name, value) =>
          handleConnectivityChange({ target: { name, value } })
        }
      />
      <ButtonControl
        onClick={fetchAndGenerateGraph}
        label="Generate External Graph"
      />
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
