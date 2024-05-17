from models import GraphDTO


def generate_bfs_sequence(graph: GraphDTO) -> list[int]:
    nodes = {node.id: node for node in graph.nodes}
    edges = graph.edges

    visited = set()
    queue = [graph.nodes[0].id]  # Start from the first node
    sequence = []

    while queue:
        current = queue.pop(0)
        if current not in visited:
            visited.add(current)
            sequence.append(current)
            for edge in edges:
                if edge.source == current and edge.target not in visited:
                    queue.append(edge.target)

    return sequence


def generate_dfs_sequence(graph: GraphDTO) -> list[int]:
    nodes = {node.id: node for node in graph.nodes}
    edges = graph.edges

    visited = set()
    stack = [graph.nodes[0].id]  # Start from the first node
    sequence = []

    while stack:
        current = stack.pop()
        if current not in visited:
            visited.add(current)
            sequence.append(current)
            for edge in edges:
                if edge.source == current and edge.target not in visited:
                    stack.append(edge.target)

    return sequence
