/**
 * ============================================
 * SPACE COMPLEXITY - Memory Usage Analysis
 * ============================================
 * 
 * CONCEPT:
 * Space complexity measures the total memory an algorithm needs
 * relative to input size. It includes auxiliary space (extra space
 * used) plus input space.
 * 
 * REAL-WORLD ANALOGY:
 * Think of space like desk space while working:
 * - O(1): Working with just a notepad (fixed tools)
 * - O(n): Spreading out all papers on desk (proportional to work)
 * - O(n²): Creating a table comparing every paper to every other
 * - In-place: Organizing papers without extra desk space
 * 
 * INDUSTRY APPLICATIONS:
 * - Embedded systems with limited RAM
 * - Mobile app memory constraints
 * - Database buffer management
 * - Cache sizing decisions
 * - Streaming/real-time processing
 */

// ============================================
// 1. AUXILIARY vs TOTAL SPACE
// ============================================

/**
 * Auxiliary Space: Extra space used by the algorithm
 * Total Space: Auxiliary + Input space
 * 
 * When we say "space complexity," we usually mean auxiliary space
 */

// O(1) auxiliary space - no extra space based on n
function findMax(arr) {
    let max = arr[0];  // O(1) - single variable
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
    // Auxiliary: O(1)
    // Total: O(n) - input array counts
}

// O(n) auxiliary space - extra array proportional to input
function copyArray(arr) {
    const copy = [];  // New array
    for (let i = 0; i < arr.length; i++) {
        copy.push(arr[i]);
    }
    return copy;
    // Auxiliary: O(n) - new array of same size
    // Total: O(n) + O(n) = O(n)
}

// ============================================
// 2. COMMON SPACE COMPLEXITIES
// ============================================

/**
 * O(1) - Constant Space
 * Uses fixed amount of memory regardless of input
 */
function constantSpace(arr) {
    let sum = 0;
    let count = 0;
    let product = 1;
    let max = arr[0];
    
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
        count++;
        product *= arr[i];
        max = Math.max(max, arr[i]);
    }
    
    return { sum, count, product, max };
    // Only 4 variables, regardless of array size
}

/**
 * O(log n) - Logarithmic Space
 * Usually from recursion call stack
 */
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    }
    return binarySearchRecursive(arr, target, left, mid - 1);
    // Each call halves the range
    // Max stack depth: log₂(n)
}

/**
 * O(n) - Linear Space
 * Extra space grows linearly with input
 */
function linearSpace(arr) {
    const doubledMap = new Map();  // Could grow to n entries
    
    for (let i = 0; i < arr.length; i++) {
        doubledMap.set(arr[i], arr[i] * 2);
    }
    
    return doubledMap;
    // Map stores n entries → O(n)
}

/**
 * O(n²) - Quadratic Space
 * Usually 2D arrays/matrices
 */
function quadraticSpace(n) {
    // Create n×n matrix
    const matrix = [];
    
    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
            matrix[i][j] = i * n + j;
        }
    }
    
    return matrix;
    // n rows × n columns = n² cells
}

// ============================================
// 3. RECURSION AND CALL STACK
// ============================================

/**
 * Each recursive call adds a stack frame
 * Stack frame contains: local variables, return address, parameters
 */

// O(n) space from recursion
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
    // Call stack grows to depth n
    // factorial(5) → factorial(4) → factorial(3) → ...
}

// O(log n) space - balanced recursion
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    
    return [...result, ...left.slice(i), ...right.slice(j)];
    // Recursion depth: log n
    // But creating new arrays at each level: O(n) per level
    // Total: O(n log n) for this implementation!
}

// O(2^n) space - exponential recursion
function fibonacciNaive(n, memo = {}) {
    if (n <= 1) return n;
    
    // Without memoization: O(2^n) calls, but stack is O(n)
    // Maximum stack depth is n (leftmost branch)
    return fibonacciNaive(n - 1) + fibonacciNaive(n - 2);
}

// ============================================
// 4. IN-PLACE ALGORITHMS
// ============================================

/**
 * In-place algorithms modify input directly
 * with O(1) auxiliary space
 */

// In-place reversal - O(1) space
function reverseInPlace(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    
    return arr;
    // Only uses pointer variables, modifies original
}

// Not in-place - O(n) space
function reverseWithNewArray(arr) {
    const reversed = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        reversed.push(arr[i]);
    }
    return reversed;
    // Creates new array of size n
}

