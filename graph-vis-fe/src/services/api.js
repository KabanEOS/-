import axios from "axios";

const API_URL = "http://127.0.0.1:5001";

export const getBfsTraversal = async (graph) => {
  const response = await axios.post(`${API_URL}/traversal/bfs`, graph);
  return response.data;
};

export const getDfsTraversal = async (graph) => {
  const response = await axios.post(`${API_URL}/traversal/dfs`, graph);
  return response.data;
};

export const generateRandomGraph = async (numNodes) => {
  const response = await axios.post(`${API_URL}/generate_graph`, {
    num_nodes: numNodes,
  });
  return response.data;
};
