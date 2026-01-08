/**
 * ============================================
 * ARRAY & STRING PROBLEMS - COMPREHENSIVE GUIDE
 * ============================================
 * 
 * LEARNING ORDER:
 * 1. Two Pointers
 * 2. Sliding Window
 * 3. Prefix Sum
 * 4. String Problems
 * 5. Matrix Problems
 */

// ============================================
// CATEGORY 1: TWO POINTERS
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - Finding pairs in data
 * - Merging sorted data
 * - DNA sequence analysis
 * 
 * TYPES:
 * - Opposite ends (left, right)
 * - Same direction (fast, slow)
 * - Two arrays
 */

// ------------------------------------------
// 1.1 TWO SUM II (SORTED ARRAY)
// ------------------------------------------

/**
 * Problem: Find two numbers that sum to target
 */
function twoSumSorted(numbers, target) {
    let left = 0, right = numbers.length - 1;
    
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        
        if (sum === target) {
            return [left + 1, right + 1]; // 1-indexed
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return [];
}

// ------------------------------------------
// 1.2 THREE SUM
// ------------------------------------------

/**
 * Problem: Find all unique triplets with sum = 0
 */
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue; // Skip duplicates
        
        let left = i + 1, right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    
    return result;
}

/**
 * RELATED QUESTIONS:
 * - Two Sum II (LeetCode 167)
 * - 3Sum (LeetCode 15)
 * - 4Sum (LeetCode 18)
 * - 3Sum Closest (LeetCode 16)
 */

// ------------------------------------------
// 1.3 CONTAINER WITH MOST WATER
// ------------------------------------------

/**
 * Problem: Maximum water between two lines
 */
function maxArea(height) {
    let left = 0, right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const water = Math.min(height[left], height[right]) * (right - left);
        maxWater = Math.max(maxWater, water);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}

// ------------------------------------------
// 1.4 REMOVE DUPLICATES FROM SORTED ARRAY
// ------------------------------------------

function removeDuplicates(nums) {
    if (nums.length === 0) return 0;
    
    let slow = 0;
    
    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    
    return slow + 1;
}

// ============================================
// CATEGORY 2: SLIDING WINDOW
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - Network packet analysis
 * - Stock price moving average
 * - Stream processing
 * 
 * TYPES:
 * - Fixed window (size k)
 * - Variable window (condition-based)
 */

// ------------------------------------------
// 2.1 MAXIMUM SUM SUBARRAY OF SIZE K
// ------------------------------------------

function maxSubarraySum(arr, k) {
    let windowSum = 0;
    let maxSum = 0;
    
    for (let i = 0; i < arr.length; i++) {
        windowSum += arr[i];
        
        if (i >= k - 1) {
            maxSum = Math.max(maxSum, windowSum);
            windowSum -= arr[i - k + 1];
        }
    }
    
    return maxSum;
}

// ------------------------------------------
// 2.2 LONGEST SUBSTRING WITHOUT REPEATING
// ------------------------------------------

/**
 * Problem: Length of longest substring without repeating chars
 */
function lengthOfLongestSubstring(s) {
    const charIndex = new Map();
    let maxLen = 0;
    let start = 0;
    
    for (let end = 0; end < s.length; end++) {
        if (charIndex.has(s[end]) && charIndex.get(s[end]) >= start) {
            start = charIndex.get(s[end]) + 1;
        }
        
        charIndex.set(s[end], end);
        maxLen = Math.max(maxLen, end - start + 1);
    }
    
    return maxLen;
}

/**
 * RELATED QUESTIONS:
 * - Longest Substring Without Repeating (LeetCode 3)
 * - Minimum Window Substring (LeetCode 76)
 * - Longest Repeating Character Replacement (LeetCode 424)
 */

// ------------------------------------------
// 2.3 MINIMUM WINDOW SUBSTRING
// ------------------------------------------

/**
 * Problem: Smallest window containing all chars of pattern
 */
function minWindow(s, t) {
    const need = new Map();
    for (const char of t) {
        need.set(char, (need.get(char) || 0) + 1);
    }
    
    let have = 0;
    const required = need.size;
    let result = '';
    let minLen = Infinity;
    let left = 0;
    const window = new Map();
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        window.set(char, (window.get(char) || 0) + 1);
        
        if (need.has(char) && window.get(char) === need.get(char)) {
            have++;
        }
        
        while (have === required) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                result = s.slice(left, right + 1);
            }
            
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
// CATEGORY 3: PREFIX SUM
// ============================================

/**
 * Precompute cumulative sums for O(1) range queries
 */

// ------------------------------------------
// 3.1 SUBARRAY SUM EQUALS K
// ------------------------------------------

function subarraySum(nums, k) {
    const prefixCount = new Map([[0, 1]]);
    let sum = 0;
    let count = 0;
    
    for (const num of nums) {
        sum += num;
        
        if (prefixCount.has(sum - k)) {
            count += prefixCount.get(sum - k);
        }
        
        prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
    }
    
    return count;
}

// ------------------------------------------
// 3.2 PRODUCT OF ARRAY EXCEPT SELF
// ------------------------------------------

function productExceptSelf(nums) {
    const n = nums.length;
    const result = new Array(n).fill(1);
    
    // Left products
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        result[i] = leftProduct;
        leftProduct *= nums[i];
    }
    
    // Right products
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    
    return result;
}