// In-place quicksort - O(log n) stack space
function quickSortInPlace(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIdx = partition(arr, low, high);
        quickSortInPlace(arr, low, pivotIdx - 1);
        quickSortInPlace(arr, pivotIdx + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
    // In-place partitioning with swap
}

// ============================================
// 5. SPACE-TIME TRADEOFFS
// ============================================

/**
 * Often we can trade space for time or vice versa
 */

// Time: O(n²), Space: O(1)
function hasDuplicate_noSpace(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) return true;
        }
    }
    return false;
}

// Time: O(n), Space: O(n)
function hasDuplicate_withSpace(arr) {
    const seen = new Set();
    for (const num of arr) {
        if (seen.has(num)) return true;
        seen.add(num);
    }
    return false;
}

// Memoization: Trading space for time
function fibMemoized(n, memo = new Map()) {
    if (n <= 1) return n;
    
    if (memo.has(n)) return memo.get(n);
    
    const result = fibMemoized(n - 1, memo) + fibMemoized(n - 2, memo);
    memo.set(n, result);
    return result;
    // Time: O(n), Space: O(n) for memo
    // vs naive: Time: O(2^n), Space: O(n) stack
}

// Dynamic Programming: Optimizing space
function fibOptimized(n) {
    if (n <= 1) return n;
    
    let prev = 0, curr = 1;
    
    for (let i = 2; i <= n; i++) {
        const next = prev + curr;
        prev = curr;
        curr = next;
    }
    
    return curr;
    // Time: O(n), Space: O(1)
    // Only need last 2 values!
}

// ============================================
// 6. DATA STRUCTURE SPACE REQUIREMENTS
// ============================================

/**
 * Array: O(n) - contiguous memory
 * Linked List: O(n) - nodes + pointers (more overhead than array)
 * Hash Table: O(n) - entries + buckets (typically 2n space)
 * Binary Tree: O(n) - nodes + left/right pointers
 * 
 * Graph Representations:
 * - Adjacency Matrix: O(V²)
 * - Adjacency List: O(V + E)
 */

// Adjacency Matrix - O(V²)
function createAdjacencyMatrix(vertices, edges) {
    const matrix = Array(vertices).fill(null)
        .map(() => Array(vertices).fill(0));
    
    for (const [from, to] of edges) {
        matrix[from][to] = 1;
        matrix[to][from] = 1; // Undirected
    }
    
    return matrix;
    // Always V² space, even if sparse
}

// Adjacency List - O(V + E)
function createAdjacencyList(vertices, edges) {
    const list = Array(vertices).fill(null).map(() => []);
    
    for (const [from, to] of edges) {
        list[from].push(to);
        list[to].push(from); // Undirected
    }
    
    return list;
    // Space proportional to actual edges
}

// ============================================
// 7. COMMON MISTAKES & EDGE CASES
// ============================================

/**
 * Mistake 1: Ignoring string immutability
 */
function stringConcatMistake(n) {
    let str = '';
    for (let i = 0; i < n; i++) {
        str += 'a';  // Creates new string each time!
    }
    return str;
    // Each concat creates new string: O(1 + 2 + ... + n) = O(n²) space used
    // Current space is O(n), but total allocated was O(n²)
}

function stringConcatFixed(n) {
    const chars = [];
    for (let i = 0; i < n; i++) {
        chars.push('a');  // O(1) amortized
    }
    return chars.join('');
    // O(n) space
}

/**
 * Mistake 2: Hidden copies from array methods
 */
function hiddenCopies(arr) {
    const sliced = arr.slice();     // O(n) - full copy
    const filtered = arr.filter(x => x > 0);  // O(n) worst case
    const mapped = arr.map(x => x * 2);  // O(n) - new array
    const spread = [...arr];  // O(n) - spread creates copy
    
    // Each operation creates new array!
    // If chained: .filter().map().slice() = 3 × O(n) space
}

/**
 * Mistake 3: Not counting recursive call stack
 */
function recursiveSpace(n) {
    if (n <= 0) return;
    recursiveSpace(n - 1);
    // O(n) stack space, even with no local variables
}

/**
 * Mistake 4: Object reference vs copy
 */
