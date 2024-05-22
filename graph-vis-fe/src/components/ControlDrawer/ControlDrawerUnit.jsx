import React from "react";
import PropTypes from "prop-types";
import "./../../styles/controlDrawerUnit.styles.scss";

const ControlDrawerUnit = ({
  name,
  value,
  min,
  max,
  onChange,
  description,
}) => {
  const incrementValue = () => {
    onChange(name, Math.min(value + 1, max));
  };

  const decrementValue = () => {
    onChange(name, Math.max(value - 1, min));
  };

  const handleInputChange = (e) => {
    onChange(name, parseFloat(e.target.value));
  };

  const handleSliderChange = (e) => {
    onChange(name, parseFloat(e.target.value));
  };

  return (
    <div className="unit-container">
      <div className="number-values">
        <div className="unit-name">{name}</div>
        <button onClick={decrementValue}>-</button>
        <input
          className="unit-input"
          type="number"
          id={name}
          name={name}
          value={value}
          min={min}
          max={max}
          onChange={handleInputChange}
        />
        <button onClick={incrementValue}>+</button>
      </div>
      <input
        className="range-input"
        type="range"
        id={name}
        name={name}
        value={value}
        min={min}
        max={max}
        onChange={handleSliderChange}
      />
      <div className="unit-description">{description}</div>
    </div>
  );
};

ControlDrawerUnit.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  description: PropTypes.string,
};

export default ControlDrawerUnit;
