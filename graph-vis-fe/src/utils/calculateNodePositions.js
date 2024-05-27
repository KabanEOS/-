export const calculateNodePositions = (
  nodes,
  edges,
  containerWidth,
  containerHeight,
  nodeSize,
  maxIterations,
  optimalDistance
) => {
  const positions = {};
  const width = containerWidth;
  const height = containerHeight;
  const centerX = width / 2;
  const centerY = height / 2;
  const area = width * height;
  const k = optimalDistance || Math.sqrt(area / nodes.length);
  let temperature = width / 10;

  // Initialize positions randomly within the viewport
  nodes.forEach((node) => {
    positions[node.id] = {
      x: centerX + (Math.random() - 0.5) * width * 0.5,
      y: centerY + (Math.random() - 0.5) * height * 0.5,
    };
  });

  // Function to calculate repulsive force
  const repulsiveForce = (distance) => k ** 2 / distance;

  // Function to calculate attractive force
  const attractiveForce = (distance) => distance ** 2 / k;

  // Function to apply forces and update positions
  const applyForces = () => {
    // Initialize displacement vectors
    const displacements = nodes.reduce((acc, node) => {
      acc[node.id] = { x: 0, y: 0 };
      return acc;
    }, {});

    // Calculate repulsive forces between all pairs of nodes
    nodes.forEach((nodeA) => {
      nodes.forEach((nodeB) => {
        if (nodeA.id !== nodeB.id) {
          const dx = positions[nodeA.id].x - positions[nodeB.id].x;
          const dy = positions[nodeA.id].y - positions[nodeB.id].y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = repulsiveForce(distance);
          displacements[nodeA.id].x += (dx / distance) * force;
          displacements[nodeA.id].y += (dy / distance) * force;
          displacements[nodeB.id].x -= (dx / distance) * force;
          displacements[nodeB.id].y -= (dy / distance) * force;
        }
      });
    });

    // Calculate attractive forces for each edge
    edges.forEach((edge) => {
      const nodeA = positions[edge.source];
      const nodeB = positions[edge.target];
      const dx = nodeA.x - nodeB.x;
      const dy = nodeA.y - nodeB.y;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;
      const force = attractiveForce(distance);
      const displacement = (distance / k) * force;
      displacements[edge.source].x -= (dx / distance) * displacement;
      displacements[edge.source].y -= (dy / distance) * displacement;
      displacements[edge.target].x += (dx / distance) * displacement;
      displacements[edge.target].y += (dy / distance) * displacement;
    });

    // Update positions based on displacements
    nodes.forEach((node) => {
      const displacement = Math.sqrt(
        displacements[node.id].x ** 2 + displacements[node.id].y ** 2
      );
      if (displacement > temperature) {
        const scale = temperature / displacement;
        displacements[node.id].x *= scale;
        displacements[node.id].y *= scale;
      }
      positions[node.id].x += displacements[node.id].x;
      positions[node.id].y += displacements[node.id].y;
    });

    // Cool down the temperature
    temperature *= 0.95;
  };

  // Main loop to apply forces and update positions iteratively
  for (let i = 0; i < maxIterations; i++) {
    applyForces();
  }

  // Ensure nodes are within the viewport boundaries
  nodes.forEach((node) => {
    positions[node.id].x = Math.max(
      nodeSize,
      Math.min(width - nodeSize, positions[node.id].x)
    );
    positions[node.id].y = Math.max(
      nodeSize,
      Math.min(height - nodeSize, positions[node.id].y)
    );
  });

  // Center the graph within the viewport
  const minX = Math.min(...nodes.map((node) => positions[node.id].x));
  const maxX = Math.max(...nodes.map((node) => positions[node.id].x));
  const minY = Math.min(...nodes.map((node) => positions[node.id].y));
  const maxY = Math.max(...nodes.map((node) => positions[node.id].y));

  const offsetX = centerX - (minX + maxX) / 2;
  const offsetY = centerY - (minY + maxY) / 2;

  nodes.forEach((node) => {
    positions[node.id].x += offsetX;
    positions[node.id].y += offsetY;
  });

  // Assign final positions to nodes
  return nodes.map((node) => ({
    ...node,
    ...positions[node.id],
  }));
};
