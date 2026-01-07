/**
 * ============================================
 * MINIMUM SPANNING TREE (MST)
 * ============================================
 * 
 * CONCEPT:
 * A Minimum Spanning Tree is a subset of edges that connects all vertices
 * in a weighted undirected graph with minimum total edge weight, without cycles.
 * 
 * Properties:
 * - Connects all V vertices
 * - Uses exactly V-1 edges
 * - No cycles
 * - Minimum possible total weight
 * 
 * REAL-WORLD ANALOGY:
 * Connecting Cities with Roads:
 * - You need to connect all cities
 * - Building roads costs money (edge weights)
 * - Goal: Connect everyone with minimum cost
 * - No need for redundant roads (no cycles)
 * 
 * INDUSTRY APPLICATIONS:
 * - Network design (minimum cable to connect computers)
 * - Circuit design
 * - Cluster analysis
 * - Approximation algorithms for NP-hard problems
 * 
 * TWO MAIN ALGORITHMS:
 * | Algorithm  | Approach        | Best For        | Complexity    |
 * |------------|-----------------|-----------------|---------------|
 * | Kruskal's  | Edge-based      | Sparse graphs   | O(E log E)    |
 * | Prim's     | Vertex-based    | Dense graphs    | O(E log V)    |
 */

// ============================================
// 1. UNION-FIND (Disjoint Set Union)
// ============================================

/**
 * Union-Find is essential for Kruskal's algorithm
 * Efficiently answers: "Are these two nodes connected?"
 */
class UnionFind {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = new Array(n).fill(0);
    }
    
    /**
     * Find with path compression
     * Makes future queries faster
     */
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }
    
    /**
     * Union by rank
     * Keeps trees balanced
     */
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        
        if (rootX === rootY) return false; // Already connected
        
        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
        
        return true;
    }
    
    connected(x, y) {
        return this.find(x) === this.find(y);
    }
}

// ============================================
// 2. KRUSKAL'S ALGORITHM
// ============================================

/**
 * Kruskal's Algorithm:
 * 1. Sort all edges by weight
 * 2. Pick smallest edge that doesn't form cycle
 * 3. Repeat until we have V-1 edges
 * 
 * Uses Union-Find to detect cycles efficiently
 * 
 * Time: O(E log E) for sorting
 * Space: O(V) for Union-Find
 */
function kruskal(n, edges) {
    // edges: [[u, v, weight], ...]
    
    // Sort by weight
    edges.sort((a, b) => a[2] - b[2]);
    
    const uf = new UnionFind(n);
    const mst = [];
    let totalWeight = 0;
    
    for (const [u, v, weight] of edges) {
        // If adding this edge doesn't create cycle
        if (uf.union(u, v)) {
            mst.push([u, v, weight]);
            totalWeight += weight;
            
            // MST is complete when we have V-1 edges
            if (mst.length === n - 1) break;
        }
    }
    
    // Check if MST exists (graph is connected)
    if (mst.length !== n - 1) {
        return null; // Graph is disconnected
    }
    
    return { mst, totalWeight };
}

// ============================================
// 3. PRIM'S ALGORITHM
// ============================================

/**
 * Prim's Algorithm:
 * 1. Start from any vertex
 * 2. Always pick minimum edge connecting to unvisited vertex
 * 3. Repeat until all vertices included
 * 
 * Similar to Dijkstra but different goal:
 * - Dijkstra: Total distance from source
 * - Prim's: Minimum spanning tree
 * 
 * Time: O(E log V) with min-heap
 * Space: O(V + E)
 */
function prim(n, edges) {
    // Build adjacency list
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v, weight] of edges) {
        adj[u].push([v, weight]);
        adj[v].push([u, weight]);
    }
    
    const visited = new Set();
    const mst = [];
    let totalWeight = 0;
    
    // Min-heap: [weight, from, to]
    // Start from vertex 0
    const pq = [[0, -1, 0]]; // [weight, parent, node]
    
    while (pq.length && visited.size < n) {
        // Get minimum weight edge
        pq.sort((a, b) => a[0] - b[0]);
        const [weight, parent, node] = pq.shift();
        
        if (visited.has(node)) continue;
        
        visited.add(node);
        
        if (parent !== -1) {
            mst.push([parent, node, weight]);
            totalWeight += weight;
        }
        
        // Add all edges from this node
        for (const [neighbor, edgeWeight] of adj[node]) {
            if (!visited.has(neighbor)) {
                pq.push([edgeWeight, node, neighbor]);
            }
        }
    }
    
    if (visited.size !== n) {
        return null; // Graph is disconnected
    }
    
    return { mst, totalWeight };
}

// ============================================
// 4. OPTIMIZED PRIM'S WITH PROPER MIN-HEAP
// ============================================