function referenceVsCopy() {
    const original = [1, 2, 3];
    
    // Reference - O(1) extra space
    const ref = original;
    ref[0] = 100;  // Modifies original!
    
    // Shallow copy - O(n) extra space
    const shallow = [...original];
    shallow[0] = 200;  // Doesn't modify original
    
    // Deep copy - O(n) extra space (or more for nested)
    const deep = JSON.parse(JSON.stringify(original));
}

// ============================================
// 8. INTERVIEW PERSPECTIVE
// ============================================

/**
 * Key questions interviewers ask:
 * 
 * 1. "Can you do it in O(1) space?"
 *    - Often implies in-place algorithm needed
 * 
 * 2. "What's the space complexity of your recursive solution?"
 *    - Count call stack depth
 * 
 * 3. "Can you optimize the space?"
 *    - Look for rolling arrays, streaming approaches
 * 
 * 4. "What are the trade-offs?"
 *    - Be ready to discuss time vs space
 */

// Example: Matrix rotation
// O(n²) space - create new matrix
function rotateMatrix_extraSpace(matrix) {
    const n = matrix.length;
    const result = Array(n).fill(null).map(() => Array(n).fill(0));
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            result[j][n - 1 - i] = matrix[i][j];
        }
    }
    
    return result;
}

// O(1) space - in-place rotation
function rotateMatrix_inPlace(matrix) {
    const n = matrix.length;
    
    // Transpose
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    
    // Reverse each row
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
    
    return matrix;
}

// ============================================
// 9. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Easy): What's the space complexity?
 */
function problem1(arr) {
    const n = arr.length;
    const result = [];
    
    for (let i = 0; i < n; i++) {
        result.push(arr[i] * 2);
    }
    
    return result;
}
// Answer: O(n) - new array of size n

/**
 * Problem 2 (Medium): Optimize from O(n) to O(1) space
 */
function moveZeros_nSpace(arr) {
    const nonZeros = arr.filter(x => x !== 0);
    const zeros = arr.filter(x => x === 0);
    return [...nonZeros, ...zeros];
    // O(n) space from filter arrays
}

function moveZeros_constant(arr) {
    let insertPos = 0;
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            arr[insertPos++] = arr[i];
        }
    }
    
    while (insertPos < arr.length) {
        arr[insertPos++] = 0;
    }
    
    return arr;
    // O(1) space - in-place
}

/**
 * Problem 3 (Hard): What's the actual space used?
 */
function problem3(n) {
    const dp = Array(n).fill(null).map(() => Array(n).fill(0));
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            dp[i][j] = i === 0 || j === 0 ? 1 : dp[i-1][j] + dp[i][j-1];
        }
    }
    
    return dp[n-1][n-1];
}
// Answer: O(n²) - but can be optimized to O(n) using rolling array!

function problem3Optimized(n) {
    let dp = Array(n).fill(1);
    
    for (let i = 1; i < n; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] = dp[j] + dp[j-1];
        }
    }
    
    return dp[n-1];
    // O(n) space - only need previous row!
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * SPACE COMPLEXITY CHEAT SHEET:
 * 
 * | Complexity | Example                              |
 * |------------|--------------------------------------|
 * | O(1)       | Fixed variables, in-place algorithms |
 * | O(log n)   | Balanced recursion (binary search)   |
 * | O(n)       | Arrays, hash maps, linear recursion  |
 * | O(n²)      | 2D matrices, adjacency matrix        |
 * 
 * KEY CONCEPTS:
 * - Auxiliary space: Extra space beyond input
 * - In-place: O(1) auxiliary space
 * - Recursion stack: Each call adds a frame
 * 
 * SPACE-TIME TRADEOFFS:
 * - Use hash table: O(n) space → O(1) lookup
 * - Memoization: O(n) space → avoid recomputation
 * - Rolling array: O(n) → O(1) for DP
 * 
 * HIDDEN COSTS:
 * - String concat creates new strings
 * - Array methods (slice, filter, map) create copies
 * - Spread operator creates copies
 * 
 * OPTIMIZATION TECHNIQUES:
 * - Two-pointer: O(1) space for pair problems
 * - Rolling array: Reduce DP space
 * - In-place swaps: Avoid temporary arrays
 * - Bit manipulation: Store multiple flags in one variable
 */

module.exports = {
    findMax,
    constantSpace,
    linearSpace,
    quadraticSpace,
    reverseInPlace,
    quickSortInPlace,
    hasDuplicate_withSpace,
    fibOptimized,
    rotateMatrix_inPlace,
    moveZeros_constant
};
