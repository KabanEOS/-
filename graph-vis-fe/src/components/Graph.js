import React from "react";

const Graph = ({ nodes, edges, currentNode, visitedNodes }) => {
  const nodeSize = Math.max(10, Math.min(30, 1000 / nodes.length));

  const getBezierPath = (sourceX, sourceY, targetX, targetY) => {
    const controlX1 = sourceX;
    const controlY1 = (sourceY + targetY) / 2;
    const controlX2 = targetX;
    const controlY2 = (sourceY + targetY) / 2;
    return `M ${sourceX},${sourceY} C ${controlX1},${controlY1} ${controlX2},${controlY2} ${targetX},${targetY}`;
  };

  return (
    <svg width="100%" height="100%">
      {edges.map((edge, index) => {
        const source = nodes.find((node) => node.id === edge.source);
        const target = nodes.find((node) => node.id === edge.target);
        return (
          <path
            key={index}
            d={getBezierPath(source.x, source.y, target.x, target.y)}
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        );
      })}
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
