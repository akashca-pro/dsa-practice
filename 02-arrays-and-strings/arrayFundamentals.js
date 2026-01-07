/**
 * ============================================
 * ARRAY FUNDAMENTALS
 * ============================================
 * 
 * CONCEPT:
 * Arrays are contiguous blocks of memory storing elements of the same type.
 * They provide O(1) random access via index calculation and form the
 * foundation for most data structures and algorithms.
 * 
 * REAL-WORLD ANALOGY:
 * Think of a row of numbered lockers in a gym:
 * - Each locker has a unique number (index)
 * - You can go directly to any locker if you know its number
 * - Lockers are physically next to each other (contiguous)
 * - Adding a locker in the middle requires shifting all others
 * 
 * INDUSTRY APPLICATIONS:
 * - Database table rows (fixed-size records)
 * - Image pixels (2D arrays)
 * - Time series data (ordered by timestamp)
 * - Buffers in network programming
 * - Game state (player positions, inventories)
 */

// ============================================
// 1. ARRAY OPERATIONS & COMPLEXITY
// ============================================

/**
 * Access by Index - O(1)
 * Address = base_address + (index * element_size)
 */
function accessByIndex(arr, index) {
    if (index < 0 || index >= arr.length) {
        return undefined; // Bounds checking
    }
    return arr[index];
    // Direct memory access - constant time
}

/**
 * Search (Unsorted) - O(n)
 * Must check each element
 */
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}

/**
 * Insert at End - O(1) amortized
 * May trigger resize (still amortized O(1))
 */
function insertAtEnd(arr, element) {
    arr.push(element);
    return arr;
}

/**
 * Insert at Beginning - O(n)
 * Must shift all elements right
 */
function insertAtBeginning(arr, element) {
    arr.unshift(element);
    return arr;
    // Shifts n elements → O(n)
}

/**
 * Insert at Index - O(n)
 * Must shift elements from index onwards
 */
function insertAtIndex(arr, index, element) {
    arr.splice(index, 0, element);
    return arr;
    // Worst case: insert at 0 → O(n)
}

/**
 * Delete from End - O(1)
 * No shifting required
 */
function deleteFromEnd(arr) {
    return arr.pop();
}

/**
 * Delete from Beginning - O(n)
 * Must shift all elements left
 */
function deleteFromBeginning(arr) {
    return arr.shift();
    // Shifts n-1 elements → O(n)
}

// ============================================
// 2. ARRAY TRAVERSAL PATTERNS
// ============================================

/**
 * Forward Traversal
 */
function forwardTraversal(arr) {
    const results = [];
    for (let i = 0; i < arr.length; i++) {
        results.push(arr[i]);
    }
    return results;
}

/**
 * Backward Traversal
 */
function backwardTraversal(arr) {
    const results = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        results.push(arr[i]);
    }
    return results;
}

/**
 * Two-Pointer Traversal (from ends)
 */
function twoPointerEnds(arr) {
    let left = 0;
    let right = arr.length - 1;
    const pairs = [];
    
    while (left < right) {
        pairs.push([arr[left], arr[right]]);
        left++;
        right--;
    }
    
    return pairs;
}

/**
 * Skip Traversal
 */
function skipTraversal(arr, step = 2) {
    const results = [];
    for (let i = 0; i < arr.length; i += step) {
        results.push(arr[i]);
    }
    return results;
}

// ============================================
// 3. COMMON ARRAY TECHNIQUES
// ============================================

/**
 * Prefix Sum - Precompute cumulative sums
 * Use case: Range sum queries in O(1)
 */
function buildPrefixSum(arr) {
    const prefix = [0]; // Start with 0 for easier range calculation
    
    for (let i = 0; i < arr.length; i++) {
        prefix.push(prefix[i] + arr[i]);
    }
    
    return prefix;
}

function rangeSum(prefix, left, right) {
    // Sum of elements from index left to right (inclusive)
    return prefix[right + 1] - prefix[left];
    // O(1) query after O(n) preprocessing
}

/**
 * In-Place Modification
 * Modify array without extra space
 */
function reverseInPlace(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    
    return arr;
}

/**
 * Rotate Array by K positions
 */
function rotateRight(arr, k) {
    const n = arr.length;
    k = k % n; // Handle k > n
    
    if (k === 0) return arr;
    
    // Reverse entire array
    reverse(arr, 0, n - 1);
    // Reverse first k elements
    reverse(arr, 0, k - 1);
    // Reverse remaining elements
    reverse(arr, k, n - 1);
    
    return arr;
}

