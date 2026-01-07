/**
 * ============================================
 * TWO POINTERS TECHNIQUE
 * ============================================
 * 
 * CONCEPT:
 * Two pointers is an algorithmic pattern where we use two indices
 * to traverse a data structure, often from opposite ends or at
 * different speeds, to solve problems efficiently.
 * 
 * TYPES OF TWO POINTERS:
 * 1. OPPOSITE ENDS: Start from both ends, move inward
 * 2. SAME DIRECTION: Fast and slow pointers
 * 3. SLIDING WINDOW: Left and right defining a range
 * 
 * REAL-WORLD ANALOGY:
 * Like two friends searching for each other in a line:
 * - One starts from the front, one from the back
 * - They move toward the middle based on what they see
 * - They meet when they find what they're looking for
 * 
 * INDUSTRY APPLICATIONS:
 * - Sorting algorithms (partitioning)
 * - Linked list cycle detection
 * - String palindrome checking
 * - Array deduplication
 * - Merging sorted sequences
 * 
 * COMPLEXITY:
 * - Time: Usually O(n) - each element visited once
 * - Space: O(1) - just two pointers
 */

// ============================================
// 1. OPPOSITE ENDS - PAIR SUM
// ============================================

/**
 * Two Sum in Sorted Array
 * 
 * Pattern: Start from both ends, move based on comparison
 * 
 * Key insight:
 * - Sum too small → move left pointer right (increase sum)
 * - Sum too big → move right pointer left (decrease sum)
 */
function twoSumSorted(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const sum = nums[left] + nums[right];
        
        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++;  // Need larger sum
        } else {
            right--; // Need smaller sum
        }
    }
    
    return []; // No pair found
}

// ============================================
// 2. THREE SUM
// ============================================

/**
 * Find all unique triplets that sum to zero
 * 
 * Pattern: Fix one element, use two pointers for remaining
 * 
 * Key insights:
 * - Sort array first
 * - Skip duplicates to avoid duplicate triplets
 * - For each element, find pair that sums to its negative
 */
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicates for first element
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1;
        let right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                
                // Skip duplicates for second element
                while (left < right && nums[left] === nums[left + 1]) left++;
                // Skip duplicates for third element
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

// ============================================
// 3. CONTAINER WITH MOST WATER
// ============================================

/**
 * Find two lines that form container with most water
 * 
 * Pattern: Opposite ends, move shorter line
 * 
 * Key insight: Moving the shorter line is the only way
 * to potentially find a larger area (width decreases,
 * need taller line to compensate)
 */
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        const area = width * minHeight;
        
        maxWater = Math.max(maxWater, area);
        
        // Move the shorter line (greedy choice)
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}

// ============================================
// 4. TRAPPING RAIN WATER
// ============================================

/**
 * Calculate how much water can be trapped after rain
 * 
 * Pattern: Two pointers with running max from each side
 * 
 * Key insight: Water at any position is:
 * min(maxLeft, maxRight) - height
 * 
 * Process from the side with smaller max (that's the bottleneck)
 */
function trap(height) {
    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            // Left side is the bottleneck
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            // Right side is the bottleneck
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    
    return water;
}

// ============================================
// 5. FAST & SLOW POINTERS
// ============================================

/**
 * Remove Duplicates from Sorted Array
 * 
 * Pattern: Slow pointer for unique elements, fast scans all
 * 
 * Slow points to last unique element
 * Fast finds next unique element
 */
function removeDuplicates(nums) {
    if (!nums.length) return 0;
    
    let slow = 0; // Points to last unique element
    
    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    
    return slow + 1; // Length of unique elements
}

/**
 * Move Zeros to End
 * Same pattern: slow tracks insert position
 */
function moveZeroes(nums) {
    let slow = 0;
    
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
            slow++;
        }
    }
}

// ============================================
// 6. DUTCH NATIONAL FLAG (3-WAY PARTITION)
// ============================================

