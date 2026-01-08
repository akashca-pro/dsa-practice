/**
 * ============================================
 * DYNAMIC PROGRAMMING PROBLEMS - COMPREHENSIVE GUIDE
 * ============================================
 * 
 * LEARNING ORDER:
 * 1. 1D DP (Fibonacci, Climbing Stairs)
 * 2. Knapsack Patterns
 * 3. String DP (LCS, Edit Distance)
 * 4. Matrix DP (Paths, Islands)
 * 5. Decision Making DP (Stock, House Robber)
 */

// ============================================
// CATEGORY 1: 1D DP
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - Finance: Investment growth calculation
 * - Gaming: Score accumulation
 * - Planning: Step-by-step optimization
 * 
 * KEY INSIGHT: Current state depends on previous states
 */

// ------------------------------------------
// 1.1 CLIMBING STAIRS
// ------------------------------------------

/**
 * Problem: How many ways to climb n stairs (1 or 2 steps)
 * 
 * dp[i] = dp[i-1] + dp[i-2]
 * Same as Fibonacci!
 */
function climbStairs(n) {
    if (n <= 2) return n;
    
    let prev2 = 1, prev1 = 2;
    
    for (let i = 3; i <= n; i++) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    
    return prev1;
}

/**
 * RELATED QUESTIONS:
 * - Climbing Stairs (LeetCode 70)
 * - Min Cost Climbing Stairs (LeetCode 746)
 * - N-th Tribonacci Number (LeetCode 1137)
 */

// ------------------------------------------
// 1.2 HOUSE ROBBER
// ------------------------------------------

/**
 * Problem: Max money without robbing adjacent houses
 * 
 * Real-world: Activity selection with exclusion rules
 * 
 * dp[i] = max(dp[i-1], dp[i-2] + nums[i])
 */
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    
    let prev2 = 0, prev1 = 0;
    
    for (const num of nums) {
        const curr = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = curr;
    }
    
    return prev1;
}

// House Robber II (circular)
function robCircular(nums) {
    if (nums.length === 1) return nums[0];
    
    const robRange = (start, end) => {
        let prev2 = 0, prev1 = 0;
        for (let i = start; i <= end; i++) {
            const curr = Math.max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    };
    
    return Math.max(
        robRange(0, nums.length - 2),  // Exclude last
        robRange(1, nums.length - 1)   // Exclude first
    );
}

/**
 * RELATED QUESTIONS:
 * - House Robber (LeetCode 198)
 * - House Robber II (LeetCode 213)
 * - House Robber III (LeetCode 337) - tree version
 */

// ------------------------------------------
// 1.3 LONGEST INCREASING SUBSEQUENCE
// ------------------------------------------

/**
 * Problem: Find length of longest increasing subsequence
 * 
 * Real-world: Longest upward trend in data
 */

// O(n²) DP solution
function lengthOfLIS(nums) {
    const dp = new Array(nums.length).fill(1);
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return Math.max(...dp);
}

// O(n log n) with binary search
function lengthOfLISOptimized(nums) {
    const tails = []; // tails[i] = smallest ending of LIS with length i+1
    
    for (const num of nums) {
        let left = 0, right = tails.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) left = mid + 1;
            else right = mid;
        }
        
        if (left === tails.length) tails.push(num);
        else tails[left] = num;
    }
    
    return tails.length;
}

// ============================================
// CATEGORY 2: KNAPSACK PATTERNS
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - Packing luggage with weight limit
 * - Budget allocation
 * - Resource optimization
 * 
 * TYPES:
 * - 0/1 Knapsack: Each item once
 * - Unbounded: Items unlimited
 * - Subset sum: Special case
 */

// ------------------------------------------
// 2.1 0/1 KNAPSACK
// ------------------------------------------

/**
 * Problem: Max value with weight limit
 */
function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = new Array(capacity + 1).fill(0);
    
    for (let i = 0; i < n; i++) {
        // Traverse backwards to avoid using same item twice
        for (let w = capacity; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    
    return dp[capacity];
}

// ------------------------------------------
// 2.2 COIN CHANGE
// ------------------------------------------

/**
 * Problem: Minimum coins to make amount
 * 
 * Unbounded knapsack - can use coin multiple times
 */
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// Number of ways (Coin Change II)
function coinChangeWays(amount, coins) {
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;
    
    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }
    
    return dp[amount];
}

/**
 * RELATED QUESTIONS:
 * - Coin Change (LeetCode 322)
 * - Coin Change II (LeetCode 518)
 * - Perfect Squares (LeetCode 279)
 */

// ------------------------------------------
// 2.3 PARTITION EQUAL SUBSET SUM
// ------------------------------------------

/**
 * Problem: Can array be partitioned into two equal sum subsets?
 * 
 * Reduce to: Can we find subset with sum = total/2?
 */
function canPartition(nums) {
    const total = nums.reduce((a, b) => a + b, 0);
    if (total % 2 !== 0) return false;
    
    const target = total / 2;
    const dp = new Array(target + 1).fill(false);
    dp[0] = true;
    
    for (const num of nums) {
        for (let i = target; i >= num; i--) {
            dp[i] = dp[i] || dp[i - num];
        }
    }
    
    return dp[target];
}

/**
 * RELATED QUESTIONS:
 * - Partition Equal Subset Sum (LeetCode 416)
 * - Target Sum (LeetCode 494)
 * - Last Stone Weight II (LeetCode 1049)
 */

// ============================================
// CATEGORY 3: STRING DP
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - DNA sequence alignment
 * - Spell checker
 * - Plagiarism detection
 * - Diff tools
 */

