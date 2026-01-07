/**
 * ============================================
 * SLIDING WINDOW TECHNIQUE
 * ============================================
 * 
 * CONCEPT:
 * Sliding window is a technique for problems involving contiguous
 * subarrays/substrings. Instead of recalculating from scratch,
 * we "slide" a window and update our result incrementally.
 * 
 * Key insight: When window slides by 1:
 * - Add the new element that entered
 * - Remove the old element that left
 * - Update result
 * 
 * TWO TYPES:
 * 1. FIXED SIZE: Window size is constant (e.g., max sum of k elements)
 * 2. VARIABLE SIZE: Window expands/shrinks based on condition
 * 
 * REAL-WORLD ANALOGY:
 * Like a magnifying glass sliding over text:
 * - You can only see what's under the glass (window)
 * - As you slide, you see new text and lose old text
 * - You track what you're looking for as you slide
 * 
 * INDUSTRY APPLICATIONS:
 * - Network packet analysis (rolling statistics)
 * - Stock price analysis (moving averages)
 * - Stream processing (real-time analytics)
 * - String pattern matching
 * - Rate limiting
 * 
 * COMPLEXITY:
 * - Time: O(n) - each element enters and exits window once
 * - Space: O(1) for fixed window, O(k) for tracking characters/elements
 */

// ============================================
// 1. FIXED SIZE WINDOW
// ============================================

/**
 * Maximum Sum of Subarray of Size K
 * 
 * Pattern: Fixed window, sliding sum
 * 
 * Instead of recalculating sum for each window:
 * newSum = oldSum - exit element + enter element
 */
