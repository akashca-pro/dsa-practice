/**
 * HEAP BASICS - Priority Queue
 */

class MinHeap {
    constructor() { this.heap = []; }
    
    parent(i) { return Math.floor((i - 1) / 2); }
    left(i) { return 2 * i + 1; }
    right(i) { return 2 * i + 2; }
    
    insert(val) { this.heap.push(val); this._bubbleUp(this.heap.length - 1); }
    
    _bubbleUp(i) {
        while (i > 0 && this.heap[this.parent(i)] > this.heap[i]) {
            [this.heap[i], this.heap[this.parent(i)]] = [this.heap[this.parent(i)], this.heap[i]];
            i = this.parent(i);
        }
    }
    
    extractMin() {
        if (!this.heap.length) return null;
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        if (this.heap.length) this._bubbleDown(0);
        return min;
    }
    
    _bubbleDown(i) {
        let smallest = i;
        const l = this.left(i), r = this.right(i);
        if (l < this.heap.length && this.heap[l] < this.heap[smallest]) smallest = l;
        if (r < this.heap.length && this.heap[r] < this.heap[smallest]) smallest = r;
        if (smallest !== i) {
            [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
            this._bubbleDown(smallest);
        }
    }
    
    peek() { return this.heap[0]; }
    size() { return this.heap.length; }
}

class MaxHeap {
    constructor() { this.heap = []; }
    parent(i) { return Math.floor((i - 1) / 2); }
    left(i) { return 2 * i + 1; }
    right(i) { return 2 * i + 2; }
    
    insert(val) { this.heap.push(val); this._bubbleUp(this.heap.length - 1); }
    _bubbleUp(i) {
        while (i > 0 && this.heap[this.parent(i)] < this.heap[i]) {
            [this.heap[i], this.heap[this.parent(i)]] = [this.heap[this.parent(i)], this.heap[i]];
            i = this.parent(i);
        }
    }
    
    extractMax() {
        if (!this.heap.length) return null;
        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        if (this.heap.length) this._bubbleDown(0);
        return max;
    }
    
    _bubbleDown(i) {
        let largest = i;
        const l = this.left(i), r = this.right(i);
        if (l < this.heap.length && this.heap[l] > this.heap[largest]) largest = l;
        if (r < this.heap.length && this.heap[r] > this.heap[largest]) largest = r;
        if (largest !== i) {
            [this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]];
            this._bubbleDown(largest);
        }
    }
    
    peek() { return this.heap[0]; }
    size() { return this.heap.length; }
}

module.exports = { MinHeap, MaxHeap };
