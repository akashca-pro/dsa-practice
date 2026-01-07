/**
 * ============================================
 * ADVANCED GRAPH ALGORITHMS
 * ============================================
 * 
 * CONCEPT:
 * Advanced graph algorithms handle complex problems like:
 * - Finding strongly connected components
 * - Identifying critical points (articulation points)
 * - Finding bridges (critical edges)
 * - Network flow problems
 * 
 * These are common in MAANG interviews for senior roles.
 * 
 * INDUSTRY APPLICATIONS:
 * - Social network analysis
 * - Network reliability
 * - Compiler optimization
 * - Web crawling
 */

// ============================================
// 1. TARJAN'S SCC (Strongly Connected Components)
// ============================================

/**
 * Strongly Connected Component:
 * A maximal set of vertices where every vertex is reachable from every other
 * 
 * Example:
 *     1 → 2 → 3
 *     ↑   ↓   ↓
 *     ← 4 ←   5
 * 
 * SCCs: {1, 2, 4}, {3}, {5}
 * 
 * Tarjan's uses DFS with "low-link" values
 * Time: O(V + E)
 */
function tarjanSCC(n, edges) {
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
    }
    
    let index = 0;
    const indices = new Array(n).fill(-1);
    const lowLink = new Array(n).fill(-1);
    const onStack = new Array(n).fill(false);
    const stack = [];
    const sccs = [];
    
    const strongConnect = (v) => {
        indices[v] = lowLink[v] = index++;
        stack.push(v);
        onStack[v] = true;
        
        for (const w of adj[v]) {
            if (indices[w] === -1) {
                // Not visited yet
                strongConnect(w);
                lowLink[v] = Math.min(lowLink[v], lowLink[w]);
            } else if (onStack[w]) {
                // Back edge to node in current SCC
                lowLink[v] = Math.min(lowLink[v], indices[w]);
            }
        }
        
        // If v is root of an SCC
        if (lowLink[v] === indices[v]) {
            const scc = [];
            let w;
            do {
                w = stack.pop();
                onStack[w] = false;
                scc.push(w);
            } while (w !== v);
            sccs.push(scc);
        }
    };
    
    for (let v = 0; v < n; v++) {
        if (indices[v] === -1) {
            strongConnect(v);
        }
    }
    
    return sccs;
}

// ============================================
// 2. ARTICULATION POINTS (Cut Vertices)
// ============================================

/**
 * Articulation Point:
 * A vertex whose removal disconnects the graph
 * 
 * Example:
 *     1 - 2 - 3
 *         |
 *         4 - 5
 * 
 * Vertex 2 is an articulation point (removing it disconnects 1 from 3,4,5)
 * 
 * Uses DFS with discovery time and low values
 * Time: O(V + E)
 */
