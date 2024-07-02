import { generateRandomBuildGraph } from "../../services/api";
import { calculateNodePositions } from "../../utils/calculateNodePositions";

export const validateGraphParameters = (numNodes, numEdges, connectivity) => {
  let validatedEdges = numEdges;
  let infoMessage = null;

  if (connectivity === "tree") {
    if (numEdges !== numNodes - 1) {
      validatedEdges = numNodes - 1;
      infoMessage = `In tree connectivity, the number of edges has been adjusted to nodes - 1.<br>
      This is because a tree with ${numNodes} nodes must have exactly ${numNodes - 1} edges to be a valid tree.`;
    }
  } else if (connectivity === "random") {
    if (numEdges < numNodes) {
      validatedEdges = numNodes;
      infoMessage = `In random connectivity, the number of edges has been adjusted to at least the number of nodes.<br>
      A random graph with ${numNodes} nodes must have at least ${numNodes} edges to be random and connected.<br>
      If you want to have fewer edges than nodes, you actually want to have a tree diagram, not a random graph. You can change it in the connectivity dropdown.`;
    }
  } else if (connectivity === "complete") {
    const maxEdges = (numNodes * (numNodes - 1)) / 2;
    if (numEdges !== maxEdges) {
      validatedEdges = maxEdges;
      infoMessage = `In complete connectivity, the number of edges has been adjusted to the maximum possible value: ${maxEdges}.<br>
      A complete graph with ${numNodes} nodes has all possible edges, which is ${maxEdges} edges. Each node is connected to every other node.`;
    }
  }

  return { validatedEdges, infoMessage };
};

export const fetchAndGenerateGraph = async (
  numNodes,
  numEdges,
  connectivity,
  setGraphData,
  setError,
  setTransform,
  svgWidth,
  svgHeight,
  nodeSize,
  maxIterations,
  optimalDistance,
  setGraphFormats // Add this parameter to handle graph formats
) => {
  const containerWidth = svgWidth;
  const containerHeight = svgHeight;

  try {
    const data = await generateRandomBuildGraph(
      numNodes,
      numEdges,
      connectivity
    );

    const nodesWithPositions = calculateNodePositions(
      data.graph.nodes,
      data.graph.edges,
      containerWidth * 3,
      containerHeight * 3,
      nodeSize,
      maxIterations,
      optimalDistance
    );

    if (nodesWithPositions === null) {
      setError(
        "You need to decrease the number of nodes or adjust the initial position parameters to show all the nodes."
      );
      setGraphData({ nodes: [], edges: [] });
    } else {
      setError(null);
      setGraphData({ nodes: nodesWithPositions, edges: data.graph.edges });
      centerGraph(nodesWithPositions, setTransform, svgWidth, svgHeight);
      setGraphFormats(data.formats); // Set the graph formats
    }
  } catch (err) {
    console.error("🚀 ~ fetchRandomBuildGraph ~ error:", err);
    setError("Failed to fetch external graph data");
  }
};

export const centerGraph = (nodes, setTransform, svgWidth, svgHeight) => {
  const minX = Math.min(...nodes.map((node) => node.x));
  const minY = Math.min(...nodes.map((node) => node.y));
  const maxX = Math.max(...nodes.map((node) => node.x));
  const maxY = Math.max(...nodes.map((node) => node.y));

  const graphWidth = maxX - minX;
  const graphHeight = maxY - minY;

  const containerWidth = svgWidth;
  const containerHeight = svgHeight;

  const initialScale = (containerHeight * 0.8) / graphHeight;
  const adjustedGraphHeight = graphHeight * initialScale;
  const translateY = containerHeight * 0.1 - minY * initialScale;
  const translateX =
    (containerWidth - graphWidth * initialScale) / 2 - minX * initialScale;

  setTransform({
    scale: initialScale,
    translateX,
    translateY,
  });
};
