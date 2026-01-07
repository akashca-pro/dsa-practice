/**
 * ============================================
 * TIME COMPLEXITY - Measuring Execution Time
 * ============================================
 * 
 * CONCEPT:
 * Time complexity measures how the execution time of an algorithm
 * grows relative to input size. It helps predict performance
 * and compare algorithms objectively.
 * 
 * REAL-WORLD ANALOGY:
 * Consider different ways to find a book in a library:
 * - O(1): Book's exact shelf location is known (direct access)
 * - O(log n): Library is organized - use alphabetical sections
 * - O(n): Browse every book until found (linear scan)
 * - O(n²): Check every book against every other book (compare all)
 * 
 * INDUSTRY APPLICATIONS:
 * - API response time SLAs
 * - Database query optimization
 * - Real-time system constraints
 * - Scalability planning for user growth
 */

// ============================================
// 1. ANALYZING TIME COMPLEXITY
// ============================================

/**
 * Step-by-step analysis process:
 * 1. Identify basic operations (comparisons, assignments, arithmetic)
 * 2. Count operations relative to input size n
 * 3. Focus on dominant terms
 * 4. Express in Big-O notation
 */

// Example: Detailed analysis
function sumArray(arr) {
    let sum = 0;                    // 1 assignment
    
    for (let i = 0; i < arr.length; i++) {  // n iterations
        sum += arr[i];              // 1 addition + 1 assignment per iteration
    }
    
    return sum;                     // 1 return
}
// Total: 1 + n*(2) + 1 = 2n + 2 = O(n)

// ============================================
// 2. LOOP COMPLEXITY PATTERNS
// ============================================

/**
 * Single Loop - O(n)
 */
function singleLoop(n) {
    let count = 0;
    for (let i = 0; i < n; i++) {
        count++;
    }
    return count;
    // Loop runs n times → O(n)
}

/**
 * Nested Loops - O(n²)
 */
function nestedLoops(n) {
    let count = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            count++;
        }
    }
    return count;
    // Outer: n times, Inner: n times each → n * n = O(n²)
}

/**
 * Triple Nested - O(n³)
 */
function tripleNested(n) {
    let count = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            for (let k = 0; k < n; k++) {
                count++;
            }
        }
    }
    return count;
    // O(n³) - rarely acceptable for large n
}

/**
 * Dependent Loops - Still O(n²)
 */
function dependentLoops(n) {
    let count = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) { // j depends on i
            count++;
        }
    }
    return count;
    // Sum: 0 + 1 + 2 + ... + (n-1) = n(n-1)/2 = O(n²)
}

/**
 * Logarithmic Loop - O(log n)
 */
function logLoop(n) {
    let count = 0;
    for (let i = 1; i < n; i *= 2) { // i doubles each iteration
        count++;
    }
    return count;
    // i = 1, 2, 4, 8, ..., n → log₂(n) iterations
}

/**
 * O(n log n) - Log loop inside linear loop
 */
function nLogN(n) {
    let count = 0;
    for (let i = 0; i < n; i++) {        // O(n)
        for (let j = 1; j < n; j *= 2) { // O(log n)
            count++;
        }
    }
    return count;
    // n * log(n) = O(n log n)
}

/**
 * Square Root Loop - O(√n)
 */
function sqrtLoop(n) {
    let count = 0;
    for (let i = 0; i * i < n; i++) {
        count++;
    }
    return count;
    // Runs until i² ≥ n, so i < √n → O(√n)
}

// ============================================
// 3. RECURSION TIME COMPLEXITY
// ============================================

/**
 * Linear Recursion - O(n)
 */
function linearRecursion(n) {
    if (n <= 0) return 0;
    return 1 + linearRecursion(n - 1);
    // n calls, each O(1) work → O(n)
}

/**
 * Binary Recursion - O(2^n)
 */
function binaryRecursion(n) {
    if (n <= 1) return n;
    return binaryRecursion(n - 1) + binaryRecursion(n - 2);
    // Each call spawns 2 calls
    // Total calls ≈ 2^n
}

/**
 * Divide and Conquer - O(n log n)
 * Used in merge sort, quick sort (average)
 */
