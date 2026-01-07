/**
 * ============================================
 * SEGMENT TREE & FENWICK TREE (BIT)
 * ============================================
 * 
 * CONCEPT:
 * Segment Tree and Fenwick Tree (Binary Indexed Tree) are data structures
 * designed for efficient range queries and point updates on arrays.
 * 
 * Use cases:
 * - Range sum queries
 * - Range minimum/maximum queries
 * - Count of elements in range
 * - Update elements and query ranges
 * 
 * REAL-WORLD ANALOGY:
 * Like a sports tournament bracket:
 * - Leaf nodes are individual teams (array elements)
 * - Internal nodes store "winners" (aggregated results)
 * - To find champion of any bracket, traverse the tree
 * 
 * COMPLEXITY COMPARISON:
 * | Operation        | Array | Prefix Sum | Segment Tree | Fenwick |
 * |------------------|-------|------------|--------------|---------|
 * | Build            | -     | O(n)       | O(n)         | O(n)    |
 * | Point Update     | O(1)  | O(n)       | O(log n)     | O(log n)|
 * | Range Query      | O(n)  | O(1)       | O(log n)     | O(log n)|
 * | Range Update     | O(n)  | O(n)       | O(log n)*    | O(log n)|
 * 
 * *With lazy propagation
 */

// ============================================
// 1. SEGMENT TREE - RANGE SUM
// ============================================

/**
 * Segment Tree Structure:
 * 
 *                [0-7: 36]           (root: sum of all)
 *              /          \
 *        [0-3: 10]      [4-7: 26]    (sum of halves)
 *        /      \        /      \
 *    [0-1: 3] [2-3: 7] [4-5: 11] [6-7: 15]
 *    /   \    /   \    /    \     /    \
 *   1    2   3    4   5     6    7     8  (leaves = original array)
 */

class SegmentTree {
    constructor(arr) {
        this.n = arr.length;
        this.tree = new Array(4 * this.n).fill(0);
        this.build(arr, 0, 0, this.n - 1);
    }
    
    /**
     * Build tree recursively - O(n)
     * 
     * node: current node index in tree
     * start, end: range this node covers
     */
    build(arr, node, start, end) {
        if (start === end) {
            // Leaf node
            this.tree[node] = arr[start];
        } else {
            const mid = Math.floor((start + end) / 2);
            const leftChild = 2 * node + 1;
            const rightChild = 2 * node + 2;
            
            // Build left and right subtrees
            this.build(arr, leftChild, start, mid);
            this.build(arr, rightChild, mid + 1, end);
            
            // Internal node = sum of children
            this.tree[node] = this.tree[leftChild] + this.tree[rightChild];
        }
    }
    
    /**
     * Range Sum Query - O(log n)
     * 
     * Three cases:
     * 1. Complete overlap: return node value
     * 2. No overlap: return 0
     * 3. Partial overlap: recurse to children
     */
    query(left, right) {
        return this._query(0, 0, this.n - 1, left, right);
    }
    
    _query(node, start, end, left, right) {
        // No overlap
        if (right < start || left > end) {
            return 0;
        }
        
        // Complete overlap
        if (left <= start && end <= right) {
            return this.tree[node];
        }
        
        // Partial overlap
        const mid = Math.floor((start + end) / 2);
        const leftSum = this._query(2 * node + 1, start, mid, left, right);
        const rightSum = this._query(2 * node + 2, mid + 1, end, left, right);
        
        return leftSum + rightSum;
    }
    
    /**
     * Point Update - O(log n)
     * 
     * Update leaf and propagate change up
     */
    update(index, value) {
        this._update(0, 0, this.n - 1, index, value);
    }
    
    _update(node, start, end, index, value) {
        if (start === end) {
            // Leaf node
            this.tree[node] = value;
        } else {
            const mid = Math.floor((start + end) / 2);
            
            if (index <= mid) {
                this._update(2 * node + 1, start, mid, index, value);
            } else {
                this._update(2 * node + 2, mid + 1, end, index, value);
            }
            
            // Update internal node
            this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
        }
    }
}

// ============================================
// 2. SEGMENT TREE - RANGE MINIMUM QUERY
// ============================================

class SegmentTreeMin {
    constructor(arr) {
        this.n = arr.length;
        this.tree = new Array(4 * this.n).fill(Infinity);
        this.build(arr, 0, 0, this.n - 1);
    }
    
    build(arr, node, start, end) {
        if (start === end) {
            this.tree[node] = arr[start];
        } else {
            const mid = Math.floor((start + end) / 2);
            this.build(arr, 2 * node + 1, start, mid);
            this.build(arr, 2 * node + 2, mid + 1, end);
            this.tree[node] = Math.min(
                this.tree[2 * node + 1], 
                this.tree[2 * node + 2]
            );
        }
    }
    
    queryMin(left, right) {
        return this._query(0, 0, this.n - 1, left, right);
    }
    
    _query(node, start, end, left, right) {
        if (right < start || left > end) return Infinity;
        if (left <= start && end <= right) return this.tree[node];
        
        const mid = Math.floor((start + end) / 2);
        return Math.min(
            this._query(2 * node + 1, start, mid, left, right),
            this._query(2 * node + 2, mid + 1, end, left, right)
        );
    }
}

