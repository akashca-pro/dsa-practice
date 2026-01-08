/**
 * ============================================
 * HEAP PROBLEMS - COMPREHENSIVE GUIDE
 * ============================================
 * 
 * LEARNING ORDER:
 * 1. Top K Problems (most common!)
 * 2. Merge K Sorted
 * 3. Streaming/Running Statistics
 * 4. Scheduling Problems
 * 5. Two Heaps Pattern
 */

// ============================================
// HEAP BASICS (for reference)
// ============================================

class MinHeap {
    constructor() { this.heap = []; }
    
    push(val) {
        this.heap.push(val);
        this._bubbleUp(this.heap.length - 1);
    }
    
    pop() {
        if (!this.heap.length) return null;
        const min = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length) {
            this.heap[0] = last;
            this._bubbleDown(0);
        }
        return min;
    }
    
    peek() { return this.heap[0]; }
    size() { return this.heap.length; }
    
    _bubbleUp(i) {
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (this.heap[parent] <= this.heap[i]) break;
            [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
            i = parent;
        }
    }
    
    _bubbleDown(i) {
        while (true) {
            let smallest = i;
            const left = 2 * i + 1, right = 2 * i + 2;
            if (left < this.heap.length && this.heap[left] < this.heap[smallest]) smallest = left;
            if (right < this.heap.length && this.heap[right] < this.heap[smallest]) smallest = right;
            if (smallest === i) break;
            [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
            i = smallest;
        }
    }
}

// ============================================
// CATEGORY 1: TOP K PROBLEMS
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - Top K trending hashtags on Twitter
 * - Top K products on Amazon
 * - Top K search results
 * - Top K frequent errors in logs
 * 
 * KEY INSIGHT:
 * - For Top K largest: Use MIN heap of size K
 * - For Top K smallest: Use MAX heap of size K
 */

// ------------------------------------------
// 1.1 KTH LARGEST ELEMENT
// ------------------------------------------

/**
 * Problem: Find kth largest element in unsorted array
 * 
 * Real-world: Find the 3rd highest score
 * 
 * Approach: Min heap of size K
 * Root of min-heap = Kth largest
 */
function findKthLargest(nums, k) {
    const minHeap = new MinHeap();
    
    for (const num of nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop(); // Remove smallest
        }
    }
    
    return minHeap.peek();
}

// Alternative: QuickSelect O(n) average
function findKthLargestQuickSelect(nums, k) {
    k = nums.length - k; // Convert to kth smallest index
    
    const quickSelect = (left, right) => {
        const pivot = nums[right];
        let p = left;
        
        for (let i = left; i < right; i++) {
            if (nums[i] <= pivot) {
                [nums[i], nums[p]] = [nums[p], nums[i]];
                p++;
            }
        }
        [nums[p], nums[right]] = [nums[right], nums[p]];
        
        if (p === k) return nums[p];
        if (p < k) return quickSelect(p + 1, right);
        return quickSelect(left, p - 1);
    };
    
    return quickSelect(0, nums.length - 1);
}

/**
 * RELATED QUESTIONS:
 * - Kth Largest Element in Array (LeetCode 215)
 * - Kth Smallest Element in Sorted Matrix (LeetCode 378)
 * - Find K Closest Elements (LeetCode 658)
 */

// ------------------------------------------
// 1.2 TOP K FREQUENT ELEMENTS
// ------------------------------------------

/**
 * Problem: Find k most frequent elements
 * 
 * Real-world: Most popular products, trending topics
 */
function topKFrequent(nums, k) {
    // Count frequencies
    const freq = new Map();
    for (const num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }
    
    // Use min heap of size k (by frequency)
    const heap = []; // [frequency, number]
    
    for (const [num, count] of freq) {
        heap.push([count, num]);
        heap.sort((a, b) => a[0] - b[0]);
        if (heap.length > k) heap.shift();
    }
    
    return heap.map(([_, num]) => num);
}

// Bucket Sort approach - O(n)
function topKFrequentBucket(nums, k) {
    const freq = new Map();
    for (const num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }
    
    // Bucket by frequency
    const buckets = Array.from({ length: nums.length + 1 }, () => []);
    for (const [num, count] of freq) {
        buckets[count].push(num);
    }
    
    // Collect from highest frequency
    const result = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        result.push(...buckets[i]);
    }
    
    return result.slice(0, k);
}