/**
 * RELATED QUESTIONS:
 * - Subarray Sum Equals K (LeetCode 560)
 * - Product of Array Except Self (LeetCode 238)
 * - Range Sum Query (LeetCode 303)
 */

// ============================================
// CATEGORY 4: STRING PROBLEMS
// ============================================

// ------------------------------------------
// 4.1 VALID PALINDROME
// ------------------------------------------

function isPalindrome(s) {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    let left = 0, right = s.length - 1;
    
    while (left < right) {
        if (s[left] !== s[right]) return false;
        left++;
        right--;
    }
    
    return true;
}

// ------------------------------------------
// 4.2 LONGEST PALINDROMIC SUBSTRING
// ------------------------------------------

function longestPalindrome(s) {
    let start = 0, maxLen = 1;
    
    const expand = (left, right) => {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            if (right - left + 1 > maxLen) {
                start = left;
                maxLen = right - left + 1;
            }
            left--;
            right++;
        }
    };
    
    for (let i = 0; i < s.length; i++) {
        expand(i, i);     // Odd length
        expand(i, i + 1); // Even length
    }
    
    return s.substring(start, start + maxLen);
}

// ------------------------------------------
// 4.3 STRING COMPRESSION
// ------------------------------------------

function compress(chars) {
    let write = 0;
    let read = 0;
    
    while (read < chars.length) {
        const char = chars[read];
        let count = 0;
        
        while (read < chars.length && chars[read] === char) {
            read++;
            count++;
        }
        
        chars[write++] = char;
        
        if (count > 1) {
            for (const digit of String(count)) {
                chars[write++] = digit;
            }
        }
    }
    
    return write;
}

/**
 * RELATED QUESTIONS:
 * - Valid Palindrome (LeetCode 125)
 * - Longest Palindromic Substring (LeetCode 5)
 * - String Compression (LeetCode 443)
 * - Reverse Words in a String (LeetCode 151)
 */

// ============================================
// CATEGORY 5: MATRIX PROBLEMS
// ============================================

// ------------------------------------------
// 5.1 ROTATE IMAGE
// ------------------------------------------

function rotate(matrix) {
    const n = matrix.length;
    
    // Transpose
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    
    // Reverse each row
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
}

// ------------------------------------------
// 5.2 SPIRAL MATRIX
// ------------------------------------------

function spiralOrder(matrix) {
    const result = [];
    if (!matrix.length) return result;
    
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = matrix[0].length - 1;
    
    while (top <= bottom && left <= right) {
        // Right
        for (let i = left; i <= right; i++) {
            result.push(matrix[top][i]);
        }
        top++;
        
        // Down
        for (let i = top; i <= bottom; i++) {
            result.push(matrix[i][right]);
        }
        right--;
        
        // Left
        if (top <= bottom) {
            for (let i = right; i >= left; i--) {
                result.push(matrix[bottom][i]);
            }
            bottom--;
        }
        
        // Up
        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                result.push(matrix[i][left]);
            }
            left++;
        }
    }
    
    return result;
}

// ------------------------------------------
// 5.3 SET MATRIX ZEROES
// ------------------------------------------

function setZeroes(matrix) {
    const m = matrix.length, n = matrix[0].length;
    let firstRowZero = false, firstColZero = false;
    
    // Check first row and column
    for (let j = 0; j < n; j++) {
        if (matrix[0][j] === 0) firstRowZero = true;
    }
    for (let i = 0; i < m; i++) {
        if (matrix[i][0] === 0) firstColZero = true;
    }
    
    // Use first row and column as markers
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    
    // Set zeros based on markers
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }
    
    // Handle first row and column
    if (firstRowZero) {
        for (let j = 0; j < n; j++) matrix[0][j] = 0;
    }
    if (firstColZero) {
        for (let i = 0; i < m; i++) matrix[i][0] = 0;
    }
}

/**
 * RELATED QUESTIONS:
 * - Rotate Image (LeetCode 48)
 * - Spiral Matrix (LeetCode 54)
 * - Set Matrix Zeroes (LeetCode 73)
 * - Search a 2D Matrix (LeetCode 74)
 */

// ============================================
// SUMMARY
// ============================================

/**
 * ARRAY & STRING CHEAT SHEET:
 * 
 * TWO POINTERS:
 * - Sorted array with target sum
 * - Remove duplicates in-place
 * - Container with most water
 * 
 * SLIDING WINDOW:
 * - Fixed: Sum of size k
 * - Variable: Expand/shrink based on condition
 * 
 * PREFIX SUM:
 * - Range sum queries
 * - Subarray with target sum
 * 
 * STRING:
 * - Palindrome: Two pointers from ends
 * - Anagram: Character count comparison
 * 
 * MATRIX:
 * - Rotate: Transpose + Reverse
 * - Spiral: Track boundaries
 * 
 * INTERVIEW TIP:
 * Always clarify if array is sorted!
 * Sorted → Two pointers
 * Unsorted → Hash map
 */

module.exports = {
    twoSumSorted,
    threeSum,
    maxArea,
    removeDuplicates,
    maxSubarraySum,
    lengthOfLongestSubstring,
    minWindow,
    subarraySum,
    productExceptSelf,
    isPalindrome,
    longestPalindrome,
    compress,
    rotate,
    spiralOrder,
    setZeroes
};
