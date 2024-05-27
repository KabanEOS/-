import React, { useRef, useState, useEffect } from "react";
import { generateRandomBuildGraph } from "../../services/api";
import BuildGraph from "../../components/BuildGraph";
import { calculateNodePositions } from "../../utils/calculateNodePositions";
import "../../styles/shared.styles.scss";
import "../../styles/learnGraph.styles.scss";

const LearnGraphs = () => {
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [error, setError] = useState(null);
  const [numNodes, setNumNodes] = useState(Math.floor(Math.random() * 91) + 10); // 10 to 100 nodes
  const [numEdges, setNumEdges] = useState(Math.floor(Math.random() * 91) + 10); // 10 to 100 edges
  const [maxIterations, setMaxIterations] = useState(1000);
  const [optimalDistance, setOptimalDistance] = useState(100);
  const [nodeSize, setNodeSize] = useState(2); // Small size for large graphs
  const [connectivity, setConnectivity] = useState("random"); // Connectivity type
  const [svgWidth, setSvgWidth] = useState(3000); // Default width
  const [svgHeight, setSvgHeight] = useState(3000); // Default height

  const graphRef = useRef(null);

  const [transform, setTransform] = useState({
    scale: 1,
    translateX: 0,
    translateY: 0,
  });

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

  const fetchAndGenerateGraph = async () => {
    // Get container dimensions from the center coordinates
    const containerWidth = svgWidth;
    const containerHeight = svgHeight;

    try {
      const data = await generateRandomBuildGraph(
        numNodes,
        numEdges,
        connectivity
      );
      console.log("🚀 ~ fetchRandomBuildGraph ~ data:", data);

      // Calculate node positions
      const nodesWithPositions = calculateNodePositions(
        data.nodes,
        data.edges,
        containerWidth * 3, // Use a larger virtual area
        containerHeight * 3, // Use a larger virtual area
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

  const handleWheel = (event) => {
    event.preventDefault();
    const { deltaY } = event;
    const scaleAmount = -deltaY * 0.01;
    const newScale = Math.min(Math.max(transform.scale + scaleAmount, 0.1), 10);

    // Adjust translation to zoom towards the yellow dot (graph center)
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

  const handleDimensionsCalculated = ({ svgCenterX, svgCenterY }) => {
    setSvgWidth(svgCenterX * 2);
    setSvgHeight(svgCenterY * 2);
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
            onChange={(e) => setNumNodes(Number(e.target.value))}
            min="10"
            max="100"
          />
        </label>
        <label>
          Number of Edges:
          <input
            type="number"
            value={numEdges}
            onChange={(e) => setNumEdges(Number(e.target.value))}
            min="10"
            max="100"
          />
        </label>
        <label>
          Optimal Distance:
          <input
            type="number"
            value={optimalDistance}
            onChange={(e) => setOptimalDistance(Number(e.target.value))}
            min="10"
            max="300"
          />
        </label>
        <label>
          Max Iterations:
          <input
            type="number"
            value={maxIterations}
            onChange={(e) => setMaxIterations(Number(e.target.value))}
            min="100"
            max="5000"
          />
        </label>
        <label>
          Node Size:
          <input
            type="number"
            value={nodeSize}
            onChange={(e) => setNodeSize(Number(e.target.value))}
            min="2"
            max="20"
          />
        </label>
        <label>
          Connectivity:
          <select
            value={connectivity}
            onChange={(e) => setConnectivity(e.target.value)}
          >
            <option value="random">Random</option>
            <option value="tree">Tree</option>
            <option value="complete">Complete</option>
          </select>
        </label>
        <button onClick={fetchAndGenerateGraph}>Generate External Graph</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
