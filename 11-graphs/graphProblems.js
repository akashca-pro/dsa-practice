/**
 * ============================================
 * GRAPH PROBLEMS - COMPREHENSIVE GUIDE
 * ============================================
 * 
 * This file organizes graph problems into categories for systematic learning.
 * Each category builds upon the previous one.
 * 
 * LEARNING ORDER:
 * 1. Traversal & Connectivity (BFS/DFS foundation)
 * 2. Cycle Detection
 * 3. Shortest Path
 * 4. Minimum Spanning Tree
 * 5. Topological Thinking
 */

// ============================================
// CATEGORY 1: TRAVERSAL AND CONNECTIVITY
// ============================================

/**
 * These are foundation problems. Master BFS and DFS here first!
 * 
 * REAL-WORLD EXAMPLES:
 * - Social network friend suggestions
 * - Finding if two computers can communicate
 * - Flood fill in image editing (Photoshop bucket fill)
 * - Detecting communities in networks
 * 
 * KEY TECHNIQUES:
 * - BFS: Level-by-level exploration (queue)
 * - DFS: Depth-first exploration (stack/recursion)
 */

// ------------------------------------------
// 1.1 NUMBER OF CONNECTED COMPONENTS
// ------------------------------------------

/**
 * Problem: Count how many separate groups exist in undirected graph
 * 
 * Real-world: How many isolated friend groups in a class?
 *             How many separate networks in a company?
 * 
 * Approach: Each DFS/BFS explores one complete component
 * 
 * Time: O(V + E)
 * Space: O(V)
 */
function countConnectedComponents(n, edges) {
    // Build adjacency list
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }
    
    const visited = new Set();
    let components = 0;
    
    const dfs = (node) => {
        visited.add(node);
        for (const neighbor of adj[node]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
    };
    
    for (let i = 0; i < n; i++) {
        if (!visited.has(i)) {
            dfs(i);
            components++; // Each DFS = one component
        }
    }
    
    return components;
}

/**
 * RELATED QUESTIONS:
 * - Number of Provinces (LeetCode 547)
 * - Number of Islands (LeetCode 200)
 * - Making A Large Island (LeetCode 827)
 */

// ------------------------------------------
// 1.2 PATH EXISTS IN GRAPH
// ------------------------------------------

/**
 * Problem: Check if path exists between source and destination
 * 
 * Real-world: Can I reach this website from my computer?
 *             Is there a flight connection between two cities?
 * 
 * Time: O(V + E)
 * Space: O(V)
 */
