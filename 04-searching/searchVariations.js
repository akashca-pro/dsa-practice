/**
 * ============================================
 * SEARCH VARIATIONS
 * ============================================
 * 
 * CONCEPT:
 * Beyond linear and binary search, there are specialized search algorithms
 * optimized for specific data patterns or requirements.
 * 
 * INDUSTRY APPLICATIONS:
 * - Jump search: Database pagination
 * - Interpolation search: Uniformly distributed data
 * - Exponential search: Unbounded/infinite lists
 * - Ternary search: Unimodal functions optimization
 */

// ============================================
// 1. JUMP SEARCH
// ============================================

/**
 * Jump Search
 * Jump ahead by fixed blocks, then linear search within block
 * 
 * Optimal block size: √n
 * Time Complexity: O(√n)
 * Space Complexity: O(1)
 * 
 * Better than linear, simpler than binary
 * Good for systems where jumping is expensive (linked lists on disk)
 */
function jumpSearch(arr, target) {
    const n = arr.length;
    const blockSize = Math.floor(Math.sqrt(n));
    
    let prev = 0;
    let step = blockSize;
    
    // Jump ahead until we pass the target
    while (step < n && arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += blockSize;
    }
    
    // Linear search in the identified block
    while (prev < Math.min(step, n)) {
        if (arr[prev] === target) {
            return prev;
        }
        prev++;
    }
    
    return -1;
}

/**
 * Optimized Jump Search with adaptive step
 */
function jumpSearchAdaptive(arr, target) {
    const n = arr.length;
    if (n === 0) return -1;
    
    // Start with larger jumps, decrease as we get closer
    let step = Math.floor(Math.sqrt(n));
    let prev = 0;
    
    // Jump forward
    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += Math.floor(Math.sqrt(n - prev));
        
        if (prev >= n) return -1;
    }
    
    // Linear search backward
    while (arr[prev] < target) {
        prev++;
        if (prev === Math.min(step, n)) return -1;
    }
    
    return arr[prev] === target ? prev : -1;
}

// ============================================
// 2. INTERPOLATION SEARCH
// ============================================

/**
 * Interpolation Search
 * Estimates position based on value distribution
 * 
 * Best for uniformly distributed sorted data
 * Time: O(log log n) average for uniform data
 * Time: O(n) worst case for non-uniform data
 * Space: O(1)
 */
function interpolationSearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right && target >= arr[left] && target <= arr[right]) {
        // Handle single element
        if (left === right) {
            return arr[left] === target ? left : -1;
        }
        
        // Estimate position using interpolation formula
        const pos = left + Math.floor(
            ((right - left) * (target - arr[left])) / 
            (arr[right] - arr[left])
        );
        
        if (arr[pos] === target) {
            return pos;
        }
        
        if (arr[pos] < target) {
            left = pos + 1;
        } else {
            right = pos - 1;
        }
    }
    
    return -1;
}

/**
 * Interpolation Search with bounds checking
 * More robust version
 */
function interpolationSearchSafe(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right && target >= arr[left] && target <= arr[right]) {
        if (arr[left] === arr[right]) {
            return arr[left] === target ? left : -1;
        }
        
        // Calculate position, ensure it's within bounds
        let pos = left + Math.floor(
            ((right - left) * (target - arr[left])) / 
            (arr[right] - arr[left])
        );
        
        // Clamp position to valid range
        pos = Math.max(left, Math.min(right, pos));
        
        if (arr[pos] === target) return pos;
        
        if (arr[pos] < target) {
            left = pos + 1;
        } else {
            right = pos - 1;
        }
    }
    
    return -1;
}

// ============================================
// 3. EXPONENTIAL SEARCH
// ============================================

/**
 * Exponential Search
 * Find range exponentially, then binary search within range
 * 
 * Good for unbounded/infinite arrays
 * Good when target is near the beginning
 * Time: O(log i) where i is target's position
 * Space: O(1)
 */
function exponentialSearch(arr, target) {
    const n = arr.length;
    
    if (n === 0) return -1;
    if (arr[0] === target) return 0;
    
    // Find range by exponential steps
    let i = 1;
    while (i < n && arr[i] <= target) {
        i *= 2;
    }
    
    // Binary search in found range
    return binarySearchInRange(arr, target, Math.floor(i / 2), Math.min(i, n - 1));
}

