import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./../styles/spinningGraphs.styles.scss";
import Particles from "./Particles.jsx";

const SpinningGraph = ({ nodes }) => {
  const [positions, setPositions] = useState([]);
  const radius = 180;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2.7;

  useEffect(() => {
    const newPositions = nodes.map((node, index) => {
      const angle = (index / nodes.length) * 2 * Math.PI;
      const cx = centerX + radius * Math.cos(angle);
      const cy = centerY + radius * Math.sin(angle);
      return { cx, cy, node };
    });

    setPositions(newPositions);
  }, [nodes, centerX, centerY, radius]);

  return (
    <div className="spinning-graph-container">
      <Particles positions={positions} />
    </div>
  );
};

export default SpinningGraph;