function validPath(n, edges, source, destination) {
    if (source === destination) return true;
    
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }
    
    // BFS approach
    const visited = new Set([source]);
    const queue = [source];
    
    while (queue.length) {
        const node = queue.shift();
        
        for (const neighbor of adj[node]) {
            if (neighbor === destination) return true;
            
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    
    return false;
}

/**
 * RELATED QUESTIONS:
 * - Find if Path Exists in Graph (LeetCode 1971)
 * - All Paths From Source to Target (LeetCode 797)
 * - Path With Minimum Effort (LeetCode 1631)
 */

// ------------------------------------------
// 1.3 CLONE GRAPH
// ------------------------------------------

/**
 * Problem: Create a deep copy of a graph
 * 
 * Real-world: Duplicating a network configuration
 *             Copying a state machine
 * 
 * Key insight: Use a map to track original → clone
 *              Avoids infinite loops and duplicate creation
 * 
 * Time: O(V + E)
 * Space: O(V)
 */
function cloneGraph(node) {
    if (!node) return null;
    
    const cloneMap = new Map(); // original node → cloned node
    
    const dfs = (original) => {
        // Already cloned
        if (cloneMap.has(original)) {
            return cloneMap.get(original);
        }
        
        // Create clone
        const clone = { val: original.val, neighbors: [] };
        cloneMap.set(original, clone);
        
        // Clone neighbors
        for (const neighbor of original.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }
        
        return clone;
    };
    
    return dfs(node);
}

/**
 * RELATED QUESTIONS:
 * - Clone Graph (LeetCode 133)
 * - Copy List with Random Pointer (LeetCode 138)
 * - Clone N-ary Tree (LeetCode 1490)
 */

// ------------------------------------------
// 1.4 FLOOD FILL
// ------------------------------------------

/**
 * Problem: Change color of connected pixels (like paint bucket)
 * 
 * Real-world: Photoshop/Paint bucket fill tool
 *             Selecting regions in image editing
 *             Minesweeper revealing empty cells
 * 
 * Time: O(rows × cols)
 * Space: O(rows × cols) for recursion stack
 */
function floodFill(image, sr, sc, newColor) {
    const originalColor = image[sr][sc];
    
    // No change needed
    if (originalColor === newColor) return image;
    
    const rows = image.length;
    const cols = image[0].length;
    
    const dfs = (r, c) => {
        // Boundary check
        if (r < 0 || r >= rows || c < 0 || c >= cols) return;
        
        // Not the target color
        if (image[r][c] !== originalColor) return;
        
        // Fill with new color
        image[r][c] = newColor;
        
        // Explore 4 directions
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    };
    
    dfs(sr, sc);
    return image;
}

/**
 * RELATED QUESTIONS:
 * - Flood Fill (LeetCode 733)
 * - Number of Islands (LeetCode 200)
 * - Max Area of Island (LeetCode 695)
 * - Surrounded Regions (LeetCode 130)
 */

// ------------------------------------------
// 1.5 IS GRAPH BIPARTITE
// ------------------------------------------

/**
 * Problem: Can we color graph with 2 colors such that
 *          no adjacent nodes have same color?
 * 
 * Real-world: Dividing students into 2 teams where friends are on opposite teams
 *             Scheduling exams so conflicting courses are on different days
 *             Matching problems (jobs to workers)
 * 
 * Approach: BFS/DFS with 2-coloring
 *           If we find adjacent nodes with same color → not bipartite
 * 
 * Time: O(V + E)
 * Space: O(V)
 */
function isBipartite(graph) {
    const n = graph.length;
    const color = new Array(n).fill(-1); // -1 = uncolored, 0 or 1 = colors
    
    const bfs = (start) => {
        const queue = [start];
        color[start] = 0;
        
        while (queue.length) {
            const node = queue.shift();
            
            for (const neighbor of graph[node]) {
                if (color[neighbor] === -1) {
                    // Color with opposite color
                    color[neighbor] = 1 - color[node];
                    queue.push(neighbor);
                } else if (color[neighbor] === color[node]) {
                    // Same color as neighbor → not bipartite
                    return false;
                }
            }
        }
        return true;
    };
    
    // Check all components
    for (let i = 0; i < n; i++) {
        if (color[i] === -1) {
            if (!bfs(i)) return false;
        }
    }
    
    return true;
}

/**
 * RELATED QUESTIONS:
 * - Is Graph Bipartite? (LeetCode 785)
 * - Possible Bipartition (LeetCode 886)
 * - Flower Planting With No Adjacent (LeetCode 1042)
 */

// ============================================
// CATEGORY 2: CYCLE DETECTION
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - Deadlock detection in operating systems
 * - Dependency cycle in build systems (npm, maven)
 * - Infinite loop detection
 * - Circular reference in garbage collection
 * 
 * KEY INSIGHT:
 * - Undirected: Back edge to non-parent = cycle
 * - Directed: Back edge to node in current path = cycle (use 3 colors)
 */

// ------------------------------------------
// 2.1 DETECT CYCLE IN UNDIRECTED GRAPH
// ------------------------------------------

/**
 * Problem: Check if undirected graph has a cycle
 * 
 * Real-world: Detecting if a network has redundant connections
 * 
 * Approach: DFS with parent tracking
 *           If we find edge to visited node that's not parent → cycle!
 * 
 * Time: O(V + E)
 * Space: O(V)
 */
function hasCycleUndirected(n, edges) {
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }
    
    const visited = new Set();
    
    const dfs = (node, parent) => {
        visited.add(node);
        
        for (const neighbor of adj[node]) {
            if (!visited.has(neighbor)) {
                if (dfs(neighbor, node)) return true;
            } else if (neighbor !== parent) {
                // Visited node that's not parent = cycle!
                return true;
            }
        }
        
        return false;
    };
    
    // Check all components
    for (let i = 0; i < n; i++) {
        if (!visited.has(i)) {
            if (dfs(i, -1)) return true;
        }
    }
    
    return false;
}

