from models import GraphDTO, GraphSnapshotDTO, NodeDTO

def generate_bfs_snapshots(graph: GraphDTO) -> list[GraphSnapshotDTO]:
    nodes = {node.id: node for node in graph.nodes}
    edges = graph.edges

    visited = set()
    queue = [graph.nodes[0].id]  # Start from the first node
    snapshots = []

    while queue:
        current = queue.pop(0)
        if current not in visited:
            visited.add(current)
            for edge in edges:
                if edge.source == current and edge.target not in visited:
                    queue.append(edge.target)
            # Create a snapshot
            snapshot_nodes = [NodeDTO(id=node.id, x=node.x, y=node.y, visited=node.id in visited) for node in nodes.values()]
            snapshots.append(GraphSnapshotDTO(
                nodes=snapshot_nodes,
                edges=edges,
                traversal_name="BFS",
                current_node=current,
                visited_nodes=list(visited)
            ))

    return snapshots

def generate_dfs_snapshots(graph: GraphDTO) -> list[GraphSnapshotDTO]:
    nodes = {node.id: node for node in graph.nodes}
    edges = graph.edges

    visited = set()
    stack = [graph.nodes[0].id]  # Start from the first node
    snapshots = []

    while stack:
        current = stack.pop()
        if current not in visited:
            visited.add(current)
            for edge in edges:
                if edge.source == current and edge.target not in visited:
                    stack.append(edge.target)
            # Create a snapshot
            snapshot_nodes = [NodeDTO(id=node.id, x=node.x, y=node.y, visited=node.id in visited) for node in nodes.values()]
            snapshots.append(GraphSnapshotDTO(
                nodes=snapshot_nodes,
                edges=edges,
                traversal_name="DFS",
                current_node=current,
                visited_nodes=list(visited)
            ))

    return snapshots
