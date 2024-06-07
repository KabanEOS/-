import React, { useEffect, useState } from "react";
import { RiArrowRightWideFill, RiHomeFill } from "react-icons/ri";
import "./../../styles/controlDrawer.styles.scss";
import ControlDrawerUnit from "./ControlDrawerUnit.jsx";
import { useLocation } from "react-router-dom";
import HoverCircleIcon from "./HoverCircleIcon.jsx";

const ControlDrawer = ({ controls, minMaxValues, onChange, descriptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log("🚀 ~ ControlDrawer ~ isOpen:", isOpen);
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
      <HoverCircleIcon
        icon={RiArrowRightWideFill}
        icon2={RiHomeFill}
        hoverText={
          isHomePage
            ? "Display controls to play with particles mesh algorithm parameters"
            : "Navigate to the home page to move somewhere else and play with cool mesh"
        }
        onClick={() => {
          toggleDrawer();
        }}
        onClick2={() => {
          window.location.href = "/";
        }}
        showSecondCircle={true}
        isOpen={isOpen}
        isHomePage={isHomePage}
        isHovering={isHovering}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
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
    </div>
  );
};

export default ControlDrawer;