/**
 * Alternative: Union-Find approach
 * If both endpoints of an edge are already connected → cycle!
 */
function hasCycleUndirectedUnionFind(n, edges) {
    const parent = Array.from({ length: n }, (_, i) => i);
    
    const find = (x) => {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    };
    
    const union = (x, y) => {
        const px = find(x), py = find(y);
        if (px === py) return false; // Already connected = cycle!
        parent[px] = py;
        return true;
    };
    
    for (const [u, v] of edges) {
        if (!union(u, v)) return true;
    }
    
    return false;
}

/**
 * RELATED QUESTIONS:
 * - Redundant Connection (LeetCode 684)
 * - Graph Valid Tree (LeetCode 261)
 */

// ------------------------------------------
// 2.2 DETECT CYCLE IN DIRECTED GRAPH
// ------------------------------------------

/**
 * Problem: Check if directed graph has a cycle
 * 
 * Real-world: Can this build system compile? (dependency cycles)
 *             Is there a deadlock in this locking system?
 * 
 * Approach: 3-color DFS
 * - WHITE (0): Not visited
 * - GRAY (1): Currently in recursion stack (being explored)
 * - BLACK (2): Completely processed
 * 
 * Cycle exists if we find a GRAY node (back edge in current path)
 * 
 * Time: O(V + E)
 * Space: O(V)
 */
function hasCycleDirected(n, edges) {
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
    }
    
    const color = new Array(n).fill(0); // 0=white, 1=gray, 2=black
    
    const dfs = (node) => {
        color[node] = 1; // Mark as being explored
        
        for (const neighbor of adj[node]) {
            if (color[neighbor] === 1) {
                // Found back edge to node in current path!
                return true;
            }
            if (color[neighbor] === 0 && dfs(neighbor)) {
                return true;
            }
        }
        
        color[node] = 2; // Mark as fully explored
        return false;
    };
    
    for (let i = 0; i < n; i++) {
        if (color[i] === 0 && dfs(i)) {
            return true;
        }
    }
    
    return false;
}

/**
 * RELATED QUESTIONS:
 * - Course Schedule (LeetCode 207)
 * - Course Schedule II (LeetCode 210)
 * - Redundant Connection II (LeetCode 685)
 */

// ============================================
// CATEGORY 3: SHORTEST PATH
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - GPS navigation (finding fastest route)
 * - Network routing (packets finding shortest path)
 * - Social network (degrees of separation)
 * - Game AI (pathfinding for characters)
 * 
 * ALGORITHM SELECTION:
 * | Graph Type           | Algorithm      | Time         |
 * |----------------------|----------------|--------------|
 * | Unweighted           | BFS            | O(V + E)     |
 * | Weighted (positive)  | Dijkstra       | O(E log V)   |
 * | Weighted (negative)  | Bellman-Ford   | O(V × E)     |
 * | All pairs            | Floyd-Warshall | O(V³)        |
 */

// ------------------------------------------
// 3.1 SHORTEST PATH IN UNWEIGHTED GRAPH
// ------------------------------------------

/**
 * Problem: Find shortest path in unweighted graph
 * 
 * Real-world: Minimum hops in a network
 *             Degrees of separation in social network
 * 
 * Key insight: BFS naturally finds shortest path in unweighted graphs
 *              because it explores level by level
 * 
 * Time: O(V + E)
 * Space: O(V)
 */
function shortestPathUnweighted(n, edges, source, target) {
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }
    
    const dist = new Array(n).fill(Infinity);
    dist[source] = 0;
    
    const queue = [source];
    
    while (queue.length) {
        const node = queue.shift();
        
        if (node === target) return dist[target];
        
        for (const neighbor of adj[node]) {
            if (dist[neighbor] === Infinity) {
                dist[neighbor] = dist[node] + 1;
                queue.push(neighbor);
            }
        }
    }
    
    return dist[target] === Infinity ? -1 : dist[target];
}

