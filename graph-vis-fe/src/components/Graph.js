import React from "react";

const Graph = ({ nodes, edges, currentNode, visitedNodes }) => {
  // Adjust node size based on the number of nodes and viewport width
  const nodeSize = Math.max(10, Math.min(30, 1000 / nodes.length));

  return (
    <svg width="100%" height="100%">
      {edges.map((edge, index) => (
        <line
          key={index}
          x1={nodes.find((node) => node.id === edge.source).x}
          y1={nodes.find((node) => node.id === edge.source).y}
          x2={nodes.find((node) => node.id === edge.target).x}
          y2={nodes.find((node) => node.id === edge.target).y}
          stroke="black"
          strokeWidth="2"
        />
      ))}
      {nodes.map((node) => (
        <circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={nodeSize}
          fill={
            currentNode === node.id
              ? "red"
              : visitedNodes.includes(node.id)
                ? "green"
                : "blue"
          }
        />
      ))}
    </svg>
  );
};

export default Graph;
