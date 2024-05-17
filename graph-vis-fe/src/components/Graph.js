import React, { useState } from "react";
import Node from "./Node";
import Edge from "./Edge";

const Graph = ({
  nodes,
  edges,
  setNodes,
  setEdges,
  currentNode,
  visitedNodes,
}) => {
  const [newNodeId, setNewNodeId] = useState(nodes.length + 1);

  const addNode = (x, y) => {
    setNodes([...nodes, { id: newNodeId, x, y }]);
    setNewNodeId(newNodeId + 1);
  };

  const addEdge = (source, target) => {
    setEdges([...edges, { source, target }]);
  };

  const handleSvgClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    addNode(x, y);
  };

  return (
    <svg width="1600" height="1200" onClick={handleSvgClick}>
      {edges.map((edge, index) => (
        <Edge key={index} edge={edge} nodes={nodes} />
      ))}
      {nodes.map((node) => (
        <Node
          key={node.id}
          node={node}
          currentNode={currentNode}
          visitedNodes={visitedNodes}
        />
      ))}
    </svg>
  );
};

export default Graph;
