// HoverCircleIcon.jsx
import React from "react";
import PropTypes from "prop-types";
import "./../styles/navButton.styles.scss";
import { RiHomeFill } from "react-icons/ri";
import { Navigate } from "react-router-dom";

const HoverCircleIcon = () => {
  return (
    <div className="arrow-always-visible-right-container">
      <div className="info-hover">{}</div>
      <div
        className="toggle-arrow"
        onClick={() => {
          Navigate({ to: "/" });
        }}
      />
      <RiHomeFill />
      <div className="background-circle" />
    </div>
  );
};

HoverCircleIcon.propTypes = {
  // Icon: PropTypes.elementType.isRequired,
  hoverText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

HoverCircleIcon.defaultProps = {
  onClick: () => {},
};

export default HoverCircleIcon;
