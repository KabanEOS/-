import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./../styles/spinningGraphs.styles.scss";
import Particles from "./Particles.jsx";

const SpinningGraph = ({ nodes }) => {
  const [positions, setPositions] = useState([]);
  const radius = 180;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2.7;
  const minNodeSize = 40;
  const maxNodeSize = 60;
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    const newPositions = nodes.map((node, index) => {
      const angle = (index / nodes.length) * 2 * Math.PI;
      const cx = centerX + radius * Math.cos(angle);
      const cy = centerY + radius * Math.sin(angle);
      const nodeSize =
        minNodeSize +
        (maxNodeSize - minNodeSize) *
          (0.5 + 0.5 * Math.cos(angle - Math.PI / 2));
      return { cx, cy, nodeSize };
    });

    setPositions(newPositions);
  }, [nodes, centerX, centerY, radius, minNodeSize, maxNodeSize]);

  return (
    <div className="spinning-graph-container">
      <Particles positions={positions} />
      <div className="spinning-graph">
        <svg ref={svgRef} width="100%" height="100%" className="rotating">
          {nodes.map((node, index) => (
            <Link to={node.link} key={node.id}>
              <g className="node">
                <circle
                  id={`node-${index}`}
                  cx={positions[index]?.cx}
                  cy={positions[index]?.cy}
                  r={positions[index]?.nodeSize}
                  fill="blue"
                />
                <foreignObject
                  id={`foreign-${index}`}
                  x={positions[index]?.cx - positions[index]?.nodeSize}
                  y={positions[index]?.cy + positions[index]?.nodeSize / 2}
                  width={positions[index]?.nodeSize * 2}
                  height={positions[index]?.nodeSize}
                  className="node-text-foreign"
                >
                  <div className="node-text">
                    <div>{node.name.split(" ")[0]}</div>
                    <div>{node.name.split(" ")[1]}</div>
                  </div>
                </foreignObject>
              </g>
            </Link>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default SpinningGraph;
