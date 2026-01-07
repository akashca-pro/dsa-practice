/**
 * ============================================
 * GRAPH REPRESENTATIONS
 * ============================================
 * 
 * CONCEPT:
 * A graph is a non-linear data structure consisting of vertices (nodes)
 * connected by edges. Graphs can represent any relationship between entities.
 * 
 * Types of Graphs:
 * - Directed vs Undirected: Edges have direction or not
 * - Weighted vs Unweighted: Edges have costs or not
 * - Cyclic vs Acyclic: Contains cycles or not
 * - Connected vs Disconnected: All vertices reachable or not
 * 
 * REAL-WORLD ANALOGY:
 * Think of a social network:
 * - People are vertices (nodes)
 * - Friendships are edges
 * - Directed: Twitter follows (A follows B doesn't mean B follows A)
 * - Undirected: Facebook friends (mutual relationship)
 * - Weighted: Travel routes (distances between cities)
 * 
 * INDUSTRY APPLICATIONS:
 * - Social networks (friend connections)
 * - Maps and navigation (shortest routes)
 * - Internet (network routing)
 * - Recommendation systems
 * - Dependency resolution (package managers)
 * - Workflow scheduling (task dependencies)
 * 
 * REPRESENTATION COMPARISON:
 * | Aspect          | Adjacency List    | Adjacency Matrix |
 * |-----------------|-------------------|------------------|
 * | Space           | O(V + E)          | O(V²)            |
 * | Add Edge        | O(1)              | O(1)             |
 * | Remove Edge     | O(E)              | O(1)             |
 * | Check Edge      | O(V)              | O(1)             |
 * | Get Neighbors   | O(1)              | O(V)             |
 * | Best for        | Sparse graphs     | Dense graphs     |
 */

// ============================================
// 1. ADJACENCY LIST REPRESENTATION
// ============================================

/**
 * Adjacency List: Each vertex stores a list of its neighbors
 * 
 * Example Graph:
 *     A --- B
 *     |     |
 *     C --- D
 * 
 * Adjacency List:
 * A: [B, C]
 * B: [A, D]
 * C: [A, D]
 * D: [B, C]
 * 
 * Best for: Sparse graphs (E << V²)
 * Most graph algorithms work well with this representation
 */
class Graph {
    constructor(directed = false) {
        this.adjList = new Map();
        this.directed = directed;
    }
    
    /**
     * Add a vertex to the graph - O(1)
     */
    addVertex(v) {
        if (!this.adjList.has(v)) {
            this.adjList.set(v, []);
        }
    }
    
    /**
     * Add an edge between two vertices - O(1)
     * For weighted graphs, store {node, weight} objects
     */
    addEdge(v1, v2, weight = 1) {
        this.addVertex(v1);
        this.addVertex(v2);
        
        this.adjList.get(v1).push({ node: v2, weight });
        
        // For undirected graphs, add reverse edge
        if (!this.directed) {
            this.adjList.get(v2).push({ node: v1, weight });
        }
    }
    
    /**
     * Remove an edge - O(E) in worst case
     */
    removeEdge(v1, v2) {
        const neighbors1 = this.adjList.get(v1);
        if (neighbors1) {
            const idx = neighbors1.findIndex(n => n.node === v2);
            if (idx !== -1) neighbors1.splice(idx, 1);
        }
        
        if (!this.directed) {
            const neighbors2 = this.adjList.get(v2);
            if (neighbors2) {
                const idx = neighbors2.findIndex(n => n.node === v1);
                if (idx !== -1) neighbors2.splice(idx, 1);
            }
        }
    }
    
    /**
     * Get all neighbors of a vertex - O(1)
     */
    getNeighbors(v) {
        return this.adjList.get(v) || [];
    }
    
    /**
     * Get all vertices - O(V)
     */
    getVertices() {
        return Array.from(this.adjList.keys());
    }
    
    /**
     * Check if edge exists - O(degree of v1)
     */
    hasEdge(v1, v2) {
        const neighbors = this.adjList.get(v1);
        return neighbors ? neighbors.some(n => n.node === v2) : false;
    }
    
    /**
     * Get number of vertices
     */
    vertexCount() {
        return this.adjList.size;
    }
    
    /**
     * Get number of edges
     */
    edgeCount() {
        let count = 0;
        for (const neighbors of this.adjList.values()) {
            count += neighbors.length;
        }
        return this.directed ? count : count / 2;
    }
}

// ============================================
// 2. ADJACENCY MATRIX REPRESENTATION
// ============================================

/**
 * Adjacency Matrix: 2D array where matrix[i][j] = edge weight
 * 
 * Example Graph:
 *     0 --- 1
 *     |     |
 *     2 --- 3
 * 
 * Adjacency Matrix:
 *      0  1  2  3
 *   0 [0, 1, 1, 0]
 *   1 [1, 0, 0, 1]
 *   2 [1, 0, 0, 1]
 *   3 [0, 1, 1, 0]
 * 
 * Best for: Dense graphs (E ≈ V²), quick edge lookups
 */
class GraphMatrix {
    constructor(n) {
        this.n = n;
        // Initialize n×n matrix with zeros
        this.matrix = Array(n).fill(null).map(() => Array(n).fill(0));
    }
    
    /**
     * Add an edge - O(1)
     */
    addEdge(i, j, weight = 1, directed = false) {
        this.matrix[i][j] = weight;
        if (!directed) {
            this.matrix[j][i] = weight;
        }
    }
    
    /**
     * Remove an edge - O(1)
     */
    removeEdge(i, j, directed = false) {
        this.matrix[i][j] = 0;
        if (!directed) {
            this.matrix[j][i] = 0;
        }
    }
    
