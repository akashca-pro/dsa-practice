/**
 * SLIDING WINDOW TECHNIQUE
 */

// Fixed window - max sum of size k
function maxSumSubarray(arr, k) {
    let windowSum = 0, maxSum = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        windowSum += arr[i];
        if (i >= k - 1) {
            maxSum = Math.max(maxSum, windowSum);
            windowSum -= arr[i - k + 1];
        }
    }
    return maxSum;
}

// Variable window - minimum size subarray sum
function minSubArrayLen(target, nums) {
    let minLen = Infinity, sum = 0, left = 0;
    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];
        while (sum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            sum -= nums[left++];
        }
    }
    return minLen === Infinity ? 0 : minLen;
}

// Longest substring without repeating
function lengthOfLongestSubstring(s) {
    const seen = new Map();
    let maxLen = 0, left = 0;
    for (let right = 0; right < s.length; right++) {
        if (seen.has(s[right]) && seen.get(s[right]) >= left) {
            left = seen.get(s[right]) + 1;
        }
        seen.set(s[right], right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}

// Longest repeating character replacement
function characterReplacement(s, k) {
    const count = new Array(26).fill(0);
    let maxCount = 0, maxLen = 0, left = 0;
    
    for (let right = 0; right < s.length; right++) {
        count[s.charCodeAt(right) - 65]++;
        maxCount = Math.max(maxCount, count[s.charCodeAt(right) - 65]);
        
        while (right - left + 1 - maxCount > k) {
            count[s.charCodeAt(left) - 65]--;
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}

// Minimum window substring
function minWindow(s, t) {
    const need = new Map();
    for (const c of t) need.set(c, (need.get(c) || 0) + 1);
    
    let have = 0, required = need.size;
    let left = 0, minLen = Infinity, result = '';
    const window = new Map();
    
    for (let right = 0; right < s.length; right++) {
        const c = s[right];
        window.set(c, (window.get(c) || 0) + 1);
        if (need.has(c) && window.get(c) === need.get(c)) have++;
        
        while (have === required) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                result = s.slice(left, right + 1);
            }
            const lc = s[left];
            window.set(lc, window.get(lc) - 1);
            if (need.has(lc) && window.get(lc) < need.get(lc)) have--;
            left++;
        }
    }
    return result;
}

module.exports = { maxSumSubarray, minSubArrayLen, lengthOfLongestSubstring, characterReplacement, minWindow };