/**
 * Sort Colors - Sort array with only 0s, 1s, and 2s
 * 
 * Pattern: Three pointers for three partitions
 * - low: boundary of 0s (left side)
 * - mid: current element being processed
 * - high: boundary of 2s (right side)
 */
function sortColors(nums) {
    let low = 0;      // Everything before low is 0
    let mid = 0;      // Current element
    let high = nums.length - 1; // Everything after high is 2
    
    while (mid <= high) {
        if (nums[mid] === 0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else { // nums[mid] === 2
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
            // Don't increment mid - need to check swapped element
        }
    }
}

// ============================================
// 7. COMMON MISTAKES & EDGE CASES
// ============================================

/**
 * Mistake 1: Infinite loop - forgetting to move pointers
 * 
 * Mistake 2: Off-by-one errors with < vs <=
 * 
 * Mistake 3: Not handling duplicates correctly
 * 
 * Edge Cases:
 * - Empty array
 * - Array with 1-2 elements
 * - All same elements
 * - Already sorted/reverse sorted
 */

// ============================================
// 8. INTERVIEW PERSPECTIVE
// ============================================

/**
 * WHEN TO USE TWO POINTERS:
 * 
 * 1. SORTED ARRAY: Find pair with sum/difference
 * 2. PALINDROME: Compare from both ends
 * 3. PARTITIONING: Dutch flag, quicksort partition
 * 4. IN-PLACE MODIFICATION: Remove duplicates, move zeros
 * 5. LINKED LIST: Cycle detection, find middle
 * 
 * PATTERN RECOGNITION:
 * - "Find pair/triplet with sum X" → Two pointers (sorted)
 * - "Remove/modify in-place" → Fast/slow pointers
 * - "Container/water/area" → Opposite ends
 */

// ============================================
// 9. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Easy): Valid Palindrome
 */
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

/**
 * Problem 2 (Medium): Four Sum
 */
function fourSum(nums, target) {
    nums.sort((a, b) => a - b);
    const result = [];
    
    for (let i = 0; i < nums.length - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        for (let j = i + 1; j < nums.length - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;
            
            let left = j + 1, right = nums.length - 1;
            
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
}

/**
 * Problem 3 (Medium): 3Sum Closest
 */
function threeSumClosest(nums, target) {
    nums.sort((a, b) => a - b);
    let closest = nums[0] + nums[1] + nums[2];
    
    for (let i = 0; i < nums.length - 2; i++) {
        let left = i + 1, right = nums.length - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (Math.abs(sum - target) < Math.abs(closest - target)) {
                closest = sum;
            }
            
            if (sum < target) left++;
            else if (sum > target) right--;
            else return sum;
        }
    }
    
    return closest;
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * TWO POINTERS CHEAT SHEET:
 * 
 * PATTERNS:
 * | Pattern         | Example                | Pointers  |
 * |-----------------|------------------------|-----------|
 * | Opposite ends   | Two sum sorted         | L→, ←R    |
 * | Fast/Slow       | Remove duplicates      | slow, fast|
 * | Three pointers  | Dutch flag             | lo, mid, hi|
 * 
 * COMMON PROBLEMS:
 * - Two/Three/Four Sum → Opposite ends on sorted
 * - Container with water → Move shorter line
 * - Trapping water → Track max from both sides
 * - Remove duplicates → Fast/slow in-place
 * 
 * COMPLEXITY:
 * - Time: O(n) for two pointers, O(n²) for nested
 * - Space: O(1) - just pointers
 * 
 * PREREQUISITES:
 * - Often requires SORTED array
 * - In-place modifications common
 * 
 * KEY INSIGHT:
 * Two pointers reduce O(n²) brute force to O(n)
 * by eliminating unnecessary comparisons
 */

module.exports = { 
    twoSumSorted, 
    threeSum, 
    maxArea, 
    trap, 
    removeDuplicates,
    moveZeroes,
    sortColors,
    isPalindrome,
    fourSum,
    threeSumClosest
};
