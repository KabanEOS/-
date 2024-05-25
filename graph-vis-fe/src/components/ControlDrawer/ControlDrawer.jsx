import React, { useEffect, useState } from "react";
import { RiArrowRightWideFill, RiHomeFill } from "react-icons/ri";
import "./../../styles/controlDrawer.styles.scss";
import ControlDrawerUnit from "./ControlDrawerUnit.jsx";
import { useLocation } from "react-router-dom";

const ControlDrawer = ({ controls, minMaxValues, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(location.pathname === "/");

  useEffect(() => {
    setIsHomePage(location.pathname === "/");
  }, [location]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  console.log("🚀 ~ ControlDrawer ~ isHovering:", isHovering);
  console.log("🚀 ~ ControlDrawer ~ isOpen:", isOpen);
  console.log("🚀 ~ ControlDrawer ~ isHomePage:", isHomePage);

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

  const controlsArray = Object.keys(controls).map((key) => ({
    name: key,
    value: controls[key],
    min: minMaxValues[key]?.min || 0,
    max: minMaxValues[key]?.max || 100,
    description: descriptions[key] || "",
  }));

  return (
    <div className={`drawer-container ${isOpen ? "opened" : "closed"}`}>
      <div className="drawer-content">
        <div className="controls">
          {controlsArray.map((control) => (
            <ControlDrawerUnit
              key={control.name}
              name={control.name}
              value={control.value}
              min={control.min}
              max={control.max}
              description={control.description}
              onChange={onChange}
            />
          ))}
          <div style={{ height: "50px" }}></div>
        </div>
      </div>
      <div className="arrow-always-visible-right-container">
        {!isOpen && isHomePage && isHovering && (
          <div className="info-hover">
            display controls to play with particles mesh algorithm parameters
          </div>
        )}
        {!isHomePage && isHovering && (
          <div className="info-hover movThatMore">
            Navigate to the home page to move somwhere else and play with cool
            mesh
          </div>
        )}
        <div
          className={`toggle-arrow ${isOpen ? "open" : "closed"}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={
            isHomePage
              ? toggleDrawer
              : () => {
                  window.location.href = "/";
                }
          }
        >
          {isHomePage ? (
            <RiArrowRightWideFill />
          ) : (
            <RiHomeFill className={`${!isHomePage && "squeezeNMoveThat"}`} />
          )}
          <div className="background-circle" />
        </div>
      </div>
    </div>
  );
};

export default ControlDrawer;
