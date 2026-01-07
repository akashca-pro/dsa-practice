/**
 * ============================================
 * ARRAY PROBLEMS - Classic Interview Questions
 * ============================================
 * 
 * CONCEPT:
 * This file contains classic array problems frequently asked in coding
 * interviews. Each problem demonstrates important algorithmic techniques
 * and patterns that transfer to many other problems.
 * 
 * INDUSTRY APPLICATIONS:
 * - Stock trading algorithms (buy/sell problems)
 * - Game development (grid traversal)
 * - Data analysis (frequency problems)
 * - System design (sliding window for rate limiting)
 */

// ============================================
// 1. TWO SUM VARIANTS
// ============================================

/**
 * Two Sum - Find two numbers that add to target
 * Classic hash map approach
 */
function twoSum(nums, target) {
    const seen = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        
        seen.set(nums[i], i);
    }
    
    return [];
    // O(n) time, O(n) space
}

/**
 * Two Sum II - Input Array is Sorted
 * Two pointer approach
 */
function twoSumSorted(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;
    
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
    // O(n) time, O(1) space
}

/**
 * Three Sum - Find all unique triplets that sum to zero
 */
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicates
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                
                // Skip duplicates
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
    // O(n²) time, O(log n) to O(n) space for sorting
}

/**
 * Four Sum - Find all unique quadruplets that sum to target
 */
function fourSum(nums, target) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        for (let j = i + 1; j < nums.length - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;
            
            let left = j + 1;
            let right = nums.length - 1;
            
            while (left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];
                
                if (sum === target) {
                    result.push([nums[i], nums[j], nums[left], nums[right]]);
                    
                    while (left < right && nums[left] === nums[left + 1]) left++;
                    while (left < right && nums[right] === nums[right - 1]) right--;
                    
                    left++;
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }
    
    return result;
    // O(n³) time
}

// ============================================
// 2. SLIDING WINDOW PROBLEMS
// ============================================

/**
 * Maximum Sum Subarray of Size K
 * Fixed-size sliding window
 */
function maxSumSubarray(arr, k) {
    if (arr.length < k) return null;
    
    let maxSum = 0;
    let windowSum = 0;
    
    // Calculate sum of first window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // Slide the window
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum + arr[i] - arr[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
    // O(n) time, O(1) space
}

/**
 * Minimum Size Subarray Sum
 * Variable-size sliding window
 */
function minSubArrayLen(target, nums) {
    let minLen = Infinity;
    let left = 0;
    let sum = 0;
    
    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];
        
        while (sum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }
    
    return minLen === Infinity ? 0 : minLen;
    // O(n) time, O(1) space
}

/**
 * Maximum of All Subarrays of Size K
 * Using deque (monotonic decreasing)
 */
function maxSlidingWindow(nums, k) {
    const result = [];
    const deque = []; // Store indices
    
    for (let i = 0; i < nums.length; i++) {
        // Remove indices outside current window
        while (deque.length && deque[0] < i - k + 1) {
            deque.shift();
        }
        
        // Remove smaller elements (they'll never be max)
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        
        deque.push(i);
        
        // Window is complete, add max to result
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    
    return result;
    // O(n) time, O(k) space
}

// ============================================
// 3. SUBARRAY PROBLEMS
// ============================================

/**
 * Maximum Subarray (Kadane's Algorithm)
 * Find contiguous subarray with largest sum
 */
function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        // Either extend current subarray or start fresh
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
    // O(n) time, O(1) space
}

/**
 * Maximum Subarray with Indices
 */
function maxSubArrayWithIndices(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    let start = 0, end = 0, tempStart = 0;
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > currentSum + nums[i]) {
            currentSum = nums[i];
            tempStart = i;
        } else {
            currentSum = currentSum + nums[i];
        }
        
        if (currentSum > maxSum) {
            maxSum = currentSum;
            start = tempStart;
            end = i;
        }
    }
    
    return { sum: maxSum, start, end, subarray: nums.slice(start, end + 1) };
}

