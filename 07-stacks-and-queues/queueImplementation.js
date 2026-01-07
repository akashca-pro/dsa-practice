/**
 * ============================================
 * QUEUE IMPLEMENTATION
 * ============================================
 * FIFO: First In, First Out
 */

class Queue {
    constructor() {
        this.items = {};
        this.head = 0;
        this.tail = 0;
    }
    
    enqueue(item) { this.items[this.tail++] = item; }
    
    dequeue() {
        if (this.isEmpty()) return undefined;
        const item = this.items[this.head];
        delete this.items[this.head++];
        return item;
    }
    
    front() { return this.items[this.head]; }
    isEmpty() { return this.tail === this.head; }
    size() { return this.tail - this.head; }
}

// Queue using two stacks
class QueueUsingStacks {
    constructor() {
        this.pushStack = [];
        this.popStack = [];
    }
    
    enqueue(x) { this.pushStack.push(x); }
    
    dequeue() {
        if (this.popStack.length === 0) {
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
    
    isEmpty() { return !this.pushStack.length && !this.popStack.length; }
}

// BFS using queue
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

// Level order traversal
function levelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length) {
        const level = [];
        const size = queue.length;
        
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

module.exports = { Queue, QueueUsingStacks, bfs, levelOrder };
