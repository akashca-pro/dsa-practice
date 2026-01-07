/**
 * ============================================
 * DFS TRAVERSAL (Depth-First Search)
 * ============================================
 * 
 * CONCEPT:
 * DFS explores a graph by going as deep as possible along each branch
 * before backtracking. It uses recursion or a stack to track the path.
 * 
 * How it works:
 * 1. Start from a node, mark as visited
 * 2. Recursively visit all unvisited neighbors
 * 3. Backtrack when no unvisited neighbors remain
 * 
 * REAL-WORLD ANALOGY:
 * Exploring a maze:
 * - Go as far as you can down one path
 * - Hit a dead end? Back up and try another path
 * - Keep track of where you've been (visited)
 * - Eventually explore every reachable corridor
 * 
 * INDUSTRY APPLICATIONS:
 * - Path finding
 * - Cycle detection
 * - Topological sorting (dependencies)
 * - Connected components
 * - Solving puzzles (sudoku, mazes)
 * - Game AI (minimax)
 * 
 * COMPLEXITY:
 * Time: O(V + E) - Visit every vertex and edge once
 * Space: O(V) - Recursion stack or explicit stack
 * 
 * DFS vs BFS:
 * - DFS: Uses less memory, good for backtracking
 * - BFS: Finds shortest path, uses more memory
 */

// ============================================
// 1. DFS - RECURSIVE
// ============================================

/**
 * Recursive DFS is most natural
 * The call stack acts as implicit stack
 */
function dfsRecursive(graph, start, visited = new Set()) {
    visited.add(start);
    const order = [start];
    
    for (const neighbor of (graph[start] || [])) {
        if (!visited.has(neighbor)) {
            order.push(...dfsRecursive(graph, neighbor, visited));
        }
    }
    
    return order;
}

// ============================================
// 2. DFS - ITERATIVE
// ============================================

/**
 * Iterative DFS using explicit stack
 * 
 * Note: Order may differ from recursive due to
 * how neighbors are processed. Reverse to match.
 */
function dfsIterative(graph, start) {
    const visited = new Set();
    const stack = [start];
    const order = [];
    
    while (stack.length) {
        const node = stack.pop();
        
        if (visited.has(node)) continue;
        
        visited.add(node);
        order.push(node);
        
        // Reverse to get same order as recursive
        for (const neighbor of (graph[node] || []).reverse()) {
            if (!visited.has(neighbor)) {
                stack.push(neighbor);
            }
        }
    }
    
    return order;
}

// ============================================
// 3. CYCLE DETECTION - DIRECTED GRAPH
// ============================================

/**
 * Detect cycle in directed graph using colors
 * 
 * Three states (colors):
 * - WHITE (0): Not visited
 * - GRAY (1): Currently in recursion stack (being explored)
 * - BLACK (2): Completely processed
 * 
 * Cycle exists if we find a GRAY node (back edge)
 */
function hasCycleDirected(n, edges) {
    const adj = Array(n).fill(null).map(() => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
    }
    
    const color = new Array(n).fill(0); // 0: white, 1: gray, 2: black
    
    const dfs = (node) => {
        color[node] = 1; // Mark as being explored
        
        for (const neighbor of adj[node]) {
            // Found back edge to node in current path
            if (color[neighbor] === 1) return true;
            
            // Explore unvisited node
            if (color[neighbor] === 0 && dfs(neighbor)) return true;
        }
        
        color[node] = 2; // Mark as fully explored
        return false;
    };
    
    // Check all components (graph might be disconnected)
    for (let i = 0; i < n; i++) {
        if (color[i] === 0 && dfs(i)) return true;
    }
    
    return false;
}

/**
 * Detect cycle in undirected graph
 * 
 * Different approach: Track parent to avoid false positives
 */
function hasCycleUndirected(n, edges) {
    const adj = Array(n).fill(null).map(() => []);
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
                // Found edge to visited node that's not parent
                return true;
            }
        }
        
        return false;
    };
    
    for (let i = 0; i < n; i++) {
        if (!visited.has(i) && dfs(i, -1)) return true;
    }
    
    return false;
}

// ============================================
// 4. TOPOLOGICAL SORT
// ============================================

/**
 * Topological Sort: Order vertices so dependencies come first
 * 
 * Only valid for DAGs (Directed Acyclic Graphs)
 * 
 * Algorithm:
 * 1. Run DFS from each unvisited node
 * 2. After processing all neighbors, add node to result
 * 3. Reverse the result (or add to front)
 * 
 * Example: Course prerequisites
 * If A → B (A is prerequisite of B), A comes before B
 */
function topologicalSort(n, edges) {
    const adj = Array(n).fill(null).map(() => []);
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
        
        // Add to front after all descendants processed
        result.unshift(node);
    };
    
    for (let i = 0; i < n; i++) {
        if (!visited.has(i)) {
            dfs(i);
        }
    }
    
    return result;
}

/**
 * Topological Sort with Course Schedule Detection
 * Returns empty if cycle exists
 */
function courseSchedule(numCourses, prerequisites) {
    const adj = Array(numCourses).fill(null).map(() => []);
    for (const [course, prereq] of prerequisites) {
        adj[prereq].push(course);
    }
    
    const color = new Array(numCourses).fill(0);
    const result = [];
    
    const dfs = (node) => {
        color[node] = 1;
        
        for (const neighbor of adj[node]) {
            if (color[neighbor] === 1) return false; // Cycle!
            if (color[neighbor] === 0 && !dfs(neighbor)) return false;
        }
        
        color[node] = 2;
        result.unshift(node);
        return true;
    };
    
    for (let i = 0; i < numCourses; i++) {
        if (color[i] === 0 && !dfs(i)) return [];
    }
    
    return result;
}

