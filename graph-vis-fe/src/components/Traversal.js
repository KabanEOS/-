import React, { useState, useEffect } from 'react';
import { getBfsTraversal, getDfsTraversal } from '../services/api';
import Graph from './Graph'; // Ensure Graph is imported

const Traversal = ({ nodes, edges }) => {
  const [snapshots, setSnapshots] = useState([]);
  const [currentSnapshot, setCurrentSnapshot] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [speed, setSpeed] = useState(1000); // Default speed
  const [traversalName, setTraversalName] = useState('BFS');

  const fetchBfsTraversal = async () => {
    const traversal = await getBfsTraversal({ nodes, edges });
    setSnapshots(traversal);
    setCurrentSnapshot(0);
    setTraversalName('BFS');
  };

  const fetchDfsTraversal = async () => {
    const traversal = await getDfsTraversal({ nodes, edges });
    setSnapshots(traversal);
    setCurrentSnapshot(0);
    setTraversalName('DFS');
  };

  useEffect(() => {
    if (snapshots.length > 0) {
      const id = setInterval(() => {
        setCurrentSnapshot((prev) => (prev < snapshots.length - 1 ? prev + 1 : prev));
      }, speed);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [snapshots, speed]);

  const currentNodes = snapshots.length > 0 ? snapshots[currentSnapshot].nodes : nodes;
  const currentSnapshotData = snapshots.length > 0 ? snapshots[currentSnapshot] : { current_node: null, visited_nodes: [] };

  return (
    <div>
      <button onClick={fetchBfsTraversal}>Run BFS</button>
      <button onClick={fetchDfsTraversal}>Run DFS</button>
      <input
        type="range"
        min="100"
        max="2000"
        step="100"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
      />
      <p>Traversal: {traversalName}</p>
      <Graph
        nodes={currentNodes}
        edges={edges}
        setNodes={() => {}}
        setEdges={() => {}}
        currentNode={currentSnapshotData.current_node}
        visitedNodes={currentSnapshotData.visited_nodes}
      />
    </div>
  );
};

export default Traversal;