/**
 * RELATED QUESTIONS:
 * - Shortest Path to Get Food (LeetCode 1730)
 * - Word Ladder (LeetCode 127)
 * - Open the Lock (LeetCode 752)
 */

// ------------------------------------------
// 3.2 DIJKSTRA'S ALGORITHM
// ------------------------------------------

/**
 * Problem: Find shortest path in weighted graph (positive weights only)
 * 
 * Real-world: GPS finding fastest route considering road speeds
 *             Router finding lowest latency path
 * 
 * Key insight: Greedy - always expand the closest unvisited node
 * 
 * Time: O(E log V) with min-heap
 * Space: O(V)
 */
function dijkstra(n, edges, source) {
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) {
        adj[u].push([v, w]);
        adj[v].push([u, w]); // If undirected
    }
    
    const dist = new Array(n).fill(Infinity);
    dist[source] = 0;
    
    // Min-heap: [distance, node]
    const pq = [[0, source]];
    
    while (pq.length) {
        pq.sort((a, b) => a[0] - b[0]); // Should use proper heap
        const [d, node] = pq.shift();
        
        // Skip if we've found a shorter path
        if (d > dist[node]) continue;
        
        for (const [neighbor, weight] of adj[node]) {
            const newDist = dist[node] + weight;
            
            if (newDist < dist[neighbor]) {
                dist[neighbor] = newDist;
                pq.push([newDist, neighbor]);
            }
        }
    }
    
    return dist;
}

/**
 * RELATED QUESTIONS:
 * - Network Delay Time (LeetCode 743)
 * - Path with Maximum Probability (LeetCode 1514)
 * - Cheapest Flights Within K Stops (LeetCode 787) - modified
 */

// ------------------------------------------
// 3.3 BELLMAN-FORD ALGORITHM
// ------------------------------------------

/**
 * Problem: Find shortest path with negative edge weights
 *          Also detects negative cycles
 * 
 * Real-world: Currency exchange arbitrage detection
 *             Cost analysis with discounts
 * 
 * Key insight: Relax all edges V-1 times
 *              If still relaxing after V-1 iterations → negative cycle
 * 
 * Time: O(V × E)
 * Space: O(V)
 */
