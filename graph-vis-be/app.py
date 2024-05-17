from flask import Flask, request, jsonify
from flask_cors import CORS
from graph_algorithms import generate_bfs_snapshots, generate_dfs_snapshots
from models import GraphDTO

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes and origins

@app.route('/traversal/bfs', methods=['POST'])
def get_bfs_traversal():
    graph_data = request.json
    graph = GraphDTO(**graph_data)
    bfs_snapshots = generate_bfs_snapshots(graph)
    return jsonify([snapshot.dict() for snapshot in bfs_snapshots])

@app.route('/traversal/dfs', methods=['POST'])
def get_dfs_traversal():
    graph_data = request.json
    graph = GraphDTO(**graph_data)
    dfs_snapshots = generate_dfs_snapshots(graph)
    return jsonify([snapshot.dict() for snapshot in dfs_snapshots])

if __name__ == '__main__':
    app.run(debug=True)
