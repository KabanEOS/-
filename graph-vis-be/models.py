from pydantic import BaseModel
from typing import List


class NodeDTO(BaseModel):
    id: int
    x: int
    y: int


class EdgeDTO(BaseModel):
    source: int
    target: int


class GraphDTO(BaseModel):
    nodes: List[NodeDTO]
    edges: List[EdgeDTO]
