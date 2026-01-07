/**
 * ============================================
 * LINEAR SEARCH
 * ============================================
 * 
 * CONCEPT:
 * Linear search is the simplest search algorithm that checks each element
 * sequentially until the target is found or the collection is exhausted.
 * Works on unsorted data.
 * 
 * REAL-WORLD ANALOGY:
 * Looking for a specific book by examining each book on a shelf
 * one by one from left to right until you find it.
 * 
 * INDUSTRY APPLICATIONS:
 * - Small datasets where sorting isn't worth it
 * - Finding in unsorted or frequently changing data
 * - When data structure doesn't support efficient search
 * - First pass in more complex algorithms
 * 
 * COMPLEXITY:
 * Time: O(n) - must check each element
 * Space: O(1) - constant extra space
 */

// ============================================
// 1. BASIC LINEAR SEARCH
// ============================================

/**
 * Basic linear search - find first occurrence
 */
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

/**
 * Linear search - find last occurrence
 */
function linearSearchLast(arr, target) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

/**
 * Linear search - find all occurrences
 */
function linearSearchAll(arr, target) {
    const indices = [];
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            indices.push(i);
        }
    }
    
    return indices;
}

// ============================================
// 2. OPTIMIZATIONS
// ============================================

/**
 * Sentinel Linear Search
 * Eliminates bounds checking in main loop
 * Slightly faster for large arrays
 */
function sentinelLinearSearch(arr, target) {
    const n = arr.length;
    if (n === 0) return -1;
    
    const last = arr[n - 1];
    arr[n - 1] = target; // Place sentinel
    
    let i = 0;
    while (arr[i] !== target) {
        i++;
    }
    
    arr[n - 1] = last; // Restore
    
    if (i < n - 1 || arr[n - 1] === target) {
        return i;
    }
    return -1;
}

/**
 * Two-way Linear Search
 * Search from both ends simultaneously
 * Better average case for random data
 */
function twoWayLinearSearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        if (arr[left] === target) return left;
        if (arr[right] === target) return right;
        left++;
        right--;
    }
    
    return -1;
}

/**
 * Move to Front (Self-organizing)
 * Move found elements to front for faster future access
 */
function moveToFrontSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            // Move to front
            const temp = arr[i];
            for (let j = i; j > 0; j--) {
                arr[j] = arr[j - 1];
            }
            arr[0] = temp;
            return 0;
        }
    }
    return -1;
}

/**
 * Transpose (Self-organizing)
 * Swap found element with previous (slower adaptation)
 */
function transposeSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            if (i > 0) {
                // Swap with previous
                [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
                return i - 1;
            }
            return i;
        }
    }
    return -1;
}

// ============================================
// 3. LINEAR SEARCH VARIATIONS
// ============================================

/**
 * Search for minimum element
 */
function findMinimum(arr) {
    if (arr.length === 0) return { value: null, index: -1 };
    
    let minVal = arr[0];
    let minIdx = 0;
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < minVal) {
            minVal = arr[i];
            minIdx = i;
        }
    }
    
    return { value: minVal, index: minIdx };
}

/**
 * Search for maximum element
 */
function findMaximum(arr) {
    if (arr.length === 0) return { value: null, index: -1 };
    
    let maxVal = arr[0];
    let maxIdx = 0;
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maxVal) {
            maxVal = arr[i];
            maxIdx = i;
        }
    }
    
    return { value: maxVal, index: maxIdx };
}

/**
 * Find min and max in single pass (1.5n comparisons)
 */
function findMinMax(arr) {
    if (arr.length === 0) return { min: null, max: null };
    if (arr.length === 1) return { min: arr[0], max: arr[0] };
    
    let min, max;
    let startIdx;
    
    // Initialize based on odd/even length
    if (arr.length % 2 === 0) {
        if (arr[0] < arr[1]) {
            min = arr[0];
            max = arr[1];
        } else {
            min = arr[1];
            max = arr[0];
        }
        startIdx = 2;
    } else {
        min = max = arr[0];
        startIdx = 1;
    }
    
    // Process pairs
    for (let i = startIdx; i < arr.length - 1; i += 2) {
        if (arr[i] < arr[i + 1]) {
            min = Math.min(min, arr[i]);
            max = Math.max(max, arr[i + 1]);
        } else {
            min = Math.min(min, arr[i + 1]);
            max = Math.max(max, arr[i]);
        }
    }
    
    return { min, max };
}

