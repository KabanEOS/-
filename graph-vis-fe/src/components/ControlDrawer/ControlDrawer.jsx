import React, { useState } from "react";
import { RiArrowRightWideFill } from "react-icons/ri";
import "./../../styles/controlDrawer.styles.scss";

const ControlDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`drawer-container ${isOpen ? "opened" : "closed"}`}>
      <div className="drawer-content">
        <div className="controls">
          <div className="mock-control">Control 1</div>
          <div className="mock-control">Control 2</div>
          <div className="mock-control">Control 2</div>
          <div className="mock-control">Control 2</div>
          <div className="mock-control">Control 2</div>
          <div className="mock-control">Control 2</div>
          <div className="mock-control">Control 2</div>
          <div className="mock-control">Control 2</div>
          <div className="mock-control">Control 2</div>
          <div className="mock-control">Control 2</div>
          <div className="mock-control">Control 2</div>
          <div className="mock-control">Control 2</div>
          <div className="mock-control">Control 3</div>
          {/* Add more mock controls as needed */}
        </div>
      </div>
      <div className="arrow-always-visible-right-container">
        <div
          className={`toggle-arrow ${isOpen ? "open" : "closed"}`}
          onClick={toggleDrawer}
        >
          <RiArrowRightWideFill />
        </div>
      </div>
    </div>
  );
};

export default ControlDrawer;
