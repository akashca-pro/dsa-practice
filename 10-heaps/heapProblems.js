/**
 * HEAP PROBLEMS
 */

// Merge K sorted lists
function mergeKLists(lists) {
    const arr = [];
    for (const list of lists) {
        let curr = list;
        while (curr) { arr.push(curr.val); curr = curr.next; }
    }
    arr.sort((a, b) => a - b);
    
    const dummy = { next: null };
    let curr = dummy;
    for (const val of arr) { curr.next = { val, next: null }; curr = curr.next; }
    return dummy.next;
}

// Find median from data stream
class MedianFinder {
    constructor() { this.low = []; this.high = []; } // max heap, min heap
    
    addNum(num) {
        this.low.push(num);
        this.low.sort((a, b) => b - a);
        
        this.high.push(this.low.shift());
        this.high.sort((a, b) => a - b);
        
        if (this.high.length > this.low.length) {
            this.low.push(this.high.shift());
            this.low.sort((a, b) => b - a);
        }
    }
    
    findMedian() {
        if (this.low.length > this.high.length) return this.low[0];
        return (this.low[0] + this.high[0]) / 2;
    }
}

// K closest points to origin
function kClosest(points, k) {
    return points.sort((a, b) => (a[0]**2 + a[1]**2) - (b[0]**2 + b[1]**2)).slice(0, k);
}

// Sort nearly sorted array
function sortNearlySorted(arr, k) {
    const result = [];
    const heap = arr.slice(0, k + 1).sort((a, b) => a - b);
    
    for (let i = k + 1; i < arr.length; i++) {
        result.push(heap.shift());
        heap.push(arr[i]);
        heap.sort((a, b) => a - b);
    }
    
    while (heap.length) result.push(heap.shift());
    return result;
}

// Task scheduler
function leastInterval(tasks, n) {
    const freq = new Array(26).fill(0);
    for (const t of tasks) freq[t.charCodeAt(0) - 65]++;
    freq.sort((a, b) => b - a);
    
    const maxFreq = freq[0];
    let idleSlots = (maxFreq - 1) * n;
    
    for (let i = 1; i < 26 && freq[i] > 0; i++) {
        idleSlots -= Math.min(freq[i], maxFreq - 1);
    }
    
    return tasks.length + Math.max(0, idleSlots);
}

module.exports = { mergeKLists, MedianFinder, kClosest, sortNearlySorted, leastInterval };
