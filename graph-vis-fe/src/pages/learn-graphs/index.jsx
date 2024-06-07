import React, { useRef, useState, useEffect } from "react";
import { generateRandomBuildGraph } from "../../services/api";
import BuildGraph from "../../components/Graph/BuildGraph";
import { calculateNodePositions } from "../../utils/calculateNodePositions";
import "../../styles/shared.styles.scss";
import "../../styles/learnGraph.styles.scss";

const LearnGraphs = () => {
  const validateGraphParameters = (numNodes, numEdges, connectivity) => {
    let validatedEdges = numEdges;
    let infoMessage = null;

    if (connectivity === "tree") {
      // In a tree, number of edges should be nodes - 1
      if (numEdges !== numNodes - 1) {
        validatedEdges = numNodes - 1;
        infoMessage = `In tree connectivity, the number of edges has been adjusted to nodes - 1.<br>
        This is because a tree with ${numNodes} nodes must have exactly ${numNodes - 1} edges to be a valid tree.`;
      }
    } else if (connectivity === "random") {
      // Ensure enough edges to form a connected graph
      if (numEdges < numNodes) {
        validatedEdges = numNodes;
        infoMessage = `In random connectivity, the number of edges has been adjusted to at least the number of nodes.<br>
        A random graph with ${numNodes} nodes must have at least ${numNodes} edges to be random and connected.<br>
        If you want to have fewer edges than nodes, you actually want to have a tree diagram, not a random graph. You can change it in the connectivity dropdown.`;
      }
    } else if (connectivity === "complete") {
      // In a complete graph, edges = nodes * (nodes - 1) / 2
      const maxEdges = (numNodes * (numNodes - 1)) / 2;
      if (numEdges !== maxEdges) {
        validatedEdges = maxEdges;
        infoMessage = `In complete connectivity, the number of edges has been adjusted to the maximum possible value: ${maxEdges}.<br>
        A complete graph with ${numNodes} nodes has all possible edges, which is ${maxEdges} edges. Each node is connected to every other node.`;
      }
    }

    return { validatedEdges, infoMessage };
  };

  // initial values set here 0: min 1:max
  const initialNodesAmount = [30, 50];
  const [numNodes, setNumNodes] = useState(
    Math.floor(
      Math.random() * (initialNodesAmount[1] - initialNodesAmount[0] + 1)
    ) + initialNodesAmount[0]
  );
  const [connectivity, setConnectivity] = useState("random"); // Connectivity type

  // initial values set here 0: min 1:max
  const initialEdgesAmount = [51, 70];
  const initialEdges =
    Math.floor(
      Math.random() * (initialEdgesAmount[1] - initialEdgesAmount[0] + 1)
    ) + initialEdgesAmount[0];
  const { validatedEdges: initialNumEdges, infoMessage: initialInfoMessage } =
    validateGraphParameters(numNodes, initialEdges, connectivity);

  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [error, setError] = useState(null);
  const [numEdges, setNumEdges] = useState(initialNumEdges);
  const [infoMessage, setInfoMessage] = useState(initialInfoMessage);
  const [maxIterations, setMaxIterations] = useState(1000);
  const [optimalDistance, setOptimalDistance] = useState(100);
  const [nodeSize, setNodeSize] = useState(2); // Small size for large graphs
  const [svgWidth, setSvgWidth] = useState(3000); // Default width
  const [svgHeight, setSvgHeight] = useState(3000); // Default height

  const graphRef = useRef(null);

  const [transform, setTransform] = useState({
    scale: 1,
    translateX: 0,
    translateY: 0,
  });

  useEffect(() => {
    fetchAndGenerateGraph();
  }, [
    numNodes,
    numEdges,
    maxIterations,
    optimalDistance,
    nodeSize,
    connectivity,
    svgWidth,
    svgHeight,
  ]);

  const handleNumNodesChange = (e) => {
    const newNumNodes = Number(e.target.value);
    const { validatedEdges, infoMessage } = validateGraphParameters(
      newNumNodes,
      numEdges,
      connectivity
    );
    setNumNodes(newNumNodes);
    setNumEdges(validatedEdges);
    setInfoMessage(infoMessage);
  };

  const handleNumEdgesChange = (e) => {
    const newNumEdges = Number(e.target.value);
    const { validatedEdges, infoMessage } = validateGraphParameters(
      numNodes,
      newNumEdges,
      connectivity
    );
    setNumEdges(validatedEdges);
    setInfoMessage(infoMessage);
  };

  const handleConnectivityChange = (e) => {
    const newConnectivity = e.target.value;
    const { validatedEdges, infoMessage } = validateGraphParameters(
      numNodes,
      numEdges,
      newConnectivity
    );
    setConnectivity(newConnectivity);
    setNumEdges(validatedEdges);
    setInfoMessage(infoMessage);
  };

  const fetchAndGenerateGraph = async () => {
    const containerWidth = svgWidth;
    const containerHeight = svgHeight;

    try {
      const data = await generateRandomBuildGraph(
        numNodes,
        numEdges,
        connectivity
      );
      console.log("🚀 ~ fetchRandomBuildGraph ~ data:", data);

      const nodesWithPositions = calculateNodePositions(
        data.nodes,
        data.edges,
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
        setGraphData({ nodes: nodesWithPositions, edges: data.edges });
        centerGraph(nodesWithPositions);
      }
    } catch (err) {
      console.error("🚀 ~ fetchRandomBuildGraph ~ error:", err);
      setError("Failed to fetch external graph data");
    }
  };

  const centerGraph = (nodes) => {
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

    console.log("Centering Graph");
    console.log("Graph center calculated: ", {
      centerX: (minX + maxX) / 2,
      centerY: (minY + maxY) / 2,
    });

    setTransform({
      scale: initialScale,
      translateX,
      translateY,
    });
  };

  const handleWheel = (event) => {
    event.preventDefault();
    const { deltaY } = event;
    const scaleAmount = -deltaY * 0.01;
    const newScale = Math.min(Math.max(transform.scale + scaleAmount, 0.1), 10);

    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;

    const newTranslateX =
      centerX - ((centerX - transform.translateX) * newScale) / transform.scale;
    const newTranslateY =
      centerY - ((centerY - transform.translateY) * newScale) / transform.scale;

    console.log("Zooming Graph");
    console.log("New center after zoom: ", {
      centerX: newTranslateX + centerX,
      centerY: newTranslateY + centerY,
    });

    setTransform({
      scale: newScale,
      translateX: newTranslateX,
      translateY: newTranslateY,
    });
  };

  return (
    <div className="show-over-shadow">
      <h2>Learn Graphs</h2>
      <p>
        Here you can learn about different graph algorithms, representations,
        and use cases.
      </p>
      <div>
        <label>
          Number of Nodes:
          <input
            type="number"
            value={numNodes}
            onChange={handleNumNodesChange}
            min="1"
            max="100"
          />
        </label>
        <label>
          Number of Edges:
          <input
            type="number"
            value={numEdges}
            onChange={handleNumEdgesChange}
            min="1"
            max="100"
            placeholder={
              connectivity === "complete"
                ? Math.floor((numNodes * (numNodes - 1)) / 2)
                : ""
            }
            readOnly={connectivity === "complete"}
          />
        </label>
        <label>
          Optimal Distance:
          <input
            type="number"
            value={optimalDistance}
            onChange={(e) => setOptimalDistance(Number(e.target.value))}
            min="1"
            max="300"
          />
        </label>
        <label>
          Max Iterations:
          <input
            type="number"
            value={maxIterations}
            onChange={(e) => setMaxIterations(Number(e.target.value))}
            min="1"
            max="5000"
          />
        </label>
        <label>
          Node Size:
          <input
            type="number"
            value={nodeSize}
            onChange={(e) => setNodeSize(Number(e.target.value))}
            min="1"
            max="20"
          />
        </label>
        <label>
          Connectivity:
          <select value={connectivity} onChange={handleConnectivityChange}>
            <option value="random">Random</option>
            <option value="tree">Tree</option>
            <option value="complete">Complete</option>
          </select>
        </label>
        <button onClick={fetchAndGenerateGraph}>Generate External Graph</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {infoMessage && (
        <p
          style={{ color: "blue" }}
          dangerouslySetInnerHTML={{ __html: infoMessage }}
        ></p>
      )}
      <div
        ref={graphRef}
        style={{
          width: "100vw",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          onWheel={handleWheel}
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid black",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <BuildGraph
            nodes={graphData.nodes}
            edges={graphData.edges}
            transform={transform}
            nodeSize={nodeSize}
            svgWidth={svgWidth}
            svgHeight={svgHeight}
          />
        </div>
      </div>
    </div>
  );
};

export default LearnGraphs;
