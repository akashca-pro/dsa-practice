/**
 * BFS TRAVERSAL
 */

function bfs(graph, start) {
    const visited = new Set([start]);
    const queue = [start];
    const order = [];
    
    while (queue.length) {
        const node = queue.shift();
        order.push(node);
        
        for (const neighbor of (graph[node] || [])) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    return order;
}

// Shortest path in unweighted graph
function shortestPath(graph, start, end) {
    const visited = new Set([start]);
    const queue = [[start, [start]]];
    
    while (queue.length) {
        const [node, path] = queue.shift();
        if (node === end) return path;
        
        for (const neighbor of (graph[node] || [])) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, [...path, neighbor]]);
            }
        }
    }
    return null;
}

// Level order / distance from source
function bfsLevels(graph, start) {
    const distance = new Map([[start, 0]]);
    const queue = [start];
    
    while (queue.length) {
        const node = queue.shift();
        for (const neighbor of (graph[node] || [])) {
            if (!distance.has(neighbor)) {
                distance.set(neighbor, distance.get(node) + 1);
                queue.push(neighbor);
            }
        }
    }
    return distance;
}

// Number of islands
function numIslands(grid) {
    if (!grid.length) return 0;
    let count = 0;
    
    const bfs = (r, c) => {
        const queue = [[r, c]];
        grid[r][c] = '0';
        
        while (queue.length) {
            const [row, col] = queue.shift();
            const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
            
            for (const [dr, dc] of dirs) {
                const nr = row + dr, nc = col + dc;
                if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] === '1') {
                    grid[nr][nc] = '0';
                    queue.push([nr, nc]);
                }
            }
        }
    };
    
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === '1') { bfs(i, j); count++; }
        }
    }
    return count;
}

module.exports = { bfs, shortestPath, bfsLevels, numIslands };
