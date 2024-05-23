import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import About from "./pages/about/about";
import LearnGraphs from "./pages/learn-graphs/index";
import TraversalDemo from "./pages/traversal-demo/index";
import SpinningGraph from "./components/SpinningGraph";
import { NodePositionsProvider } from "./contexts/NodePositionsContext.jsx";
import Shadow from "./components/Shadow.jsx";

const App = () => {
  const nodes = [
    { id: 1, name: "Graph Builder", link: "/graph-builder" },
    { id: 2, name: "Learn Graphs", link: "/learn-graphs" },
    { id: 3, name: "Traversal Demo", link: "/traversal-demo" },
  ];

  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(location.pathname === "/");

  useEffect(() => {
    setIsHomePage(location.pathname === "/");
  }, [location]);

  return (
    <NodePositionsProvider>
      <div className="App">
        <Shadow isVisible={!isHomePage} />
        <SpinningGraph nodes={nodes} />
        <Routes>
          <Route path="/graph-builder" element={<About />} />
          <Route path="/learn-graphs" element={<LearnGraphs />} />
          <Route path="/traversal-demo" element={<TraversalDemo />} />
        </Routes>
      </div>
    </NodePositionsProvider>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
