/**
 * ============================================
 * BFS TRAVERSAL (Breadth-First Search)
 * ============================================
 * 
 * CONCEPT:
 * BFS explores a graph level by level, visiting all neighbors of a node
 * before moving to nodes further away. It uses a queue to track nodes
 * to visit next.
 * 
 * How it works:
 * 1. Start from source node, add to queue
 * 2. While queue not empty:
 *    - Dequeue front node
 *    - Process it (mark visited, record, etc.)
 *    - Enqueue all unvisited neighbors
 * 
 * REAL-WORLD ANALOGY:
 * Ripples in a pond:
 * - Drop a stone (start node) in water
 * - Ripples expand outward in circles (levels)
 * - Each ring represents nodes at same distance
 * - Closest points are reached before farther ones
 * 
 * INDUSTRY APPLICATIONS:
 * - Shortest path in unweighted graphs (GPS)
 * - Social network connections (degrees of separation)
 * - Web crawling
 * - Network broadcasting
 * - Finding connected components
 * - Level order tree traversal
 * 
 * COMPLEXITY:
 * Time: O(V + E) - Visit every vertex and edge once
 * Space: O(V) - Queue and visited set
 * 
 * KEY PROPERTY:
 * BFS finds the SHORTEST PATH in UNWEIGHTED graphs!
 */

// ============================================
// 1. BASIC BFS TRAVERSAL
// ============================================

/**
 * Standard BFS template
 * 
 * Critical components:
 * 1. Queue for FIFO processing
 * 2. Visited set to avoid revisiting
 * 3. Mark visited WHEN ADDING to queue (not when processing)
 */
function bfs(graph, start) {
    const visited = new Set([start]); // Mark start as visited
    const queue = [start];            // Initialize queue with start
    const order = [];                 // Track traversal order
    
    while (queue.length) {
        const node = queue.shift();   // Dequeue front
        order.push(node);             // Process node
        
        // Explore all neighbors
        for (const neighbor of (graph[node] || [])) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor); // Mark visited BEFORE adding
                queue.push(neighbor);  // Add to queue
            }
        }
    }
    
    return order;
}

// ============================================
// 2. SHORTEST PATH IN UNWEIGHTED GRAPH
// ============================================

/**
 * BFS guarantees shortest path because:
 * - It explores nodes by distance from source
 * - All nodes at distance k are processed before distance k+1
 * 
 * Track path by storing path with each node
 */
function shortestPath(graph, start, end) {
    const visited = new Set([start]);
    const queue = [[start, [start]]]; // [node, path to node]
    
    while (queue.length) {
        const [node, path] = queue.shift();
        
        // Found destination!
        if (node === end) return path;
        
        for (const neighbor of (graph[node] || [])) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, [...path, neighbor]]);
            }
        }
    }
    
    return null; // No path exists
}

/**
 * Shortest path - distance only (more memory efficient)
 */
function shortestDistance(graph, start, end) {
    const visited = new Set([start]);
    const queue = [[start, 0]]; // [node, distance]
    
    while (queue.length) {
        const [node, dist] = queue.shift();
        
        if (node === end) return dist;
        
        for (const neighbor of (graph[node] || [])) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, dist + 1]);
            }
        }
    }
    
    return -1; // No path
}

// ============================================
// 3. BFS WITH LEVELS (DISTANCE TRACKING)
// ============================================

/**
 * Get distance from source to all reachable nodes
 * 
 * Useful for:
 * - Finding all nodes within k steps
 * - Level order processing
 */
function bfsLevels(graph, start) {
    const distance = new Map();
    distance.set(start, 0);
    const queue = [start];
    
    while (queue.length) {
        const node = queue.shift();
        const currentDist = distance.get(node);
        
        for (const neighbor of (graph[node] || [])) {
            if (!distance.has(neighbor)) {
                distance.set(neighbor, currentDist + 1);
                queue.push(neighbor);
            }
        }
    }
    
    return distance;
}

/**
 * Process level by level (like tree level order)
 */
function bfsByLevel(graph, start) {
    const visited = new Set([start]);
    let currentLevel = [start];
    const levels = [];
    
    while (currentLevel.length) {
        levels.push([...currentLevel]);
        const nextLevel = [];
        
        for (const node of currentLevel) {
            for (const neighbor of (graph[node] || [])) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    nextLevel.push(neighbor);
                }
            }
        }
        
        currentLevel = nextLevel;
    }
    
    return levels;
}

// ============================================
// 4. GRID BFS - 2D TRAVERSAL
// ============================================

/**
 * Number of Islands
 * 
 * Classic grid BFS problem
 * Each '1' is land, each '0' is water
 * Connected '1's form an island
 */
function numIslands(grid) {
    if (!grid.length) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;
    
    const bfs = (startR, startC) => {
        const queue = [[startR, startC]];
        grid[startR][startC] = '0'; // Mark as visited
        
        const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        
        while (queue.length) {
            const [row, col] = queue.shift();
            
            for (const [dr, dc] of dirs) {
                const nr = row + dr;
                const nc = col + dc;
                
                if (nr >= 0 && nr < rows && 
                    nc >= 0 && nc < cols && 
                    grid[nr][nc] === '1') {
                    grid[nr][nc] = '0'; // Mark before adding!
                    queue.push([nr, nc]);
                }
            }
        }
    };
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                bfs(r, c);
                count++;
            }
        }
    }
    
    return count;
}

/**
 * Shortest Path in Binary Matrix
 */
