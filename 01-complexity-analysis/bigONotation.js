/**
 * ============================================
 * BIG-O NOTATION - Algorithmic Complexity
 * ============================================
 * 
 * CONCEPT:
 * Big-O notation is a mathematical notation that describes the upper bound
 * of an algorithm's growth rate. It tells us how the runtime or space
 * requirements grow as input size increases towards infinity.
 * 
 * REAL-WORLD ANALOGY:
 * Think of Big-O like shipping methods:
 * - O(1): Instant teleportation - same time regardless of distance
 * - O(log n): Express delivery - faster for nearby, slightly slower for far
 * - O(n): Regular mail - time proportional to distance
 * - O(n²): Hand-delivering each package personally - exponentially slower
 * 
 * INDUSTRY APPLICATIONS:
 * - Database query optimization (choosing indexes)
 * - API response time guarantees
 * - System capacity planning
 * - Performance benchmarking
 * - Technical interview evaluations
 */

// ============================================
// 1. COMMON TIME COMPLEXITIES
// ============================================

/**
 * O(1) - Constant Time
 * The operation takes the same time regardless of input size
 */
function constantTime(arr) {
    // Accessing by index is always O(1)
    return arr[0];
    // Why O(1)? Arrays store elements in contiguous memory
    // Direct memory address calculation: base_address + (index * element_size)
}

/**
 * O(log n) - Logarithmic Time
 * Input is halved with each step
 */
function logarithmicTime(arr, target) {
    // Binary search - halves search space each iteration
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
    // Why O(log n)? If n=1000, we need ~10 steps (2^10 = 1024)
}

/**
 * O(n) - Linear Time
 * Time grows proportionally with input size
 */
function linearTime(arr, target) {
    // Linear search - must potentially check every element
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
    // Why O(n)? Worst case: target is last element or not present
}

/**
 * O(n log n) - Linearithmic Time
 * Common in efficient sorting algorithms
 */
function linearithmicTime(arr) {
    // Merge sort achieves O(n log n)
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = linearithmicTime(arr.slice(0, mid));
    const right = linearithmicTime(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
    // Why O(n log n)? log n levels of recursion, n work at each level
}

/**
 * O(n²) - Quadratic Time
 * Nested iterations over input
 */
function quadraticTime(arr) {
    // Find all pairs - nested loops
    const pairs = [];
    
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            pairs.push([arr[i], arr[j]]);
        }
    }
    return pairs;
    // Why O(n²)? For each element, we iterate remaining elements
    // Total: n + (n-1) + (n-2) + ... + 1 = n(n-1)/2 ≈ n²
}

/**
 * O(2^n) - Exponential Time
 * Doubles with each input increment
 */
function exponentialTime(n) {
    // Fibonacci without memoization
    if (n <= 1) return n;
    return exponentialTime(n - 1) + exponentialTime(n - 2);
    // Why O(2^n)? Each call spawns 2 more calls
    // Creates a binary tree of calls
}

/**
 * O(n!) - Factorial Time
 * Used in permutation problems
 */
function factorialTime(arr) {
    // Generate all permutations
    if (arr.length <= 1) return [arr];
    
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
        const perms = factorialTime(remaining);
        
        for (const perm of perms) {
            result.push([current, ...perm]);
        }
    }
    return result;
    // Why O(n!)? n choices × (n-1) choices × (n-2) × ... × 1
}

// ============================================
// 2. BIG-O RULES
// ============================================

/**
 * Rule 1: Drop Constants
 * O(2n) → O(n), O(100n) → O(n)
 */
function dropConstants(arr) {
    // Two separate loops = O(n + n) = O(2n) = O(n)
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
    for (let j = 0; j < arr.length; j++) {
        console.log(arr[j]);
    }
    // Constants don't matter for large n
}

/**
 * Rule 2: Drop Non-Dominant Terms
 * O(n² + n) → O(n²), O(n + log n) → O(n)
 */
function dropNonDominant(arr) {
    // O(n²) dominates O(n)
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            console.log(arr[i], arr[j]); // O(n²)
        }
    }
    for (let k = 0; k < arr.length; k++) {
        console.log(arr[k]); // O(n) - negligible vs n²
    }
    // Total: O(n² + n) = O(n²)
}

/**
 * Rule 3: Different Inputs = Different Variables
 */
function differentInputs(arr1, arr2) {
    // This is O(a * b), NOT O(n²)
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            console.log(arr1[i], arr2[j]);
        }
    }
    // Use different variables for different inputs!
}

// ============================================
// 3. COMPLEXITY COMPARISON TABLE
// ============================================

/**
 * For n = 1,000,000 operations:
 * 
 * | Complexity  | Operations     | Time (1μs/op)  |
 * |-------------|----------------|----------------|
 * | O(1)        | 1              | 1 μs           |
 * | O(log n)    | 20             | 20 μs          |
 * | O(n)        | 1,000,000      | 1 second       |
 * | O(n log n)  | 20,000,000     | 20 seconds     |
 * | O(n²)       | 10^12          | 11.5 days      |
 * | O(2^n)      | 10^301029      | Heat death     |
 */

// ============================================
// 4. COMMON MISTAKES & EDGE CASES
// ============================================