function reverse(arr, start, end) {
    while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
    }
}

/**
 * Dutch National Flag - 3-way partition
 * Partition array into 3 sections in one pass
 */
function dutchNationalFlag(arr) {
    // Sort array with values 0, 1, 2
    let low = 0, mid = 0, high = arr.length - 1;
    
    while (mid <= high) {
        if (arr[mid] === 0) {
            [arr[low], arr[mid]] = [arr[mid], arr[low]];
            low++;
            mid++;
        } else if (arr[mid] === 1) {
            mid++;
        } else {
            [arr[mid], arr[high]] = [arr[high], arr[mid]];
            high--;
        }
    }
    
    return arr;
    // O(n) time, O(1) space
}

// ============================================
// 4. 2D ARRAYS (MATRICES)
// ============================================

/**
 * Matrix Traversal - Row by Row
 */
function traverseRowByRow(matrix) {
    const result = [];
    
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            result.push(matrix[row][col]);
        }
    }
    
    return result;
}

/**
 * Matrix Traversal - Column by Column
 */
function traverseColByCol(matrix) {
    const result = [];
    
    for (let col = 0; col < matrix[0].length; col++) {
        for (let row = 0; row < matrix.length; row++) {
            result.push(matrix[row][col]);
        }
    }
    
    return result;
}

/**
 * Matrix Traversal - Diagonal
 */
function traverseDiagonal(matrix) {
    const result = [];
    const n = matrix.length;
    
    for (let i = 0; i < n; i++) {
        result.push(matrix[i][i]); // Main diagonal
    }
    
    return result;
}

/**
 * Matrix Traversal - Spiral
 */
function spiralTraversal(matrix) {
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

/**
 * Transpose Matrix
 */
function transpose(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = [];
    
    for (let i = 0; i < cols; i++) {
        result.push([]);
        for (let j = 0; j < rows; j++) {
            result[i].push(matrix[j][i]);
        }
    }
    
    return result;
}

// ============================================
// 5. ARRAY METHODS COMPLEXITY
// ============================================

/**
 * JavaScript Array Method Complexities:
 * 
 * | Method          | Time Complexity  | Creates New Array? |
 * |-----------------|------------------|-------------------|
 * | push()          | O(1) amortized   | No                |
 * | pop()           | O(1)             | No                |
 * | shift()         | O(n)             | No                |
 * | unshift()       | O(n)             | No                |
 * | splice()        | O(n)             | No                |
 * | slice()         | O(n)             | Yes               |
 * | concat()        | O(n+m)           | Yes               |
 * | indexOf()       | O(n)             | No                |
 * | includes()      | O(n)             | No                |
 * | find()          | O(n)             | No                |
 * | filter()        | O(n)             | Yes               |
 * | map()           | O(n)             | Yes               |
 * | reduce()        | O(n)             | No (usually)      |
 * | sort()          | O(n log n)       | No                |
 * | reverse()       | O(n)             | No                |
 */

// ============================================
// 6. COMMON MISTAKES & EDGE CASES
// ============================================

/**
 * Edge Case 1: Empty Array
 */
function handleEmpty(arr) {
    if (!arr || arr.length === 0) {
        return null; // Or appropriate default
    }
    return arr[0];
}

/**
 * Edge Case 2: Single Element
 */
function handleSingleElement(arr) {
    if (arr.length === 1) {
        // Many algorithms need special handling
        return arr[0];
    }
    // Regular logic...
}

/**
 * Edge Case 3: Duplicate Elements
 */
function handleDuplicates(arr) {
    // indexOf returns first occurrence
    const first = arr.indexOf(5);
    
    // Use lastIndexOf for last occurrence
    const last = arr.lastIndexOf(5);
    
    // Use filter for all occurrences
    const all = arr.map((val, idx) => val === 5 ? idx : -1)
                   .filter(idx => idx !== -1);
    
    return { first, last, all };
}

/**
 * Mistake 1: Modifying array while iterating
 */
function modifyWhileIterating(arr) {
    // DON'T do this:
    // for (let i = 0; i < arr.length; i++) {
    //     if (arr[i] < 0) arr.splice(i, 1); // Skips elements!
    // }
    
    // DO this instead:
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] < 0) arr.splice(i, 1);
    }
    // Or use filter for new array
    return arr;
}

