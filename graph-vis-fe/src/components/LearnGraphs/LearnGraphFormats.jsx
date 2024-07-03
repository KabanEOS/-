import React, { useState, useMemo, useCallback } from "react";
import "../../styles/learnGraph.styles.scss";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";

const LearnGraphFormats = ({ graphFormats }) => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredConnection, setHoveredConnection] = useState(null);
  const [openSections, setOpenSections] = useState({
    adjacencyList: true,
    adjacencyMatrix: true,
    dotFormat: true,
    gmlFormat: true,
    graphmlFormat: true,
  });

  const matrixSize = graphFormats.adjacency_matrix
    ? graphFormats.adjacency_matrix.length
    : 0;

  const handleMouseEnterNode = (node) => {
    setHoveredNode(node.toString());
    setHoveredConnection(null);
  };

  const handleMouseEnterConnection = (connection) => {
    setHoveredConnection({
      source: connection.source.toString(),
      target: connection.target.toString(),
    });
    setHoveredNode(null);
  };

  const handleMouseLeave = () => {
    setHoveredNode(null);
    setHoveredConnection(null);
  };

  const isNodeHovered = useCallback(
    (node) => node.toString() === hoveredNode,
    [hoveredNode]
  );

  const isConnectionHovered = useCallback(
    (connection) =>
      hoveredConnection &&
      hoveredConnection.source === connection.source.toString() &&
      hoveredConnection.target === connection.target.toString(),
    [hoveredConnection]
  );

  const highlightLine = (line, node, connection) => {
    if (node !== null) {
      return new RegExp(`\\b${node}\\b`).test(line);
    }
    if (connection !== null) {
      return (
        new RegExp(`\\b${connection.source}\\b`).test(line) &&
        new RegExp(`\\b${connection.target}\\b`).test(line)
      );
    }
    return false;
  };

  const processText = useCallback((text) => {
    if (!text) return [];
    return text.split("\n").map((line) => line.trim());
  }, []);

  const highlightText = (lines, node, connection) => {
    return lines.map((line) => ({
      line,
      isHighlighted: highlightLine(line, node, connection),
    }));
  };

  const dotLines = useMemo(
    () =>
      highlightText(
        processText(graphFormats.dot),
        hoveredNode,
        hoveredConnection
      ),
    [
      graphFormats.dot,
      hoveredNode,
      hoveredConnection,
      processText,
      highlightText,
    ]
  );

  const gmlLines = useMemo(
    () =>
      highlightText(
        processText(graphFormats.gml),
        hoveredNode,
        hoveredConnection
      ),
    [
      graphFormats.gml,
      hoveredNode,
      hoveredConnection,
      processText,
      highlightText,
    ]
  );

  const graphmlLines = useMemo(
    () =>
      highlightText(
        processText(graphFormats.graphml),
        hoveredNode,
        hoveredConnection
      ),
    [
      graphFormats.graphml,
      hoveredNode,
      hoveredConnection,
      processText,
      highlightText,
    ]
  );

  const handleMatrixMouseEnter = useCallback((rowIndex, cellIndex) => {
    handleMouseEnterConnection({
      source: rowIndex.toString(),
      target: cellIndex.toString(),
    });
  }, []);

  const handleMouseEnterNodeOrConnection = (line) => {
    const connection = parseGmlLine(line) || parseGraphmlLine(line);
    if (connection) {
      handleMouseEnterConnection(connection);
    } else {
      const match = line.match(/id\s*=\s*"(\d+)"/) || line.match(/id\s+(\d+)/);
      if (match) {
        handleMouseEnterNode(match[1]);
      }
    }
  };

  const toggleSection = (section) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className="graph-formats">
      <h3>Graph Formats</h3>

      <div className="format-section">
        <h4 onClick={() => toggleSection("adjacencyList")}>
          Adjacency List{" "}
          {openSections.adjacencyList ? <FaChevronUp /> : <FaChevronDown />}
        </h4>
        <CSSTransition
          in={openSections.adjacencyList}
          timeout={300}
          classNames="slide"
          unmountOnExit
        >
          <div className="grid-container">
            {graphFormats.adjacency_list &&
              Object.entries(graphFormats.adjacency_list).map(
                ([node, edges], index) => (
                  <div
                    key={index}
                    className={`grid-item ${isNodeHovered(node) ? "hovered" : ""}`}
                    onMouseEnter={() => handleMouseEnterNode(node)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <strong>{Number(node)}:</strong>{" "}
                    {edges.map((edge) => (
                      <span
                        key={edge}
                        className={`edge-item ${isConnectionHovered({ source: node, target: edge }) ? "hovered" : ""}`}
                        onMouseEnter={() =>
                          handleMouseEnterConnection({
                            source: node,
                            target: edge,
                          })
                        }
                        onMouseLeave={handleMouseLeave}
                      >
                        {edge},{" "}
                      </span>
                    ))}
                  </div>
                )
              )}
          </div>
        </CSSTransition>
      </div>

      <div className="format-section">
        <h4 onClick={() => toggleSection("adjacencyMatrix")}>
          Adjacency Matrix{" "}
          {openSections.adjacencyMatrix ? <FaChevronUp /> : <FaChevronDown />}
        </h4>
        <CSSTransition
          in={openSections.adjacencyMatrix}
          timeout={300}
          classNames="slide"
          unmountOnExit
        >
          <div className="matrix-container">
            <div className="matrix-row">
              <div className="matrix-header-cell"></div>
              {Array.from({ length: matrixSize }, (_, index) => (
                <div
                  key={index}
                  className="matrix-header-cell"
                  onMouseEnter={() => handleMouseEnterNode(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="matrix-head-cell-container">{index}</div>
                </div>
              ))}
            </div>
            {graphFormats.adjacency_matrix &&
              graphFormats.adjacency_matrix.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`matrix-row ${isNodeHovered(rowIndex) ? "hovered" : ""}`}
                  onMouseEnter={() => handleMouseEnterNode(rowIndex)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="matrix-row-id">{rowIndex}</div>
                  {row.map((cell, cellIndex) => (
                    <div
                      key={cellIndex}
                      className={`matrix-cell ${isConnectionHovered({ source: rowIndex, target: cellIndex }) ? "hovered" : ""}`}
                      onMouseEnter={() =>
                        handleMatrixMouseEnter(rowIndex, cellIndex)
                      }
                      onMouseLeave={handleMouseLeave}
                    >
                      {cell}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </CSSTransition>
      </div>

      <div className="format-section">
        <h4 onClick={() => toggleSection("dotFormat")}>
          DOT Format{" "}
          {openSections.dotFormat ? <FaChevronUp /> : <FaChevronDown />}
        </h4>
        <CSSTransition
          in={openSections.dotFormat}
          timeout={300}
          classNames="slide"
          unmountOnExit
        >
          <pre>
            {dotLines.map(({ line, isHighlighted }, index) => (
              <span
                key={index}
                className={isHighlighted ? "highlight" : ""}
                onMouseEnter={() =>
                  handleMouseEnterConnection(parseDotLine(line))
                }
                onMouseLeave={handleMouseLeave}
              >
                {line}
                <br />
              </span>
            ))}
          </pre>
        </CSSTransition>
      </div>

      <div className="format-section">
        <h4 onClick={() => toggleSection("gmlFormat")}>
          GML Format{" "}
          {openSections.gmlFormat ? <FaChevronUp /> : <FaChevronDown />}
        </h4>
        <CSSTransition
          in={openSections.gmlFormat}
          timeout={300}
          classNames="slide"
          unmountOnExit
        >
          <pre>
            {gmlLines.map(({ line, isHighlighted }, index) => (
              <span
                key={index}
                className={isHighlighted ? "highlight" : ""}
                onMouseEnter={() => handleMouseEnterNodeOrConnection(line)}
                onMouseLeave={handleMouseLeave}
              >
                {line}
                <br />
              </span>
            ))}
          </pre>
        </CSSTransition>
      </div>

      <div className="format-section">
        <h4 onClick={() => toggleSection("graphmlFormat")}>
          GraphML Format{" "}
          {openSections.graphmlFormat ? <FaChevronUp /> : <FaChevronDown />}
        </h4>
        <CSSTransition
          in={openSections.graphmlFormat}
          timeout={300}
          classNames="slide"
          unmountOnExit
        >
          <pre>
            {graphmlLines.map(({ line, isHighlighted }, index) => (
              <span
                key={index}
                className={isHighlighted ? "highlight" : ""}
                onMouseEnter={() => handleMouseEnterNodeOrConnection(line)}
                onMouseLeave={handleMouseLeave}
              >
                {line}
                <br />
              </span>
            ))}
          </pre>
        </CSSTransition>
      </div>
    </div>
  );
};

const parseDotLine = (line) => {
  const match = line.match(/(\d+)\s*--\s*(\d+)/);
  return match ? { source: match[1], target: match[2] } : null;
};

const parseGmlLine = (line) => {
  const nodeMatch = line.match(/id (\d+)/);
  if (nodeMatch) {
    return { node: nodeMatch[1] };
  }
  const edgeMatch = line.match(/source (\d+)\s*target (\d+)/);
  return edgeMatch ? { source: edgeMatch[1], target: edgeMatch[2] } : null;
};

const parseGraphmlLine = (line) => {
  const match = line.match(/source="(\d+)"\s*target="(\d+)"/);
  return match ? { source: match[1], target: match[2] } : null;
};

export default LearnGraphFormats;
