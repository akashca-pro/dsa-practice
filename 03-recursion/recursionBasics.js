/**
 * ============================================
 * RECURSION BASICS
 * ============================================
 * 
 * CONCEPT:
 * Recursion is a technique where a function calls itself to solve
 * smaller instances of the same problem. Every recursive solution has:
 * 1. Base Case - When to stop recursing
 * 2. Recursive Case - How to reduce the problem
 * 
 * REAL-WORLD ANALOGY:
 * Russian nesting dolls (Matryoshka):
 * - Open the outer doll to find a smaller doll inside
 * - Keep opening until you find the smallest doll (base case)
 * - The pattern is the same at every level
 * 
 * INDUSTRY APPLICATIONS:
 * - Tree/graph traversal (DOM, file systems)
 * - Language parsers and compilers
 * - Divide and conquer algorithms
 * - Mathematical computations
 * - Fractal generation
 */

// ============================================
// 1. ANATOMY OF RECURSION
// ============================================

/**
 * Simple Countdown - Understanding recursion flow
 */
function countdown(n) {
    // Base Case: Stop when n reaches 0
    if (n <= 0) {
        console.log('Done!');
        return;
    }
    
    // Recursive Case: Do something, then recurse
    console.log(n);
    countdown(n - 1);
}

/**
 * Tracing Recursion:
 * countdown(3)
 *   → logs 3
 *   → countdown(2)
 *       → logs 2
 *       → countdown(1)
 *           → logs 1
 *           → countdown(0)
 *               → logs 'Done!'
 *               → returns
 *           → returns
 *       → returns
 *   → returns
 */

/**
 * Factorial - Classic recursive example
 */
function factorial(n) {
    // Base Case
    if (n <= 1) return 1;
    
    // Recursive Case
    return n * factorial(n - 1);
}
// factorial(5) = 5 * 4 * 3 * 2 * 1 = 120
// Time: O(n), Space: O(n) call stack

/**
 * Fibonacci - Multiple recursive calls
 */
function fibonacci(n) {
    // Base Cases
    if (n === 0) return 0;
    if (n === 1) return 1;
    
    // Recursive Case
    return fibonacci(n - 1) + fibonacci(n - 2);
}
// Warning: O(2^n) time - exponential!
// Each call spawns 2 more calls

// ============================================
// 2. RECURSION vs ITERATION
// ============================================

/**
 * Any recursion can be converted to iteration (and vice versa)
 * But some problems are more naturally recursive
 */

// Recursive sum of array
function sumRecursive(arr, index = 0) {
    if (index >= arr.length) return 0;
    return arr[index] + sumRecursive(arr, index + 1);
}

// Iterative sum of array
function sumIterative(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

/**
 * When to use recursion:
 * - Tree/graph structures (naturally recursive)
 * - Problem has recursive substructure
 * - Divide and conquer approach
 * - Code clarity is important
 * 
 * When to use iteration:
 * - Performance critical (avoid call stack overhead)
 * - Simple linear processing
 * - Memory constrained (avoid stack overflow)
 */

// ============================================
// 3. TYPES OF RECURSION
// ============================================

/**
 * HEAD Recursion
 * Recursive call happens BEFORE processing
 */
function headRecursion(n) {
    if (n <= 0) return;
    
    headRecursion(n - 1); // Recursive call first
    console.log(n);        // Process after return
}
// Prints: 1, 2, 3, 4, 5 (ascending)

/**
 * TAIL Recursion
 * Recursive call is the LAST operation
 * Can be optimized by compilers (tail call optimization)
 */
function tailRecursion(n) {
    if (n <= 0) return;
    
    console.log(n);        // Process first
    tailRecursion(n - 1);  // Recursive call last
}
// Prints: 5, 4, 3, 2, 1 (descending)

/**
 * Tail Recursion with Accumulator
 * Enables tail call optimization
 */
function factorialTail(n, accumulator = 1) {
    if (n <= 1) return accumulator;
    return factorialTail(n - 1, n * accumulator);
}
// The result is built in the accumulator
// No stack needed to hold intermediate results

/**
 * TREE Recursion
 * Multiple recursive calls per level
 */
function treeRecursion(n) {
    if (n <= 0) return 0;
    
    // Two branches
    return treeRecursion(n - 1) + treeRecursion(n - 2);
}
// Creates a tree of calls (Fibonacci is tree recursion)

/**
 * INDIRECT/MUTUAL Recursion
 * Function A calls B, B calls A
 */
function isEven(n) {
    if (n === 0) return true;
    return isOdd(n - 1);
}

function isOdd(n) {
    if (n === 0) return false;
    return isEven(n - 1);
}

// ============================================
// 4. RECURSION ON DATA STRUCTURES
// ============================================

/**
 * Sum of Nested Array (any depth)
 */
function sumNested(arr) {
    let sum = 0;
    
    for (const item of arr) {
        if (Array.isArray(item)) {
            sum += sumNested(item); // Recurse on nested array
        } else {
            sum += item;
        }
    }
    
    return sum;
}
// sumNested([1, [2, [3, 4]], 5]) = 15

/**
 * Deep Clone Object
 */
function deepClone(obj) {
    // Base cases
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    // Handle arrays
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }
    
    // Handle objects
    const clone = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key]);
        }
    }
    
    return clone;
}

