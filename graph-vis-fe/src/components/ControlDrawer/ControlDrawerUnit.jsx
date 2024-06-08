// ControlDrawerUnit.jsx
import React from "react";
import PropTypes from "prop-types";
import NumericControl from "./NumericControl";
import DropdownControl from "./DropdownControl";
import CheckboxControl from "./CheckboxControl";
import "./../../styles/controlDrawerUnit.styles.scss";

const ControlDrawerUnit = (props) => {
  const { type, ...otherProps } = props;

  switch (type) {
    case "numeric":
      return <NumericControl {...otherProps} />;
    case "dropdown":
      return <DropdownControl {...otherProps} />;
    case "checkbox":
      return <CheckboxControl {...otherProps} />;
    default:
      return null;
  }
};

ControlDrawerUnit.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  description: PropTypes.string,
  buttonChangeValue: PropTypes.number,
  options: PropTypes.arrayOf(PropTypes.string), // For dropdown
};

export default ControlDrawerUnit;
