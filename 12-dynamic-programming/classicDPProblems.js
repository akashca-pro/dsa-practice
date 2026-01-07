/**
 * CLASSIC DP PROBLEMS
 */

// Longest palindromic substring
function longestPalindrome(s) {
    const n = s.length;
    let start = 0, maxLen = 1;
    
    const expand = (l, r) => {
        while (l >= 0 && r < n && s[l] === s[r]) { l--; r++; }
        return r - l - 1;
    };
    
    for (let i = 0; i < n; i++) {
        const len = Math.max(expand(i, i), expand(i, i + 1));
        if (len > maxLen) { maxLen = len; start = i - Math.floor((len - 1) / 2); }
    }
    return s.slice(start, start + maxLen);
}

// Maximum product subarray
function maxProduct(nums) {
    let maxProd = nums[0], minProd = nums[0], result = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        const temp = maxProd;
        maxProd = Math.max(nums[i], maxProd * nums[i], minProd * nums[i]);
        minProd = Math.min(nums[i], temp * nums[i], minProd * nums[i]);
        result = Math.max(result, maxProd);
    }
    return result;
}

// Word break
function wordBreak(s, wordDict) {
    const words = new Set(wordDict);
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true;
    
    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && words.has(s.slice(j, i))) { dp[i] = true; break; }
        }
    }
    return dp[s.length];
}

// Decode ways
function numDecodings(s) {
    if (s[0] === '0') return 0;
    const n = s.length;
    let prev = 1, curr = 1;
    
    for (let i = 1; i < n; i++) {
        let temp = 0;
        if (s[i] !== '0') temp = curr;
        const two = parseInt(s.slice(i-1, i+1));
        if (two >= 10 && two <= 26) temp += prev;
        [prev, curr] = [curr, temp];
    }
    return curr;
}

// Longest increasing subsequence (O(n log n))
function lengthOfLIS(nums) {
    const tails = [];
    for (const num of nums) {
        let l = 0, r = tails.length;
        while (l < r) {
            const m = Math.floor((l + r) / 2);
            if (tails[m] < num) l = m + 1;
            else r = m;
        }
        tails[l] = num;
    }
    return tails.length;
}

// Maximal square
function maximalSquare(matrix) {
    if (!matrix.length) return 0;
    const m = matrix.length, n = matrix[0].length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    let maxSide = 0;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (matrix[i-1][j-1] === '1') {
                dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
                maxSide = Math.max(maxSide, dp[i][j]);
            }
        }
    }
    return maxSide * maxSide;
}

module.exports = { longestPalindrome, maxProduct, wordBreak, numDecodings, lengthOfLIS, maximalSquare };
