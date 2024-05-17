from flask import Flask, request, jsonify
from flask_cors import CORS
from graph_algorithms import generate_bfs_sequence, generate_dfs_sequence
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
        return jsonify({"error": str(e)}), 500


@app.route("/traversal/dfs", methods=["POST"])
def get_dfs_traversal():
    try:
        graph_data = request.json
        graph = GraphDTO(**graph_data)
        dfs_sequence = generate_dfs_sequence(graph)
        return jsonify(dfs_sequence)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
