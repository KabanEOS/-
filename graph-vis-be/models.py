from pydantic import BaseModel
from typing import List, Dict

class NodeDTO(BaseModel):
    id: int
    x: int
    y: int
    visited: bool = False

class EdgeDTO(BaseModel):
    source: int
    target: int

class GraphSnapshotDTO(BaseModel):
    nodes: List[NodeDTO]
    edges: List[EdgeDTO]
    traversal_name: str
    current_node: int
    visited_nodes: List[int]

class GraphDTO(BaseModel):
    nodes: List[NodeDTO]
    edges: List[EdgeDTO]