class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    push(item) {
        this.heap.push(item);
        this._bubbleUp(this.heap.length - 1);
    }
    
    pop() {
        if (!this.heap.length) return null;
        const min = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length) {
            this.heap[0] = last;
            this._bubbleDown(0);
        }
        return min;
    }
    
    _bubbleUp(i) {
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (this.heap[parent][0] <= this.heap[i][0]) break;
            [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
            i = parent;
        }
    }
    
    _bubbleDown(i) {
        const n = this.heap.length;
        while (true) {
            const left = 2 * i + 1, right = 2 * i + 2;
            let smallest = i;
            if (left < n && this.heap[left][0] < this.heap[smallest][0]) smallest = left;
            if (right < n && this.heap[right][0] < this.heap[smallest][0]) smallest = right;
            if (smallest === i) break;
            [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
            i = smallest;
        }
    }
    
    get length() { return this.heap.length; }
}

function primOptimized(n, edges) {
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v, weight] of edges) {
        adj[u].push([v, weight]);
        adj[v].push([u, weight]);
    }
    
    const visited = new Set();
    const mst = [];
    let totalWeight = 0;
    
    const pq = new MinHeap();
    pq.push([0, -1, 0]);
    
    while (pq.length && visited.size < n) {
        const [weight, parent, node] = pq.pop();
        
        if (visited.has(node)) continue;
        visited.add(node);
        
        if (parent !== -1) {
            mst.push([parent, node, weight]);
            totalWeight += weight;
        }
        
        for (const [neighbor, edgeWeight] of adj[node]) {
            if (!visited.has(neighbor)) {
                pq.push([edgeWeight, node, neighbor]);
            }
        }
    }
    
    return visited.size === n ? { mst, totalWeight } : null;
}

// ============================================
// 5. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1: Min Cost to Connect All Points
 */
function minCostConnectPoints(points) {
    const n = points.length;
    const edges = [];
    
    // Build all edges with Manhattan distance
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const dist = Math.abs(points[i][0] - points[j][0]) + 
                        Math.abs(points[i][1] - points[j][1]);
            edges.push([i, j, dist]);
        }
    }
    
    const result = kruskal(n, edges);
    return result ? result.totalWeight : -1;
}

/**
 * Problem 2: Connecting Cities With Minimum Cost
 */
function minimumCost(n, connections) {
    const edges = connections.map(([u, v, w]) => [u - 1, v - 1, w]);
    const result = kruskal(n, edges);
    return result ? result.totalWeight : -1;
}

/**
 * Problem 3: Find Critical and Pseudo-Critical Edges
 */
function findCriticalAndPseudoCriticalEdges(n, edges) {
    // Add original indices
    const edgesWithIndex = edges.map((e, i) => [...e, i]);
    edgesWithIndex.sort((a, b) => a[2] - b[2]);
    
    // Get standard MST weight
    const stdWeight = getMSTWeight(n, edgesWithIndex, -1, -1);
    
    const critical = [];
    const pseudoCritical = [];
    
    for (let i = 0; i < edges.length; i++) {
        // Check if critical (excluding this edge increases weight)
        if (getMSTWeight(n, edgesWithIndex, i, -1) > stdWeight) {
            critical.push(edgesWithIndex[i][3]);
        } 
        // Check if pseudo-critical (including this edge gives same weight)
        else if (getMSTWeight(n, edgesWithIndex, -1, i) === stdWeight) {
            pseudoCritical.push(edgesWithIndex[i][3]);
        }
    }
    
    return [critical, pseudoCritical];
}

function getMSTWeight(n, edges, exclude, include) {
    const uf = new UnionFind(n);
    let weight = 0;
    let edgeCount = 0;
    
    // Force include this edge
    if (include !== -1) {
        uf.union(edges[include][0], edges[include][1]);
        weight += edges[include][2];
        edgeCount++;
    }
    
    for (let i = 0; i < edges.length; i++) {
        if (i === exclude) continue;
        const [u, v, w] = edges[i];
        if (uf.union(u, v)) {
            weight += w;
            edgeCount++;
        }
    }
    
    return edgeCount === n - 1 ? weight : Infinity;
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * MST CHEAT SHEET:
 * 
 * KRUSKAL'S:
 * 1. Sort edges by weight
 * 2. Pick smallest edge that doesn't create cycle
 * 3. Use Union-Find for cycle detection
 * 
 * PRIM'S:
 * 1. Start from any vertex
 * 2. Always pick minimum edge to unvisited vertex
 * 3. Use min-heap for efficiency
 * 
 * COMPARISON:
 * | Aspect        | Kruskal's        | Prim's           |
 * |---------------|------------------|------------------|
 * | Approach      | Edge-based       | Vertex-based     |
 * | Best for      | Sparse graphs    | Dense graphs     |
 * | Data struct   | Union-Find       | Min-Heap         |
 * | Complexity    | O(E log E)       | O(E log V)       |
 * 
 * MST PROPERTIES:
 * - V vertices → V-1 edges
 * - No cycles
 * - Minimum total weight
 * - May not be unique (multiple MSTs possible)
 * 
 * INTERVIEW TIP:
 * Know both algorithms and when to use each!
 */

module.exports = { 
    UnionFind, 
    kruskal, 
    prim, 
    primOptimized,
    minCostConnectPoints,
    minimumCost,
    findCriticalAndPseudoCriticalEdges
};