function bellmanFord(n, edges, source) {
    const dist = new Array(n).fill(Infinity);
    dist[source] = 0;
    
    // Relax all edges V-1 times
    for (let i = 0; i < n - 1; i++) {
        for (const [u, v, w] of edges) {
            if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    
    // Check for negative cycle
    for (const [u, v, w] of edges) {
        if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
            return null; // Negative cycle exists!
        }
    }
    
    return dist;
}

/**
 * RELATED QUESTIONS:
 * - Cheapest Flights Within K Stops (LeetCode 787)
 * - Negative Weight Cycle (detect arbitrage)
 */

// ============================================
// CATEGORY 4: MINIMUM SPANNING TREE
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - Minimum cable to connect all computers
 * - Road network connecting all cities with minimum cost
 * - Electrical grid design
 * - Pipeline network design
 * 
 * MST PROPERTIES:
 * - Connects all V vertices
 * - Uses exactly V-1 edges
 * - No cycles
 * - Minimum total edge weight
 */

// ------------------------------------------
// 4.1 KRUSKAL'S ALGORITHM
// ------------------------------------------

/**
 * Problem: Find MST using edge-based approach
 * 
 * Approach: 
 * 1. Sort edges by weight
 * 2. Add edges that don't create cycle (use Union-Find)
 * 
 * Best for: Sparse graphs
 * 
 * Time: O(E log E)
 * Space: O(V)
 */
function kruskal(n, edges) {
    // Sort by weight
    edges.sort((a, b) => a[2] - b[2]);
    
    const parent = Array.from({ length: n }, (_, i) => i);
    const rank = new Array(n).fill(0);
    
    const find = (x) => {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    };
    
    const union = (x, y) => {
        const px = find(x), py = find(y);
        if (px === py) return false; // Would create cycle
        
        if (rank[px] < rank[py]) parent[px] = py;
        else if (rank[px] > rank[py]) parent[py] = px;
        else { parent[py] = px; rank[px]++; }
        
        return true;
    };
    
    const mst = [];
    let cost = 0;
    
    for (const [u, v, w] of edges) {
        if (union(u, v)) {
            mst.push([u, v, w]);
            cost += w;
            if (mst.length === n - 1) break;
        }
    }
    
    return { mst, cost };
}

/**
 * RELATED QUESTIONS:
 * - Min Cost to Connect All Points (LeetCode 1584)
 * - Connecting Cities With Minimum Cost (LeetCode 1135)
 */

// ------------------------------------------
// 4.2 PRIM'S ALGORITHM
// ------------------------------------------

/**
 * Problem: Find MST using vertex-based approach
 * 
 * Approach:
 * 1. Start from any vertex
 * 2. Always pick minimum edge to unvisited vertex
 * 
 * Best for: Dense graphs
 * 
 * Time: O(E log V) with min-heap
 * Space: O(V + E)
 */
function prim(n, edges) {
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) {
        adj[u].push([v, w]);
        adj[v].push([u, w]);
    }
    
    const visited = new Set();
    const mst = [];
    let cost = 0;
    
    // Min-heap: [weight, from, to]
    const pq = [[0, -1, 0]];
    
    while (pq.length && visited.size < n) {
        pq.sort((a, b) => a[0] - b[0]);
        const [w, from, to] = pq.shift();
        
        if (visited.has(to)) continue;
        visited.add(to);
        
        if (from !== -1) {
            mst.push([from, to, w]);
            cost += w;
        }
        
        for (const [neighbor, weight] of adj[to]) {
            if (!visited.has(neighbor)) {
                pq.push([weight, to, neighbor]);
            }
        }
    }
    
    return { mst, cost };
}

/**
 * RELATED QUESTIONS:
 * - Min Cost to Connect All Points (LeetCode 1584)
 * - Find Critical and Pseudo-Critical Edges (LeetCode 1489)
 */

// ============================================
// CATEGORY 5: TOPOLOGICAL THINKING
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - Course prerequisites (what order to take courses)
 * - Build dependencies (compile in correct order)
 * - Task scheduling with dependencies
 * - Installation order for software packages
 * 
 * KEY INSIGHT:
 * - Only valid for DAGs (Directed Acyclic Graphs)
 * - If cycle exists, no valid topological order
 * 
 * TWO APPROACHES:
 * 1. DFS with post-order reversal
 * 2. Kahn's algorithm (BFS with in-degree)
 */

// ------------------------------------------
// 5.1 TOPOLOGICAL SORT
// ------------------------------------------

/**
 * Problem: Order vertices so all edges go from earlier to later
 * 
 * Real-world: In what order should I take courses if each has prerequisites?
 * 
 * Time: O(V + E)
 * Space: O(V)
 */

// DFS approach
function topologicalSortDFS(n, edges) {
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
    }
    
    const visited = new Set();
    const result = [];
    
    const dfs = (node) => {
        visited.add(node);
        
        for (const neighbor of adj[node]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
        
        result.unshift(node); // Add to front after processing descendants
    };
    
    for (let i = 0; i < n; i++) {
        if (!visited.has(i)) {
            dfs(i);
        }
    }
    
    return result;
}

