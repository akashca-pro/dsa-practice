/**
 * ============================================
 * DYNAMIC PROGRAMMING FUNDAMENTALS
 * ============================================
 * 
 * CONCEPT:
 * Dynamic Programming (DP) is an optimization technique that solves
 * complex problems by breaking them into simpler overlapping subproblems.
 * It stores results of subproblems to avoid redundant calculations.
 * 
 * Two Key Properties for DP:
 * 1. OPTIMAL SUBSTRUCTURE: Optimal solution can be constructed from 
 *    optimal solutions of subproblems
 * 2. OVERLAPPING SUBPROBLEMS: Same subproblems are solved multiple times
 * 
 * REAL-WORLD ANALOGY:
 * Cooking a Multi-Course Meal:
 * - Instead of making each dish from scratch every time
 * - You prep common ingredients once (like chopped onions)
 * - Reuse them across multiple dishes
 * - The "prep" is like solving a subproblem once and storing it
 * 
 * INDUSTRY APPLICATIONS:
 * - Route optimization (GPS navigation)
 * - Resource allocation
 * - Text prediction and autocomplete
 * - DNA sequence alignment
 * - Financial portfolio optimization
 * - Game AI (chess, go)
 * 
 * TWO APPROACHES:
 * 1. TOP-DOWN (Memoization): Start with original problem, recurse down
 * 2. BOTTOM-UP (Tabulation): Start with smallest subproblems, build up
 * 
 * COMPLEXITY:
 * - Reduces exponential O(2^n) to polynomial O(n) or O(n²)
 * - Trades time for space (store subproblem results)
 */

// ============================================
// 1. FIBONACCI - THE CLASSIC DP EXAMPLE
// ============================================

/**
 * Why Fibonacci is perfect for DP:
 * 
 * fib(5) = fib(4) + fib(3)
 *        = (fib(3) + fib(2)) + (fib(2) + fib(1))
 * 
 * Notice: fib(3) and fib(2) are calculated multiple times!
 * 
 * Without DP: O(2^n) time
 * With DP: O(n) time
 */

/**
 * Memoization (Top-Down)
 * 
 * Start with the original problem and recursively solve
 * Store results in a memo object/map
 * 
 * Think: "I need fib(5). Do I have it? No. Let me calculate it."
 */
