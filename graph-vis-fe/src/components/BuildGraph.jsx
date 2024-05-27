import React from "react";
import PropTypes from "prop-types";
import "./../styles/buildGraph.styles.scss";

const BuildGraph = ({ nodes, edges }) => {
  if (!nodes || !edges) {
    return null;
  }
  console.log("Nodes - from BuildGraph: ", nodes);
  console.log("Edges - from BuildGraph: ", edges);

  return (
    <svg className="graph" style={{ width: "100%", height: "100%" }}>
      {edges.map((edge, index) => {
        const sourceNode = nodes.find((node) => node.id === edge.source);
        const targetNode = nodes.find((node) => node.id === edge.target);
        if (
          !sourceNode ||
          !targetNode ||
          isNaN(sourceNode.x) ||
          isNaN(sourceNode.y) ||
          isNaN(targetNode.x) ||
          isNaN(targetNode.y)
        ) {
          return null;
        }

        return (
          <line
            key={index}
            x1={sourceNode.x}
            y1={sourceNode.y}
            x2={targetNode.x}
            y2={targetNode.y}
            className="edge"
          />
        );
      })}
      {nodes.map((node) => (
        <circle key={node.id} cx={node.x} cy={node.y} className="node" />
      ))}
    </svg>
  );
};

BuildGraph.propTypes = {
  nodes: PropTypes.array.isRequired,
  edges: PropTypes.array.isRequired,
};

export default BuildGraph;
