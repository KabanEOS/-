import random
from models import GraphDTO, NodeDTO, EdgeDTO


def generate_bfs_sequence(graph: GraphDTO) -> list[int]:
    nodes = {
        node.id: node for node in graph.nodes
    }  # Create a dictionary of nodes for easy access
    edges = graph.edges

    visited = set()  # Set to keep track of visited nodes
    queue = [graph.nodes[0].id]  # Start from the first node
    sequence = []  # List to store the BFS sequence

    while queue:
        current = queue.pop(0)  # Get the next node from the front of the queue
        if current not in visited:  # If the node has not been visited
            visited.add(current)  # Mark the node as visited
            sequence.append(current)  # Add the node to the BFS sequence
            for edge in edges:  # Check all edges in the graph
                if (
                    edge.source == current and edge.target not in visited
                ):  # If the edge starts from the current node and the target node has not been visited
                    queue.append(edge.target)  # Add the target node to the queue

    return sequence


def generate_dfs_sequence(graph: GraphDTO) -> list[int]:
    nodes = {
        node.id: node for node in graph.nodes
    }  # Create a dictionary of nodes for easy access
    edges = graph.edges

    visited = set()  # Set to keep track of visited nodes
    stack = [graph.nodes[0].id]  # Start from the first node
    sequence = []  # List to store the DFS sequence

    while stack:
        current = stack.pop()  # Get the next node from the top of the stack
        if current not in visited:  # If the node has not been visited
            visited.add(current)  # Mark the node as visited
            sequence.append(current)  # Add the node to the DFS sequence
            for edge in edges:  # Check all edges in the graph
                if (
                    edge.source == current and edge.target not in visited
                ):  # If the edge starts from the current node and the target node has not been visited
                    stack.append(edge.target)  # Add the target node to the stack

    return sequence


def generate_random_graph(num_nodes: int) -> GraphDTO:
    nodes = [
        NodeDTO(id=i, x=0, y=0) for i in range(num_nodes)
    ]  # Create a list of nodes with unique IDs
    edges = []

    # Create a tree-like structure
    for i in range(1, num_nodes):
        parent = random.randint(
            0, i - 1
        )  # Each node connects to a random previous node
        edges.append(
            EdgeDTO(source=parent, target=i)
        )  # Add an edge from the parent node to the current node

    return GraphDTO(nodes=nodes, edges=edges)  # Return the generated graph
