import { useState, useEffect } from "react";
import { defaultControls } from "./constants";

const useControls = () => {
  const [controls, setControls] = useState(() => {
    const savedControls = localStorage.getItem("particleControls");
    return savedControls ? JSON.parse(savedControls) : defaultControls;
  });

  useEffect(() => {
    if (!localStorage.getItem("particleControls")) {
      localStorage.setItem("particleControls", JSON.stringify(defaultControls));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("particleControls", JSON.stringify(controls));
  }, [controls]);

  const updateControl = (name, value) => {
    setControls((prev) => ({ ...prev, [name]: value }));
  };

  return { controls, updateControl };
};

export default useControls;
