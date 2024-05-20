import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./../styles/spinningGraphs.styles.scss";

const SpinningGraph = ({ nodes }) => {
  const radius = 180; // Adjust the radius as needed
  const centerX = window.innerWidth / 2; // Center x
  const centerY = window.innerHeight / 2.7; // Center y
  const minNodeSize = 40;
  const maxNodeSize = 60;
  const svgRef = useRef(null);
  const spinTimeRef = useRef(50000);
  const positionsRef = useRef(new Array(nodes.length).fill(null));

  const minOscillationSize = 30;
  const maxOscillationSize = 30;

  const getRandomOffset = (index, time, distanceFromCenter) => {
    const oscillationRange = maxOscillationSize - minOscillationSize;
    const distanceFactor = distanceFromCenter / halfScreenDiagonal;
    const oscillationSize =
      minOscillationSize + oscillationRange * distanceFactor;
    const offsetX = Math.sin(time / 2000 + index) * oscillationSize;
    const offsetY = Math.cos(time / 2000 + index) * oscillationSize;
    return { offsetX, offsetY };
  };

  const animate = () => {
    const time = Date.now();
    const svg = svgRef.current;

    nodes.forEach((node, index) => {
      const angle =
        (index / nodes.length) * 2 * Math.PI + time / spinTimeRef.current;
      const { offsetX, offsetY } = getRandomOffset(
        index,
        time,
        getDistanceFromCenter(
          centerX + radius * Math.cos(angle),
          centerY + radius * Math.sin(angle)
        )
      );
      const cx = centerX + radius * Math.cos(angle) + offsetX;
      const cy = centerY + radius * Math.sin(angle) + offsetY;
      const nodeSize =
        minNodeSize +
        (maxNodeSize - minNodeSize) *
          (0.5 + 0.5 * Math.cos(angle - Math.PI / 2));

      positionsRef.current[index] = { cx, cy, nodeSize };

      const circle = svg.querySelector(`#node-${index}`);
      const foreignObject = svg.querySelector(`#foreign-${index}`);
      circle.setAttribute("cx", cx);
      circle.setAttribute("cy", cy);
      circle.setAttribute("r", nodeSize);
      foreignObject.setAttribute("x", cx - nodeSize);
      foreignObject.setAttribute("y", cy + nodeSize / 2);
      foreignObject.setAttribute("width", nodeSize * 2);
      foreignObject.setAttribute("height", nodeSize);
    });

    nodes.forEach((sourceNode, sourceIndex) => {
      nodes.forEach((targetNode, targetIndex) => {
        if (sourceIndex < targetIndex) {
          const sourceCircle = svg.querySelector(`#node-${sourceIndex}`);
          const targetCircle = svg.querySelector(`#node-${targetIndex}`);
          const edge = svg.querySelector(`#edge-${sourceIndex}-${targetIndex}`);
          edge.setAttribute("x1", sourceCircle.getAttribute("cx"));
          edge.setAttribute("y1", sourceCircle.getAttribute("cy"));
          edge.setAttribute("x2", targetCircle.getAttribute("cx"));
          edge.setAttribute("y2", targetCircle.getAttribute("cy"));
        }
      });
    });

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    animate();
  }, [nodes, minOscillationSize, maxOscillationSize]);

  const getDistanceFromCenter = (x, y) => {
    return Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
  };

  const screenDiagonal = Math.sqrt(
    window.innerWidth ** 2 + window.innerHeight ** 2
  );
  const halfScreenDiagonal = screenDiagonal / 2;

  return (
    <div className="spinning-graph">
      <svg ref={svgRef} width="100%" height="100%">
        {nodes.map((sourceNode, sourceIndex) => {
          return nodes.map((targetNode, targetIndex) => {
            if (sourceIndex < targetIndex) {
              return (
                <line
                  key={`edge-${sourceIndex}-${targetIndex}`}
                  id={`edge-${sourceIndex}-${targetIndex}`}
                  stroke="white"
                  strokeWidth="5"
                />
              );
            }
            return null;
          });
        })}
        {nodes.map((node, index) => {
          const position = positionsRef.current[index] || {
            cx: centerX,
            cy: centerY,
            nodeSize: minNodeSize,
          };
          return (
            <Link to={node.link} key={node.id}>
              <g className="node">
                <circle
                  id={`node-${index}`}
                  cx={position.cx}
                  cy={position.cy}
                  r={position.nodeSize}
                />
                <foreignObject
                  id={`foreign-${index}`}
                  style={{ transform: `translateY(-${maxNodeSize / 1.5}px)` }}
                  width={maxNodeSize}
                  height={maxNodeSize}
                  className="node-text-foreign"
                  x={position.cx - position.nodeSize}
                  y={position.cy + position.nodeSize / 2}
                >
                  <>
                    <div className="node-text">{node.name.split(" ")[0]}</div>
                    <div className="node-text">{node.name.split(" ")[1]}</div>
                  </>
                </foreignObject>
              </g>
            </Link>
          );
        })}
      </svg>
    </div>
  );
};

export default SpinningGraph;
