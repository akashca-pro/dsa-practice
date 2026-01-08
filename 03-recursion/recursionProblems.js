/**
 * ============================================
 * RECURSION PROBLEMS - COMPREHENSIVE GUIDE
 * ============================================
 * 
 * LEARNING ORDER:
 * 1. Basic Recursion (math problems)
 * 2. Array/String Recursion
 * 3. Generate All Possibilities
 * 4. Backtracking Problems
 */

// ============================================
// CATEGORY 1: BASIC RECURSION
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - File system traversal
 * - JSON parsing
 * - Natural language processing (parsing)
 * - Mathematical computations
 * 
 * KEY INSIGHT: Solve smaller problem, combine results
 */

// ------------------------------------------
// 1.1 POWER OF NUMBER
// ------------------------------------------

/**
 * Problem: Calculate x^n
 * 
 * Naive: O(n), Optimized: O(log n)
 */
function myPow(x, n) {
    if (n === 0) return 1;
    if (n < 0) {
        x = 1 / x;
        n = -n;
    }
    
    if (n % 2 === 0) {
        const half = myPow(x, n / 2);
        return half * half;
    } else {
        return x * myPow(x, n - 1);
    }
}

// ------------------------------------------
// 1.2 FIBONACCI
// ------------------------------------------

// Naive O(2^n)
function fibNaive(n) {
    if (n <= 1) return n;
    return fibNaive(n - 1) + fibNaive(n - 2);
}

// With memoization O(n)
function fib(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}

// ------------------------------------------
// 1.3 FACTORIAL
// ------------------------------------------

function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Tail recursive (optimized by some compilers)
function factorialTail(n, acc = 1) {
    if (n <= 1) return acc;
    return factorialTail(n - 1, n * acc);
}

/**
 * RELATED QUESTIONS:
 * - Pow(x, n) (LeetCode 50)
 * - Fibonacci Number (LeetCode 509)
 * - Climbing Stairs (LeetCode 70)
 */

// ============================================
// CATEGORY 2: ARRAY/STRING RECURSION
// ============================================

// ------------------------------------------
// 2.1 REVERSE STRING
// ------------------------------------------

function reverseString(s, left = 0, right = s.length - 1) {
    if (left >= right) return;
    
    [s[left], s[right]] = [s[right], s[left]];
    reverseString(s, left + 1, right - 1);
}

// ------------------------------------------
// 2.2 PALINDROME CHECK
// ------------------------------------------

function isPalindrome(s, left = 0, right = s.length - 1) {
    if (left >= right) return true;
    if (s[left] !== s[right]) return false;
    return isPalindrome(s, left + 1, right - 1);
}

// ------------------------------------------
// 2.3 FLATTEN NESTED LIST
// ------------------------------------------

function flatten(arr) {
    const result = [];
    
    const helper = (item) => {
        if (Array.isArray(item)) {
            for (const subItem of item) {
                helper(subItem);
            }
        } else {
            result.push(item);
        }
    };
    
    helper(arr);
    return result;
}

// ------------------------------------------
// 2.4 MERGE SORT
// ------------------------------------------

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
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return [...result, ...left.slice(i), ...right.slice(j)];
}

// ============================================
// CATEGORY 3: GENERATE ALL POSSIBILITIES
// ============================================

/**
 * These are classic recursion problems!
 * Pattern: Make choice → recurse → undo choice (backtrack)
 */

// ------------------------------------------
// 3.1 SUBSETS
// ------------------------------------------

/**
 * Problem: Generate all subsets
 * 
 * Real-world: All possible feature combinations
 */
function subsets(nums) {
    const result = [];
    
    const backtrack = (start, current) => {
        result.push([...current]);
        
        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    };
    
    backtrack(0, []);
    return result;
}

// ------------------------------------------
// 3.2 PERMUTATIONS
// ------------------------------------------

/**
 * Problem: Generate all permutations
 * 
 * Real-world: All possible orderings
 */
function permute(nums) {
    const result = [];
    
    const backtrack = (current, remaining) => {
        if (remaining.length === 0) {
            result.push([...current]);
            return;
        }
        
        for (let i = 0; i < remaining.length; i++) {
            current.push(remaining[i]);
            backtrack(current, [...remaining.slice(0, i), ...remaining.slice(i + 1)]);
            current.pop();
        }
    };
    
    backtrack([], nums);
    return result;
}

/**
 * RELATED QUESTIONS:
 * - Subsets (LeetCode 78)
 * - Subsets II (LeetCode 90) - with duplicates
 * - Permutations (LeetCode 46)
 * - Permutations II (LeetCode 47) - with duplicates
 */

// ------------------------------------------
// 3.3 COMBINATIONS
// ------------------------------------------

/**
 * Problem: All combinations of k numbers from [1, n]
 */
function combine(n, k) {
    const result = [];
    
    const backtrack = (start, current) => {
        if (current.length === k) {
            result.push([...current]);
            return;
        }
        
        for (let i = start; i <= n; i++) {
            current.push(i);
            backtrack(i + 1, current);
            current.pop();
        }
    };
    
    backtrack(1, []);
    return result;
}