/**
 * Subarray Sum Equals K
 * Count subarrays with sum equal to k
 */
function subarraySum(nums, k) {
    const prefixSumCount = new Map([[0, 1]]);
    let currentSum = 0;
    let count = 0;
    
    for (const num of nums) {
        currentSum += num;
        
        // If currentSum - k exists, we found a subarray
        if (prefixSumCount.has(currentSum - k)) {
            count += prefixSumCount.get(currentSum - k);
        }
        
        prefixSumCount.set(currentSum, (prefixSumCount.get(currentSum) || 0) + 1);
    }
    
    return count;
    // O(n) time, O(n) space
}

// ============================================
// 4. STOCK PROBLEMS
// ============================================

/**
 * Best Time to Buy and Sell Stock
 * Single transaction
 */
function maxProfit(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    
    for (const price of prices) {
        if (price < minPrice) {
            minPrice = price;
        } else {
            maxProfit = Math.max(maxProfit, price - minPrice);
        }
    }
    
    return maxProfit;
    // O(n) time, O(1) space
}

/**
 * Best Time to Buy and Sell Stock II
 * Multiple transactions allowed
 */
function maxProfitII(prices) {
    let profit = 0;
    
    for (let i = 1; i < prices.length; i++) {
        // Collect all upward moves
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1];
        }
    }
    
    return profit;
    // O(n) time, O(1) space
}

/**
 * Best Time to Buy and Sell Stock with Cooldown
 * After selling, must wait one day before buying
 */
function maxProfitWithCooldown(prices) {
    if (prices.length < 2) return 0;
    
    let sell = 0;      // Max profit ending with sell
    let hold = -prices[0]; // Max profit ending with hold
    let cooldown = 0;  // Max profit in cooldown
    
    for (let i = 1; i < prices.length; i++) {
        const prevSell = sell;
        sell = hold + prices[i];
        hold = Math.max(hold, cooldown - prices[i]);
        cooldown = Math.max(cooldown, prevSell);
    }
    
    return Math.max(sell, cooldown);
    // O(n) time, O(1) space
}

// ============================================
// 5. INTERVAL PROBLEMS
// ============================================

/**
 * Merge Intervals
 */
function mergeIntervals(intervals) {
    if (intervals.length <= 1) return intervals;
    
    // Sort by start time
    intervals.sort((a, b) => a[0] - b[0]);
    
    const result = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {
        const last = result[result.length - 1];
        const current = intervals[i];
        
        if (current[0] <= last[1]) {
            // Overlapping - merge
            last[1] = Math.max(last[1], current[1]);
        } else {
            // Non-overlapping - add new interval
            result.push(current);
        }
    }
    
    return result;
    // O(n log n) time, O(n) space
}

/**
 * Insert Interval
 */
function insertInterval(intervals, newInterval) {
    const result = [];
    let i = 0;
    
    // Add all intervals before newInterval
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }
    
    // Merge overlapping intervals
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push(newInterval);
    
    // Add remaining intervals
    while (i < intervals.length) {
        result.push(intervals[i]);
        i++;
    }
    
    return result;
    // O(n) time, O(n) space
}

/**
 * Non-overlapping Intervals
 * Minimum intervals to remove for non-overlapping
 */
function eraseOverlapIntervals(intervals) {
    if (intervals.length === 0) return 0;
    
    // Sort by end time (greedy approach)
    intervals.sort((a, b) => a[1] - b[1]);
    
    let count = 0;
    let prevEnd = intervals[0][1];
    
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < prevEnd) {
            // Overlapping - remove current (has later end)
            count++;
        } else {
            prevEnd = intervals[i][1];
        }
    }
    
    return count;
    // O(n log n) time
}

// ============================================
// 6. MATRIX PROBLEMS
// ============================================

/**
 * Rotate Matrix 90° Clockwise
 */
function rotateMatrix(matrix) {
    const n = matrix.length;
    
    // Transpose
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    
    // Reverse each row
    for (const row of matrix) {
        row.reverse();
    }
    
    return matrix;
    // O(n²) time, O(1) space
}

