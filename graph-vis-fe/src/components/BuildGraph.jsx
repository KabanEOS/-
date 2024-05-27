import React from "react";
import PropTypes from "prop-types";
import "./../styles/buildGraph.styles.scss";

const BuildGraph = ({
  nodes,
  edges,
  transform,
  nodeSize,
  svgWidth,
  svgHeight,
}) => {
  if (!nodes || !edges) {
    return null;
  }

  console.log("Nodes - from BuildGraph: ", nodes);
  console.log("Edges - from BuildGraph: ", edges);

  const minX = Math.min(...nodes.map((node) => node.x));
  const maxX = Math.max(...nodes.map((node) => node.x));
  const minY = Math.min(...nodes.map((node) => node.y));
  const maxY = Math.max(...nodes.map((node) => node.y));
  const graphWidth = maxX - minX;
  const graphHeight = maxY - minY;

  // Calculate the center of the graph
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  console.log("Graph center: ", { centerX, centerY });

  // Calculate positions for the dots in the middle of the edges of the red rectangle
  const midTopX = centerX * transform.scale + transform.translateX;
  const midTopY = minY * transform.scale + transform.translateY;
  const midBottomX = centerX * transform.scale + transform.translateX;
  const midBottomY = maxY * transform.scale + transform.translateY;
  const midLeftX = minX * transform.scale + transform.translateX;
  const midLeftY = centerY * transform.scale + transform.translateY;
  const midRightX = maxX * transform.scale + transform.translateX;
  const midRightY = centerY * transform.scale + transform.translateY;

  console.log("Rendering Graph");
  console.log("Graph center: ", { centerX, centerY });

  return (
    <svg
      className="graph"
      style={{ width: "100%", height: "100%" }}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`} // Use the passed SVG dimensions
    >
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
            x1={sourceNode.x * transform.scale + transform.translateX}
            y1={sourceNode.y * transform.scale + transform.translateY}
            x2={targetNode.x * transform.scale + transform.translateX}
            y2={targetNode.y * transform.scale + transform.translateY}
            className="edge"
          />
        );
      })}
      {nodes.map((node) => (
        <circle
          key={node.id}
          cx={node.x * transform.scale + transform.translateX}
          cy={node.y * transform.scale + transform.translateY}
          r={nodeSize * transform.scale} // Adjust radius based on scale
          className="node"
        />
      ))}
      {/* Red rectangle */}
      <rect
        x={minX * transform.scale + transform.translateX - nodeSize / 2}
        y={minY * transform.scale + transform.translateY - nodeSize / 2}
        width={graphWidth * transform.scale + nodeSize}
        height={graphHeight * transform.scale + nodeSize}
        stroke="red"
        fill="none"
        strokeWidth="2"
      />
      {/* Dots in the middle of the edges of the red rectangle */}
      <circle cx={midTopX} cy={midTopY} r={5} fill="red" />
      <circle cx={midBottomX} cy={midBottomY} r={5} fill="red" />
      <circle cx={midLeftX} cy={midLeftY} r={5} fill="red" />
      <circle cx={midRightX} cy={midRightY} r={5} fill="red" />
      {/* Yellow dot at the graph center */}
      <circle
        cx={centerX * transform.scale + transform.translateX}
        cy={centerY * transform.scale + transform.translateY}
        r={10}
        fill="yellow"
      />
      {/* Blue cross lines */}
      <line
        x1="0"
        y1={svgHeight / 2}
        x2={svgWidth}
        y2={svgHeight / 2}
        stroke="blue"
        strokeWidth="2"
      />
      <line
        x1={svgWidth / 2}
        y1="0"
        x2={svgWidth / 2}
        y2={svgHeight}
        stroke="blue"
        strokeWidth="2"
      />
      {/* White dot at the center of the SVG */}
      <circle cx={svgWidth / 2} cy={svgHeight / 2} r={20} fill="white" />
    </svg>
  );
};

BuildGraph.propTypes = {
  nodes: PropTypes.array.isRequired,
  edges: PropTypes.array.isRequired,
  transform: PropTypes.shape({
    scale: PropTypes.number.isRequired,
    translateX: PropTypes.number.isRequired,
    translateY: PropTypes.number.isRequired,
  }).isRequired,
  nodeSize: PropTypes.number.isRequired,
  svgWidth: PropTypes.number.isRequired,
  svgHeight: PropTypes.number.isRequired,
};

export default BuildGraph;
