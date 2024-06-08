// controlSettings.js

export const defaultControls = {
  NUMBER_OF_NODES: { value: 30, visible: true },
  NUMBER_OF_EDGES: { value: 50, visible: true },
  OPTIMAL_DISTANCE: { value: 100, visible: false },
  MAX_ITERATIONS: { value: 8000, visible: true },
  NODE_SIZE: { value: 5, visible: false },
};

export const minMaxValues = {
  NUMBER_OF_NODES: { min: 1, max: 1000, buttonChangeValue: 5 },
  NUMBER_OF_EDGES: { min: 1, max: 1000, buttonChangeValue: 5 },
  OPTIMAL_DISTANCE: { min: 1, max: 300, buttonChangeValue: 10 },
  MAX_ITERATIONS: { min: 1, max: 5000, buttonChangeValue: 500 },
  NODE_SIZE: { min: 1, max: 50, buttonChangeValue: 5 },
};

export const descriptions = {
  NUMBER_OF_NODES: "Sets the number of nodes in the graph.",
  NUMBER_OF_EDGES: "Sets the number of edges in the graph.",
  OPTIMAL_DISTANCE: "Sets the optimal distance between nodes.",
  MAX_ITERATIONS:
    "Sets the maximum number of iterations for the graph algorithm.",
  NODE_SIZE: "Sets the size of the nodes.",
};