// ------------------------------------------
// 3.1 LONGEST COMMON SUBSEQUENCE
// ------------------------------------------

/**
 * Problem: Find LCS of two strings
 * 
 * dp[i][j] = LCS of text1[0..i-1] and text2[0..j-1]
 */
function longestCommonSubsequence(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

/**
 * RELATED QUESTIONS:
 * - Longest Common Subsequence (LeetCode 1143)
 * - Longest Palindromic Subsequence (LeetCode 516)
 * - Shortest Common Supersequence (LeetCode 1092)
 */

// ------------------------------------------
// 3.2 EDIT DISTANCE
// ------------------------------------------

/**
 * Problem: Min operations to convert word1 to word2
 * 
 * Operations: insert, delete, replace
 */
function minDistance(word1, word2) {
    const m = word1.length, n = word2.length;
    const dp = Array.from({ length: m + 1 }, (_, i) => 
        new Array(n + 1).fill(0).map((_, j) => i === 0 ? j : j === 0 ? i : 0)
    );
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j - 1],  // replace
                    dp[i - 1][j],      // delete
                    dp[i][j - 1]       // insert
                );
            }
        }
    }
    
    return dp[m][n];
}

// ------------------------------------------
// 3.3 LONGEST PALINDROMIC SUBSTRING
// ------------------------------------------

/**
 * Problem: Find longest palindromic substring
 */
function longestPalindrome(s) {
    const n = s.length;
    let start = 0, maxLen = 1;
    
    const expandAroundCenter = (left, right) => {
        while (left >= 0 && right < n && s[left] === s[right]) {
            if (right - left + 1 > maxLen) {
                start = left;
                maxLen = right - left + 1;
            }
            left--;
            right++;
        }
    };
    
    for (let i = 0; i < n; i++) {
        expandAroundCenter(i, i);     // Odd length
        expandAroundCenter(i, i + 1); // Even length
    }
    
    return s.substring(start, start + maxLen);
}

// ============================================
// CATEGORY 4: MATRIX DP
// ============================================

// ------------------------------------------
// 4.1 UNIQUE PATHS
// ------------------------------------------

/**
 * Problem: Count paths from top-left to bottom-right
 */
function uniquePaths(m, n) {
    const dp = new Array(n).fill(1);
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] += dp[j - 1];
        }
    }
    
    return dp[n - 1];
}

// ------------------------------------------
// 4.2 MINIMUM PATH SUM
// ------------------------------------------

function minPathSum(grid) {
    const m = grid.length, n = grid[0].length;
    
    for (let i = 1; i < m; i++) grid[i][0] += grid[i - 1][0];
    for (let j = 1; j < n; j++) grid[0][j] += grid[0][j - 1];
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
        }
    }
    
    return grid[m - 1][n - 1];
}

/**
 * RELATED QUESTIONS:
 * - Unique Paths (LeetCode 62)
 * - Unique Paths II (LeetCode 63) - with obstacles
 * - Minimum Path Sum (LeetCode 64)
 * - Triangle (LeetCode 120)
 */

// ============================================
// CATEGORY 5: DECISION MAKING DP
// ============================================

// ------------------------------------------
// 5.1 BEST TIME TO BUY AND SELL STOCK
// ------------------------------------------

/**
 * Problem: Max profit with one transaction
 */
function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    
    return maxProfit;
}

// Multiple transactions
function maxProfitII(prices) {
    let profit = 0;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1];
        }
    }
    return profit;
}

// With cooldown
function maxProfitWithCooldown(prices) {
    let sold = 0, held = -Infinity, rest = 0;
    
    for (const price of prices) {
        const prevSold = sold;
        sold = held + price;
        held = Math.max(held, rest - price);
        rest = Math.max(rest, prevSold);
    }
    
    return Math.max(sold, rest);
}

/**
 * RELATED QUESTIONS:
 * - Best Time to Buy and Sell Stock (LeetCode 121)
 * - Stock II (LeetCode 122) - unlimited transactions
 * - Stock III (LeetCode 123) - at most 2 transactions
 * - Stock with Cooldown (LeetCode 309)
 * - Stock with Transaction Fee (LeetCode 714)
 */

// ============================================
// SUMMARY
// ============================================

/**
 * DP CHEAT SHEET:
 * 
 * APPROACH:
 * 1. Define state: What changes?
 * 2. Define recurrence: How does state depend on previous?
 * 3. Base case: Where do we start?
 * 4. Direction: Top-down (memo) or bottom-up (table)?
 * 5. Optimize: Can we reduce space?
 * 
 * PATTERNS:
 * - 1D DP: dp[i] = f(dp[i-1], dp[i-2], ...)
 * - 2D DP: dp[i][j] = f(dp[i-1][j], dp[i][j-1], ...)
 * - Knapsack: Selection with constraint
 * - String: Usually 2D on indices
 * 
 * SPACE OPTIMIZATION:
 * - If only need previous row → 1D array
 * - If only need prev 2 values → 2 variables
 * 
 * INTERVIEW TIP:
 * Start with brute force recursion, then add memoization,
 * then convert to bottom-up if needed!
 */

module.exports = {
    climbStairs,
    rob,
    robCircular,
    lengthOfLIS,
    lengthOfLISOptimized,
    knapsack,
    coinChange,
    coinChangeWays,
    canPartition,
    longestCommonSubsequence,
    minDistance,
    longestPalindrome,
    uniquePaths,
    minPathSum,
    maxProfit,
    maxProfitII,
    maxProfitWithCooldown
};
