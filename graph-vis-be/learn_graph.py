import random
from models import GraphDTO, NodeDTO, EdgeDTO


def generate_random_build_graph(num_nodes: int, num_edges: int = None, connectivity: str = "random", **kwargs) -> GraphDTO:
    nodes = [NodeDTO(id=i, x=0, y=0) for i in range(num_nodes)]
    edges = []

    if num_edges is None:
        num_edges = num_nodes * 2  # Default to twice the number of nodes

    if connectivity == "tree":
        # Generate a tree-like structure
        for i in range(1, num_nodes):
            parent = random.randint(0, i - 1)
            edges.append(EdgeDTO(source=parent, target=i))
    elif connectivity == "complete":
        # Generate a complete graph
        for i in range(num_nodes):
            for j in range(i + 1, num_nodes):
                edges.append(EdgeDTO(source=i, target=j))
    else:
        # Generate a random connected graph
        # Step 1: Create a spanning tree to ensure connectivity
        for i in range(1, num_nodes):
            parent = random.randint(0, i - 1)
            edges.append(EdgeDTO(source=parent, target=i))

        # Step 2: Add additional random edges to reach the required number of edges
        all_possible_edges = [
            (i, j) for i in range(num_nodes) for j in range(num_nodes) if i != j
        ]
        random.shuffle(all_possible_edges)
        existing_edges = set((edge.source, edge.target) for edge in edges)
        # Subtract edges already added in the tree
        remaining_edges = num_edges - (num_nodes - 1)

        for edge in all_possible_edges:
            if len(edges) >= num_edges:
                break
            if (edge[0], edge[1]) not in existing_edges and (edge[1], edge[0]) not in existing_edges:
                edges.append(EdgeDTO(source=edge[0], target=edge[1]))
                existing_edges.add((edge[0], edge[1]))
                existing_edges.add((edge[1], edge[0]))

    graph = GraphDTO(nodes=nodes, edges=edges)

    # Log connectivity
    is_connected = check_graph_connectivity(graph.nodes, graph.edges)
    print(f"Generated graph is {
          'connected' if is_connected else 'not connected'}")

    return graph

# Ensuring graph connectivity


def check_graph_connectivity(nodes, edges):
    adj_list = {node.id: [] for node in nodes}
    for edge in edges:
        adj_list[edge.source].append(edge.target)
        adj_list[edge.target].append(edge.source)

    visited = set()

    def dfs(node):
        stack = [node]
        while stack:
            n = stack.pop()
            if n not in visited:
                visited.add(n)
                stack.extend(adj_list[n])

    dfs(0)
    return len(visited) == len(nodes)


# Example usage:
num_nodes = 48
num_edges = 30
graph = generate_random_build_graph(num_nodes, num_edges)
