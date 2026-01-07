/**
 * DFS TRAVERSAL
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

function dfsIterative(graph, start) {
    const visited = new Set();
    const stack = [start];
    const order = [];
    
    while (stack.length) {
        const node = stack.pop();
        if (visited.has(node)) continue;
        visited.add(node);
        order.push(node);
        
        for (const neighbor of (graph[node] || []).reverse()) {
            if (!visited.has(neighbor)) stack.push(neighbor);
        }
    }
    return order;
}

// Detect cycle in directed graph
function hasCycleDirected(n, edges) {
    const adj = Array(n).fill(null).map(() => []);
    for (const [u, v] of edges) adj[u].push(v);
    
    const color = new Array(n).fill(0); // 0: white, 1: gray, 2: black
    
    const dfs = (node) => {
        color[node] = 1;
        for (const neighbor of adj[node]) {
            if (color[neighbor] === 1) return true;
            if (color[neighbor] === 0 && dfs(neighbor)) return true;
        }
        color[node] = 2;
        return false;
    };
    
    for (let i = 0; i < n; i++) {
        if (color[i] === 0 && dfs(i)) return true;
    }
    return false;
}

// Topological sort
function topologicalSort(n, edges) {
    const adj = Array(n).fill(null).map(() => []);
    for (const [u, v] of edges) adj[u].push(v);
    
    const visited = new Set();
    const result = [];
    
    const dfs = (node) => {
        visited.add(node);
        for (const neighbor of adj[node]) {
            if (!visited.has(neighbor)) dfs(neighbor);
        }
        result.unshift(node);
    };
    
    for (let i = 0; i < n; i++) {
        if (!visited.has(i)) dfs(i);
    }
    return result;
}

// Connected components
function countComponents(n, edges) {
    const adj = Array(n).fill(null).map(() => []);
    for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }
    
    const visited = new Set();
    let count = 0;
    
    const dfs = (node) => {
        visited.add(node);
        for (const neighbor of adj[node]) {
            if (!visited.has(neighbor)) dfs(neighbor);
        }
    };
    
    for (let i = 0; i < n; i++) {
        if (!visited.has(i)) { dfs(i); count++; }
    }
    return count;
}

module.exports = { dfsRecursive, dfsIterative, hasCycleDirected, topologicalSort, countComponents };
