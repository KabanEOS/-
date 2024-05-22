import React from "react";
import PropTypes from "prop-types";
import "./../../styles/controlDrawer.styles.scss";

const ControlInput = ({ label, value, onChange }) => {
  const handleInputChange = (e) => {
    onChange(parseFloat(e.target.value));
  };

  const handleButtonClick = (delta) => {
    onChange(value + delta);
  };

  const handleSliderChange = (e) => {
    onChange(parseFloat(e.target.value));
  };

  return (
    <div className="control-input">
      <label>{label}</label>
      <div className="control-buttons">
        <button onClick={() => handleButtonClick(-1)}>-</button>
        <input type="number" value={value} onChange={handleInputChange} />
        <button onClick={() => handleButtonClick(1)}>+</button>
      </div>
      <input
        type="range"
        min="0"
        max="200"
        value={value}
        onChange={handleSliderChange}
      />
    </div>
  );
};

ControlInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ControlInput;
