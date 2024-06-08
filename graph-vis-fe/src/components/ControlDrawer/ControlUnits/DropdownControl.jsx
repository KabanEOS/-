import React from "react";
import PropTypes from "prop-types";
import "./../../../styles/controlDrawerUnit.styles.scss";

const DropdownControl = ({ name, value, options, onChange, description }) => {
  const handleSelectChange = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    onChange(name, e.target.value);
  };

  return (
    <div className="unit-container">
      <div className="control-section-unit">
        <div className="unit-name">{name.replace(/_/g, " ")}</div>
        <select
          className="unit-input"
          value={value}
          onChange={handleSelectChange}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="unit-description">{description}</div>
      </div>
    </div>
  );
};

DropdownControl.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  description: PropTypes.string,
};

export default DropdownControl;