/**
 * Mistake 1: Ignoring hidden loops
 */
function hiddenLoop(arr) {
    // Array methods have their own complexity!
    arr.includes(5);        // O(n) - linear search
    arr.indexOf(5);         // O(n) - linear search
    arr.slice(0, 5);        // O(k) where k = slice length
    arr.concat([1, 2, 3]);  // O(n + m) - creates new array
    [...arr];               // O(n) - spread operator copies
    
    // This is O(n²), not O(n)!
    for (let i = 0; i < arr.length; i++) {
        if (arr.includes(arr[i])) { // includes is O(n)
            console.log('Found');
        }
    }
}

/**
 * Mistake 2: Confusing best/average/worst case
 */
function caseAnalysis(arr) {
    // QuickSort complexity varies:
    // Best: O(n log n) - balanced partitions
    // Average: O(n log n) - random data
    // Worst: O(n²) - already sorted with bad pivot
    
    // Big-O typically refers to worst case
    // But average case matters in practice!
}

/**
 * Mistake 3: Ignoring space inside loops
 */
function spaceInLoops(n) {
    const results = [];
    
    for (let i = 0; i < n; i++) {
        // Creating new array each iteration
        const temp = new Array(n).fill(0); // O(n) space each time
        results.push(temp);
    }
    // Total space: O(n²) not O(n)!
    return results;
}

// ============================================
// 5. INTERVIEW PERSPECTIVE
// ============================================

/**
 * How interviewers test Big-O understanding:
 * 
 * 1. "What's the time complexity?" - Direct question
 * 2. "Can you optimize this?" - Implies current solution is suboptimal
 * 3. "What if n is very large?" - Testing scalability awareness
 * 4. "What's the trade-off?" - Space vs time decisions
 * 
 * Red flags interviewers look for:
 * - Saying O(n²) for a single loop
 * - Not recognizing built-in method complexities
 * - Ignoring space complexity entirely
 * - Not considering input constraints
 */

// ============================================
// 6. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Easy): Analyze this code's complexity
 */
function problem1(arr) {
    let sum = 0;                           // O(1)
    for (let i = 0; i < arr.length; i++) { // O(n)
        sum += arr[i];
    }
    return sum;
}
// Answer: O(n) time, O(1) space

/**
 * Problem 2 (Medium): What's wrong with this analysis?
 */
function problem2(arr) {
    const set = new Set(arr);  // O(n) to create
    for (const item of arr) {  // O(n) loop
        if (set.has(item)) {   // O(1) lookup
            console.log(item);
        }
    }
}
// Common mistake: Saying O(n²)
// Correct: O(n) - Set.has() is O(1), not O(n)

/**
 * Problem 3 (Hard): Analyze recursive complexity
 */
function problem3(n) {
    if (n <= 0) return 1;
    
    // Three recursive calls with n/2
    return problem3(n / 2) + problem3(n / 2) + problem3(n / 2);
}
// Answer: O(3^log₂n) = O(n^log₂3) ≈ O(n^1.58)
// Each level has 3x more calls, log₂n levels total

/**
 * Problem 4 (Hard): Amortized complexity
 */
class DynamicArray {
    constructor() {
        this.data = new Array(1);
        this.length = 0;
        this.capacity = 1;
    }
    
    push(item) {
        if (this.length === this.capacity) {
            // Double capacity - O(n) operation
            this.capacity *= 2;
            const newData = new Array(this.capacity);
            for (let i = 0; i < this.length; i++) {
                newData[i] = this.data[i];
            }
            this.data = newData;
        }
        this.data[this.length++] = item;
    }
}
// Worst case single push: O(n)
// Amortized (average over many pushes): O(1)
// Why? Resize happens less frequently as array grows

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * BIG-O NOTATION CHEAT SHEET:
 * 
 * | Complexity   | Name            | Example Operations                    |
 * |--------------|-----------------|---------------------------------------|
 * | O(1)         | Constant        | Array access, hash lookup             |
 * | O(log n)     | Logarithmic     | Binary search, balanced BST ops       |
 * | O(n)         | Linear          | Single loop, linear search            |
 * | O(n log n)   | Linearithmic    | Merge sort, quick sort (avg)          |
 * | O(n²)        | Quadratic       | Nested loops, bubble sort             |
 * | O(2ⁿ)        | Exponential     | Recursive Fibonacci, subsets          |
 * | O(n!)        | Factorial       | Permutations, traveling salesman      |
 * 
 * KEY RULES:
 * 1. Drop constants: O(2n) → O(n)
 * 2. Drop lower order terms: O(n² + n) → O(n²)
 * 3. Different inputs = different variables: O(n + m)
 * 4. Nested loops multiply: O(n) × O(m) = O(nm)
 * 5. Sequential operations add: O(n) + O(m) = O(n + m)
 * 
 * INTERVIEW TIPS:
 * - Always clarify input size and constraints
 * - Consider best, average, and worst cases
 * - Justify your analysis with reasoning
 * - Mention space-time tradeoffs when relevant
 */

module.exports = {
    constantTime,
    logarithmicTime,
    linearTime,
    linearithmicTime,
    quadraticTime,
    exponentialTime,
    factorialTime,
    DynamicArray
};