function findArticulationPoints(n, edges) {
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }
    
    let time = 0;
    const disc = new Array(n).fill(-1);  // Discovery time
    const low = new Array(n).fill(-1);   // Lowest reachable
    const parent = new Array(n).fill(-1);
    const ap = new Set();  // Articulation points
    
    const dfs = (u) => {
        let children = 0;
        disc[u] = low[u] = time++;
        
        for (const v of adj[u]) {
            if (disc[v] === -1) {
                children++;
                parent[v] = u;
                dfs(v);
                
                low[u] = Math.min(low[u], low[v]);
                
                // u is articulation point if:
                // 1. u is root and has 2+ children
                // 2. u is not root and low[v] >= disc[u]
                if (parent[u] === -1 && children > 1) {
                    ap.add(u);
                }
                if (parent[u] !== -1 && low[v] >= disc[u]) {
                    ap.add(u);
                }
            } else if (v !== parent[u]) {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    };
    
    for (let i = 0; i < n; i++) {
        if (disc[i] === -1) {
            dfs(i);
        }
    }
    
    return Array.from(ap);
}

// ============================================
// 3. BRIDGES (Critical Edges)
// ============================================

/**
 * Bridge:
 * An edge whose removal disconnects the graph
 * 
 * Example:
 *     1 - 2 - 3
 *     |   |
 *     4 - 5
 * 
 * Edge 2-3 is a bridge
 * 
 * Similar to articulation points
 * Edge (u,v) is bridge if low[v] > disc[u]
 */
function findBridges(n, edges) {
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }
    
    let time = 0;
    const disc = new Array(n).fill(-1);
    const low = new Array(n).fill(-1);
    const parent = new Array(n).fill(-1);
    const bridges = [];
    
    const dfs = (u) => {
        disc[u] = low[u] = time++;
        
        for (const v of adj[u]) {
            if (disc[v] === -1) {
                parent[v] = u;
                dfs(v);
                
                low[u] = Math.min(low[u], low[v]);
                
                // Bridge condition: no back edge from subtree of v to u or ancestors
                if (low[v] > disc[u]) {
                    bridges.push([u, v]);
                }
            } else if (v !== parent[u]) {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    };
    
    for (let i = 0; i < n; i++) {
        if (disc[i] === -1) {
            dfs(i);
        }
    }
    
    return bridges;
}

// ============================================
// 4. KOSARAJU'S ALGORITHM (Alternative SCC)
// ============================================

/**
 * Kosaraju's Algorithm:
 * 1. DFS on original graph, record finish order
 * 2. Reverse all edges
 * 3. DFS on reversed graph in reverse finish order
 * 
 * Each DFS tree in step 3 is an SCC
 * Time: O(V + E)
 */
function kosarajuSCC(n, edges) {
    const adj = Array.from({ length: n }, () => []);
    const adjRev = Array.from({ length: n }, () => []);
    
    for (const [u, v] of edges) {
        adj[u].push(v);
        adjRev[v].push(u);
    }
    
    // Step 1: DFS and record finish order
    const visited = new Array(n).fill(false);
    const finishOrder = [];
    
    const dfs1 = (u) => {
        visited[u] = true;
        for (const v of adj[u]) {
            if (!visited[v]) dfs1(v);
        }
        finishOrder.push(u);
    };
    
    for (let i = 0; i < n; i++) {
        if (!visited[i]) dfs1(i);
    }
    
    // Step 2 & 3: DFS on reversed graph
    visited.fill(false);
    const sccs = [];
    
    const dfs2 = (u, scc) => {
        visited[u] = true;
        scc.push(u);
        for (const v of adjRev[u]) {
            if (!visited[v]) dfs2(v, scc);
        }
    };
    
    while (finishOrder.length) {
        const u = finishOrder.pop();
        if (!visited[u]) {
            const scc = [];
            dfs2(u, scc);
            sccs.push(scc);
        }
    }
    
    return sccs;
}

// ============================================
// 5. EULERIAN PATH/CIRCUIT
// ============================================

/**
 * Eulerian Path: Visit every EDGE exactly once
 * Eulerian Circuit: Eulerian path that starts and ends at same vertex
 * 
 * Conditions:
 * - Circuit: All vertices have even degree
 * - Path: Exactly 0 or 2 vertices have odd degree
 */
function findEulerianPath(n, edges) {
    const adj = Array.from({ length: n }, () => []);
    const degree = new Array(n).fill(0);
    
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
        degree[u]++;
        degree[v]++;
    }
    
    // Check if Eulerian path exists
    const oddDegree = degree.filter(d => d % 2 === 1).length;
    if (oddDegree !== 0 && oddDegree !== 2) {
        return null; // No Eulerian path
    }
    
    // Find starting vertex
    let start = 0;
    for (let i = 0; i < n; i++) {
        if (degree[i] % 2 === 1) {
            start = i;
            break;
        }
    }
    
    // Hierholzer's algorithm
    const path = [];
    const stack = [start];
    const edgeCount = new Map();
    
    // Track edge usage
    for (const [u, v] of edges) {
        const key1 = `${u},${v}`;
        const key2 = `${v},${u}`;
        edgeCount.set(key1, (edgeCount.get(key1) || 0) + 1);
        edgeCount.set(key2, (edgeCount.get(key2) || 0) + 1);
    }
    
    while (stack.length) {
        const u = stack[stack.length - 1];
        
        if (adj[u].length) {
            const v = adj[u].pop();
            const key = `${u},${v}`;
            
            if (edgeCount.get(key) > 0) {
                edgeCount.set(key, edgeCount.get(key) - 1);
                edgeCount.set(`${v},${u}`, edgeCount.get(`${v},${u}`) - 1);
                stack.push(v);
            }
        } else {
            path.push(stack.pop());
        }
    }
    
    return path.reverse();
}

// ============================================
// 6. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1: Critical Connections in a Network
 */
function criticalConnections(n, connections) {
    return findBridges(n, connections);
}

/**
 * Problem 2: Course Schedule II (Topological using SCC concepts)
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
            if (indegree[neighbor] === 0) queue.push(neighbor);
        }
    }
    
    return order.length === numCourses ? order : [];
}

/**
 * Problem 3: Reconstruct Itinerary (Eulerian Path)
 */
function findItinerary(tickets) {
    const adj = new Map();
    
    for (const [from, to] of tickets) {
        if (!adj.has(from)) adj.set(from, []);
        adj.get(from).push(to);
    }
    
    // Sort destinations in reverse (we'll pop from end)
    for (const [, destinations] of adj) {
        destinations.sort().reverse();
    }
    
    const result = [];
    
    const dfs = (airport) => {
        const destinations = adj.get(airport) || [];
        while (destinations.length) {
            dfs(destinations.pop());
        }
        result.push(airport);
    };
    
    dfs('JFK');
    return result.reverse();
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * ADVANCED GRAPH ALGORITHMS CHEAT SHEET:
 * 
 * | Algorithm          | Purpose                    | Complexity |
 * |--------------------|----------------------------|------------|
 * | Tarjan's SCC       | Strongly Connected Comps   | O(V + E)   |
 * | Kosaraju's SCC     | Strongly Connected Comps   | O(V + E)   |
 * | Articulation Points| Find cut vertices          | O(V + E)   |
 * | Bridges            | Find critical edges        | O(V + E)   |
 * | Eulerian Path      | Visit all edges once       | O(E)       |
 * 
 * KEY CONCEPTS:
 * - Low-link value: Lowest discovery time reachable
 * - Back edge: Edge to ancestor in DFS tree
 * - Cross edge: Edge to non-ancestor visited node
 * 
 * SCC (Directed Graph):
 * - Every vertex reachable from every other in component
 * - Use Tarjan's or Kosaraju's
 * 
 * ARTICULATION POINTS & BRIDGES (Undirected):
 * - Removal disconnects graph
 * - Critical for network reliability
 * 
 * INTERVIEW TIP:
 * These are advanced topics - understand the concepts
 * and be able to explain the intuition!
 */

module.exports = { 
    tarjanSCC, 
    findArticulationPoints, 
    findBridges,
    kosarajuSCC,
    findEulerianPath,
    criticalConnections,
    findOrder,
    findItinerary
};