/**
 * Set Matrix Zeroes
 * If element is 0, set entire row and column to 0
 */
function setZeroes(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    let firstRowZero = false;
    let firstColZero = false;
    
    // Check if first row/col should be zeroed
    for (let i = 0; i < m; i++) {
        if (matrix[i][0] === 0) firstColZero = true;
    }
    for (let j = 0; j < n; j++) {
        if (matrix[0][j] === 0) firstRowZero = true;
    }
    
    // Use first row/col as markers
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
    
    // Handle first row/col
    if (firstColZero) {
        for (let i = 0; i < m; i++) matrix[i][0] = 0;
    }
    if (firstRowZero) {
        for (let j = 0; j < n; j++) matrix[0][j] = 0;
    }
    
    return matrix;
    // O(mn) time, O(1) space
}

/**
 * Search in Sorted Matrix
 * Each row and column is sorted
 */
function searchMatrix(matrix, target) {
    if (!matrix.length) return false;
    
    let row = 0;
    let col = matrix[0].length - 1;
    
    while (row < matrix.length && col >= 0) {
        if (matrix[row][col] === target) {
            return true;
        } else if (matrix[row][col] > target) {
            col--;
        } else {
            row++;
        }
    }
    
    return false;
    // O(m + n) time, O(1) space
}

// ============================================
// 7. MISCELLANEOUS PROBLEMS
// ============================================

/**
 * Container With Most Water
 */
function maxArea(heights) {
    let left = 0;
    let right = heights.length - 1;
    let maxArea = 0;
    
    while (left < right) {
        const width = right - left;
        const height = Math.min(heights[left], heights[right]);
        maxArea = Math.max(maxArea, width * height);
        
        // Move pointer with smaller height
        if (heights[left] < heights[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxArea;
    // O(n) time, O(1) space
}

/**
 * Next Permutation
 * Rearrange to lexicographically next greater permutation
 */
function nextPermutation(nums) {
    let i = nums.length - 2;
    
    // Find first decreasing element from right
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }
    
    if (i >= 0) {
        // Find smallest element greater than nums[i] from right
        let j = nums.length - 1;
        while (nums[j] <= nums[i]) {
            j--;
        }
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    
    // Reverse the right part
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++;
        right--;
    }
    
    return nums;
    // O(n) time, O(1) space
}

/**
 * First Missing Positive
 * Find smallest missing positive integer
 */
function firstMissingPositive(nums) {
    const n = nums.length;
    
    // Place each number in its correct position
    for (let i = 0; i < n; i++) {
        while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
            const correctIdx = nums[i] - 1;
            [nums[i], nums[correctIdx]] = [nums[correctIdx], nums[i]];
        }
    }
    
    // Find first position where nums[i] != i + 1
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) {
            return i + 1;
        }
    }
    
    return n + 1;
    // O(n) time, O(1) space
}

/**
 * Majority Element
 * Find element appearing more than n/2 times
 * Boyer-Moore Voting Algorithm
 */
function majorityElement(nums) {
    let candidate = nums[0];
    let count = 1;
    
    for (let i = 1; i < nums.length; i++) {
        if (count === 0) {
            candidate = nums[i];
            count = 1;
        } else if (nums[i] === candidate) {
            count++;
        } else {
            count--;
        }
    }
    
    return candidate;
    // O(n) time, O(1) space
}

module.exports = {
    twoSum,
    twoSumSorted,
    threeSum,
    fourSum,
    maxSumSubarray,
    minSubArrayLen,
    maxSlidingWindow,
    maxSubArray,
    maxSubArrayWithIndices,
    subarraySum,
    maxProfit,
    maxProfitII,
    maxProfitWithCooldown,
    mergeIntervals,
    insertInterval,
    eraseOverlapIntervals,
    rotateMatrix,
    setZeroes,
    searchMatrix,
    maxArea,
    nextPermutation,
    firstMissingPositive,
    majorityElement
};