/**
 * RELATED QUESTIONS:
 * - Top K Frequent Words (LeetCode 692)
 * - Sort Characters By Frequency (LeetCode 451)
 */

// ------------------------------------------
// 1.3 K CLOSEST POINTS TO ORIGIN
// ------------------------------------------

/**
 * Problem: Find k closest points to origin (0, 0)
 */
function kClosest(points, k) {
    // Max heap by distance (keep k smallest)
    points.sort((a, b) => 
        (a[0] ** 2 + a[1] ** 2) - (b[0] ** 2 + b[1] ** 2)
    );
    return points.slice(0, k);
}

// ============================================
// CATEGORY 2: MERGE K SORTED
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - Merging sorted feeds from multiple sources
 * - External sort (merging sorted chunks)
 * - Combining sorted database results
 */

// ------------------------------------------
// 2.1 MERGE K SORTED LISTS
// ------------------------------------------

/**
 * Problem: Merge k sorted linked lists into one
 * 
 * Real-world: Merging news feeds from k sources
 */
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function mergeKLists(lists) {
    if (!lists.length) return null;
    
    // Min heap: [value, listIndex]
    const heap = [];
    
    // Initialize with first node of each list
    for (let i = 0; i < lists.length; i++) {
        if (lists[i]) {
            heap.push([lists[i].val, i]);
        }
    }
    heap.sort((a, b) => a[0] - b[0]);
    
    const dummy = new ListNode(0);
    let curr = dummy;
    
    while (heap.length) {
        heap.sort((a, b) => a[0] - b[0]);
        const [val, idx] = heap.shift();
        
        curr.next = new ListNode(val);
        curr = curr.next;
        
        lists[idx] = lists[idx].next;
        if (lists[idx]) {
            heap.push([lists[idx].val, idx]);
        }
    }
    
    return dummy.next;
}

/**
 * RELATED QUESTIONS:
 * - Merge K Sorted Lists (LeetCode 23)
 * - Smallest Range Covering Elements (LeetCode 632)
 */

// ------------------------------------------
// 2.2 MERGE K SORTED ARRAYS
// ------------------------------------------

function mergeKArrays(arrays) {
    // Min heap: [value, arrayIndex, elementIndex]
    const heap = [];
    
    for (let i = 0; i < arrays.length; i++) {
        if (arrays[i].length) {
            heap.push([arrays[i][0], i, 0]);
        }
    }
    
    const result = [];
    
    while (heap.length) {
        heap.sort((a, b) => a[0] - b[0]);
        const [val, arrIdx, elemIdx] = heap.shift();
        result.push(val);
        
        if (elemIdx + 1 < arrays[arrIdx].length) {
            heap.push([arrays[arrIdx][elemIdx + 1], arrIdx, elemIdx + 1]);
        }
    }
    
    return result;
}

// ============================================
// CATEGORY 3: STREAMING/RUNNING STATISTICS
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - Running median of stock prices
 * - Real-time percentile calculation
 * - Streaming data analysis
 */

// ------------------------------------------
// 3.1 FIND MEDIAN FROM DATA STREAM
// ------------------------------------------

/**
 * Problem: Design class that supports addNum and findMedian
 * 
 * Real-world: Real-time median calculation for streaming data
 * 
 * Key insight: Use two heaps!
 * - MaxHeap for lower half
 * - MinHeap for upper half
 */
class MedianFinder {
    constructor() {
        this.low = [];  // Max heap (lower half)
        this.high = []; // Min heap (upper half)
    }
    
    addNum(num) {
        // Always add to lower half first
        this.low.push(num);
        this.low.sort((a, b) => b - a); // Max heap
        
        // Balance: move max of low to high
        this.high.push(this.low.shift());
        this.high.sort((a, b) => a - b); // Min heap
        
        // Keep low same size or 1 larger
        if (this.high.length > this.low.length) {
            this.low.push(this.high.shift());
            this.low.sort((a, b) => b - a);
        }
    }
    
    findMedian() {
        if (this.low.length > this.high.length) {
            return this.low[0];
        }
        return (this.low[0] + this.high[0]) / 2;
    }
}

/**
 * RELATED QUESTIONS:
 * - Find Median from Data Stream (LeetCode 295)
 * - Sliding Window Median (LeetCode 480)
 */

// ------------------------------------------
// 3.2 KTH LARGEST ELEMENT IN STREAM
// ------------------------------------------

class KthLargest {
    constructor(k, nums) {
        this.k = k;
        this.heap = new MinHeap();
        
        for (const num of nums) {
            this.add(num);
        }
    }
    
