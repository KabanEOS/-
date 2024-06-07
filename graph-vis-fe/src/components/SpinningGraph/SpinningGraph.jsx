import React, { useEffect, useState } from "react";
import "./../../styles/spinningGraphs.styles.scss";
import Particles from "./Particles.jsx";
import ControlDrawer from "./../ControlDrawer/ControlDrawer.jsx";
import ControlDrawerUnit from "./../ControlDrawer/ControlDrawerUnit.jsx";
import useControls from "./useControls";
import { defaultControls, minMaxValues, descriptions } from "./constants";

const SpinningGraph = ({ nodes }) => {
  const { controls, updateControl } = useControls();
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

  const ControlDrawerContent = (
    <div className="controls">
      {Object.keys(defaultControls).map((key) => (
        <ControlDrawerUnit
          key={key}
          name={key}
          value={
            controls[key] !== undefined ? controls[key] : defaultControls[key]
          }
          min={minMaxValues[key]?.min || 0}
          max={minMaxValues[key]?.max || 100}
          description={descriptions[key] || ""}
          onChange={(value) => updateControl(key, value)}
          buttonChangeValue={minMaxValues[key]?.buttonChangeValue || 1}
        />
      ))}
    </div>
  );

  return (
    <div className="spinning-graph-container">
      <ControlDrawer isInitiallyOpen={false} isHomeButtonShowed={true}>
        {ControlDrawerContent}
      </ControlDrawer>
      <Particles positions={positions} controls={controls} />
    </div>
  );
};

export default SpinningGraph;