/**
 * Search with predicate function
 */
function findWhere(arr, predicate) {
    for (let i = 0; i < arr.length; i++) {
        if (predicate(arr[i], i, arr)) {
            return { value: arr[i], index: i };
        }
    }
    return { value: undefined, index: -1 };
}

/**
 * Find second largest element
 */
function findSecondLargest(arr) {
    if (arr.length < 2) return null;
    
    let first = -Infinity;
    let second = -Infinity;
    
    for (const num of arr) {
        if (num > first) {
            second = first;
            first = num;
        } else if (num > second && num !== first) {
            second = num;
        }
    }
    
    return second === -Infinity ? null : second;
}

// ============================================
// 4. SEARCHING IN OBJECTS
// ============================================

/**
 * Search in array of objects by property
 */
function findByProperty(arr, property, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][property] === value) {
            return { object: arr[i], index: i };
        }
    }
    return { object: null, index: -1 };
}

/**
 * Search by multiple properties
 */
function findByProperties(arr, criteria) {
    outer: for (let i = 0; i < arr.length; i++) {
        for (const key in criteria) {
            if (arr[i][key] !== criteria[key]) {
                continue outer;
            }
        }
        return { object: arr[i], index: i };
    }
    return { object: null, index: -1 };
}

/**
 * Find all matching objects
 */
function filterByProperty(arr, property, value) {
    const results = [];
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][property] === value) {
            results.push({ object: arr[i], index: i });
        }
    }
    
    return results;
}

// ============================================
// 5. SEARCHING IN 2D ARRAYS
// ============================================

/**
 * Linear search in 2D array
 */
function search2D(matrix, target) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === target) {
                return { row: i, col: j };
            }
        }
    }
    return null;
}

/**
 * Find all occurrences in 2D array
 */
function searchAll2D(matrix, target) {
    const positions = [];
    
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === target) {
                positions.push({ row: i, col: j });
            }
        }
    }
    
    return positions;
}

/**
 * Search in row-wise sorted matrix
 * Each row is sorted, but rows aren't relative to each other
 */
function searchRowSorted(matrix, target) {
    for (let i = 0; i < matrix.length; i++) {
        // Use binary search on each row
        const col = binarySearchRow(matrix[i], target);
        if (col !== -1) {
            return { row: i, col };
        }
    }
    return null;
}