    add(val) {
        this.heap.push(val);
        if (this.heap.size() > this.k) {
            this.heap.pop();
        }
        return this.heap.peek();
    }
}

// ============================================
// CATEGORY 4: SCHEDULING PROBLEMS
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - Task scheduling in OS
 * - Meeting room allocation
 * - Job processing with priorities
 */

// ------------------------------------------
// 4.1 TASK SCHEDULER
// ------------------------------------------

/**
 * Problem: Schedule tasks with cooldown between same tasks
 * 
 * Real-world: CPU scheduling with idle time
 */
function leastInterval(tasks, n) {
    const freq = new Array(26).fill(0);
    for (const task of tasks) {
        freq[task.charCodeAt(0) - 65]++;
    }
    
    freq.sort((a, b) => b - a);
    
    const maxFreq = freq[0];
    let idleSlots = (maxFreq - 1) * n;
    
    for (let i = 1; i < 26 && freq[i] > 0; i++) {
        idleSlots -= Math.min(freq[i], maxFreq - 1);
    }
    
    return tasks.length + Math.max(0, idleSlots);
}

/**
 * RELATED QUESTIONS:
 * - Task Scheduler (LeetCode 621)
 * - Reorganize String (LeetCode 767)
 */

// ------------------------------------------
// 4.2 MEETING ROOMS II
// ------------------------------------------

/**
 * Problem: Minimum meeting rooms needed
 * 
 * Use min heap to track end times
 */
function minMeetingRooms(intervals) {
    if (!intervals.length) return 0;
    
    intervals.sort((a, b) => a[0] - b[0]);
    
    const endTimes = [intervals[0][1]]; // Min heap of end times
    
    for (let i = 1; i < intervals.length; i++) {
        endTimes.sort((a, b) => a - b);
        
        // If meeting starts after earliest ends
        if (intervals[i][0] >= endTimes[0]) {
            endTimes.shift(); // Reuse room
        }
        
        endTimes.push(intervals[i][1]);
    }
    
    return endTimes.length;
}

// ============================================
// CATEGORY 5: TWO HEAPS PATTERN
// ============================================

/**
 * Pattern: Use two heaps to track two halves of data
 * - One max heap for smaller half
 * - One min heap for larger half
 */

// ------------------------------------------
// 5.1 IPO (MAXIMIZE CAPITAL)
// ------------------------------------------

/**
 * Problem: Maximize capital by choosing projects
 * 
 * At each step, pick project with max profit that we can afford
 */
function findMaximizedCapital(k, w, profits, capital) {
    const n = profits.length;
    const projects = [];
    
    for (let i = 0; i < n; i++) {
        projects.push([capital[i], profits[i]]);
    }
    
    // Sort by capital required
    projects.sort((a, b) => a[0] - b[0]);
    
    let i = 0;
    const available = []; // Max heap of profits
    
    while (k > 0) {
        // Add all projects we can afford
        while (i < n && projects[i][0] <= w) {
            available.push(projects[i][1]);
            i++;
        }
        
        if (!available.length) break;
        
        // Pick project with max profit
        available.sort((a, b) => b - a);
        w += available.shift();
        k--;
    }
    
    return w;
}

// ============================================
// SUMMARY
// ============================================

/**
 * HEAP PROBLEMS CHEAT SHEET:
 * 
 * TOP K PATTERN:
 * - K largest → Min heap of size K
 * - K smallest → Max heap of size K
 * - Alternative: QuickSelect for average O(n)
 * 
 * MERGE K SORTED:
 * - Min heap with (value, source index)
 * - Always extract minimum, add next from same source
 * 
 * STREAMING MEDIAN:
 * - Two heaps: maxHeap (low half), minHeap (high half)
 * - Keep balanced: |size diff| <= 1
 * 
 * SCHEDULING:
 * - Heap tracks next available time
 * - Process in order of priority or time
 * 
 * INTERVIEW TIP:
 * In JavaScript, you often need to implement your own heap
 * or use array.sort() as a simplification!
 */

module.exports = {
    MinHeap,
    findKthLargest,
    findKthLargestQuickSelect,
    topKFrequent,
    topKFrequentBucket,
    kClosest,
    mergeKLists,
    mergeKArrays,
    MedianFinder,
    KthLargest,
    leastInterval,
    minMeetingRooms,
    findMaximizedCapital,
    ListNode
};