// ============================================
// 3. FENWICK TREE (Binary Indexed Tree)
// ============================================

/**
 * Fenwick Tree: More space-efficient than Segment Tree
 * 
 * Key insight: Use binary representation for efficient updates
 * 
 * Index i stores cumulative sum of elements from
 * i - (i & -i) + 1 to i
 * 
 * (i & -i) gives the lowest set bit of i
 */

class FenwickTree {
    constructor(n) {
        this.n = n;
        this.tree = new Array(n + 1).fill(0);
    }
    
    /**
     * Build from array - O(n)
     */
    static fromArray(arr) {
        const ft = new FenwickTree(arr.length);
        for (let i = 0; i < arr.length; i++) {
            ft.update(i, arr[i]);
        }
        return ft;
    }
    
    /**
     * Point Update - O(log n)
     * Add delta to element at index
     */
    update(index, delta) {
        index++; // 1-indexed
        while (index <= this.n) {
            this.tree[index] += delta;
            index += index & (-index); // Move to parent
        }
    }
    
    /**
     * Prefix Sum Query - O(log n)
     * Sum of elements from 0 to index
     */
    prefixSum(index) {
        index++; // 1-indexed
        let sum = 0;
        while (index > 0) {
            sum += this.tree[index];
            index -= index & (-index); // Move to parent
        }
        return sum;
    }
    
    /**
     * Range Sum Query - O(log n)
     */
    rangeSum(left, right) {
        return this.prefixSum(right) - (left > 0 ? this.prefixSum(left - 1) : 0);
    }
}

// ============================================
// 4. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1: Range Sum Query - Mutable
 */
class NumArray {
    constructor(nums) {
        this.st = new SegmentTree(nums);
    }
    
    update(index, val) {
        this.st.update(index, val);
    }
    
    sumRange(left, right) {
        return this.st.query(left, right);
    }
}

/**
 * Problem 2: Count of Smaller Numbers After Self
 */
function countSmaller(nums) {
    const sorted = [...new Set(nums)].sort((a, b) => a - b);
    const rank = new Map();
    sorted.forEach((num, i) => rank.set(num, i));
    
    const ft = new FenwickTree(sorted.length);
    const result = [];
    
    for (let i = nums.length - 1; i >= 0; i--) {
        const r = rank.get(nums[i]);
        result.unshift(r > 0 ? ft.prefixSum(r - 1) : 0);
        ft.update(r, 1);
    }
    
    return result;
}

/**
 * Problem 3: Range Sum Query 2D - Mutable
 */
class NumMatrix {
    constructor(matrix) {
        if (!matrix.length) return;
        this.m = matrix.length;
        this.n = matrix[0].length;
        this.tree = Array(this.m + 1).fill(null)
            .map(() => Array(this.n + 1).fill(0));
        this.nums = Array(this.m).fill(null)
            .map(() => Array(this.n).fill(0));
        
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                this.update(i, j, matrix[i][j]);
            }
        }
    }
    
    update(row, col, val) {
        const delta = val - this.nums[row][col];
        this.nums[row][col] = val;
        
        for (let i = row + 1; i <= this.m; i += i & (-i)) {
            for (let j = col + 1; j <= this.n; j += j & (-j)) {
                this.tree[i][j] += delta;
            }
        }
    }
    
    _sum(row, col) {
        let sum = 0;
        for (let i = row; i > 0; i -= i & (-i)) {
            for (let j = col; j > 0; j -= j & (-j)) {
                sum += this.tree[i][j];
            }
        }
        return sum;
    }
    
    sumRegion(row1, col1, row2, col2) {
        return this._sum(row2 + 1, col2 + 1) 
             - this._sum(row1, col2 + 1) 
             - this._sum(row2 + 1, col1) 
             + this._sum(row1, col1);
    }
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * SEGMENT TREE vs FENWICK TREE:
 * 
 * | Feature          | Segment Tree | Fenwick Tree |
 * |------------------|--------------|--------------|
 * | Space            | O(4n)        | O(n)         |
 * | Build            | O(n)         | O(n log n)   |
 * | Point Update     | O(log n)     | O(log n)     |
 * | Range Query      | O(log n)     | O(log n)     |
 * | Range Update     | Yes (lazy)   | Limited      |
 * | Flexibility      | High         | Medium       |
 * | Implementation   | Complex      | Simple       |
 * 
 * USE SEGMENT TREE WHEN:
 * - Need range minimum/maximum
 * - Need range updates
 * - Need complex operations
 * 
 * USE FENWICK TREE WHEN:
 * - Only need prefix sums / range sums
 * - Space is a concern
 * - Want simpler implementation
 * 
 * COMMON INTERVIEW PROBLEMS:
 * - Range Sum Query (Mutable)
 * - Count Inversions
 * - Count Smaller Numbers After Self
 * - Rectangle Sum 2D
 */

module.exports = { 
    SegmentTree, 
    SegmentTreeMin, 
    FenwickTree,
    NumArray,
    countSmaller,
    NumMatrix
};