// Kahn's Algorithm (BFS with in-degree)
function topologicalSortKahn(n, edges) {
    const adj = Array.from({ length: n }, () => []);
    const indegree = new Array(n).fill(0);
    
    for (const [u, v] of edges) {
        adj[u].push(v);
        indegree[v]++;
    }
    
    // Start with nodes that have no dependencies
    const queue = [];
    for (let i = 0; i < n; i++) {
        if (indegree[i] === 0) queue.push(i);
    }
    
    const result = [];
    
    while (queue.length) {
        const node = queue.shift();
        result.push(node);
        
        for (const neighbor of adj[node]) {
            indegree[neighbor]--;
            if (indegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    // If result has all nodes, no cycle exists
    return result.length === n ? result : []; // Empty = cycle!
}

/**
 * RELATED QUESTIONS:
 * - Course Schedule II (LeetCode 210)
 * - Alien Dictionary (LeetCode 269)
 * - Sequence Reconstruction (LeetCode 444)
 */

// ------------------------------------------
// 5.2 COURSE SCHEDULE
// ------------------------------------------

/**
 * Problem: Can all courses be finished given prerequisites?
 * 
 * Real-world: Can a student complete their degree with these requirements?
 * 
 * Key insight: If there's a cycle in prerequisites → impossible!
 * 
 * Time: O(V + E)
 * Space: O(V)
 */
function canFinishCourses(numCourses, prerequisites) {
    const adj = Array.from({ length: numCourses }, () => []);
    const indegree = new Array(numCourses).fill(0);
    
    for (const [course, prereq] of prerequisites) {
        adj[prereq].push(course);
        indegree[course]++;
    }
    
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (indegree[i] === 0) queue.push(i);
    }
    
    let count = 0;
    
    while (queue.length) {
        const node = queue.shift();
        count++;
        
        for (const neighbor of adj[node]) {
            indegree[neighbor]--;
            if (indegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    return count === numCourses;
}

/**
 * Course Schedule II: Return the order
 */
function findOrder(numCourses, prerequisites) {
    const adj = Array.from({ length: numCourses }, () => []);
    const indegree = new Array(numCourses).fill(0);
    
    for (const [course, prereq] of prerequisites) {
        adj[prereq].push(course);
        indegree[course]++;
    }
    
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (indegree[i] === 0) queue.push(i);
    }
    
    const order = [];
    
    while (queue.length) {
        const node = queue.shift();
        order.push(node);
        
        for (const neighbor of adj[node]) {
            indegree[neighbor]--;
            if (indegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    return order.length === numCourses ? order : [];
}

/**
 * RELATED QUESTIONS:
 * - Course Schedule (LeetCode 207)
 * - Course Schedule II (LeetCode 210)
 * - Course Schedule IV (LeetCode 1462)
 * - Parallel Courses (LeetCode 1136)
 */

// ============================================
// SUMMARY & LEARNING PATH
// ============================================

/**
 * GRAPH PROBLEMS CHEAT SHEET:
 * 
 * 1. TRAVERSAL & CONNECTIVITY:
 *    - Use BFS/DFS
 *    - Connected components = count DFS starts
 *    - Bipartite = 2-color without conflict
 * 
 * 2. CYCLE DETECTION:
 *    - Undirected: back edge to non-parent
 *    - Directed: 3-color (white/gray/black)
 * 
 * 3. SHORTEST PATH:
 *    - Unweighted → BFS
 *    - Weighted positive → Dijkstra
 *    - Negative edges → Bellman-Ford
 * 
 * 4. MST:
 *    - Kruskal: Sort edges + Union-Find
 *    - Prim: Greedy with min-heap
 * 
 * 5. TOPOLOGICAL:
 *    - DFS post-order or Kahn's BFS
 *    - Only for DAGs
 * 
 * INTERVIEW TIP:
 * 1. Identify if it's a graph problem
 * 2. Choose representation (list vs matrix)
 * 3. Choose traversal (BFS vs DFS)
 * 4. Apply appropriate algorithm
 */

module.exports = {
    // Category 1
    countConnectedComponents,
    validPath,
    cloneGraph,
    floodFill,
    isBipartite,
    
    // Category 2
    hasCycleUndirected,
    hasCycleUndirectedUnionFind,
    hasCycleDirected,
    
    // Category 3
    shortestPathUnweighted,
    dijkstra,
    bellmanFord,
    
    // Category 4
    kruskal,
    prim,
    
    // Category 5
    topologicalSortDFS,
    topologicalSortKahn,
    canFinishCourses,
    findOrder
};