function binarySearchRow(row, target) {
    let left = 0, right = row.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (row[mid] === target) return mid;
        if (row[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
}

// ============================================
// 6. STRING SEARCHING (Linear)
// ============================================

/**
 * Find substring (naive approach)
 */
function findSubstring(text, pattern) {
    const n = text.length;
    const m = pattern.length;
    
    for (let i = 0; i <= n - m; i++) {
        let j = 0;
        while (j < m && text[i + j] === pattern[j]) {
            j++;
        }
        if (j === m) return i;
    }
    
    return -1;
}

/**
 * Find all substring occurrences
 */
function findAllSubstrings(text, pattern) {
    const positions = [];
    const n = text.length;
    const m = pattern.length;
    
    for (let i = 0; i <= n - m; i++) {
        let j = 0;
        while (j < m && text[i + j] === pattern[j]) {
            j++;
        }
        if (j === m) positions.push(i);
    }
    
    return positions;
}

/**
 * Case-insensitive search
 */
function caseInsensitiveSearch(text, pattern) {
    const lowerText = text.toLowerCase();
    const lowerPattern = pattern.toLowerCase();
    
    return findSubstring(lowerText, lowerPattern);
}

// ============================================
// 7. PRACTICAL EXAMPLES
// ============================================

/**
 * Find first even number
 */
function findFirstEven(arr) {
    return findWhere(arr, num => num % 2 === 0);
}

/**
 * Find first prime number
 */
function findFirstPrime(arr) {
    function isPrime(n) {
        if (n < 2) return false;
        for (let i = 2; i * i <= n; i++) {
            if (n % i === 0) return false;
        }
        return true;
    }
    
    return findWhere(arr, isPrime);
}

/**
 * Find peak element (greater than neighbors)
 */
function findPeakLinear(arr) {
    if (arr.length === 0) return -1;
    if (arr.length === 1) return 0;
    
    if (arr[0] >= arr[1]) return 0;
    if (arr[arr.length - 1] >= arr[arr.length - 2]) return arr.length - 1;
    
    for (let i = 1; i < arr.length - 1; i++) {
        if (arr[i] >= arr[i - 1] && arr[i] >= arr[i + 1]) {
            return i;
        }
    }
    
    return -1;
}

/**
 * Find majority element (appears > n/2 times)
 * Using Boyer-Moore Voting Algorithm
 */
function findMajority(arr) {
    let candidate = null;
    let count = 0;
    
    // Find candidate
    for (const num of arr) {
        if (count === 0) {
            candidate = num;
            count = 1;
        } else if (num === candidate) {
            count++;
        } else {
            count--;
        }
    }
    
    // Verify candidate
    count = 0;
    for (const num of arr) {
        if (num === candidate) count++;
    }
    
    return count > arr.length / 2 ? candidate : null;
}

// ============================================
// 8. COMPLEXITY ANALYSIS
// ============================================

/**
 * Time Complexity Comparison:
 * 
 * | Case      | Linear Search | Binary Search |
 * |-----------|---------------|---------------|
 * | Best      | O(1)          | O(1)          |
 * | Average   | O(n)          | O(log n)      |
 * | Worst     | O(n)          | O(log n)      |
 * 
 * Space Complexity: O(1) for both (iterative)
 * 
 * When to use Linear Search:
 * - Unsorted data
 * - Small datasets (n < 10-20)
 * - Linked lists (no random access)
 * - Searching only once
 * - Data changes frequently
 */

// ============================================
// 9. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Easy): Find missing number in 1 to n
 */
function findMissing(arr, n) {
    const present = new Array(n + 1).fill(false);
    
    for (const num of arr) {
        present[num] = true;
    }
    
    for (let i = 1; i <= n; i++) {
        if (!present[i]) return i;
    }
    
    return -1;
}

/**
 * Problem 2 (Easy): Find two elements that sum to target
 */
function findPairSum(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) {
                return [i, j];
            }
        }
    }
    return null;
}

/**
 * Problem 3 (Medium): Find equilibrium index
 * Index where sum of left = sum of right
 */
function findEquilibrium(arr) {
    const total = arr.reduce((a, b) => a + b, 0);
    let leftSum = 0;
    
    for (let i = 0; i < arr.length; i++) {
        const rightSum = total - leftSum - arr[i];
        
        if (leftSum === rightSum) {
            return i;
        }
        
        leftSum += arr[i];
    }
    
    return -1;
}

/**
 * Problem 4 (Medium): Find first repeating element
 */
function findFirstRepeating(arr) {
    const seen = new Set();
    let firstRepeat = -1;
    
    // Traverse from right to left
    for (let i = arr.length - 1; i >= 0; i--) {
        if (seen.has(arr[i])) {
            firstRepeat = i;
        }
        seen.add(arr[i]);
    }
    
    return firstRepeat;
}

module.exports = {
    linearSearch,
    linearSearchLast,
    linearSearchAll,
    sentinelLinearSearch,
    twoWayLinearSearch,
    findMinimum,
    findMaximum,
    findMinMax,
    findSecondLargest,
    findWhere,
    findByProperty,
    search2D,
    findSubstring,
    findMajority,
    findEquilibrium,
    findFirstRepeating
};