/**
 * Mistake 2: Shallow vs Deep Copy
 */
function copyMistake() {
    const original = [[1, 2], [3, 4]];
    
    // Shallow copy - nested arrays are references!
    const shallow = [...original];
    shallow[0][0] = 999;
    console.log(original[0][0]); // 999 - original changed!
    
    // Deep copy
    const deep = JSON.parse(JSON.stringify(original));
    // Or structuredClone(original) in modern JS
}

// ============================================
// 7. INTERVIEW PERSPECTIVE
// ============================================

/**
 * Common array interview patterns:
 * 
 * 1. Two Pointers - Meeting or sliding
 * 2. Sliding Window - Fixed or variable size
 * 3. Prefix Sum - Range queries
 * 4. In-place Modification - O(1) space requirement
 * 5. Binary Search - On sorted arrays
 * 6. Dutch National Flag - 3-way partition
 * 
 * Questions to ask:
 * - Is the array sorted?
 * - Are there duplicates?
 * - Can I modify the original array?
 * - What's the expected size?
 */

// ============================================
// 8. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Easy): Find maximum and minimum in one pass
 */
function findMinMax(arr) {
    if (arr.length === 0) return null;
    
    let min = arr[0], max = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
    }
    
    return { min, max };
    // O(n) time, O(1) space
}

/**
 * Problem 2 (Easy): Move all zeros to end
 */
function moveZerosToEnd(arr) {
    let insertPos = 0;
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            arr[insertPos++] = arr[i];
        }
    }
    
    while (insertPos < arr.length) {
        arr[insertPos++] = 0;
    }
    
    return arr;
    // O(n) time, O(1) space
}

/**
 * Problem 3 (Medium): Find missing number in 1 to n
 */
function findMissingNumber(arr) {
    const n = arr.length + 1;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = arr.reduce((a, b) => a + b, 0);
    
    return expectedSum - actualSum;
    // O(n) time, O(1) space
}

/**
 * Problem 4 (Medium): Product of array except self
 */
function productExceptSelf(arr) {
    const n = arr.length;
    const result = new Array(n).fill(1);
    
    // Left products
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        result[i] = leftProduct;
        leftProduct *= arr[i];
    }
    
    // Right products
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= arr[i];
    }
    
    return result;
    // O(n) time, O(1) extra space (result doesn't count)
}

/**
 * Problem 5 (Hard): Trapping rain water
 */
function trapRainWater(heights) {
    if (heights.length === 0) return 0;
    
    let left = 0, right = heights.length - 1;
    let leftMax = 0, rightMax = 0;
    let water = 0;
    
    while (left < right) {
        if (heights[left] < heights[right]) {
            if (heights[left] >= leftMax) {
                leftMax = heights[left];
            } else {
                water += leftMax - heights[left];
            }
            left++;
        } else {
            if (heights[right] >= rightMax) {
                rightMax = heights[right];
            } else {
                water += rightMax - heights[right];
            }
            right--;
        }
    }
    
    return water;
    // O(n) time, O(1) space
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * ARRAY FUNDAMENTALS CHEAT SHEET:
 * 
 * OPERATION COMPLEXITY:
 * - Access by index: O(1)
 * - Search (unsorted): O(n)
 * - Insert/Delete at end: O(1) amortized
 * - Insert/Delete at beginning: O(n)
 * 
 * KEY TECHNIQUES:
 * - Two Pointers: Pair problems, reversals, partitioning
 * - Prefix Sum: O(1) range queries after O(n) preprocessing
 * - Sliding Window: Subarray problems
 * - In-Place Modification: O(1) space requirement
 * 
 * COMMON PATTERNS:
 * - Dutch National Flag: 3-way partition in O(n)
 * - Rotation: Reverse technique for O(1) space
 * - Spiral Traversal: Four-boundary approach
 * 
 * EDGE CASES TO HANDLE:
 * - Empty array
 * - Single element
 * - Duplicate elements
 * - Negative numbers
 * 
 * INTERVIEW TIPS:
 * - Ask if array is sorted (enables binary search)
 * - Ask if you can modify the original array
 * - Consider space constraints for in-place solutions
 */

module.exports = {
    linearSearch,
    buildPrefixSum,
    rangeSum,
    reverseInPlace,
    rotateRight,
    dutchNationalFlag,
    spiralTraversal,
    transpose,
    findMinMax,
    moveZerosToEnd,
    findMissingNumber,
    productExceptSelf,
    trapRainWater
};