    /**
     * Check if edge exists - O(1)
     */
    hasEdge(i, j) {
        return this.matrix[i][j] !== 0;
    }
    
    /**
     * Get edge weight - O(1)
     */
    getWeight(i, j) {
        return this.matrix[i][j];
    }
    
    /**
     * Get all neighbors of a vertex - O(V)
     */
    getNeighbors(v) {
        const neighbors = [];
        for (let i = 0; i < this.n; i++) {
            if (this.matrix[v][i] !== 0) {
                neighbors.push({ node: i, weight: this.matrix[v][i] });
            }
        }
        return neighbors;
    }
}

// ============================================
// 3. BUILD FROM EDGE LIST
// ============================================

/**
 * Convert edge list to adjacency list
 * Edge list: [[0,1], [0,2], [1,3], [2,3]]
 * 
 * This is the most common input format in interview problems
 */
function buildAdjList(n, edges) {
    const adj = Array(n).fill(null).map(() => []);
    
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u); // Remove for directed graph
    }
    
    return adj;
}

/**
 * Build weighted adjacency list
 * Edge list with weights: [[0,1,5], [0,2,3], [1,3,2]]
 */
function buildWeightedAdjList(n, edges) {
    const adj = Array(n).fill(null).map(() => []);
    
    for (const [u, v, w] of edges) {
        adj[u].push({ node: v, weight: w });
        adj[v].push({ node: u, weight: w });
    }
    
    return adj;
}

/**
 * Build adjacency matrix from edge list
 */
function buildAdjMatrix(n, edges) {
    const matrix = Array(n).fill(null).map(() => Array(n).fill(0));
    
    for (const [u, v] of edges) {
        matrix[u][v] = 1;
        matrix[v][u] = 1;
    }
    
    return matrix;
}

// ============================================
// 4. COMMON MISTAKES & EDGE CASES
// ============================================

/**
 * Mistake 1: Forgetting to add reverse edge for undirected graphs
 * 
 * Mistake 2: Using wrong representation for the problem
 * - Use adjacency list for most algorithms
 * - Use matrix only when you need O(1) edge lookup
 * 
 * Mistake 3: Off-by-one errors with 0-indexed vs 1-indexed vertices
 * 
 * Edge Cases:
 * - Empty graph (no vertices)
 * - Single vertex (no edges)
 * - Disconnected graph (multiple components)
 * - Self-loops (edge from vertex to itself)
 * - Parallel edges (multiple edges between same vertices)
 */

// ============================================
// 5. INTERVIEW PERSPECTIVE
// ============================================

/**
 * When to use which representation:
 * 
 * ADJACENCY LIST (most common):
 * - BFS/DFS traversal
 * - Finding connected components
 * - Topological sort
 * - Most shortest path algorithms
 * 
 * ADJACENCY MATRIX:
 * - Dense graphs
 * - When you need O(1) edge lookup
 * - Floyd-Warshall algorithm
 * - When V is small (n ≤ 1000)
 * 
 * Questions to ask:
 * - Is the graph directed or undirected?
 * - Is it weighted?
 * - How dense is it? (E compared to V²)
 * - What operations do I need? (traversal vs edge lookup)
 */

// ============================================
// 6. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Easy): Count edges in undirected graph
 */
function countEdges(adjList) {
    let count = 0;
    for (const neighbors of adjList) {
        count += neighbors.length;
    }
    return count / 2; // Each edge counted twice
}

/**
 * Problem 2 (Easy): Find degree of each vertex
 */
function getDegrees(adjList) {
    return adjList.map(neighbors => neighbors.length);
}

/**
 * Problem 3 (Medium): Check if graph is bipartite
 */
function isBipartite(adjList) {
    const n = adjList.length;
    const colors = new Array(n).fill(-1);
    
    const bfs = (start) => {
        const queue = [start];
        colors[start] = 0;
        
        while (queue.length) {
            const node = queue.shift();
            
            for (const neighbor of adjList[node]) {
                if (colors[neighbor] === -1) {
                    colors[neighbor] = 1 - colors[node];
                    queue.push(neighbor);
                } else if (colors[neighbor] === colors[node]) {
                    return false;
                }
            }
        }
        return true;
    };
    
    for (let i = 0; i < n; i++) {
        if (colors[i] === -1 && !bfs(i)) {
            return false;
        }
    }
    
    return true;
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * GRAPH REPRESENTATION CHEAT SHEET:
 * 
 * ADJACENCY LIST:
 * - Space: O(V + E)
 * - Best for: Sparse graphs, most algorithms
 * - Pros: Memory efficient, fast neighbor iteration
 * - Cons: O(V) edge lookup
 * 
 * ADJACENCY MATRIX:
 * - Space: O(V²)
 * - Best for: Dense graphs, quick edge lookup
 * - Pros: O(1) edge check
 * - Cons: Memory intensive for large sparse graphs
 * 
 * COMMON INPUT FORMATS:
 * - Edge list: [[0,1], [1,2], [2,0]]
 * - Adjacency list: [[1,2], [0,2], [0,1]]
 * - Adjacency matrix: [[0,1,1], [1,0,1], [1,1,0]]
 * 
 * INTERVIEW TIP:
 * Most interview problems give edge lists.
 * First step is usually to build an adjacency list!
 */

module.exports = { 
    Graph, 
    GraphMatrix, 
    buildAdjList, 
    buildWeightedAdjList, 
    buildAdjMatrix,
    countEdges,
    getDegrees,
    isBipartite
};
