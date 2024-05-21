import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/about/about";
import LearnGraphs from "./pages/learn-graphs/index";
import TraversalDemo from "./pages/traversal-demo/index";
import SpinningGraph from "./components/SpinningGraph";
// import NodeInfo from "./components/NodeInfo";
import { NodePositionsProvider } from "./contexts/NodePositionsContext.jsx";
import "./styles/spinningGraphs.styles.scss";

const App = () => {
  const nodes = [
    { id: 1, name: "Graph Builder", link: "/graph-builder" },
    { id: 2, name: "Learn Graphs", link: "/learn-graphs" },
    { id: 3, name: "Traversal Demo", link: "/traversal-demo" },
  ];

  return (
    <NodePositionsProvider>
      <div className="App">
        <Router>
          <SpinningGraph nodes={nodes} />
          <Routes>
            <Route path="/graph-builder" element={<About />} />
            <Route path="/learn-graphs" element={<LearnGraphs />} />
            <Route path="/traversal-demo" element={<TraversalDemo />} />
          </Routes>
        </Router>
      </div>
    </NodePositionsProvider>
  );
};

export default App;