function divideAndConquer(arr, left = 0, right = arr.length - 1) {
    if (left >= right) return;
    
    const mid = Math.floor((left + right) / 2);
    divideAndConquer(arr, left, mid);      // T(n/2)
    divideAndConquer(arr, mid + 1, right); // T(n/2)
    
    // Merge step: O(n) work
    merge(arr, left, mid, right);
}

function merge(arr, left, mid, right) {
    const temp = [];
    let i = left, j = mid + 1;
    
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) temp.push(arr[i++]);
        else temp.push(arr[j++]);
    }
    
    while (i <= mid) temp.push(arr[i++]);
    while (j <= right) temp.push(arr[j++]);
    
    for (let k = 0; k < temp.length; k++) {
        arr[left + k] = temp[k];
    }
}
// Recurrence: T(n) = 2T(n/2) + O(n)
// By Master Theorem: O(n log n)

/**
 * Master Theorem Quick Reference:
 * 
 * For T(n) = aT(n/b) + O(n^d):
 * 
 * 1. If d > log_b(a): T(n) = O(n^d)
 * 2. If d = log_b(a): T(n) = O(n^d * log n)
 * 3. If d < log_b(a): T(n) = O(n^(log_b(a)))
 * 
 * Examples:
 * - Binary Search: T(n) = T(n/2) + O(1) → a=1,b=2,d=0 → O(log n)
 * - Merge Sort: T(n) = 2T(n/2) + O(n) → a=2,b=2,d=1 → O(n log n)
 */

// ============================================
// 4. AMORTIZED TIME COMPLEXITY
// ============================================

/**
 * Amortized analysis considers the average time per operation
 * over a sequence of operations, even if some are expensive.
 */

class AmortizedStack {
    constructor() {
        this.items = [];
        this.min = [];
    }
    
    // O(1) each
    push(val) {
        this.items.push(val);
        if (this.min.length === 0 || val <= this.min[this.min.length - 1]) {
            this.min.push(val);
        }
    }
    
    // O(1) each
    pop() {
        const val = this.items.pop();
        if (val === this.min[this.min.length - 1]) {
            this.min.pop();
        }
        return val;
    }
    
    // O(1)
    getMin() {
        return this.min[this.min.length - 1];
    }
}

/**
 * Dynamic Array Resize Analysis:
 * 
 * When we push n elements:
 * - Most pushes: O(1)
 * - Resize at capacity 1, 2, 4, 8, ..., n
 * - Total resize cost: 1 + 2 + 4 + ... + n = 2n - 1
 * 
 * Amortized cost per push: (n + 2n) / n = O(1)
 */

// ============================================
// 5. BEST, AVERAGE, WORST CASE
// ============================================

/**
 * Different inputs can lead to different performance
 */
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}
// Best Case: O(1) - target is first element
// Average Case: O(n/2) = O(n) - target in middle
// Worst Case: O(n) - target is last or not present

/**
 * QuickSort - Performance varies significantly
 */
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
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
}
// Best/Average: O(n log n) - balanced partitions
// Worst: O(n²) - already sorted array with first/last pivot

// ============================================
// 6. COMMON MISTAKES & EDGE CASES
// ============================================

/**
 * Mistake 1: String operations have hidden costs
 */
function stringMistake(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        result += str[i]; // String concatenation is O(n)!
    }
    return result;
    // Total: O(1 + 2 + 3 + ... + n) = O(n²)
    // Fix: Use array and join
}

function stringFixed(str) {
    const chars = [];
    for (let i = 0; i < str.length; i++) {
        chars.push(str[i]); // O(1) amortized
    }
    return chars.join(''); // O(n)
    // Total: O(n)
}

/**
 * Mistake 2: Hidden method complexity
 */
function hiddenComplexity(arr) {
    const result = [];
    
    for (let i = 0; i < arr.length; i++) {
        // These all have O(n) worst case!
        result.unshift(arr[i]);     // O(n) - shifts all elements
        // arr.splice(0, 0, item);   // O(n) - same issue
        // arr.indexOf(item);        // O(n) - linear search
    }
    
    return result;
    // Actual: O(n²), looks like O(n)
}

/**
 * Mistake 3: Ignoring input constraints
 */
function constraintAware(arr) {
    // If arr.length ≤ 100 (given constraint)
    // O(n²) is perfectly acceptable!
    
    // n = 100: 10,000 operations ✓
    // n = 10⁶: 10¹² operations ✗
    
    // Always check constraints before optimizing!
}

