/**
 * GRAPH PROBLEMS
 */

// Clone graph
function cloneGraph(node) {
    if (!node) return null;
    const map = new Map();
    
    const dfs = (n) => {
        if (map.has(n)) return map.get(n);
        const copy = { val: n.val, neighbors: [] };
        map.set(n, copy);
        for (const neighbor of n.neighbors) copy.neighbors.push(dfs(neighbor));
        return copy;
    };
    
    return dfs(node);
}

// Course schedule (can finish)
function canFinish(numCourses, prerequisites) {
    const adj = Array(numCourses).fill(null).map(() => []);
    const indegree = new Array(numCourses).fill(0);
    
    for (const [course, prereq] of prerequisites) {
        adj[prereq].push(course);
        indegree[course]++;
    }
    
    const queue = [];
    for (let i = 0; i < numCourses; i++) if (indegree[i] === 0) queue.push(i);
    
    let count = 0;
    while (queue.length) {
        const course = queue.shift();
        count++;
        for (const next of adj[course]) {
            if (--indegree[next] === 0) queue.push(next);
        }
    }
    return count === numCourses;
}

// Word ladder
function ladderLength(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    
    const queue = [[beginWord, 1]];
    const visited = new Set([beginWord]);
    
    while (queue.length) {
        const [word, steps] = queue.shift();
        
        for (let i = 0; i < word.length; i++) {
            for (let c = 97; c <= 122; c++) {
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

// Union Find
class UnionFind {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = new Array(n).fill(0);
    }
    
    find(x) {
        if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
        return this.parent[x];
    }
    
    union(x, y) {
        const px = this.find(x), py = this.find(y);
        if (px === py) return false;
        if (this.rank[px] < this.rank[py]) this.parent[px] = py;
        else if (this.rank[px] > this.rank[py]) this.parent[py] = px;
        else { this.parent[py] = px; this.rank[px]++; }
        return true;
    }
}

// Redundant connection
function findRedundantConnection(edges) {
    const uf = new UnionFind(edges.length + 1);
    for (const [u, v] of edges) {
        if (!uf.union(u, v)) return [u, v];
    }
    return [];
}

module.exports = { cloneGraph, canFinish, ladderLength, UnionFind, findRedundantConnection };
