import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ControlDrawer from "../../components/ControlDrawer/ControlDrawer";
import SpinningGraph from "../../components/SpinningGraph";
import About from "../about/about";
import LearnGraphs from "../learn-graphs";
import TraversalDemo from "../traversal-demo";

const Home = () => {
  const nodes = [
    { id: 1, name: "Graph Builder", link: "/graph-builder" },
    { id: 2, name: "Learn Graphs", link: "/learn-graphs" },
    { id: 3, name: "Traversal Demo", link: "/traversal-demo" },
  ];

  return (
    <>
      <SpinningGraph nodes={nodes} />
      <ControlDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graph-builder" element={<About />} />
        <Route path="/learn-graphs" element={<LearnGraphs />} />
        <Route path="/traversal-demo" element={<TraversalDemo />} />
      </Routes>
    </>
  );
};

export default Home;