function shortestPathBinaryMatrix(grid) {
    if (!grid.length || grid[0][0] === 1) return -1;
    
    const n = grid.length;
    if (n === 1 && grid[0][0] === 0) return 1;
    
    const queue = [[0, 0, 1]]; // [row, col, distance]
    grid[0][0] = 1; // Mark visited
    
    // 8 directions (including diagonals)
    const dirs = [
        [-1,-1], [-1,0], [-1,1],
        [0,-1],          [0,1],
        [1,-1],  [1,0],  [1,1]
    ];
    
    while (queue.length) {
        const [r, c, dist] = queue.shift();
        
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 0) {
                if (nr === n - 1 && nc === n - 1) return dist + 1;
                grid[nr][nc] = 1;
                queue.push([nr, nc, dist + 1]);
            }
        }
    }
    
    return -1;
}

// ============================================
// 5. COMMON MISTAKES & EDGE CASES
// ============================================

/**
 * Mistake 1: Marking visited AFTER dequeue (causes duplicates)
 * Mark visited WHEN ADDING to queue!
 * 
 * Mistake 2: Not checking bounds in grid problems
 * 
 * Mistake 3: Using BFS for weighted shortest path
 * BFS only works for unweighted! Use Dijkstra for weighted.
 * 
 * Mistake 4: Modifying grid while iterating
 * Mark cells before adding to queue
 * 
 * Edge Cases:
 * - Disconnected graph (some nodes unreachable)
 * - Start equals end
 * - Empty graph
 * - Single node
 */

// ============================================
// 6. INTERVIEW PERSPECTIVE
// ============================================

/**
 * When to use BFS:
 * 
 * 1. SHORTEST PATH: Unweighted graph
 * 2. LEVEL BY LEVEL: Tree level order, min depth
 * 3. CONNECTED COMPONENTS: Count islands, regions
 * 4. SPREADING: Rotting oranges, word ladder
 * 
 * BFS vs DFS:
 * - BFS: Shortest path, level order, uses more memory
 * - DFS: Backtracking, cycle detection, uses less memory
 * 
 * Multi-source BFS:
 * Start with multiple sources in queue (rotting oranges)
 */

// ============================================
// 7. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Medium): Rotting Oranges
 */
function orangesRotting(grid) {
    const queue = [];
    let fresh = 0;
    const rows = grid.length, cols = grid[0].length;
    
    // Find all rotten oranges and count fresh
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 2) queue.push([r, c, 0]);
            else if (grid[r][c] === 1) fresh++;
        }
    }
    
    if (fresh === 0) return 0;
    
    const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
    let minutes = 0;
    
    while (queue.length) {
        const [r, c, time] = queue.shift();
        
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
                grid[nr][nc] = 2;
                fresh--;
                minutes = time + 1;
                queue.push([nr, nc, time + 1]);
            }
        }
    }
    
    return fresh === 0 ? minutes : -1;
}

/**
 * Problem 2 (Medium): Word Ladder
 */
function ladderLength(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    
    const queue = [[beginWord, 1]];
    const visited = new Set([beginWord]);
    
    while (queue.length) {
        const [word, steps] = queue.shift();
        
        // Try changing each character
        for (let i = 0; i < word.length; i++) {
            for (let c = 97; c <= 122; c++) { // a-z
                const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
                
                if (newWord === endWord) return steps + 1;
                
                if (wordSet.has(newWord) && !visited.has(newWord)) {
                    visited.add(newWord);
                    queue.push([newWord, steps + 1]);
                }
            }
        }
    }
    
    return 0;
}

/**
 * Problem 3 (Hard): Open the Lock
 */
function openLock(deadends, target) {
    const dead = new Set(deadends);
    if (dead.has('0000')) return -1;
    if (target === '0000') return 0;
    
    const queue = [['0000', 0]];
    const visited = new Set(['0000']);
    
    const getNeighbors = (code) => {
        const result = [];
        for (let i = 0; i < 4; i++) {
            const digit = parseInt(code[i]);
            for (const delta of [-1, 1]) {
                const newDigit = (digit + delta + 10) % 10;
                const newCode = code.slice(0, i) + newDigit + code.slice(i + 1);
                result.push(newCode);
            }
        }
        return result;
    };
    
    while (queue.length) {
        const [code, turns] = queue.shift();
        
        for (const next of getNeighbors(code)) {
            if (next === target) return turns + 1;
            if (!dead.has(next) && !visited.has(next)) {
                visited.add(next);
                queue.push([next, turns + 1]);
            }
        }
    }
    
    return -1;
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * BFS CHEAT SHEET:
 * 
 * TEMPLATE:
 * 1. Initialize: queue = [start], visited = {start}
 * 2. Loop: while queue not empty
 * 3. Process: dequeue, handle node
 * 4. Expand: add unvisited neighbors, mark visited
 * 
 * KEY INSIGHT:
 * BFS = Shortest path in UNWEIGHTED graphs
 * 
 * COMPLEXITY:
 * - Time: O(V + E)
 * - Space: O(V)
 * 
 * COMMON PATTERNS:
 * | Pattern          | Example                        |
 * |------------------|--------------------------------|
 * | Shortest path    | Maze, word ladder              |
 * | Level order      | Tree traversal                 |
 * | Multi-source     | Rotting oranges                |
 * | Grid traversal   | Islands, matrix paths          |
 * 
 * CRITICAL RULES:
 * 1. Mark visited WHEN ADDING to queue, not when processing
 * 2. Check bounds for grid problems
 * 3. BFS is for UNWEIGHTED, use Dijkstra for WEIGHTED
 * 
 * BFS vs DFS:
 * - BFS: Shortest path, more memory (O(width))
 * - DFS: Backtracking, less memory (O(depth))
 */

module.exports = { 
    bfs, 
    shortestPath,
    shortestDistance,
    bfsLevels,
    bfsByLevel,
    numIslands,
    shortestPathBinaryMatrix,
    orangesRotting,
    ladderLength,
    openLock
};
