/**
 * ============================================
 * BINARY SEARCH
 * ============================================
 * 
 * CONCEPT:
 * Binary search is a divide-and-conquer algorithm that efficiently finds
 * a target in a SORTED array by repeatedly halving the search space.
 * 
 * REAL-WORLD ANALOGY:
 * Finding a word in a dictionary:
 * - Open to the middle
 * - If word comes before, search left half
 * - If word comes after, search right half
 * - Repeat until found
 * 
 * INDUSTRY APPLICATIONS:
 * - Database index lookups
 * - IP routing tables
 * - Version control (git bisect)
 * - Machine learning (hyperparameter tuning)
 * - Autocomplete suggestions
 * 
 * COMPLEXITY:
 * Time: O(log n) - halves search space each iteration
 * Space: O(1) iterative, O(log n) recursive
 */

// ============================================
// 1. BASIC BINARY SEARCH
// ============================================

/**
 * Iterative Binary Search
 * Find exact target in sorted array
 */
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        // Avoid integer overflow: (left + right) / 2 can overflow
        const mid = left + Math.floor((right - left) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

/**
 * Recursive Binary Search
 */
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    
    const mid = left + Math.floor((right - left) / 2);
    
    if (arr[mid] === target) return mid;
    
    if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    }
    return binarySearchRecursive(arr, target, left, mid - 1);
}

// ============================================
// 2. FINDING BOUNDS
// ============================================

/**
 * Find first occurrence (lower bound exact)
 * Returns leftmost index where arr[i] === target
 */
