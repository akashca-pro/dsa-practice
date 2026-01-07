/**
 * ============================================
 * RECURSION PATTERNS
 * ============================================
 * 
 * CONCEPT:
 * Recursion patterns are reusable templates for solving categories
 * of problems. Recognizing these patterns helps you quickly identify
 * the right approach for new problems.
 * 
 * REAL-WORLD ANALOGY:
 * Like recognizing that "baking a cake" and "making bread" follow
 * similar patterns (mix ingredients, shape, apply heat), recursion
 * patterns let you apply the same mental model to different problems.
 * 
 * INDUSTRY APPLICATIONS:
 * - System design (distributed consensus, replication)
 * - Compiler design (AST traversal)
 * - Game AI (minimax, game trees)
 * - Data processing pipelines
 */

// ============================================
// 1. LINEAR RECURSION
// ============================================

/**
 * Pattern: Process one element, recurse on rest
 * Structure: f(n) = operation + f(n-1)
 */

// Sum of array - linear recursion
function sumArray(arr, index = 0) {
    if (index >= arr.length) return 0;
    return arr[index] + sumArray(arr, index + 1);
}

// Find maximum
function findMax(arr, index = 0, currentMax = -Infinity) {
    if (index >= arr.length) return currentMax;
    return findMax(arr, index + 1, Math.max(currentMax, arr[index]));
}

// Linear search
function linearSearch(arr, target, index = 0) {
    if (index >= arr.length) return -1;
    if (arr[index] === target) return index;
    return linearSearch(arr, target, index + 1);
}

// ============================================
// 2. DIVIDE AND CONQUER
// ============================================

/**
 * Pattern: Split problem in half, solve both, combine results
 * Structure: f(n) = combine(f(n/2), f(n/2)) + O(n) work
 * Time: Usually O(n log n)
 */

// Merge Sort
function mergeSort(arr) {
    // Base case
    if (arr.length <= 1) return arr;
    
    // Divide
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    // Conquer (merge)
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return [...result, ...left.slice(i), ...right.slice(j)];
}

// Maximum subarray using divide and conquer
function maxSubArrayDC(arr, left = 0, right = arr.length - 1) {
    if (left === right) return arr[left];
    
    const mid = Math.floor((left + right) / 2);
    
    // Max in left half
    const leftMax = maxSubArrayDC(arr, left, mid);
    
    // Max in right half
    const rightMax = maxSubArrayDC(arr, mid + 1, right);
    
    // Max crossing the midpoint
    const crossMax = maxCrossing(arr, left, mid, right);
    
    return Math.max(leftMax, rightMax, crossMax);
}

function maxCrossing(arr, left, mid, right) {
    let leftSum = -Infinity, rightSum = -Infinity;
    let sum = 0;
    
    for (let i = mid; i >= left; i--) {
        sum += arr[i];
        leftSum = Math.max(leftSum, sum);
    }
    
    sum = 0;
    for (let i = mid + 1; i <= right; i++) {
        sum += arr[i];
        rightSum = Math.max(rightSum, sum);
    }
    
    return leftSum + rightSum;
}

// Count inversions (pairs where i < j but arr[i] > arr[j])
function countInversions(arr) {
    const result = { count: 0 };
    mergeSortCount(arr.slice(), result);
    return result.count;
}

function mergeSortCount(arr, result) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSortCount(arr.slice(0, mid), result);
    const right = mergeSortCount(arr.slice(mid), result);
    
    return mergeCount(left, right, result);
}

function mergeCount(left, right, result) {
    const merged = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            merged.push(left[i++]);
        } else {
            merged.push(right[j++]);
            result.count += left.length - i; // Count inversions
        }
    }
    
    return [...merged, ...left.slice(i), ...right.slice(j)];
}

// ============================================
// 3. DECREASE AND CONQUER
// ============================================

/**
 * Pattern: Reduce problem by constant or factor, solve smaller
 * Structure: f(n) = operation + f(n-1) or f(n/2)
 */

// Binary search - decrease by half
function binarySearch(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) {
        return binarySearch(arr, target, mid + 1, right);
    }
    return binarySearch(arr, target, left, mid - 1);
}

// Find peak element
function findPeak(arr, left = 0, right = arr.length - 1) {
    if (left === right) return left;
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] > arr[mid + 1]) {
        return findPeak(arr, left, mid);
    }
    return findPeak(arr, mid + 1, right);
}

// Square root using binary search
function sqrt(n, precision = 0.0001) {
    return sqrtHelper(n, 0, n, precision);
}