// ------------------------------------------
// 3.4 LETTER COMBINATIONS OF PHONE NUMBER
// ------------------------------------------

function letterCombinations(digits) {
    if (!digits.length) return [];
    
    const map = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    
    const result = [];
    
    const backtrack = (index, current) => {
        if (index === digits.length) {
            result.push(current);
            return;
        }
        
        for (const char of map[digits[index]]) {
            backtrack(index + 1, current + char);
        }
    };
    
    backtrack(0, '');
    return result;
}

// ============================================
// CATEGORY 4: BACKTRACKING PROBLEMS
// ============================================

// ------------------------------------------
// 4.1 N-QUEENS
// ------------------------------------------

/**
 * Problem: Place n queens on n×n board
 * 
 * Classic backtracking problem!
 */
function solveNQueens(n) {
    const result = [];
    const board = Array(n).fill(null).map(() => Array(n).fill('.'));
    
    const isValid = (row, col) => {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        
        // Check upper-left diagonal
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        
        // Check upper-right diagonal
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        
        return true;
    };
    
    const backtrack = (row) => {
        if (row === n) {
            result.push(board.map(r => r.join('')));
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (isValid(row, col)) {
                board[row][col] = 'Q';
                backtrack(row + 1);
                board[row][col] = '.';
            }
        }
    };
    
    backtrack(0);
    return result;
}

// ------------------------------------------
// 4.2 COMBINATION SUM
// ------------------------------------------

/**
 * Problem: Find combinations that sum to target
 * 
 * Can use same number multiple times
 */
function combinationSum(candidates, target) {
    const result = [];
    
    const backtrack = (start, remaining, current) => {
        if (remaining === 0) {
            result.push([...current]);
            return;
        }
        if (remaining < 0) return;
        
        for (let i = start; i < candidates.length; i++) {
            current.push(candidates[i]);
            backtrack(i, remaining - candidates[i], current); // i not i+1 (reuse)
            current.pop();
        }
    };
    
    backtrack(0, target, []);
    return result;
}

/**
 * RELATED QUESTIONS:
 * - N-Queens (LeetCode 51)
 * - Sudoku Solver (LeetCode 37)
 * - Combination Sum (LeetCode 39)
 * - Combination Sum II (LeetCode 40)
 * - Word Search (LeetCode 79)
 */

// ------------------------------------------
// 4.3 WORD SEARCH
// ------------------------------------------

/**
 * Problem: Find if word exists in grid
 */
function exist(board, word) {
    const rows = board.length;
    const cols = board[0].length;
    
    const backtrack = (r, c, index) => {
        if (index === word.length) return true;
        
        if (r < 0 || r >= rows || c < 0 || c >= cols || 
            board[r][c] !== word[index]) return false;
        
        const temp = board[r][c];
        board[r][c] = '#'; // Mark visited
        
        const found = backtrack(r + 1, c, index + 1) ||
                     backtrack(r - 1, c, index + 1) ||
                     backtrack(r, c + 1, index + 1) ||
                     backtrack(r, c - 1, index + 1);
        
        board[r][c] = temp; // Restore
        return found;
    };
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (backtrack(r, c, 0)) return true;
        }
    }
    
    return false;
}

// ------------------------------------------
// 4.4 GENERATE PARENTHESES
// ------------------------------------------

/**
 * Problem: Generate all valid parentheses combinations
 */
function generateParenthesis(n) {
    const result = [];
    
    const backtrack = (current, open, close) => {
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }
        
        if (open < n) {
            backtrack(current + '(', open + 1, close);
        }
        if (close < open) {
            backtrack(current + ')', open, close + 1);
        }
    };
    
    backtrack('', 0, 0);
    return result;
}

// ============================================
// SUMMARY
// ============================================

/**
 * RECURSION CHEAT SHEET:
 * 
 * STRUCTURE:
 * 1. BASE CASE: When to stop
 * 2. RECURSIVE CASE: How to reduce problem
 * 3. COMBINE: How to use sub-results
 * 
 * COMMON PATTERNS:
 * - Linear: f(n) = f(n-1) + something
 * - Divide & Conquer: f(arr) = combine(f(left), f(right))
 * - Backtracking: try choice → recurse → undo
 * 
 * BACKTRACKING TEMPLATE:
 * function backtrack(state):
 *     if (isGoal(state)):
 *         recordSolution()
 *         return
 *     
 *     for choice in choices:
 *         if (isValid(choice)):
 *             makeChoice(choice)
 *             backtrack(newState)
 *             undoChoice(choice)
 * 
 * OPTIMIZATION:
 * - Memoization: Cache repeated subproblems
 * - Pruning: Skip invalid branches early
 * - Tail recursion: Some languages optimize
 * 
 * INTERVIEW TIP:
 * Draw the recursion tree to understand the problem!
 */

module.exports = {
    myPow,
    fibNaive,
    fib,
    factorial,
    factorialTail,
    reverseString,
    isPalindrome,
    flatten,
    mergeSort,
    subsets,
    permute,
    combine,
    letterCombinations,
    solveNQueens,
    combinationSum,
    exist,
    generateParenthesis
};