function maxSumSubarray(arr, k) {
    // Build first window
    let windowSum = 0;
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    
    let maxSum = windowSum;
    
    // Slide window
    for (let i = k; i < arr.length; i++) {
        windowSum += arr[i];      // Add new element
        windowSum -= arr[i - k];  // Remove old element
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}

/**
 * Maximum of Each Subarray of Size K
 * Uses deque for O(n) total time
 */
function maxSlidingWindow(nums, k) {
    const result = [];
    const deque = []; // Store indices, maintain decreasing order
    
    for (let i = 0; i < nums.length; i++) {
        // Remove indices outside current window
        while (deque.length && deque[0] <= i - k) {
            deque.shift();
        }
        
        // Remove smaller elements (they can never be max)
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        
        deque.push(i);
        
        // Window is fully formed
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    
    return result;
}

// ============================================
// 2. VARIABLE SIZE WINDOW - SHRINKING
// ============================================

/**
 * Minimum Size Subarray Sum
 * 
 * Pattern: Expand to meet condition, shrink to optimize
 * 
 * "Find SMALLEST window that satisfies condition"
 * - Expand: Add elements until condition met
 * - Shrink: Remove elements while condition still met
 */
function minSubArrayLen(target, nums) {
    let minLen = Infinity;
    let sum = 0;
    let left = 0;
    
    for (let right = 0; right < nums.length; right++) {
        sum += nums[right]; // Expand window
        
        // Shrink while condition is met
        while (sum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            sum -= nums[left];
            left++; // Shrink from left
        }
    }
    
    return minLen === Infinity ? 0 : minLen;
}

// ============================================
// 3. VARIABLE SIZE WINDOW - EXPANDING
// ============================================

/**
 * Longest Substring Without Repeating Characters
 * 
 * Pattern: Expand to grow result, shrink when invalid
 * 
 * "Find LARGEST window that satisfies condition"
 * - Expand: Always add new character
 * - Shrink: Only when condition violated (duplicate found)
 */
function lengthOfLongestSubstring(s) {
    const seen = new Map(); // char → last index
    let maxLen = 0;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        
        // If char seen and within current window
        if (seen.has(char) && seen.get(char) >= left) {
            left = seen.get(char) + 1; // Jump left past duplicate
        }
        
        seen.set(char, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}

/**
 * Longest Substring with At Most K Distinct Characters
 */
function lengthOfLongestSubstringKDistinct(s, k) {
    const charCount = new Map();
    let maxLen = 0;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        charCount.set(char, (charCount.get(char) || 0) + 1);
        
        // Shrink while too many distinct characters
        while (charCount.size > k) {
            const leftChar = s[left];
            charCount.set(leftChar, charCount.get(leftChar) - 1);
            if (charCount.get(leftChar) === 0) {
                charCount.delete(leftChar);
            }
            left++;
        }
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}

// ============================================
// 4. SUBSTRING WITH REPLACEMENT
// ============================================

/**
 * Longest Repeating Character Replacement
 * 
 * Can replace at most k characters
 * Find longest substring with all same chars after replacement
 * 
 * Key insight:
 * Window is valid if: windowSize - maxCount <= k
 * (We need to replace windowSize - maxCount characters)
 */
function characterReplacement(s, k) {
    const count = new Array(26).fill(0);
    let maxCount = 0; // Count of most frequent char in window
    let maxLen = 0;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        const charIdx = s.charCodeAt(right) - 65;
        count[charIdx]++;
        maxCount = Math.max(maxCount, count[charIdx]);
        
        // Window is invalid: too many chars to replace
        while (right - left + 1 - maxCount > k) {
            count[s.charCodeAt(left) - 65]--;
            left++;
        }
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}

// ============================================
// 5. MINIMUM WINDOW SUBSTRING
// ============================================

/**
 * Find minimum window in s that contains all chars of t
 * 
 * Pattern: Expand to include all, shrink to minimize
 * 
 * Track:
 * - need: what we need from t
 * - have: what we have in current window
 */
function minWindow(s, t) {
    if (!s || !t || s.length < t.length) return '';
    
    // Build frequency map of what we need
    const need = new Map();
    for (const c of t) {
        need.set(c, (need.get(c) || 0) + 1);
    }
    
    let have = 0;               // Number of unique chars we have enough of
    const required = need.size; // Number of unique chars we need
    let left = 0;
    let minLen = Infinity;
    let result = '';
    const window = new Map();
    
    for (let right = 0; right < s.length; right++) {
        const c = s[right];
        window.set(c, (window.get(c) || 0) + 1);
        
        // Check if this char satisfies a requirement
        if (need.has(c) && window.get(c) === need.get(c)) {
            have++;
        }
        
        // Try to shrink window
        while (have === required) {
            // Update result if smaller
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                result = s.slice(left, right + 1);
            }
            
            // Remove left char
            const leftChar = s[left];
            window.set(leftChar, window.get(leftChar) - 1);
            
            if (need.has(leftChar) && window.get(leftChar) < need.get(leftChar)) {
                have--;
            }
            
            left++;
        }
    }
    
    return result;
}

// ============================================
// 6. COMMON MISTAKES & EDGE CASES
// ============================================

/**
 * Mistake 1: Not handling empty input
 * 
 * Mistake 2: Off-by-one in window size
 * Window size = right - left + 1
 * 
 * Mistake 3: Forgetting to update left pointer
 * 
 * Edge Cases:
 * - Empty array/string
 * - k larger than array length
 * - All same elements
 * - No valid window exists
 */

// ============================================
// 7. INTERVIEW PERSPECTIVE
// ============================================

/**
 * WHEN TO USE SLIDING WINDOW:
 * 
 * Keywords in problem:
 * - "Contiguous subarray/substring"
 * - "Minimum/maximum length"
 * - "Within a window of size k"
 * - "Contains all characters"
 * 
 * FIXED WINDOW:
 * - Size is given
 * - max/min/average of every window
 * 
 * VARIABLE WINDOW (Shrinking):
 * - Find SMALLEST window satisfying condition
 * - Pattern: Expand until valid, shrink while valid
 * 
 * VARIABLE WINDOW (Expanding):
 * - Find LARGEST window satisfying condition
 * - Pattern: Expand always, shrink when invalid
 */

// ============================================
// 8. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Easy): Average of Subarrays of Size K
 */
function findAverages(arr, k) {
    const result = [];
    let windowSum = 0;
    
    for (let i = 0; i < arr.length; i++) {
        windowSum += arr[i];
        if (i >= k - 1) {
            result.push(windowSum / k);
            windowSum -= arr[i - k + 1];
        }
    }
    
    return result;
}

/**
 * Problem 2 (Medium): Fruits Into Baskets
 * (Max length subarray with at most 2 distinct)
 */
function totalFruit(tree) {
    const count = new Map();
    let maxFruit = 0;
    let left = 0;
    
    for (let right = 0; right < tree.length; right++) {
        count.set(tree[right], (count.get(tree[right]) || 0) + 1);
        
        while (count.size > 2) {
            count.set(tree[left], count.get(tree[left]) - 1);
            if (count.get(tree[left]) === 0) count.delete(tree[left]);
            left++;
        }
        
        maxFruit = Math.max(maxFruit, right - left + 1);
    }
    
    return maxFruit;
}

/**
 * Problem 3 (Hard): Substring with Concatenation of All Words
 */
function findSubstring(s, words) {
    if (!s || !words.length) return [];
    
    const wordLen = words[0].length;
    const totalLen = wordLen * words.length;
    const wordCount = new Map();
    
    for (const word of words) {
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }
    
    const result = [];
    
    for (let i = 0; i <= s.length - totalLen; i++) {
        const seen = new Map();
        let j = 0;
        
        while (j < words.length) {
            const word = s.slice(i + j * wordLen, i + (j + 1) * wordLen);
            
            if (!wordCount.has(word)) break;
            
            seen.set(word, (seen.get(word) || 0) + 1);
            
            if (seen.get(word) > wordCount.get(word)) break;
            
            j++;
        }
        
        if (j === words.length) result.push(i);
    }
    
    return result;
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * SLIDING WINDOW CHEAT SHEET:
 * 
 * FIXED SIZE WINDOW:
 * ```
 * for (i = 0; i < arr.length; i++) {
 *     windowSum += arr[i];
 *     if (i >= k - 1) {
 *         // process window
 *         windowSum -= arr[i - k + 1];
 *     }
 * }
 * ```
 * 
 * VARIABLE WINDOW (SMALLEST):
 * ```
 * for (right = 0; right < n; right++) {
 *     // expand: add arr[right]
 *     while (condition met) {
 *         // record/update answer
 *         // shrink: remove arr[left], left++
 *     }
 * }
 * ```
 * 
 * VARIABLE WINDOW (LARGEST):
 * ```
 * for (right = 0; right < n; right++) {
 *     // expand: add arr[right]
 *     while (condition violated) {
 *         // shrink: remove arr[left], left++
 *     }
 *     // record/update answer
 * }
 * ```
 * 
 * COMPLEXITY:
 * - Time: O(n) - each element enters/exits once
 * - Space: O(1) to O(k) depending on tracking needs
 * 
 * IDENTIFY BY KEYWORDS:
 * - "Contiguous subarray/substring"
 * - "Minimum/maximum window"
 * - "K distinct", "at most K"
 */

module.exports = { 
    maxSumSubarray, 
    maxSlidingWindow,
    minSubArrayLen, 
    lengthOfLongestSubstring, 
    lengthOfLongestSubstringKDistinct,
    characterReplacement, 
    minWindow,
    findAverages,
    totalFruit,
    findSubstring
};