function binarySearchInRange(arr, target, left, right) {
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
}

/**
 * Search in unbounded/infinite sorted array
 * When we don't know the array size
 */
function searchUnbounded(arr, target) {
    // Find a bound first
    let bound = 1;
    
    while (arr[bound] !== undefined && arr[bound] < target) {
        bound *= 2;
    }
    
    // Binary search between bound/2 and bound
    let left = Math.floor(bound / 2);
    let right = bound;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (arr[mid] === undefined || arr[mid] > target) {
            right = mid - 1;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            return mid;
        }
    }
    
    return -1;
}

// ============================================
// 4. TERNARY SEARCH
// ============================================

/**
 * Ternary Search
 * Divide into 3 parts instead of 2
 * 
 * Used for finding maximum/minimum of unimodal functions
 * A unimodal function first increases then decreases (or vice versa)
 * Time: O(log₃ n) ≈ O(log n)
 * Space: O(1)
 */
function ternarySearchMax(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (right - left > 2) {
        const mid1 = left + Math.floor((right - left) / 3);
        const mid2 = right - Math.floor((right - left) / 3);
        
        if (arr[mid1] < arr[mid2]) {
            left = mid1;
        } else {
            right = mid2;
        }
    }
    
    // Find max in remaining small range
    let maxIdx = left;
    for (let i = left + 1; i <= right; i++) {
        if (arr[i] > arr[maxIdx]) {
            maxIdx = i;
        }
    }
    
    return maxIdx;
}

/**
 * Ternary search on continuous function
 * Find maximum of function f in range [left, right]
 */
function ternarySearchFunction(f, left, right, precision = 1e-9) {
    while (right - left > precision) {
        const mid1 = left + (right - left) / 3;
        const mid2 = right - (right - left) / 3;
        
        if (f(mid1) < f(mid2)) {
            left = mid1;
        } else {
            right = mid2;
        }
    }
    
    return (left + right) / 2;
}

/**
 * Find minimum of unimodal function (decreases then increases)
 */
function ternarySearchMin(f, left, right, precision = 1e-9) {
    while (right - left > precision) {
        const mid1 = left + (right - left) / 3;
        const mid2 = right - (right - left) / 3;
        
        if (f(mid1) > f(mid2)) {
            left = mid1;
        } else {
            right = mid2;
        }
    }
    
    return (left + right) / 2;
}

// ============================================
// 5. FIBONACCI SEARCH
// ============================================

/**
 * Fibonacci Search
 * Similar to binary search but divides using Fibonacci numbers
 * 
 * Advantage: Uses addition instead of division
 * Time: O(log n)
 * Space: O(1)
 */
function fibonacciSearch(arr, target) {
    const n = arr.length;
    
    // Initialize Fibonacci numbers
    let fib2 = 0; // (m-2)th Fibonacci
    let fib1 = 1; // (m-1)th Fibonacci
    let fib = fib1 + fib2; // m-th Fibonacci
    
    // Find smallest Fibonacci >= n
    while (fib < n) {
        fib2 = fib1;
        fib1 = fib;
        fib = fib1 + fib2;
    }
    
    let offset = -1;
    
    while (fib > 1) {
        const i = Math.min(offset + fib2, n - 1);
        
        if (arr[i] < target) {
            fib = fib1;
            fib1 = fib2;
            fib2 = fib - fib1;
            offset = i;
        } else if (arr[i] > target) {
            fib = fib2;
            fib1 = fib1 - fib2;
            fib2 = fib - fib1;
        } else {
            return i;
        }
    }
    
    if (fib1 && arr[offset + 1] === target) {
        return offset + 1;
    }
    
    return -1;
}

// ============================================
// 6. SPECIALIZED SEARCHES
// ============================================

/**
 * Two Crystal Balls Problem
 * Find the floor where balls break with minimum drops
 * 
 * Using jump search: O(√n) drops
 */
