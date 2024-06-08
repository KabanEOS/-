import { useState, useEffect } from "react";
import { defaultControls } from "./constants";

const useControls = (storageKey) => {
  const [controls, setControls] = useState(() => {
    const savedControls = localStorage.getItem(storageKey);
    return savedControls ? JSON.parse(savedControls) : defaultControls;
  });

  useEffect(() => {
    if (!localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, JSON.stringify(defaultControls));
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(controls));
  }, [controls, storageKey]);

  const updateControl = (name, value) => {
    const parsedValue =
      typeof value === "number" && !isNaN(value) ? value : parseFloat(value);
    setControls((prev) => ({ ...prev, [name]: parsedValue }));
  };

  return { controls, updateControl };
};

export default useControls;
