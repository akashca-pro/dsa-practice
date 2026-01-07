/**
 * ============================================
 * QUEUE IMPLEMENTATION
 * ============================================
 * 
 * CONCEPT:
 * A queue is a linear data structure that follows FIFO (First In, First Out).
 * The first element added is the first one to be removed.
 * 
 * Think of it like a line at a grocery store:
 * - People join at the back (enqueue)
 * - People leave from the front (dequeue)
 * - First person in line is served first
 * 
 * REAL-WORLD ANALOGY:
 * Printer Queue:
 * - Print jobs are added to the queue in order
 * - The printer processes jobs in the order received
 * - The first document submitted prints first
 * 
 * Other examples:
 * - Customer service call centers
 * - Task scheduling in operating systems
 * - Order processing in restaurants
 * 
 * INDUSTRY APPLICATIONS:
 * - BFS (Breadth-First Search) in graphs
 * - CPU task scheduling
 * - Message queues (RabbitMQ, Kafka)
 * - Print spooling
 * - Web server request handling
 * - Asynchronous data transfer (IO buffers)
 * 
 * COMPLEXITY:
 * | Operation | Time | Notes                    |
 * |-----------|------|--------------------------|
 * | Enqueue   | O(1) | Add to rear              |
 * | Dequeue   | O(1) | Remove from front*       |
 * | Front     | O(1) | View front element       |
 * | isEmpty   | O(1) | Check if empty           |
 * 
 * * Using array shift() is O(n), use object or linked list for O(1)
 */

// ============================================
// 1. EFFICIENT QUEUE IMPLEMENTATION
// ============================================

/**
 * Queue using object (not array) for O(1) operations
 * 
 * Why not use array.shift()?
 * - shift() is O(n) because it re-indexes all elements
 * - Using object with head/tail pointers gives O(1)
 */
class Queue {
    constructor() {
        this.items = {};
        this.head = 0;  // Index of front element
        this.tail = 0;  // Index where next element will be added
    }
    
    /**
     * Enqueue: Add to rear - O(1)
     */
    enqueue(item) {
        this.items[this.tail] = item;
        this.tail++;
    }
    
    /**
     * Dequeue: Remove from front - O(1)
     */
    dequeue() {
        if (this.isEmpty()) return undefined;
        
        const item = this.items[this.head];
        delete this.items[this.head];
        this.head++;
        
        return item;
    }
    
    /**
     * View front element without removing - O(1)
     */
    front() {
        return this.items[this.head];
    }
    
    /**
     * Check if queue is empty - O(1)
     */
    isEmpty() {
        return this.tail === this.head;
    }
    
    /**
     * Get number of elements - O(1)
     */
    size() {
        return this.tail - this.head;
    }
}

// ============================================
// 2. QUEUE USING TWO STACKS
// ============================================

/**
 * Classic interview problem: Implement queue using stacks
 * 
 * Technique: Use two stacks
 * - pushStack: for enqueue operations
 * - popStack: for dequeue operations (reversed order)
 * 
 * When popStack is empty, transfer all from pushStack
 * This reverses the order, giving FIFO behavior
 * 
 * Amortized O(1) for all operations
 */
class QueueUsingStacks {
    constructor() {
        this.pushStack = [];  // For adding elements
        this.popStack = [];   // For removing elements
    }
    
    enqueue(x) {
        this.pushStack.push(x);
    }
    
    /**
     * Transfer elements only when popStack is empty
     * This ensures amortized O(1) complexity
     */
    dequeue() {
        if (this.popStack.length === 0) {
            // Move all elements to popStack (reverses order)
            while (this.pushStack.length) {
                this.popStack.push(this.pushStack.pop());
            }
        }
        return this.popStack.pop();
    }
    
    front() {
        if (this.popStack.length === 0) {
            while (this.pushStack.length) {
                this.popStack.push(this.pushStack.pop());
            }
        }
        return this.popStack[this.popStack.length - 1];
    }
    
    isEmpty() {
        return !this.pushStack.length && !this.popStack.length;
    }
}

// ============================================
// 3. BFS - QUEUE'S MOST COMMON USE
// ============================================

/**
 * Breadth-First Search using Queue
 * 
 * BFS explores nodes level by level:
 * 1. Start with source node in queue
 * 2. Dequeue node, process it
 * 3. Enqueue all unvisited neighbors
 * 4. Repeat until queue is empty
 * 
 * Properties:
 * - Finds shortest path in unweighted graphs
 * - Visits all nodes at distance k before any at k+1
 * - Time: O(V + E), Space: O(V)
 */
