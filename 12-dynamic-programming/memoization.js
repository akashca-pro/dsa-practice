/**
 * MEMOIZATION (Top-Down DP)
 */

// Generic memoization wrapper
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Coin change - minimum coins
const coinChange = memoize(function(coins, amount) {
    if (amount === 0) return 0;
    if (amount < 0) return -1;
    
    let min = Infinity;
    for (const coin of coins) {
        const result = coinChange(coins, amount - coin);
        if (result >= 0) min = Math.min(min, result + 1);
    }
    return min === Infinity ? -1 : min;
});

// Longest increasing subsequence
function lengthOfLIS(nums) {
    const memo = new Map();
    
    const dfs = (i, prev) => {
        if (i === nums.length) return 0;
        const key = `${i},${prev}`;
        if (memo.has(key)) return memo.get(key);
        
        let skip = dfs(i + 1, prev);
        let take = 0;
        if (prev === -Infinity || nums[i] > prev) take = 1 + dfs(i + 1, nums[i]);
        
        memo.set(key, Math.max(skip, take));
        return memo.get(key);
    };
    
    return dfs(0, -Infinity);
}

// Unique paths
const uniquePaths = memoize(function(m, n) {
    if (m === 1 || n === 1) return 1;
    return uniquePaths(m - 1, n) + uniquePaths(m, n - 1);
});

// Partition equal subset sum
function canPartition(nums) {
    const sum = nums.reduce((a, b) => a + b, 0);
    if (sum % 2 !== 0) return false;
    const target = sum / 2;
    const memo = new Map();
    
    const dfs = (i, remaining) => {
        if (remaining === 0) return true;
        if (i >= nums.length || remaining < 0) return false;
        const key = `${i},${remaining}`;
        if (memo.has(key)) return memo.get(key);
        
        const result = dfs(i + 1, remaining - nums[i]) || dfs(i + 1, remaining);
        memo.set(key, result);
        return result;
    };
    
    return dfs(0, target);
}

module.exports = { memoize, coinChange, lengthOfLIS, uniquePaths, canPartition };
