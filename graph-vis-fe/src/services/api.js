import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

export const getBfsTraversal = async (graph) => {
  const response = await axios.post(`${API_URL}/traversal/bfs`, graph);
  return response.data;
};

export const getDfsTraversal = async (graph) => {
  const response = await axios.post(`${API_URL}/traversal/dfs`, graph);
  return response.data;
};
