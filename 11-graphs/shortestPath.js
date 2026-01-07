/**
 * SHORTEST PATH ALGORITHMS
 */

// Dijkstra's algorithm
function dijkstra(graph, start) {
    const dist = new Map([[start, 0]]);
    const pq = [[0, start]]; // [distance, node]
    
    while (pq.length) {
        pq.sort((a, b) => a[0] - b[0]);
        const [d, node] = pq.shift();
        
        if (d > (dist.get(node) ?? Infinity)) continue;
        
        for (const { node: neighbor, weight } of (graph.get(node) || [])) {
            const newDist = d + weight;
            if (newDist < (dist.get(neighbor) ?? Infinity)) {
                dist.set(neighbor, newDist);
                pq.push([newDist, neighbor]);
            }
        }
    }
    return dist;
}

// Bellman-Ford (handles negative edges)
function bellmanFord(n, edges, start) {
    const dist = new Array(n).fill(Infinity);
    dist[start] = 0;
    
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
            return null; // Negative cycle
        }
    }
    return dist;
}

// Floyd-Warshall (all pairs shortest path)
function floydWarshall(n, edges) {
    const dist = Array(n).fill(null).map(() => Array(n).fill(Infinity));
    for (let i = 0; i < n; i++) dist[i][i] = 0;
    
    for (const [u, v, w] of edges) dist[u][v] = w;
    
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

// Network delay time
function networkDelayTime(times, n, k) {
    const graph = new Map();
    for (const [u, v, w] of times) {
        if (!graph.has(u)) graph.set(u, []);
        graph.get(u).push({ node: v, weight: w });
    }
    
    const dist = dijkstra(graph, k);
    
    let maxTime = 0;
    for (let i = 1; i <= n; i++) {
        if (!dist.has(i)) return -1;
        maxTime = Math.max(maxTime, dist.get(i));
    }
    return maxTime;
}

module.exports = { dijkstra, bellmanFord, floydWarshall, networkDelayTime };