/**
 * Flatten Nested Array
 */
function flatten(arr) {
    const result = [];
    
    for (const item of arr) {
        if (Array.isArray(item)) {
            result.push(...flatten(item));
        } else {
            result.push(item);
        }
    }
    
    return result;
}
// flatten([1, [2, [3, 4]], 5]) = [1, 2, 3, 4, 5]

/**
 * Find value in nested object
 */
function findValue(obj, key) {
    if (obj.hasOwnProperty(key)) {
        return obj[key];
    }
    
    for (const k in obj) {
        if (typeof obj[k] === 'object' && obj[k] !== null) {
            const found = findValue(obj[k], key);
            if (found !== undefined) return found;
        }
    }
    
    return undefined;
}

// ============================================
// 5. MATHEMATICAL RECURSION
// ============================================

/**
 * Power function
 */
function power(base, exponent) {
    if (exponent === 0) return 1;
    if (exponent < 0) return 1 / power(base, -exponent);
    
    return base * power(base, exponent - 1);
}
// O(n) time

// Optimized: O(log n) using divide and conquer
function powerOptimized(base, exponent) {
    if (exponent === 0) return 1;
    if (exponent < 0) return 1 / powerOptimized(base, -exponent);
    
    if (exponent % 2 === 0) {
        const half = powerOptimized(base, exponent / 2);
        return half * half;
    } else {
        return base * powerOptimized(base, exponent - 1);
    }
}

/**
 * Greatest Common Divisor (Euclidean Algorithm)
 */
function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}
// gcd(48, 18) = gcd(18, 12) = gcd(12, 6) = gcd(6, 0) = 6

/**
 * Sum of Digits
 */
function sumDigits(n) {
    n = Math.abs(n);
    if (n < 10) return n;
    return (n % 10) + sumDigits(Math.floor(n / 10));
}
// sumDigits(12345) = 5 + sumDigits(1234) = ... = 15

/**
 * Reverse a Number
 */
function reverseNumber(n, reversed = 0) {
    if (n === 0) return reversed;
    return reverseNumber(Math.floor(n / 10), reversed * 10 + n % 10);
}
// reverseNumber(12345) = 54321

// ============================================
// 6. RECURSIVE STRING OPERATIONS
// ============================================

/**
 * Reverse String
 */
function reverseString(str) {
    if (str.length <= 1) return str;
    return reverseString(str.slice(1)) + str[0];
}

/**
 * Check Palindrome
 */
function isPalindrome(str) {
    if (str.length <= 1) return true;
    if (str[0] !== str[str.length - 1]) return false;
    return isPalindrome(str.slice(1, -1));
}

/**
 * Remove Vowels
 */
function removeVowels(str) {
    if (str.length === 0) return '';
    
    const vowels = 'aeiouAEIOU';
    const first = vowels.includes(str[0]) ? '' : str[0];
    
    return first + removeVowels(str.slice(1));
}

// ============================================
// 7. COMMON MISTAKES & DEBUGGING
// ============================================

/**
 * Mistake 1: Missing Base Case
 */
function infiniteRecursion(n) {
    // Missing base case - will cause stack overflow!
    return infiniteRecursion(n - 1);
}