// ============================================
// 5. CONNECTED COMPONENTS
// ============================================

/**
 * Count connected components in undirected graph
 * Each DFS explores one complete component
 */
function countComponents(n, edges) {
    const adj = Array(n).fill(null).map(() => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }
    
    const visited = new Set();
    let count = 0;
    
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
            count++;
        }
    }
    
    return count;
}

// ============================================
// 6. COMMON MISTAKES & EDGE CASES
// ============================================

/**
 * Mistake 1: Stack overflow on deep recursion
 * Use iterative DFS for very deep graphs
 * 
 * Mistake 2: Not handling disconnected graphs
 * Loop through all nodes, not just start from one
 * 
 * Mistake 3: Confusing directed vs undirected cycle detection
 * Undirected needs parent tracking
 * 
 * Edge Cases:
 * - Empty graph
 * - Single node
 * - Self-loops
 * - Multiple components
 */

// ============================================
// 7. INTERVIEW PERSPECTIVE
// ============================================

/**
 * When to use DFS:
 * 
 * 1. CYCLE DETECTION: Find back edges
 * 2. TOPOLOGICAL SORT: Order dependencies
 * 3. CONNECTED COMPONENTS: Count groups
 * 4. PATH FINDING: All paths, any path
 * 5. BACKTRACKING: N-queens, sudoku
 * 
 * DFS Template:
 * ```
 * function dfs(node, visited) {
 *     if (visited.has(node)) return;
 *     visited.add(node);
 *     
 *     // Process node
 *     
 *     for (const neighbor of adj[node]) {
 *         dfs(neighbor, visited);
 *     }
 *     
 *     // Post-processing (topological sort adds here)
 * }
 * ```
 */

// ============================================
// 8. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Medium): All Paths from Source to Target
 */
function allPathsSourceTarget(graph) {
    const result = [];
    const target = graph.length - 1;
    
    const dfs = (node, path) => {
        if (node === target) {
            result.push([...path]);
            return;
        }
        
        for (const neighbor of graph[node]) {
            path.push(neighbor);
            dfs(neighbor, path);
            path.pop(); // Backtrack
        }
    };
    
    dfs(0, [0]);
    return result;
}

/**
 * Problem 2 (Medium): Clone Graph
 */
function cloneGraph(node) {
    if (!node) return null;
    
    const cloneMap = new Map();
    
    const dfs = (original) => {
        if (cloneMap.has(original)) {
            return cloneMap.get(original);
        }
        
        const clone = { val: original.val, neighbors: [] };
        cloneMap.set(original, clone);
        
        for (const neighbor of original.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }
        
        return clone;
    };
    
    return dfs(node);
}

/**
 * Problem 3 (Medium): Pacific Atlantic Water Flow
 */
function pacificAtlantic(heights) {
    if (!heights.length) return [];
    
    const rows = heights.length, cols = heights[0].length;
    const pacific = new Set();
    const atlantic = new Set();
    
    const dfs = (r, c, visited, prevHeight) => {
        const key = `${r},${c}`;
        if (r < 0 || r >= rows || c < 0 || c >= cols) return;
        if (visited.has(key) || heights[r][c] < prevHeight) return;
        
        visited.add(key);
        
        dfs(r + 1, c, visited, heights[r][c]);
        dfs(r - 1, c, visited, heights[r][c]);
        dfs(r, c + 1, visited, heights[r][c]);
        dfs(r, c - 1, visited, heights[r][c]);
    };
    
    // Start from edges
    for (let c = 0; c < cols; c++) {
        dfs(0, c, pacific, 0);
        dfs(rows - 1, c, atlantic, 0);
    }
    for (let r = 0; r < rows; r++) {
        dfs(r, 0, pacific, 0);
        dfs(r, cols - 1, atlantic, 0);
    }
    
    // Find intersection
    const result = [];
    for (const key of pacific) {
        if (atlantic.has(key)) {
            result.push(key.split(',').map(Number));
        }
    }
    
    return result;
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * DFS CHEAT SHEET:
 * 
 * TEMPLATE:
 * 1. Mark node as visited
 * 2. Process node
 * 3. Recursively visit unvisited neighbors
 * 4. (Optional) Post-process after all neighbors done
 * 
 * COMPLEXITY:
 * - Time: O(V + E)
 * - Space: O(V) for recursion/stack
 * 
 * KEY APPLICATIONS:
 * | Problem               | Technique                     |
 * |-----------------------|-------------------------------|
 * | Cycle detection       | Color-based (3 states)        |
 * | Topological sort      | Add to result after neighbors |
 * | Connected components  | Count DFS starts              |
 * | All paths             | Backtracking                  |
 * 
 * CYCLE DETECTION:
 * - Directed: Use 3 colors (white, gray, black)
 * - Undirected: Track parent to avoid false positive
 * 
 * DFS vs BFS:
 * - DFS: Backtracking, less memory, not shortest path
 * - BFS: Shortest path, more memory, level-by-level
 * 
 * INTERVIEW TIP:
 * Draw the recursion tree! Track what's visited at each step.
 */

module.exports = { 
    dfsRecursive, 
    dfsIterative, 
    hasCycleDirected,
    hasCycleUndirected,
    topologicalSort,
    courseSchedule,
    countComponents,
    allPathsSourceTarget,
    cloneGraph,
    pacificAtlantic
};
