/**
 * ============================================
 * SHORTEST PATH ALGORITHMS
 * ============================================
 * 
 * CONCEPT:
 * Shortest path algorithms find the minimum-cost path between nodes
 * in a weighted graph. Different algorithms handle different scenarios.
 * 
 * ALGORITHM COMPARISON:
 * | Algorithm      | Graph Type        | Negative Edges | Time         |
 * |----------------|-------------------|----------------|--------------|
 * | BFS            | Unweighted        | N/A            | O(V + E)     |
 * | Dijkstra       | Weighted (pos)    | No             | O(E log V)   |
 * | Bellman-Ford   | Weighted          | Yes            | O(V × E)     |
 * | Floyd-Warshall | All pairs         | Yes            | O(V³)        |
 * 
 * REAL-WORLD ANALOGY:
 * GPS Navigation:
 * - Intersections are nodes
 * - Roads are edges with travel time (weight)
 * - Find fastest route from A to B
 * - Account for traffic (varying weights)
 * 
 * INDUSTRY APPLICATIONS:
 * - Navigation systems (Google Maps)
 * - Network routing protocols
 * - Social network analysis (degrees of separation)
 * - Airline flight optimization
 * - Supply chain logistics
 */

// ============================================
// 1. DIJKSTRA'S ALGORITHM
// ============================================

/**
 * Dijkstra: Single-source shortest path for POSITIVE weights
 * 
 * Algorithm:
 * 1. Initialize distances: source = 0, all others = ∞
 * 2. Use priority queue to process nodes by distance
 * 3. For each node, update distances to neighbors
 * 4. Skip if we've already found a better path
 * 
 * Greedy approach: Always process closest unvisited node
 * 
 * Time: O(E log V) with min-heap
 * Space: O(V) for distances
 */
function dijkstra(graph, start) {
    const dist = new Map();
    dist.set(start, 0);
    
    // Priority queue: [distance, node]
    // Note: Using array + sort for simplicity
    // Use proper min-heap for production
    const pq = [[0, start]];
    
    while (pq.length) {
        // Get closest node (min-heap would be O(log V))
        pq.sort((a, b) => a[0] - b[0]);
        const [d, node] = pq.shift();
        
        // Skip if we've found a better path
        if (d > (dist.get(node) ?? Infinity)) continue;
        
        // Explore neighbors
        for (const { node: neighbor, weight } of (graph.get(node) || [])) {
            const newDist = d + weight;
            
            // Found a shorter path
            if (newDist < (dist.get(neighbor) ?? Infinity)) {
                dist.set(neighbor, newDist);
                pq.push([newDist, neighbor]);
            }
        }
    }
    
    return dist;
}

/**
 * Dijkstra with path reconstruction
 */
function dijkstraWithPath(graph, start, end) {
    const dist = new Map();
    const prev = new Map(); // Track previous node for path
    dist.set(start, 0);
    
    const pq = [[0, start]];
    
    while (pq.length) {
        pq.sort((a, b) => a[0] - b[0]);
        const [d, node] = pq.shift();
        
        if (node === end) break;
        if (d > (dist.get(node) ?? Infinity)) continue;
        
        for (const { node: neighbor, weight } of (graph.get(node) || [])) {
            const newDist = d + weight;
            
            if (newDist < (dist.get(neighbor) ?? Infinity)) {
                dist.set(neighbor, newDist);
                prev.set(neighbor, node);
                pq.push([newDist, neighbor]);
            }
        }
    }
    
    // Reconstruct path
    if (!dist.has(end)) return null;
    
    const path = [];
    let current = end;
    while (current !== undefined) {
        path.unshift(current);
        current = prev.get(current);
    }
    
    return { distance: dist.get(end), path };
}

// ============================================
// 2. BELLMAN-FORD ALGORITHM
// ============================================

