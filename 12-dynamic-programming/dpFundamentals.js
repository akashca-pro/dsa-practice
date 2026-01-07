/**
 * DYNAMIC PROGRAMMING FUNDAMENTALS
 */

// Fibonacci - memoization (top-down)
function fibMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

// Fibonacci - tabulation (bottom-up)
function fibTab(n) {
    if (n <= 1) return n;
    const dp = [0, 1];
    for (let i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}

// Fibonacci - space optimized
function fibOptimized(n) {
    if (n <= 1) return n;
    let prev = 0, curr = 1;
    for (let i = 2; i <= n; i++) [prev, curr] = [curr, prev + curr];
    return curr;
}

// Climbing stairs
function climbStairs(n) {
    if (n <= 2) return n;
    let prev = 1, curr = 2;
    for (let i = 3; i <= n; i++) [prev, curr] = [curr, prev + curr];
    return curr;
}

// Min cost climbing stairs
function minCostClimbingStairs(cost) {
    const n = cost.length;
    for (let i = 2; i < n; i++) cost[i] += Math.min(cost[i-1], cost[i-2]);
    return Math.min(cost[n-1], cost[n-2]);
}

// House robber
function rob(nums) {
    let prev = 0, curr = 0;
    for (const num of nums) [prev, curr] = [curr, Math.max(curr, prev + num)];
    return curr;
}

module.exports = { fibMemo, fibTab, fibOptimized, climbStairs, minCostClimbingStairs, rob };