function sqrtHelper(n, low, high, precision) {
    const mid = (low + high) / 2;
    const square = mid * mid;
    
    if (Math.abs(square - n) <= precision) {
        return mid;
    }
    
    if (square > n) {
        return sqrtHelper(n, low, mid, precision);
    }
    return sqrtHelper(n, mid, high, precision);
}

// ============================================
// 4. GENERATE ALL POSSIBILITIES
// ============================================

/**
 * Pattern: At each step, make a choice, recurse with remaining
 * Used for: Permutations, combinations, subsets, paths
 */

// Generate all subsets (power set)
function subsets(arr) {
    const result = [];
    generateSubsets(arr, 0, [], result);
    return result;
}

function generateSubsets(arr, index, current, result) {
    result.push([...current]);
    
    for (let i = index; i < arr.length; i++) {
        current.push(arr[i]);
        generateSubsets(arr, i + 1, current, result);
        current.pop(); // Backtrack
    }
}

// Generate all permutations
function permutations(arr) {
    const result = [];
    generatePermutations(arr, 0, result);
    return result;
}

function generatePermutations(arr, start, result) {
    if (start === arr.length) {
        result.push([...arr]);
        return;
    }
    
    for (let i = start; i < arr.length; i++) {
        [arr[start], arr[i]] = [arr[i], arr[start]]; // Swap
        generatePermutations(arr, start + 1, result);
        [arr[start], arr[i]] = [arr[i], arr[start]]; // Backtrack
    }
}

// Generate combinations of k elements
function combinations(n, k) {
    const result = [];
    generateCombinations(n, k, 1, [], result);
    return result;
}

function generateCombinations(n, k, start, current, result) {
    if (current.length === k) {
        result.push([...current]);
        return;
    }
    
    for (let i = start; i <= n; i++) {
        current.push(i);
        generateCombinations(n, k, i + 1, current, result);
        current.pop(); // Backtrack
    }
}

// ============================================
// 5. ACCUMULATOR PATTERN
// ============================================

/**
 * Pattern: Pass running result through recursion
 * Enables tail recursion optimization
 */

// Factorial with accumulator
function factorialAcc(n, acc = 1) {
    if (n <= 1) return acc;
    return factorialAcc(n - 1, n * acc);
}

// Reverse list with accumulator
function reverseList(arr, acc = []) {
    if (arr.length === 0) return acc;
    return reverseList(arr.slice(1), [arr[0], ...acc]);
}

// Build string recursively
function buildString(arr, separator = '', acc = '') {
    if (arr.length === 0) return acc;
    
    const newAcc = acc ? `${acc}${separator}${arr[0]}` : `${arr[0]}`;
    return buildString(arr.slice(1), separator, newAcc);
}

// Filter with accumulator
function filterRec(arr, predicate, acc = []) {
    if (arr.length === 0) return acc;
    
    if (predicate(arr[0])) {
        acc.push(arr[0]);
    }
    return filterRec(arr.slice(1), predicate, acc);
}

// ============================================
// 6. MULTIPLE CHOICES PATTERN
// ============================================

/**
 * Pattern: At each step, try multiple options
 * Used for: Pathfinding, decision trees, game states
 */

// Ways to climb stairs (1 or 2 steps)
function climbStairs(n) {
    if (n <= 1) return 1;
    return climbStairs(n - 1) + climbStairs(n - 2);
}
// Note: Use memoization for efficiency

// Coin change - number of ways
function coinChangeWays(coins, amount, index = 0) {
    if (amount === 0) return 1;
    if (amount < 0 || index >= coins.length) return 0;
    
    // Include current coin or skip it
    return coinChangeWays(coins, amount - coins[index], index) +
           coinChangeWays(coins, amount, index + 1);
}

// Count paths in grid (right or down only)
function countPaths(m, n) {
    if (m === 1 || n === 1) return 1;
    return countPaths(m - 1, n) + countPaths(m, n - 1);
}

// ============================================
// 7. EXHAUSTIVE SEARCH PATTERN
// ============================================

/**
 * Pattern: Explore all possibilities, return on success
 * Used for: Puzzles, constraint satisfaction
 */

// Check if subset sum exists
function subsetSum(arr, target, index = 0) {
    if (target === 0) return true;
    if (index >= arr.length || target < 0) return false;
    
    // Include current element or exclude it
    return subsetSum(arr, target - arr[index], index + 1) ||
           subsetSum(arr, target, index + 1);
}

// Find all subsets that sum to target
function findSubsetSums(arr, target) {
    const result = [];
    findSubsetSumsHelper(arr, target, 0, [], result);
    return result;
}

