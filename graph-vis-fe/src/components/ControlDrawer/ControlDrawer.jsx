import React, { useEffect, useState } from "react";
import { RiArrowRightWideFill, RiHomeFill } from "react-icons/ri";
import "./../../styles/controlDrawer.styles.scss";
import ControlDrawerUnit from "./ControlDrawerUnit.jsx";
import { useLocation } from "react-router-dom";

const ControlDrawer = ({ controls, minMaxValues, onChange, descriptions }) => {
  console.log("🚀 ~ ControlDrawer ~ minMaxValues:", minMaxValues);
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

  const controlsArray = Object.keys(controls).map((key) => ({
    name: key,
    value: controls[key],
    min: minMaxValues[key]?.min || 0,
    max: minMaxValues[key]?.max || 100,
    description: descriptions[key] || "",
    buttonChangeValue: minMaxValues[key]?.buttonChangeValue || 1,
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
              buttonChangeValue={control.buttonChangeValue}
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
