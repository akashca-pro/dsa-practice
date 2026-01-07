/**
 * ============================================
 * HEAP BASICS - Priority Queue
 * ============================================
 * 
 * CONCEPT:
 * A heap is a complete binary tree that satisfies the heap property:
 * - Min-Heap: Parent is always smaller than or equal to children
 * - Max-Heap: Parent is always larger than or equal to children
 * 
 * Heaps are typically implemented using arrays where:
 * - Parent of node at index i: Math.floor((i-1)/2)
 * - Left child of node at index i: 2*i + 1
 * - Right child of node at index i: 2*i + 2
 * 
 * REAL-WORLD ANALOGY:
 * Think of a hospital emergency room:
 * - Patients are prioritized by severity, not arrival time
 * - The most critical patient is always treated first
 * - New patients are quickly placed in the right priority position
 * - This is exactly what a priority queue (heap) does!
 * 
 * INDUSTRY APPLICATIONS:
 * - Operating system task scheduling
 * - Dijkstra's shortest path algorithm
 * - Prim's minimum spanning tree
 * - Median maintenance in streaming data
 * - Top-K frequent elements
 * - Merge K sorted lists
 * 
 * COMPLEXITY:
 * | Operation   | Time Complexity |
 * |-------------|-----------------|
 * | Insert      | O(log n)        |
 * | Extract     | O(log n)        |
 * | Peek        | O(1)            |
 * | Build Heap  | O(n)            |
 * | Search      | O(n)            |
 * Space: O(n)
 */

// ============================================
// 1. MIN HEAP IMPLEMENTATION
// ============================================

/**
 * Min-Heap: Root is always the minimum element
 * Used when you need quick access to the smallest item
 */
class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    // Get parent index: (i-1)/2
    parent(i) { 
        return Math.floor((i - 1) / 2); 
    }
    
    // Get left child index: 2i+1
    left(i) { 
        return 2 * i + 1; 
    }
    
    // Get right child index: 2i+2
    right(i) { 
        return 2 * i + 2; 
    }
    
    /**
     * Insert a new value - O(log n)
     * 1. Add to end of array
     * 2. Bubble up to maintain heap property
     */
    insert(val) {
        this.heap.push(val);
        this._bubbleUp(this.heap.length - 1);
    }
    
    /**
     * Bubble Up (Heapify Up):
     * Compare with parent and swap if smaller
     * Continue until heap property is restored
     */
    _bubbleUp(i) {
        while (i > 0 && this.heap[this.parent(i)] > this.heap[i]) {
            // Swap with parent
            [this.heap[i], this.heap[this.parent(i)]] = 
                [this.heap[this.parent(i)], this.heap[i]];
            i = this.parent(i);
        }
    }
    
    /**
     * Extract minimum - O(log n)
     * 1. Save root (minimum)
     * 2. Move last element to root
     * 3. Bubble down to maintain heap property
     */
    extractMin() {
        if (!this.heap.length) return null;
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        
        if (this.heap.length) {
            this._bubbleDown(0);
        }
        
        return min;
    }
    
    /**
     * Bubble Down (Heapify Down):
     * Compare with children and swap with smaller child
     * Continue until heap property is restored
     */
    _bubbleDown(i) {
        let smallest = i;
        const l = this.left(i);
        const r = this.right(i);
        
        // Check if left child is smaller
        if (l < this.heap.length && this.heap[l] < this.heap[smallest]) {
            smallest = l;
        }
        
        // Check if right child is smaller
        if (r < this.heap.length && this.heap[r] < this.heap[smallest]) {
            smallest = r;
        }
        
        // If smallest is not current node, swap and continue
        if (smallest !== i) {
            [this.heap[i], this.heap[smallest]] = 
                [this.heap[smallest], this.heap[i]];
            this._bubbleDown(smallest);
        }
    }
    
    // Peek at minimum without removing - O(1)
    peek() { 
        return this.heap[0]; 
    }
    
    // Get heap size - O(1)
    size() { 
        return this.heap.length; 
    }
    
    // Check if heap is empty
    isEmpty() {
        return this.heap.length === 0;
    }
}

// ============================================
// 2. MAX HEAP IMPLEMENTATION
// ============================================

/**
 * Max-Heap: Root is always the maximum element
 * Used when you need quick access to the largest item
 */
class MaxHeap {
    constructor() {
        this.heap = [];
    }
    
    parent(i) { 
        return Math.floor((i - 1) / 2); 
    }
    
    left(i) { 
        return 2 * i + 1; 
    }
    
    right(i) { 
        return 2 * i + 2; 
    }
    
    insert(val) {
        this.heap.push(val);
        this._bubbleUp(this.heap.length - 1);
    }
    
    // Note: Compare with > instead of < for max heap
    _bubbleUp(i) {
        while (i > 0 && this.heap[this.parent(i)] < this.heap[i]) {
            [this.heap[i], this.heap[this.parent(i)]] = 
                [this.heap[this.parent(i)], this.heap[i]];
            i = this.parent(i);
        }
    }
    
