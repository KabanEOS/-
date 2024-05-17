import React, { useState } from "react";
import Traversal from "./components/Traversal";

const App = () => {
  const [nodes, setNodes] = useState([
    { id: 1, x: 600, y: 50 },
    { id: 2, x: 300, y: 150 },
    { id: 3, x: 900, y: 150 },
    { id: 4, x: 150, y: 250 },
    { id: 5, x: 450, y: 250 },
    { id: 6, x: 750, y: 250 },
    { id: 7, x: 1050, y: 250 },
    { id: 8, x: 100, y: 350 },
    { id: 9, x: 200, y: 350 },
    { id: 10, x: 400, y: 350 },
    { id: 11, x: 500, y: 350 },
    { id: 12, x: 700, y: 350 },
    { id: 13, x: 800, y: 350 },
    { id: 14, x: 1000, y: 350 },
    { id: 15, x: 1100, y: 350 },
  ]);

  const [edges, setEdges] = useState([
    { source: 1, target: 2 },
    { source: 1, target: 3 },
    { source: 2, target: 4 },
    { source: 2, target: 5 },
    { source: 3, target: 6 },
    { source: 3, target: 7 },
    { source: 4, target: 8 },
    { source: 4, target: 9 },
    { source: 5, target: 10 },
    { source: 5, target: 11 },
    { source: 6, target: 12 },
    { source: 6, target: 13 },
    { source: 7, target: 14 },
    { source: 7, target: 15 },
  ]);

  return (
    <div className="App">
      <h1>Graph Visualizer</h1>
      <Traversal nodes={nodes} edges={edges} />
    </div>
  );
};

export default App;
