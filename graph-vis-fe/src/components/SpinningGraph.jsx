import React, { useEffect, useState } from "react";
import "./../styles/spinningGraphs.styles.scss";
import Particles from "./Particles.jsx";
import ControlDrawer from "./ControlDrawer/ControlDrawer.jsx";
import ControlDrawerUnit from "./ControlDrawer/ControlDrawerUnit.jsx";

const SpinningGraph = ({ nodes }) => {
  const [positions, setPositions] = useState([]);
  const radius = 180;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2.7;

  const defaultControls = {
    MOUSE_EFFECT: 2,
    CONNECTION_DISTANCE: (window.innerWidth / 7) * (window.innerHeight / 7),
    NUMBER_OF_PARTICLES: 380,
    SELF_MOVEMENT: 0.01,
    SNAP_DISTANCE: 100,
    PARTICLE_SIZE_MIN: 2,
    PARTICLE_SIZE_MAX: 5,
    NODE_PARTICLE_SIZE_MIN: 40,
    NODE_PARTICLE_SIZE_MAX: 60,
    PARTICLE_SPEED_MIN: -0.2,
    PARTICLE_SPEED_MAX: 0.2,
    MIN_SPEED: -0.2,
    MAX_SPEED: 0.4,
    SLOW_DOWN_FACTOR: 0.98,
    ATTRACTION_FACTOR: 0.01,
    PARTICLE_COLOR: "#ffffff",
    NODE_PARTICLE_COLOR: "#ff0000",
  };

  const [controls, setControls] = useState(() => {
    const savedControls = localStorage.getItem("particleControls");
    return savedControls ? JSON.parse(savedControls) : defaultControls;
  });

  useEffect(() => {
    if (!localStorage.getItem("particleControls")) {
      localStorage.setItem("particleControls", JSON.stringify(defaultControls));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("particleControls", JSON.stringify(controls));
  }, [controls]);

  const minMaxValues = {
    NUMBER_OF_PARTICLES: { min: 100, max: 1000, buttonChangeValue: 50 },
    PARTICLE_SIZE_MIN: { min: 1, max: 10, buttonChangeValue: 5 },
    PARTICLE_SIZE_MAX: { min: 1, max: 10, buttonChangeValue: 5 },
    NODE_PARTICLE_SIZE_MIN: { min: 20, max: 60, buttonChangeValue: 20 },
    NODE_PARTICLE_SIZE_MAX: { min: 60, max: 100, buttonChangeValue: 20 },
    PARTICLE_SPEED_MIN: { min: -5, max: 5, buttonChangeValue: 0.5 },
    PARTICLE_SPEED_MAX: { min: -5, max: 5, buttonChangeValue: 0.5 },
    CONNECTION_DISTANCE: { min: 50, max: 500, buttonChangeValue: 10 },
    MIN_SPEED: { min: -2, max: 0, buttonChangeValue: 0.1 },
    MAX_SPEED: { min: 0, max: 2, buttonChangeValue: 0.1 },
    SELF_MOVEMENT: { min: 0, max: 0.1, buttonChangeValue: 0.01 },
    SNAP_DISTANCE: { min: 50, max: 300, buttonChangeValue: 1 },
    SLOW_DOWN_FACTOR: { min: -1, max: 1, buttonChangeValue: 0.01 },
    ATTRACTION_FACTOR: { min: -1, max: 1, buttonChangeValue: 0.01 },
    MOUSE_EFFECT: { min: -10, max: 10, buttonChangeValue: 0.1 },
  };

  const descriptions = {
    NUMBER_OF_PARTICLES: "Controls the number of particles in the canvas.",
    MOUSE_EFFECT: "Adjusts how particles react to the mouse.",
    SNAP_DISTANCE: "Distance at which particles snap to the mouse.",
    PARTICLE_SIZE_MIN: "Sets the minimum size of particles.",
    PARTICLE_SIZE_MAX: "Sets the maximum size of particles.",
    NODE_PARTICLE_SIZE_MIN: "Sets the minimum size of node particles.",
    CONNECTION_DISTANCE:
      "Determines the distance within which particles connect.",
    MIN_SPEED: "Sets the minimum speed of particles.",
    MAX_SPEED: "Sets the maximum speed of particles.",
    SELF_MOVEMENT: "Controls the self-movement factor of particles.",
    SLOW_DOWN_FACTOR: "Factor by which particles slow down.",
    ATTRACTION_FACTOR: "Factor controlling the attraction to the mouse.",
    NODE_PARTICLE_SIZE_MAX: "Sets the maximum size of node particles.",
    PARTICLE_SPEED_MIN: "Sets the minimum speed of particles.",
    PARTICLE_SPEED_MAX: "Sets the maximum speed of particles.",
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

  const ControlDrawerContent = (
    <div className="controls">
      {Object.keys(controls).map((key) => (
        <ControlDrawerUnit
          key={key}
          name={key}
          value={controls[key]}
          min={minMaxValues[key]?.min || 0}
          max={minMaxValues[key]?.max || 100}
          description={descriptions[key] || ""}
          onChange={updateControl}
          buttonChangeValue={minMaxValues[key]?.buttonChangeValue || 1}
        />
      ))}
    </div>
  );

  return (
    <div className="spinning-graph-container">
      <ControlDrawer isInitiallyOpen={false} isHomeButtonShowed={false}>
        {ControlDrawerContent}
      </ControlDrawer>
      <Particles positions={positions} controls={controls} />
    </div>
  );
};

export default SpinningGraph;
