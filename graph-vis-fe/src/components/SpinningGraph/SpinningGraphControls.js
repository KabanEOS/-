import React from "react";
import ControlDrawerUnit from "./../ControlDrawer/ControlDrawerUnit";
import { defaultControls, minMaxValues, descriptions } from "./constants";
import useControls from "./useControls";

const SpinningGraphControls = ({ storageKey }) => {
  const { controls, updateControl } = useControls(storageKey);

  return (
    <div className="controls">
      {Object.keys(defaultControls).map((key) => {
        const control = defaultControls[key];
        const controlValue =
          controls[key] !== undefined ? controls[key] : control.value;
        const minValue = minMaxValues[key]?.min || 0;
        const maxValue = minMaxValues[key]?.max || 100;
        const description = descriptions[key] || "";
        const buttonChangeValue = minMaxValues[key]?.buttonChangeValue || 1;

        return (
          <ControlDrawerUnit
            key={key}
            type="numeric" // Adjust this based on the type of control
            name={key}
            value={controlValue}
            min={minValue}
            max={maxValue}
            description={description}
            onChange={(name, value) => updateControl(name, value)}
            buttonChangeValue={buttonChangeValue}
          />
        );
      })}
    </div>
  );
};

export default SpinningGraphControls;
