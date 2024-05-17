from flask import Flask, request, jsonify
from flask_cors import CORS
from graph_algorithms import (
    generate_bfs_sequence,
    generate_dfs_sequence,
    generate_random_graph,
)
from models import GraphDTO

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes and origins


@app.route("/traversal/bfs", methods=["POST"])
def get_bfs_traversal():
    try:
        graph_data = request.json
        graph = GraphDTO(**graph_data)
        bfs_sequence = generate_bfs_sequence(graph)
        return jsonify(bfs_sequence)
    except Exception as e:
        print(f"Error in get_bfs_traversal: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/traversal/dfs", methods=["POST"])
def get_dfs_traversal():
    try:
        graph_data = request.json
        graph = GraphDTO(**graph_data)
        dfs_sequence = generate_dfs_sequence(graph)
        return jsonify(dfs_sequence)
    except Exception as e:
        print(f"Error in get_dfs_traversal: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/generate_graph", methods=["POST"])
def generate_graph():
    try:
        num_nodes = request.json.get(
            "num_nodes", 10
        )  # Default to 10 nodes if not provided
        print(f"Received request to generate graph with {num_nodes} nodes")
        graph = generate_random_graph(num_nodes)
        print(f"Generated graph: {graph}")
        return jsonify(graph.dict())
    except Exception as e:
        print(f"Error in generate_graph: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5001)
