import React, { useRef, useState, useEffect } from "react";
import LearnGraphsControls from "./LearnGraphsControls";
import LearnGraphsGraph from "./LearnGraphsGraph.jsx";
import {
  validateGraphParameters,
  fetchAndGenerateGraph,
  centerGraph,
} from "./utils";
import "../../styles/shared.styles.scss";
import "../../styles/learnGraph.styles.scss";

const LearnGraphs = () => {
  const initialNodesAmount = [30, 50];
  const [numNodes, setNumNodes] = useState(
    Math.floor(
      Math.random() * (initialNodesAmount[1] - initialNodesAmount[0] + 1)
    ) + initialNodesAmount[0]
  );
  const [connectivity, setConnectivity] = useState("random");

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
  const [nodeSize, setNodeSize] = useState(2);
  const [svgWidth, setSvgWidth] = useState(3000);
  const [svgHeight, setSvgHeight] = useState(3000);

  const graphRef = useRef(null);

  const [transform, setTransform] = useState({
    scale: 1,
    translateX: 0,
    translateY: 0,
  });

  useEffect(() => {
    fetchAndGenerateGraph(
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
      optimalDistance
    );
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
      <LearnGraphsControls
        numNodes={numNodes}
        handleNumNodesChange={handleNumNodesChange}
        numEdges={numEdges}
        handleNumEdgesChange={handleNumEdgesChange}
        optimalDistance={optimalDistance}
        setOptimalDistance={setOptimalDistance}
        maxIterations={maxIterations}
        setMaxIterations={setMaxIterations}
        nodeSize={nodeSize}
        setNodeSize={setNodeSize}
        connectivity={connectivity}
        handleConnectivityChange={handleConnectivityChange}
        fetchAndGenerateGraph={() =>
          fetchAndGenerateGraph(
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
            optimalDistance
          )
        }
        infoMessage={infoMessage}
        error={error}
      />
      <LearnGraphsGraph
        graphData={graphData}
        transform={transform}
        svgWidth={svgWidth}
        svgHeight={svgHeight}
        nodeSize={nodeSize}
        handleWheel={handleWheel}
      />
    </div>
  );
};

export default LearnGraphs;