function twoCrystalBalls(breaks) {
    const n = breaks.length;
    const jumpAmount = Math.floor(Math.sqrt(n));
    
    let i = jumpAmount;
    
    // First ball: jump by √n
    while (i < n) {
        if (breaks[i]) break;
        i += jumpAmount;
    }
    
    // Second ball: linear search from last safe spot
    i -= jumpAmount;
    
    for (let j = 0; j <= jumpAmount && i < n; j++, i++) {
        if (breaks[i]) return i;
    }
    
    return -1;
}

/**
 * Search in infinite sorted array where only 0s and 1s
 * Find first occurrence of 1
 */
function findFirst1(arr) {
    let low = 0;
    let high = 1;
    
    // Find range containing first 1
    while (arr[high] === 0) {
        low = high;
        high = high * 2;
    }
    
    // Binary search for first 1
    while (low < high) {
        const mid = low + Math.floor((high - low) / 2);
        
        if (arr[mid] === 0) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    
    return low;
}

/**
 * Search in nearly sorted array
 * Element at index i can be at i-1, i, or i+1
 */
function searchNearlySorted(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (arr[mid] === target) return mid;
        
        // Check neighbors
        if (mid > left && arr[mid - 1] === target) return mid - 1;
        if (mid < right && arr[mid + 1] === target) return mid + 1;
        
        if (arr[mid] < target) {
            left = mid + 2; // Skip mid+1, already checked
        } else {
            right = mid - 2; // Skip mid-1, already checked
        }
    }
    
    return -1;
}

/**
 * Floor of element in sorted array
 * Largest element <= target
 */
function floor(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (arr[mid] === target) return mid;
        
        if (arr[mid] < target) {
            result = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

/**
 * Ceiling of element in sorted array
 * Smallest element >= target
 */
function ceiling(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (arr[mid] === target) return mid;
        
        if (arr[mid] > target) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    return result;
}

// ============================================
// 7. SEARCH COMPARISON
// ============================================

/**
 * Algorithm Comparison:
 * 
 * | Algorithm       | Time (Avg)    | Time (Worst)  | Best Use Case           |
 * |-----------------|---------------|---------------|-------------------------|
 * | Linear          | O(n)          | O(n)          | Unsorted, small data    |
 * | Binary          | O(log n)      | O(log n)      | Sorted arrays           |
 * | Jump            | O(√n)         | O(√n)         | Large sorted, no random |
 * | Interpolation   | O(log log n)  | O(n)          | Uniform distribution    |
 * | Exponential     | O(log i)      | O(log i)      | Unbounded arrays        |
 * | Ternary         | O(log₃ n)     | O(log₃ n)     | Unimodal functions      |
 * | Fibonacci       | O(log n)      | O(log n)      | When division is costly |
 */

// ============================================
// 8. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Medium): Next Letter
 * Find smallest letter greater than target (circular)
 */
function nextGreatestLetter(letters, target) {
    let left = 0;
    let right = letters.length;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (letters[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return letters[left % letters.length];
}

/**
 * Problem 2 (Medium): Find element in sorted array of unknown size
 */
function searchInfinite(reader, target) {
    // reader.get(i) returns element at index i
    // reader.get(i) returns MAX for out of bounds
    
    // Find bounds
    let left = 0;
    let right = 1;
    
    while (reader.get(right) < target) {
        left = right;
        right *= 2;
    }
    
    // Binary search
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        const val = reader.get(mid);
        
        if (val === target) return mid;
        if (val < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
}

/**
 * Problem 3 (Hard): Find optimal point on function
 * Minimize distance to set of points
 */
function minTotalDistance(points) {
    // For 1D, median is optimal
    points.sort((a, b) => a - b);
    
    let left = 0;
    let right = points.length - 1;
    let distance = 0;
    
    while (left < right) {
        distance += points[right] - points[left];
        left++;
        right--;
    }
    
    return distance;
}

module.exports = {
    jumpSearch,
    interpolationSearch,
    interpolationSearchSafe,
    exponentialSearch,
    searchUnbounded,
    ternarySearchMax,
    ternarySearchFunction,
    ternarySearchMin,
    fibonacciSearch,
    twoCrystalBalls,
    searchNearlySorted,
    floor,
    ceiling,
    nextGreatestLetter
};
