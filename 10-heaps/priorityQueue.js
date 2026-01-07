/**
 * PRIORITY QUEUE
 */

class PriorityQueue {
    constructor(compare = (a, b) => a - b) {
        this.heap = [];
        this.compare = compare;
    }
    
    enqueue(val) { this.heap.push(val); this._bubbleUp(this.heap.length - 1); }
    
    _bubbleUp(i) {
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (this.compare(this.heap[i], this.heap[parent]) >= 0) break;
            [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
            i = parent;
        }
    }
    
    dequeue() {
        if (!this.heap.length) return null;
        const top = this.heap[0];
        if (this.heap.length > 1) {
            this.heap[0] = this.heap.pop();
            this._bubbleDown(0);
        } else this.heap.pop();
        return top;
    }
    
    _bubbleDown(i) {
        while (true) {
            let smallest = i, l = 2 * i + 1, r = 2 * i + 2;
            if (l < this.heap.length && this.compare(this.heap[l], this.heap[smallest]) < 0) smallest = l;
            if (r < this.heap.length && this.compare(this.heap[r], this.heap[smallest]) < 0) smallest = r;
            if (smallest === i) break;
            [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
            i = smallest;
        }
    }
    
    peek() { return this.heap[0]; }
    size() { return this.heap.length; }
    isEmpty() { return this.heap.length === 0; }
}

// Top K frequent elements
function topKFrequent(nums, k) {
    const freq = new Map();
    for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);
    
    const pq = new PriorityQueue((a, b) => a[1] - b[1]);
    for (const [num, count] of freq) {
        pq.enqueue([num, count]);
        if (pq.size() > k) pq.dequeue();
    }
    
    return pq.heap.map(x => x[0]);
}

module.exports = { PriorityQueue, topKFrequent };
