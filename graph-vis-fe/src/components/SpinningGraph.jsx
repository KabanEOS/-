import React, { useEffect, useState } from "react";
import "./../styles/spinningGraphs.styles.scss";
import Particles from "./Particles.jsx";
import ControlDrawer from "./ControlDrawer/ControlDrawer.jsx";
import Shadow from "./Shadow.jsx";

const SpinningGraph = ({ nodes }) => {
  const [positions, setPositions] = useState([]);
  const radius = 180;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2.7;

  const defaultControls = {
    NUMBER_OF_PARTICLES: 380,
    PARTICLE_COLOR: "#ffffff",
    NODE_PARTICLE_COLOR: "#ff0000",
    PARTICLE_SIZE_MIN: 2,
    PARTICLE_SIZE_MAX: 5,
    NODE_PARTICLE_SIZE_MIN: 40,
    NODE_PARTICLE_SIZE_MAX: 60,
    PARTICLE_SPEED_MIN: -0.2,
    PARTICLE_SPEED_MAX: 0.2,
    CONNECTION_DISTANCE: (window.innerWidth / 7) * (window.innerHeight / 7),
    MIN_SPEED: -0.2,
    MAX_SPEED: 0.4,
    SELF_MOVEMENT: 0.01,
    SNAP_DISTANCE: 100,
    SLOW_DOWN_FACTOR: 0.98,
    ATTRACTION_FACTOR: 0.01,
    MOUSE_EFFECT: 2,
  };

  const [controls, setControls] = useState(() => {
    const savedControls = localStorage.getItem("particleControls");
    return savedControls ? JSON.parse(savedControls) : defaultControls;
  });

  useEffect(() => {
    localStorage.setItem("particleControls", JSON.stringify(controls));
  }, [controls]);

  const minMaxValues = {
    NUMBER_OF_PARTICLES: { min: 100, max: 1000 },
    PARTICLE_SIZE_MIN: { min: 1, max: 10 },
    PARTICLE_SIZE_MAX: { min: 1, max: 10 },
    NODE_PARTICLE_SIZE_MIN: { min: 20, max: 60 },
    NODE_PARTICLE_SIZE_MAX: { min: 60, max: 100 },
    PARTICLE_SPEED_MIN: { min: -2, max: 0 },
    PARTICLE_SPEED_MAX: { min: 0, max: 2 },
    CONNECTION_DISTANCE: { min: 50, max: 500 },
    MIN_SPEED: { min: -2, max: 0 },
    MAX_SPEED: { min: 0, max: 2 },
    SELF_MOVEMENT: { min: 0, max: 0.1 },
    SNAP_DISTANCE: { min: 50, max: 300 },
    SLOW_DOWN_FACTOR: { min: 0.5, max: 1 },
    ATTRACTION_FACTOR: { min: 0.01, max: 0.1 },
    MOUSE_EFFECT: { min: -10, max: 10 },
  };

  const updateControl = (name, value) => {
    setControls((prev) => ({ ...prev, [name]: value }));
  };

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
      <ControlDrawer
        controls={controls}
        minMaxValues={minMaxValues}
        onChange={updateControl}
      />
      <Particles positions={positions} controls={controls} />
    </div>
  );
};

export default SpinningGraph;
