import React, { useState } from "react";
import "../../styles/learnGraph.styles.scss";

const LearnGraphFormats = ({ graphFormats }) => {
  const [hoveredNode, setHoveredNode] = useState(null);
  console.log("🚀 ~ LearnGraphFormats ~ hoveredNode:", hoveredNode);
  const matrixSize = graphFormats.adjacency_matrix
    ? graphFormats.adjacency_matrix.length
    : 0;

  const handleMouseEnter = (node) => {
    setHoveredNode(node.toString());
  };

  const handleMouseLeave = () => {
    setHoveredNode(null);
  };

  const isNodeHovered = (node) => {
    return node.toString() === hoveredNode;
  };

  const highlightLine = (line, node) => {
    return node !== null && new RegExp(`\\b${node}\\b`).test(line);
  };

  return (
    <div className="graph-formats">
      <h3>Graph Formats</h3>
      <div className="format-section">
        <h4>Adjacency List</h4>
        <div className="grid-container">
          {graphFormats.adjacency_list &&
            Object.entries(graphFormats.adjacency_list).map(
              ([node, edges], index) => (
                <div
                  key={index}
                  className={`grid-item ${isNodeHovered(node) ? "hovered" : ""}`}
                  onMouseEnter={() => handleMouseEnter(node)}
                  onMouseLeave={handleMouseLeave}
                >
                  <strong>{Number(node)}:</strong> {edges.join(", ")}
                </div>
              )
            )}
        </div>
      </div>
      <div className="format-section">
        <h4>Adjacency Matrix</h4>
        <div className="matrix-container">
          {/* Heading Row */}
          <div className="matrix-row">
            <div className="matrix-header-cell"></div>
            {Array.from({ length: matrixSize }, (_, index) => (
              <div key={index} className="matrix-header-cell">
                <div className="matrix-head-cell-container">{index}</div>
              </div>
            ))}
          </div>
          {graphFormats.adjacency_matrix &&
            graphFormats.adjacency_matrix.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`matrix-row ${isNodeHovered(rowIndex) ? "hovered" : ""}`}
                onMouseEnter={() => handleMouseEnter(rowIndex)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="matrix-row-id">{rowIndex}</div>
                {row.map((cell, cellIndex) => (
                  <div key={cellIndex} className={`matrix-cell`}>
                    {cell}
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
      <div className="format-section">
        <h4>DOT Format</h4>
        <pre
          className={
            highlightLine(graphFormats.dot, hoveredNode) ? "hovered" : ""
          }
          onMouseEnter={() => handleMouseEnter(hoveredNode)}
          onMouseLeave={handleMouseLeave}
        >
          {graphFormats.dot}
        </pre>
      </div>
      <div className="format-section">
        <h4>GML Format</h4>
        <pre
          className={
            highlightLine(graphFormats.gml, hoveredNode) ? "hovered" : ""
          }
          onMouseEnter={() => handleMouseEnter(hoveredNode)}
          onMouseLeave={handleMouseLeave}
        >
          {graphFormats.gml}
        </pre>
      </div>
      <div className="format-section">
        <h4>GraphML Format</h4>
        <pre
          className={
            highlightLine(graphFormats.graphml, hoveredNode) ? "hovered" : ""
          }
          onMouseEnter={() => handleMouseEnter(hoveredNode)}
          onMouseLeave={handleMouseLeave}
        >
          {graphFormats.graphml}
        </pre>
      </div>
    </div>
  );
};

export default LearnGraphFormats;