/**
 * Mistake 2: Base Case Not Reachable
 */
function unreachableBase(n) {
    if (n === 0) return 0; // Base case
    return unreachableBase(n - 2); // Skips over 0 if n is odd!
}
// Fix: if (n <= 0) return 0;

/**
 * Mistake 3: Not Returning Recursive Result
 */
function noReturn(n) {
    if (n <= 0) return 0;
    noReturn(n - 1); // Forgot to return!
}
// Returns undefined

/**
 * Debugging Tips:
 * 1. Add console.log to trace calls
 * 2. Verify base case is correct
 * 3. Ensure problem gets smaller each call
 * 4. Check that recursive result is used
 */

function debugRecursion(n, depth = 0) {
    const indent = '  '.repeat(depth);
    console.log(`${indent}factorial(${n}) called`);
    
    if (n <= 1) {
        console.log(`${indent}Base case: returning 1`);
        return 1;
    }
    
    const result = n * debugRecursion(n - 1, depth + 1);
    console.log(`${indent}factorial(${n}) returning ${result}`);
    return result;
}

// ============================================
// 8. STACK OVERFLOW PREVENTION
// ============================================

/**
 * JavaScript has limited call stack (varies by engine)
 * Typically around 10,000 - 20,000 frames
 */

// Problem: Stack overflow for large n
function sumToN(n) {
    if (n <= 0) return 0;
    return n + sumToN(n - 1);
}
// sumToN(100000) - Stack Overflow!

// Solution 1: Use iteration for simple cases
function sumToNIterative(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// Solution 2: Use formula when available
function sumToNFormula(n) {
    return (n * (n + 1)) / 2;
}

// Solution 3: Trampoline pattern (simulates tail call optimization)
function trampoline(fn) {
    return function(...args) {
        let result = fn(...args);
        while (typeof result === 'function') {
            result = result();
        }
        return result;
    };
}

function sumTrampolined(n, acc = 0) {
    if (n <= 0) return acc;
    return () => sumTrampolined(n - 1, acc + n); // Return thunk
}

const safeSum = trampoline(sumTrampolined);
// safeSum(100000) - Works!

// ============================================
// 9. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Easy): Count occurrences in array
 */
function countOccurrences(arr, target, index = 0) {
    if (index >= arr.length) return 0;
    
    const count = arr[index] === target ? 1 : 0;
    return count + countOccurrences(arr, target, index + 1);
}

/**
 * Problem 2 (Easy): Check if array is sorted
 */
function isSorted(arr, index = 0) {
    if (index >= arr.length - 1) return true;
    if (arr[index] > arr[index + 1]) return false;
    return isSorted(arr, index + 1);
}

/**
 * Problem 3 (Medium): Binary search recursive
 */
function binarySearch(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) {
        return binarySearch(arr, target, mid + 1, right);
    }
    return binarySearch(arr, target, left, mid - 1);
}

/**
 * Problem 4 (Medium): All indices of target
 */
function findAllIndices(arr, target, index = 0) {
    if (index >= arr.length) return [];
    
    const rest = findAllIndices(arr, target, index + 1);
    
    if (arr[index] === target) {
        return [index, ...rest];
    }
    return rest;
}

/**
 * Problem 5 (Hard): Tower of Hanoi
 */
function towerOfHanoi(n, source, auxiliary, destination, moves = []) {
    if (n === 0) return moves;
    
    // Move n-1 disks from source to auxiliary
    towerOfHanoi(n - 1, source, destination, auxiliary, moves);
    
    // Move the nth disk from source to destination
    moves.push(`Move disk ${n} from ${source} to ${destination}`);
    
    // Move n-1 disks from auxiliary to destination
    towerOfHanoi(n - 1, auxiliary, source, destination, moves);
    
    return moves;
}
// Number of moves: 2^n - 1

module.exports = {
    factorial,
    fibonacci,
    sumRecursive,
    factorialTail,
    sumNested,
    deepClone,
    flatten,
    power,
    powerOptimized,
    gcd,
    reverseString,
    isPalindrome,
    countOccurrences,
    isSorted,
    binarySearch,
    findAllIndices,
    towerOfHanoi
};
