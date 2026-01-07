/**
 * GRAPH REPRESENTATION
 */

// Adjacency List
class Graph {
    constructor(directed = false) {
        this.adjList = new Map();
        this.directed = directed;
    }
    
    addVertex(v) { if (!this.adjList.has(v)) this.adjList.set(v, []); }
    
    addEdge(v1, v2, weight = 1) {
        this.addVertex(v1); this.addVertex(v2);
        this.adjList.get(v1).push({ node: v2, weight });
        if (!this.directed) this.adjList.get(v2).push({ node: v1, weight });
    }
    
    getNeighbors(v) { return this.adjList.get(v) || []; }
    getVertices() { return Array.from(this.adjList.keys()); }
}

// Adjacency Matrix
class GraphMatrix {
    constructor(n) {
        this.n = n;
        this.matrix = Array(n).fill(null).map(() => Array(n).fill(0));
    }
    
    addEdge(i, j, weight = 1, directed = false) {
        this.matrix[i][j] = weight;
        if (!directed) this.matrix[j][i] = weight;
    }
    
    hasEdge(i, j) { return this.matrix[i][j] !== 0; }
}

// Build from edges
function buildAdjList(n, edges) {
    const adj = Array(n).fill(null).map(() => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }
    return adj;
}

module.exports = { Graph, GraphMatrix, buildAdjList };