function findFirst(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (arr[mid] === target) {
            result = mid;
            right = mid - 1; // Continue searching left
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

/**
 * Find last occurrence (upper bound exact)
 * Returns rightmost index where arr[i] === target
 */
function findLast(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (arr[mid] === target) {
            result = mid;
            left = mid + 1; // Continue searching right
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

/**
 * Lower Bound (C++ style)
 * Returns first index where arr[i] >= target
 * If not found, returns array length (insertion point)
 */
function lowerBound(arr, target) {
    let left = 0;
    let right = arr.length;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

/**
 * Upper Bound (C++ style)
 * Returns first index where arr[i] > target
 */
function upperBound(arr, target) {
    let left = 0;
    let right = arr.length;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (arr[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

/**
 * Count occurrences of target
 */
function countOccurrences(arr, target) {
    const first = findFirst(arr, target);
    if (first === -1) return 0;
    
    const last = findLast(arr, target);
    return last - first + 1;
}

/**
 * Search range - find first and last occurrence
 */
function searchRange(arr, target) {
    return [findFirst(arr, target), findLast(arr, target)];
}

// ============================================
// 3. ROTATED ARRAY SEARCHES
// ============================================

/**
 * Search in Rotated Sorted Array (no duplicates)
 * [4,5,6,7,0,1,2] - rotated at index 4
 */
function searchRotated(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (arr[mid] === target) return mid;
        
        // Determine which half is sorted
        if (arr[left] <= arr[mid]) {
            // Left half is sorted
            if (arr[left] <= target && target < arr[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            if (arr[mid] < target && target <= arr[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}

/**
 * Search in Rotated Sorted Array (with duplicates)
 */
function searchRotatedWithDups(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (arr[mid] === target) return mid;
        
        // Handle duplicates
        if (arr[left] === arr[mid] && arr[mid] === arr[right]) {
            left++;
            right--;
        } else if (arr[left] <= arr[mid]) {
            if (arr[left] <= target && target < arr[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (arr[mid] < target && target <= arr[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    
    return -1;
}

/**
 * Find minimum in rotated sorted array
 */
function findMinRotated(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (arr[mid] > arr[right]) {
            // Minimum is in right half
            left = mid + 1;
        } else {
            // Minimum is in left half (including mid)
            right = mid;
        }
    }
    
    return arr[left];
}

/**
 * Find rotation count (number of times array was rotated)
 */
function findRotationCount(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    // Array is not rotated
    if (arr[left] <= arr[right]) return 0;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        
        // Check if mid is the pivot point
        if (mid < right && arr[mid] > arr[mid + 1]) {
            return mid + 1;
        }
        if (mid > left && arr[mid - 1] > arr[mid]) {
            return mid;
        }
        
        if (arr[left] <= arr[mid]) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return 0;
}

// ============================================
// 4. BINARY SEARCH ON ANSWER
// ============================================

/**
 * Square Root (integer)
 * Find largest x where x² <= n
 */
function sqrt(n) {
    if (n < 2) return n;
    
    let left = 1;
    let right = Math.floor(n / 2);
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        const square = mid * mid;
        
        if (square === n) return mid;
        if (square < n) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return right; // Largest x where x² < n
}

/**
 * Find Peak Element
 * Element greater than neighbors
 */
function findPeakElement(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (arr[mid] > arr[mid + 1]) {
            // Peak is in left half (including mid)
            right = mid;
        } else {
            // Peak is in right half
            left = mid + 1;
        }
    }
    
    return left;
}

/**
 * Find Minimum in Bitonic Array
 * Array first increases, then decreases
 * Return the maximum element
 */
function findBitonicMax(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (arr[mid] > arr[mid + 1]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return arr[left];
}

/**
 * Search in Bitonic Array
 */
function searchBitonic(arr, target) {
    // First find the peak
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] > arr[mid + 1]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    const peak = left;
    
    // Binary search in ascending part
    const leftResult = binarySearch(arr.slice(0, peak + 1), target);
    if (leftResult !== -1) return leftResult;
    
    // Binary search in descending part (reversed)
    const rightResult = binarySearchDescending(arr, target, peak + 1, arr.length - 1);
    if (rightResult !== -1) return rightResult;
    
    return -1;
}

function binarySearchDescending(arr, target, left, right) {
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (arr[mid] === target) return mid;
        if (arr[mid] > target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// ============================================
// 5. ADVANCED APPLICATIONS
// ============================================

/**
 * Find Kth Smallest Element in Sorted Matrix
 */
function kthSmallest(matrix, k) {
    const n = matrix.length;
    let left = matrix[0][0];
    let right = matrix[n-1][n-1];
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        const count = countLessOrEqual(matrix, mid);
        
        if (count < k) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

function countLessOrEqual(matrix, target) {
    let count = 0;
    let col = matrix.length - 1;
    
    for (let row = 0; row < matrix.length; row++) {
        while (col >= 0 && matrix[row][col] > target) {
            col--;
        }
        count += col + 1;
    }
    
    return count;
}

/**
 * Median of Two Sorted Arrays
 */
function findMedianSortedArrays(nums1, nums2) {
    // Ensure nums1 is smaller
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    
    const m = nums1.length;
    const n = nums2.length;
    let left = 0;
    let right = m;
    
    while (left <= right) {
        const partitionX = Math.floor((left + right) / 2);
        const partitionY = Math.floor((m + n + 1) / 2) - partitionX;
        
        const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
        const minRightX = partitionX === m ? Infinity : nums1[partitionX];
        
        const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
        const minRightY = partitionY === n ? Infinity : nums2[partitionY];
        
        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            if ((m + n) % 2 === 0) {
                return (Math.max(maxLeftX, maxLeftY) + 
                        Math.min(minRightX, minRightY)) / 2;
            } else {
                return Math.max(maxLeftX, maxLeftY);
            }
        } else if (maxLeftX > minRightY) {
            right = partitionX - 1;
        } else {
            left = partitionX + 1;
        }
    }
    
    return 0;
}

/**
 * Split Array Largest Sum
 * Split array into m subarrays to minimize the largest sum
 */
function splitArray(nums, m) {
    let left = Math.max(...nums);
    let right = nums.reduce((a, b) => a + b, 0);
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (canSplit(nums, m, mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}

function canSplit(nums, m, maxSum) {
    let count = 1;
    let currentSum = 0;
    
    for (const num of nums) {
        if (currentSum + num > maxSum) {
            count++;
            currentSum = num;
        } else {
            currentSum += num;
        }
    }
    
    return count <= m;
}

/**
 * Koko Eating Bananas
 * Minimum eating speed to finish all bananas in h hours
 */
function minEatingSpeed(piles, h) {
    let left = 1;
    let right = Math.max(...piles);
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        
        const hours = piles.reduce((total, pile) => 
            total + Math.ceil(pile / mid), 0);
        
        if (hours <= h) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}

// ============================================
// 6. COMMON MISTAKES
// ============================================

/**
 * Mistake 1: Integer overflow in mid calculation
 * Wrong: (left + right) / 2 - can overflow
 * Right: left + (right - left) / 2
 * 
 * Mistake 2: Infinite loop
 * Wrong: while (left < right) with right = mid - 1
 * Check loop invariants carefully
 * 
 * Mistake 3: Off-by-one errors
 * Test with arrays of size 0, 1, 2
 * Test with target at start, end, not present
 * 
 * Mistake 4: Forgetting array must be sorted
 */

// ============================================
// 7. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Easy): First Bad Version
 */
function firstBadVersion(n, isBadVersion) {
    let left = 1;
    let right = n;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (isBadVersion(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}

/**
 * Problem 2 (Medium): Find First and Last Position
 */
function searchRangeComplete(nums, target) {
    const findBound = (isFirst) => {
        let left = 0;
        let right = nums.length - 1;
        let result = -1;
        
        while (left <= right) {
            const mid = left + Math.floor((right - left) / 2);
            
            if (nums[mid] === target) {
                result = mid;
                if (isFirst) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    };
    
    return [findBound(true), findBound(false)];
}

/**
 * Problem 3 (Medium): Search Insert Position
 */
function searchInsert(nums, target) {
    let left = 0;
    let right = nums.length;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

/**
 * Problem 4 (Hard): Find in Mountain Array
 */
function findInMountainArray(target, mountainArr) {
    const length = mountainArr.length();
    
    // Find peak
    let left = 0;
    let right = length - 1;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (mountainArr.get(mid) < mountainArr.get(mid + 1)) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    const peak = left;
    
    // Search ascending part
    left = 0;
    right = peak;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        const val = mountainArr.get(mid);
        
        if (val === target) return mid;
        if (val < target) left = mid + 1;
        else right = mid - 1;
    }
    
    // Search descending part
    left = peak;
    right = length - 1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        const val = mountainArr.get(mid);
        
        if (val === target) return mid;
        if (val > target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
}

module.exports = {
    binarySearch,
    binarySearchRecursive,
    findFirst,
    findLast,
    lowerBound,
    upperBound,
    countOccurrences,
    searchRange,
    searchRotated,
    searchRotatedWithDups,
    findMinRotated,
    findRotationCount,
    sqrt,
    findPeakElement,
    findBitonicMax,
    searchBitonic,
    kthSmallest,
    findMedianSortedArrays,
    splitArray,
    minEatingSpeed,
    searchInsert
};