function findSubsetSumsHelper(arr, target, index, current, result) {
    if (target === 0) {
        result.push([...current]);
        return;
    }
    if (target < 0 || index >= arr.length) return;
    
    // Include current element
    current.push(arr[index]);
    findSubsetSumsHelper(arr, target - arr[index], index + 1, current, result);
    current.pop();
    
    // Exclude current element
    findSubsetSumsHelper(arr, target, index + 1, current, result);
}

// ============================================
// 8. RECURSIVE DATA PROCESSING
// ============================================

/**
 * Pattern: Recursively process nested structures
 */

// Deep map (apply function to all values)
function deepMap(obj, fn) {
    if (Array.isArray(obj)) {
        return obj.map(item => deepMap(item, fn));
    }
    
    if (obj !== null && typeof obj === 'object') {
        const result = {};
        for (const key in obj) {
            result[key] = deepMap(obj[key], fn);
        }
        return result;
    }
    
    return fn(obj);
}

// Deep filter (keep nodes matching predicate)
function deepFilter(obj, predicate) {
    if (Array.isArray(obj)) {
        return obj
            .map(item => deepFilter(item, predicate))
            .filter(item => item !== undefined);
    }
    
    if (obj !== null && typeof obj === 'object') {
        const result = {};
        for (const key in obj) {
            const filtered = deepFilter(obj[key], predicate);
            if (filtered !== undefined) {
                result[key] = filtered;
            }
        }
        return Object.keys(result).length ? result : undefined;
    }
    
    return predicate(obj) ? obj : undefined;
}

// Flatten any depth
function deepFlatten(arr) {
    const result = [];
    
    for (const item of arr) {
        if (Array.isArray(item)) {
            result.push(...deepFlatten(item));
        } else {
            result.push(item);
        }
    }
    
    return result;
}

// ============================================
// 9. MEMOIZATION PATTERN
// ============================================

/**
 * Pattern: Cache results to avoid redundant computation
 * Transforms exponential to polynomial time
 */

// Fibonacci with memoization
function fibMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

// Generic memoization wrapper
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// stair climbing memoized
const climbStairsMemo = memoize(function(n) {
    if (n <= 1) return 1;
    return climbStairsMemo(n - 1) + climbStairsMemo(n - 2);
});

// Grid paths memoized
const countPathsMemo = memoize(function(m, n) {
    if (m === 1 || n === 1) return 1;
    return countPathsMemo(m - 1, n) + countPathsMemo(m, n - 1);
});

// ============================================
// 10. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Easy): Sum of first n natural numbers with formula
 * Using recursion to derive: n + (n-1) + ... + 1 = n(n+1)/2
 */
function sumN(n) {
    if (n <= 0) return 0;
    return n + sumN(n - 1);
}

/**
 * Problem 2 (Medium): Generate all binary strings of length n
 */
function generateBinaryStrings(n) {
    const result = [];
    generateBinary(n, '', result);
    return result;
}

function generateBinary(n, current, result) {
    if (current.length === n) {
        result.push(current);
        return;
    }
    
    generateBinary(n, current + '0', result);
    generateBinary(n, current + '1', result);
}

/**
 * Problem 3 (Medium): Generate balanced parentheses
 */
function generateParentheses(n) {
    const result = [];
    generateParen(n, n, '', result);
    return result;
}

function generateParen(open, close, current, result) {
    if (open === 0 && close === 0) {
        result.push(current);
        return;
    }
    
    if (open > 0) {
        generateParen(open - 1, close, current + '(', result);
    }
    if (close > open) {
        generateParen(open, close - 1, current + ')', result);
    }
}

/**
 * Problem 4 (Hard): Letter combinations of phone number
 */
const phoneMap = {
    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
};

function letterCombinations(digits) {
    if (!digits) return [];
    
    const result = [];
    generateCombos(digits, 0, '', result);
    return result;
}

function generateCombos(digits, index, current, result) {
    if (index === digits.length) {
        result.push(current);
        return;
    }
    
    const letters = phoneMap[digits[index]];
    for (const letter of letters) {
        generateCombos(digits, index + 1, current + letter, result);
    }
}

module.exports = {
    mergeSort,
    maxSubArrayDC,
    countInversions,
    binarySearch,
    findPeak,
    sqrt,
    subsets,
    permutations,
    combinations,
    climbStairs,
    coinChangeWays,
    countPaths,
    subsetSum,
    findSubsetSums,
    deepMap,
    deepFlatten,
    fibMemo,
    memoize,
    generateBinaryStrings,
    generateParentheses,
    letterCombinations
};