    extractMax() {
        if (!this.heap.length) return null;
        
        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        
        if (this.heap.length) {
            this._bubbleDown(0);
        }
        
        return max;
    }
    
    // Note: Find largest child instead of smallest
    _bubbleDown(i) {
        let largest = i;
        const l = this.left(i);
        const r = this.right(i);
        
        if (l < this.heap.length && this.heap[l] > this.heap[largest]) {
            largest = l;
        }
        
        if (r < this.heap.length && this.heap[r] > this.heap[largest]) {
            largest = r;
        }
        
        if (largest !== i) {
            [this.heap[i], this.heap[largest]] = 
                [this.heap[largest], this.heap[i]];
            this._bubbleDown(largest);
        }
    }
    
    peek() { 
        return this.heap[0]; 
    }
    
    size() { 
        return this.heap.length; 
    }
    
    isEmpty() {
        return this.heap.length === 0;
    }
}

// ============================================
// 3. HEAP VISUALIZATION
// ============================================

/**
 * Array representation of a heap:
 * 
 *        [10]           Index 0 (root)
 *       /    \
 *    [20]    [15]       Index 1, 2
 *    /  \    /  \
 *  [30][25][18][17]     Index 3, 4, 5, 6
 * 
 * Array: [10, 20, 15, 30, 25, 18, 17]
 * 
 * For node at index i:
 * - Parent: (i-1)/2
 * - Left child: 2i+1
 * - Right child: 2i+2
 */

// ============================================
// 4. COMMON MISTAKES & EDGE CASES
// ============================================

/**
 * Mistake 1: Forgetting to check if heap is empty
 * Always check before extracting or peeking
 * 
 * Mistake 2: Using wrong comparison for min vs max heap
 * Min heap: parent < children
 * Max heap: parent > children
 * 
 * Mistake 3: Not handling single element after extraction
 * After extracting from 1-element heap, don't bubble down
 * 
 * Edge Cases:
 * - Empty heap operations
 * - Single element heap
 * - Duplicate values (heaps handle them fine)
 * - All elements equal
 */

// ============================================
// 5. INTERVIEW PERSPECTIVE
// ============================================

/**
 * Common heap interview questions:
 * 
 * 1. "Find kth largest element" - Use min heap of size k
 * 2. "Merge k sorted lists" - Use min heap with list heads
 * 3. "Find median from data stream" - Use two heaps
 * 4. "Top k frequent elements" - Use min heap
 * 5. "Task scheduler" - Use max heap for frequencies
 * 
 * When to use a heap:
 * - Need quick access to min/max
 * - Priority-based processing
 * - K-smallest or K-largest problems
 * - Streaming data with running statistics
 */

// ============================================
// 6. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Easy): Check if array is a valid min-heap
 */
function isMinHeap(arr) {
    const n = arr.length;
    
    for (let i = 0; i <= Math.floor((n - 2) / 2); i++) {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        
        if (left < n && arr[i] > arr[left]) return false;
        if (right < n && arr[i] > arr[right]) return false;
    }
    
    return true;
}

/**
 * Problem 2 (Medium): Kth largest element in array
 */
function findKthLargest(nums, k) {
    const minHeap = new MinHeap();
    
    for (const num of nums) {
        minHeap.insert(num);
        if (minHeap.size() > k) {
            minHeap.extractMin();
        }
    }
    
    return minHeap.peek();
}

/**
 * Problem 3 (Medium): Sort a nearly sorted array
 * Each element is at most k positions away from sorted position
 */
function sortNearlySorted(arr, k) {
    const minHeap = new MinHeap();
    const result = [];
    
    for (let i = 0; i < arr.length; i++) {
        minHeap.insert(arr[i]);
        
        if (minHeap.size() > k) {
            result.push(minHeap.extractMin());
        }
    }
    
    while (!minHeap.isEmpty()) {
        result.push(minHeap.extractMin());
    }
    
    return result;
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * HEAP CHEAT SHEET:
 * 
 * STRUCTURE:
 * - Complete binary tree stored as array
 * - Parent at i, children at 2i+1 and 2i+2
 * 
 * OPERATIONS:
 * | Operation      | Complexity |
 * |----------------|------------|
 * | Insert         | O(log n)   |
 * | Extract        | O(log n)   |
 * | Peek           | O(1)       |
 * | Build heap     | O(n)       |
 * 
 * MIN vs MAX HEAP:
 * - Min: Root is smallest, good for kth largest
 * - Max: Root is largest, good for kth smallest
 * 
 * USE CASES:
 * - Priority queues
 * - K-element problems  
 * - Scheduling algorithms
 * - Graph algorithms (Dijkstra, Prim)
 * 
 * KEY INSIGHT:
 * - For kth largest: use MIN heap of size k
 * - For kth smallest: use MAX heap of size k
 */

module.exports = { MinHeap, MaxHeap, isMinHeap, findKthLargest, sortNearlySorted };