/**
 * Bellman-Ford: Handles NEGATIVE edge weights
 * 
 * Algorithm:
 * 1. Initialize distances: source = 0, all others = ∞
 * 2. Repeat V-1 times: relax all edges
 * 3. Do one more iteration to detect negative cycle
 * 
 * Why V-1 iterations?
 * - Shortest path has at most V-1 edges
 * - Each iteration guarantees one more edge is correct
 * 
 * Time: O(V × E)
 * Space: O(V)
 */
function bellmanFord(n, edges, start) {
    const dist = new Array(n).fill(Infinity);
    dist[start] = 0;
    
    // Relax all edges V-1 times
    for (let i = 0; i < n - 1; i++) {
        for (const [u, v, w] of edges) {
            if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    
    // Check for negative cycle
    // If we can still relax, there's a negative cycle
    for (const [u, v, w] of edges) {
        if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
            return null; // Negative cycle detected
        }
    }
    
    return dist;
}

// ============================================
// 3. FLOYD-WARSHALL ALGORITHM
// ============================================

/**
 * Floyd-Warshall: ALL pairs shortest path
 * 
 * Algorithm:
 * For each node k as intermediate:
 *   For each pair (i, j):
 *     dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
 * 
 * Key insight: Consider each node as potential waypoint
 * 
 * Time: O(V³)
 * Space: O(V²)
 * 
 * Use when: Need shortest path between ALL pairs
 */
function floydWarshall(n, edges) {
    // Initialize distance matrix
    const dist = Array(n).fill(null).map(() => Array(n).fill(Infinity));
    
    // Distance to self is 0
    for (let i = 0; i < n; i++) {
        dist[i][i] = 0;
    }
    
    // Add edges
    for (const [u, v, w] of edges) {
        dist[u][v] = w;
    }
    
    // Main algorithm: try each node as intermediate
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    
    return dist;
}

// ============================================
// 4. NETWORK DELAY TIME (CLASSIC PROBLEM)
// ============================================

/**
 * Time for signal to reach all nodes from source
 * Classic Dijkstra application
 */
function networkDelayTime(times, n, k) {
    // Build adjacency list
    const graph = new Map();
    for (const [u, v, w] of times) {
        if (!graph.has(u)) graph.set(u, []);
        graph.get(u).push({ node: v, weight: w });
    }
    
    // Run Dijkstra from source k
    const dist = dijkstra(graph, k);
    
    // Find max time (that's when all are reached)
    let maxTime = 0;
    for (let i = 1; i <= n; i++) {
        if (!dist.has(i)) return -1; // Node not reachable
        maxTime = Math.max(maxTime, dist.get(i));
    }
    
    return maxTime;
}

// ============================================
// 5. COMMON MISTAKES & EDGE CASES
// ============================================

/**
 * Mistake 1: Using Dijkstra with negative edges
 * Dijkstra fails with negative edges. Use Bellman-Ford.
 * 
 * Mistake 2: Not detecting negative cycles
 * With negative cycles, there's no shortest path (goes to -∞)
 * 
 * Mistake 3: Processing already-finalized nodes
 * In Dijkstra, skip if current distance > stored distance
 * 
 * Edge Cases:
 * - Source equals destination (distance = 0)
 * - Disconnected graph (some nodes unreachable)
 * - Self-loops
 * - Parallel edges (multiple edges between same nodes)
 */

// ============================================
// 6. INTERVIEW PERSPECTIVE
// ============================================

/**
 * CHOOSING THE RIGHT ALGORITHM:
 * 
 * Unweighted graph → BFS (O(V + E))
 * 
 * Weighted, positive edges → Dijkstra (O(E log V))
 * 
 * Weighted, negative edges → Bellman-Ford (O(V × E))
 * 
 * All pairs shortest path → Floyd-Warshall (O(V³))
 * 
 * COMMON INTERVIEW PATTERNS:
 * - "Minimum time/cost to reach" → Dijkstra
 * - "Can you detect negative cycle?" → Bellman-Ford
 * - "Cheapest flight with K stops" → Modified Bellman-Ford
 */

// ============================================
// 7. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Medium): Cheapest Flights Within K Stops
 */
function findCheapestPrice(n, flights, src, dst, k) {
    // Bellman-Ford variant: exactly k+1 relaxations
    let prices = new Array(n).fill(Infinity);
    prices[src] = 0;
    
    for (let i = 0; i <= k; i++) {
        const temp = [...prices];
        
        for (const [from, to, price] of flights) {
            if (prices[from] !== Infinity) {
                temp[to] = Math.min(temp[to], prices[from] + price);
            }
        }
        
        prices = temp;
    }
    
    return prices[dst] === Infinity ? -1 : prices[dst];
}

/**
 * Problem 2 (Medium): Path with Minimum Effort
 */
function minimumEffortPath(heights) {
    const rows = heights.length, cols = heights[0].length;
    const effort = Array(rows).fill(null).map(() => Array(cols).fill(Infinity));
    const pq = [[0, 0, 0]]; // [effort, row, col]
    effort[0][0] = 0;
    
    const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
    
    while (pq.length) {
        pq.sort((a, b) => a[0] - b[0]);
        const [e, r, c] = pq.shift();
        
        if (r === rows - 1 && c === cols - 1) return e;
        if (e > effort[r][c]) continue;
        
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                const newEffort = Math.max(e, Math.abs(heights[nr][nc] - heights[r][c]));
                if (newEffort < effort[nr][nc]) {
                    effort[nr][nc] = newEffort;
                    pq.push([newEffort, nr, nc]);
                }
            }
        }
    }
    
    return effort[rows - 1][cols - 1];
}

