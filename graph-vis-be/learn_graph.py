# In learn_graph.py
import random
from models import GraphDTO, NodeDTO, EdgeDTO


def generate_random_graph(num_nodes: int, num_edges: int = None, connectivity: str = "random", **kwargs) -> GraphDTO:
    """
    Generates a random graph with the specified number of nodes and edges.

    :param num_nodes: The number of nodes in the graph.
    :param num_edges: The number of edges in the graph (default is random).
    :param connectivity: The type of graph connectivity. Currently supports 'random', 'tree', and 'complete'.
    :param kwargs: Additional parameters for specific graph types.
    :return: A GraphDTO object representing the generated graph.
    """
    nodes = [NodeDTO(id=i, x=0, y=0) for i in range(num_nodes)]
    edges = []

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
        # Generate a random graph
        if num_edges is None:
            num_edges = num_nodes * 2  # Default to twice the number of nodes
        all_possible_edges = [
            (i, j) for i in range(num_nodes) for j in range(num_nodes) if i != j
        ]
        random.shuffle(all_possible_edges)
        selected_edges = all_possible_edges[:num_edges]
        for edge in selected_edges:
            source, target = edge
            edges.append(EdgeDTO(source=source, target=target))

    return GraphDTO(nodes=nodes, edges=edges)