// ============================================
// 7. INTERVIEW PERSPECTIVE
// ============================================

/**
 * Common interview questions:
 * 
 * 1. "What's the time complexity of your solution?"
 *    - State best, average, and worst if they differ
 * 
 * 2. "Can you do better than O(n²)?"
 *    - Usually hints at O(n log n) or O(n) solution
 * 
 * 3. "What if we can preprocess the data?"
 *    - Trading preprocessing time for faster queries
 * 
 * 4. "Is there a time-space tradeoff?"
 *    - Using extra space to reduce time complexity
 */

// Example: Optimizing with preprocessing
function findPairs_slow(arr, sum) {
    // O(n²) - check all pairs
    const pairs = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === sum) {
                pairs.push([arr[i], arr[j]]);
            }
        }
    }
    return pairs;
}

function findPairs_fast(arr, sum) {
    // O(n) - use hash set
    const seen = new Set();
    const pairs = [];
    
    for (const num of arr) {
        const complement = sum - num;
        if (seen.has(complement)) {
            pairs.push([complement, num]);
        }
        seen.add(num);
    }
    return pairs;
}

// ============================================
// 8. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Easy): What's the time complexity?
 */
function problem1(n) {
    let sum = 0;
    for (let i = 0; i < n; i += 3) {
        sum += i;
    }
    return sum;
}
// Answer: O(n/3) = O(n) - constants don't matter

/**
 * Problem 2 (Medium): Analyze this nested structure
 */
function problem2(n) {
    let count = 0;
    for (let i = 1; i < n; i *= 2) {
        for (let j = 0; j < i; j++) {
            count++;
        }
    }
    return count;
}
// Answer: 1 + 2 + 4 + ... + n = 2n - 1 = O(n)
// Even though nested, total iterations sum to O(n)

/**
 * Problem 3 (Hard): What's the complexity?
 */
function problem3(n) {
    if (n <= 1) return 1;
    
    let count = 0;
    for (let i = 0; i < n; i++) {
        count++;
    }
    
    return problem3(n / 2) + problem3(n / 2) + count;
}
// Recurrence: T(n) = 2T(n/2) + O(n)
// Answer: O(n log n) by Master Theorem

/**
 * Problem 4 (Hard): Optimize this to O(n)
 */
function findDuplicate_quadratic(nums) {
    // O(n²) - brute force
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] === nums[j]) return nums[i];
        }
    }
    return -1;
}

function findDuplicate_linear(nums) {
    // O(n) using Floyd's cycle detection
    let slow = nums[0];
    let fast = nums[0];
    
    // Find intersection
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow !== fast);
    
    // Find entrance to cycle
    slow = nums[0];
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    
    return slow;
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * TIME COMPLEXITY ANALYSIS CHEAT SHEET:
 * 
 * LOOP PATTERNS:
 * - Single loop (0 to n): O(n)
 * - Nested loops (n × n): O(n²)
 * - Loop with i *= 2:     O(log n)
 * - Loop with i * i < n:  O(√n)
 * - Dependent inner loop: Still O(n²) usually
 * 
 * RECURSION PATTERNS:
 * - Linear (n-1 each call):     O(n)
 * - Binary (two n-1 calls):     O(2ⁿ)
 * - Divide & Conquer (n/2):     O(n log n)
 * 
 * MASTER THEOREM: T(n) = aT(n/b) + O(nᵈ)
 * - d > log_b(a): O(nᵈ)
 * - d = log_b(a): O(nᵈ log n)
 * - d < log_b(a): O(n^log_b(a))
 * 
 * COMMON HIDDEN COSTS:
 * - String concatenation: O(n) per operation
 * - Array.unshift/splice: O(n)
 * - Array.indexOf:        O(n)
 * 
 * INTERVIEW TIPS:
 * - Always state best, average, and worst cases
 * - Watch for hidden O(n) operations in loops
 * - Consider input constraints before optimizing
 * - Mention amortized complexity when applicable
 */

module.exports = {
    singleLoop,
    nestedLoops,
    logLoop,
    linearRecursion,
    binaryRecursion,
    quickSort,
    findPairs_fast,
    findDuplicate_linear,
    AmortizedStack
};