/**
 * Problem 3 (Hard): Swim in Rising Water
 */
function swimInWater(grid) {
    const n = grid.length;
    const time = Array(n).fill(null).map(() => Array(n).fill(Infinity));
    const pq = [[grid[0][0], 0, 0]]; // [time, row, col]
    time[0][0] = grid[0][0];
    
    const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
    
    while (pq.length) {
        pq.sort((a, b) => a[0] - b[0]);
        const [t, r, c] = pq.shift();
        
        if (r === n - 1 && c === n - 1) return t;
        
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                const newTime = Math.max(t, grid[nr][nc]);
                if (newTime < time[nr][nc]) {
                    time[nr][nc] = newTime;
                    pq.push([newTime, nr, nc]);
                }
            }
        }
    }
    
    return time[n - 1][n - 1];
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * SHORTEST PATH CHEAT SHEET:
 * 
 * | Algorithm      | Use Case                    | Complexity   |
 * |----------------|-----------------------------| -------------|
 * | BFS            | Unweighted graph            | O(V + E)     |
 * | Dijkstra       | Positive weights            | O(E log V)   |
 * | Bellman-Ford   | Negative weights/cycles     | O(V × E)     |
 * | Floyd-Warshall | All pairs                   | O(V³)        |
 * 
 * DIJKSTRA TEMPLATE:
 * 1. dist = {start: 0}, pq = [(0, start)]
 * 2. Pop min distance node
 * 3. Skip if already found better
 * 4. Update neighbors: newDist = dist + edge weight
 * 
 * BELLMAN-FORD TEMPLATE:
 * 1. dist = [∞...], dist[start] = 0
 * 2. Repeat V-1 times: relax all edges
 * 3. Check one more time for negative cycle
 * 
 * KEY INSIGHTS:
 * - Dijkstra: Greedy, always picks closest unvisited
 * - Bellman-Ford: Can detect negative cycles
 * - Floyd-Warshall: Uses dynamic programming
 * 
 * COMMON MODIFICATIONS:
 * - Limited stops → Modified Bellman-Ford
 * - Max instead of sum → Dijkstra with max
 * - Grid problems → Treat as graph
 */

module.exports = { 
    dijkstra, 
    dijkstraWithPath,
    bellmanFord, 
    floydWarshall, 
    networkDelayTime,
    findCheapestPrice,
    minimumEffortPath,
    swimInWater
};