function fibMemo(n, memo = {}) {
    // Check if already computed
    if (n in memo) return memo[n];
    
    // Base cases
    if (n <= 1) return n;
    
    // Compute, store, and return
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

/**
 * Tabulation (Bottom-Up)
 * 
 * Start from smallest subproblems and build up
 * Fill a table iteratively
 * 
 * Think: "I'll compute fib(0), fib(1), fib(2)... up to fib(n)"
 */
function fibTab(n) {
    if (n <= 1) return n;
    
    const dp = [0, 1];
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

/**
 * Space Optimized
 * 
 * Key insight: We only need the last 2 values!
 * No need to store entire array
 * 
 * Time: O(n), Space: O(1)
 */
function fibOptimized(n) {
    if (n <= 1) return n;
    
    let prev = 0, curr = 1;
    
    for (let i = 2; i <= n; i++) {
        const next = prev + curr;
        prev = curr;
        curr = next;
    }
    
    return curr;
}

// ============================================
// 2. CLIMBING STAIRS - 1D DP
// ============================================

/**
 * Problem: How many distinct ways to climb n stairs
 * if you can take 1 or 2 steps at a time?
 * 
 * Recurrence: dp[i] = dp[i-1] + dp[i-2]
 * (Same as Fibonacci!)
 * 
 * Why? To reach step i:
 * - Come from step i-1 (take 1 step)
 * - Come from step i-2 (take 2 steps)
 */
function climbStairs(n) {
    if (n <= 2) return n;
    
    let prev = 1, curr = 2;
    
    for (let i = 3; i <= n; i++) {
        const next = prev + curr;
        prev = curr;
        curr = next;
    }
    
    return curr;
}

/**
 * Variation: Climbing stairs with cost
 * 
 * Each step has a cost, find minimum cost to reach top
 * Can start from step 0 or step 1
 */
function minCostClimbingStairs(cost) {
    const n = cost.length;
    
    // dp[i] = min cost to reach step i
    // Modify cost array in place to save space
    for (let i = 2; i < n; i++) {
        cost[i] += Math.min(cost[i - 1], cost[i - 2]);
    }
    
    // Can reach top from last or second-to-last step
    return Math.min(cost[n - 1], cost[n - 2]);
}

// ============================================
// 3. HOUSE ROBBER - DECISION DP
// ============================================

/**
 * Problem: Rob houses for maximum money
 * Constraint: Can't rob adjacent houses
 * 
 * At each house, decide: ROB or SKIP?
 * 
 * Recurrence:
 * dp[i] = max(
 *   dp[i-1],              // Skip current house
 *   dp[i-2] + nums[i]     // Rob current house
 * )
 */
function rob(nums) {
    // prev = max money up to 2 houses ago
    // curr = max money up to previous house
    let prev = 0, curr = 0;
    
    for (const num of nums) {
        const temp = Math.max(
            curr,           // Skip: keep previous max
            prev + num      // Rob: add to max from 2 ago
        );
        prev = curr;
        curr = temp;
    }
    
    return curr;
}

/**
 * House Robber II - Houses in a circle
 * First and last houses are adjacent
 * 
 * Solution: Consider two cases:
 * 1. Rob houses 0 to n-2 (exclude last)
 * 2. Rob houses 1 to n-1 (exclude first)
 */
function robCircular(nums) {
    if (nums.length === 1) return nums[0];
    
    const robRange = (start, end) => {
        let prev = 0, curr = 0;
        for (let i = start; i <= end; i++) {
            [prev, curr] = [curr, Math.max(curr, prev + nums[i])];
        }
        return curr;
    };
    
    return Math.max(
        robRange(0, nums.length - 2),  // Exclude last
        robRange(1, nums.length - 1)   // Exclude first
    );
}

// ============================================
// 4. DP THINKING FRAMEWORK
// ============================================

/**
 * HOW TO APPROACH DP PROBLEMS:
 * 
 * 1. IDENTIFY: Does it have optimal substructure + overlapping subproblems?
 * 
 * 2. DEFINE STATE: What information do we need to track?
 *    - dp[i] = answer for subproblem of size i
 *    - dp[i][j] = answer considering elements i,j
 * 
 * 3. FIND RECURRENCE: How does current state relate to previous states?
 *    - Look for choices/decisions at each step
 * 
 * 4. BASE CASES: What are the smallest subproblems?
 * 
 * 5. COMPUTATION ORDER: Usually left-to-right, top-to-bottom
 * 
 * 6. OPTIMIZE SPACE: Often only need last few states
 */

// ============================================
// 5. COMMON MISTAKES & EDGE CASES
// ============================================

/**
 * Mistake 1: Not identifying all base cases
 * 
 * Mistake 2: Wrong recurrence relation
 * - Draw out small examples first!
 * 
 * Mistake 3: Off-by-one errors in array indices
 * 
 * Mistake 4: Not considering space optimization
 * - If only need last k states, don't store all n
 * 
 * Edge Cases:
 * - Empty input
 * - Single element
 * - All same values
 * - Negative numbers (for sum problems)
 */

// ============================================
// 6. INTERVIEW PERSPECTIVE
// ============================================

/**
 * DP Problem Categories:
 * 
 * 1. 1D DP: Climbing stairs, house robber, max subarray
 * 2. 2D DP: LCS, edit distance, unique paths
 * 3. KNAPSACK: 0/1 knapsack, coin change
 * 4. INTERVAL DP: Matrix chain multiplication
 * 5. STRING DP: Palindromes, word break
 * 
 * Memoization vs Tabulation:
 * - Memoization: Easier to code, follows recursion naturally
 * - Tabulation: Faster (no recursion overhead), easier to optimize space
 * 
 * When asked "Can you optimize?":
 * - Often refers to space optimization
 * - Look for which states you actually need
 */

// ============================================
// 7. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Easy): Maximum Subarray (Kadane's Algorithm)
 */
function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        // Either extend current subarray or start new one
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}

/**
 * Problem 2 (Medium): Coin Change - Minimum Coins
 */
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i && dp[i - coin] !== Infinity) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

/**
 * Problem 3 (Medium): Longest Increasing Subsequence
 */
function lengthOfLIS(nums) {
    // O(n log n) using binary search
    const tails = [];
    
    for (const num of nums) {
        let left = 0, right = tails.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) left = mid + 1;
            else right = mid;
        }
        
        tails[left] = num;
    }
    
    return tails.length;
}

/**
 * Problem 4 (Medium): Unique Paths
 */
function uniquePaths(m, n) {
    // Space optimized: only need one row
    const dp = new Array(n).fill(1);
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] = dp[j] + dp[j - 1];
        }
    }
    
    return dp[n - 1];
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * DYNAMIC PROGRAMMING CHEAT SHEET:
 * 
 * WHEN TO USE DP:
 * - Optimal substructure (build optimal solution from subproblems)
 * - Overlapping subproblems (same calculations repeated)
 * - "Count ways", "Min/Max", "True/False" questions
 * 
 * TWO APPROACHES:
 * - Memoization (Top-Down): Recursion + cache
 * - Tabulation (Bottom-Up): Iterative + array
 * 
 * COMMON PATTERNS:
 * | Pattern            | Example             | Recurrence                     |
 * |--------------------|---------------------|--------------------------------|
 * | Linear             | Climbing stairs     | dp[i] = dp[i-1] + dp[i-2]      |
 * | Decision           | House robber        | dp[i] = max(dp[i-1], dp[i-2]+x)|
 * | Two sequences      | LCS                 | Compare chars, diagonal move   |
 * | Interval           | Palindrome          | Expand from center             |
 * | Knapsack           | Coin change         | Take or skip item              |
 * 
 * OPTIMIZATION:
 * - Space: If only need last k states, use O(k) space instead of O(n)
 * - Time: Binary search for LIS-type problems
 * 
 * INTERVIEW TIP:
 * Start with brute force recursion, identify repeated work,
 * then add memoization or convert to tabulation.
 */

module.exports = { 
    fibMemo, 
    fibTab, 
    fibOptimized, 
    climbStairs, 
    minCostClimbingStairs, 
    rob,
    robCircular,
    maxSubArray,
    coinChange,
    lengthOfLIS,
    uniquePaths
};