function bfs(graph, start) {
    const visited = new Set([start]);
    const queue = [start];
    const order = [];
    
    while (queue.length) {
        const node = queue.shift(); // Note: O(n), use proper queue for efficiency
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

/**
 * BFS with distance tracking
 * Returns distance from start to each node
 */
function bfsWithDistance(graph, start) {
    const distance = new Map();
    distance.set(start, 0);
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

// ============================================
// 4. LEVEL ORDER TRAVERSAL
// ============================================

/**
 * Level Order Traversal of Binary Tree
 * 
 * Classic queue application for trees
 * Visits nodes level by level, left to right
 * 
 * Key insight: Track level boundaries using queue size
 */
function levelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length) {
        const level = [];
        const size = queue.length; // Nodes at current level
        
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            level.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(level);
    }
    
    return result;
}

// ============================================
// 5. COMMON MISTAKES & EDGE CASES
// ============================================

/**
 * Mistake 1: Using array.shift() in hot loops
 * shift() is O(n)! Use object-based queue or doubly-linked list
 * 
 * Mistake 2: Not tracking visited nodes in BFS
 * Results in infinite loops for cyclic graphs
 * 
 * Mistake 3: Modifying queue while iterating
 * Save queue length before loop when processing levels
 * 
 * Edge Cases:
 * - Empty queue operations
 * - Single element
 * - Disconnected graph components
 * - Self-loops
 */

// ============================================
// 6. INTERVIEW PERSPECTIVE
// ============================================

/**
 * When to use a queue:
 * 
 * 1. BFS: Shortest path, level-order traversal
 * 2. LEVEL-BY-LEVEL PROCESSING: Tree/graph traversal
 * 3. SCHEDULING: Task queues, job scheduling
 * 4. BUFFERING: Data streams, producer-consumer
 * 
 * Queue vs Stack:
 * - Queue (FIFO): BFS, level order, scheduling
 * - Stack (LIFO): DFS, backtracking, undo/redo
 * 
 * Common interview patterns:
 * - Implement queue using stacks
 * - BFS for shortest path
 * - Level order variants (zigzag, right side view)
 * - Sliding window with deque
 */

// ============================================
// 7. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Easy): Implement queue using linked list
 */
class LinkedQueue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    
    enqueue(val) {
        const node = { val, next: null };
        if (!this.tail) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }
    
    dequeue() {
        if (!this.head) return undefined;
        const val = this.head.val;
        this.head = this.head.next;
        if (!this.head) this.tail = null;
        this.length--;
        return val;
    }
}

/**
 * Problem 2 (Medium): Number of Islands using BFS
 */
function numIslands(grid) {
    if (!grid.length) return 0;
    
    const rows = grid.length, cols = grid[0].length;
    let count = 0;
    
    const bfs = (r, c) => {
        const queue = [[r, c]];
        grid[r][c] = '0';
        
        while (queue.length) {
            const [row, col] = queue.shift();
            const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
            
            for (const [dr, dc] of dirs) {
                const nr = row + dr, nc = col + dc;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '1') {
                    grid[nr][nc] = '0';
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
 * Problem 3 (Medium): Rotting Oranges
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

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * QUEUE CHEAT SHEET:
 * 
 * PRINCIPLE: FIFO (First In, First Out)
 * 
 * OPERATIONS (ALL O(1) with proper implementation):
 * - enqueue(x): Add to rear
 * - dequeue(): Remove from front
 * - front(): View front element
 * - isEmpty(): Check if empty
 * 
 * IMPLEMENTATIONS:
 * - Array: Simple but shift() is O(n)
 * - Object with head/tail: O(1) operations
 * - Linked list: True O(1) operations
 * - Two stacks: Amortized O(1)
 * 
 * USE CASES:
 * - BFS traversal
 * - Level order processing
 * - Task scheduling
 * - Buffer for async operations
 * 
 * INTERVIEW TIP:
 * Queue = BFS = Shortest path in unweighted graph
 * Stack = DFS = Backtracking
 */

module.exports = { 
    Queue, 
    QueueUsingStacks, 
    bfs, 
    bfsWithDistance,
    levelOrder,
    LinkedQueue,
    numIslands,
    orangesRotting
};
