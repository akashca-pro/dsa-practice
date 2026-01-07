/**
 * ============================================
 * SORTING ALGORITHMS COMPARISON
 * ============================================
 * 
 * This file provides a comprehensive comparison of sorting algorithms,
 * including non-comparison sorts (Counting, Radix, Bucket).
 */

// ============================================
// COMPARISON TABLE
// ============================================

/**
 * | Algorithm      | Best       | Average    | Worst      | Space   | Stable |
 * |----------------|------------|------------|------------|---------|--------|
 * | Bubble Sort    | O(n)       | O(n²)      | O(n²)      | O(1)    | Yes    |
 * | Selection Sort | O(n²)      | O(n²)      | O(n²)      | O(1)    | No     |
 * | Insertion Sort | O(n)       | O(n²)      | O(n²)      | O(1)    | Yes    |
 * | Merge Sort     | O(n log n) | O(n log n) | O(n log n) | O(n)    | Yes    |
 * | Quick Sort     | O(n log n) | O(n log n) | O(n²)      | O(log n)| No     |
 * | Heap Sort      | O(n log n) | O(n log n) | O(n log n) | O(1)    | No     |
 * | Counting Sort  | O(n + k)   | O(n + k)   | O(n + k)   | O(k)    | Yes    |
 * | Radix Sort     | O(nk)      | O(nk)      | O(nk)      | O(n + k)| Yes    |
 * | Bucket Sort    | O(n + k)   | O(n + k)   | O(n²)      | O(n)    | Yes    |
 */

// ============================================
// 1. COUNTING SORT
// ============================================

/**
 * For integers in a known range [0, k]
 * Time: O(n + k), Space: O(k)
 */
function countingSort(arr, maxVal = null) {
    if (arr.length === 0) return arr;
    
    const max = maxVal ?? Math.max(...arr);
    const count = new Array(max + 1).fill(0);
    const output = new Array(arr.length);
    
    // Count occurrences
    for (const num of arr) {
        count[num]++;
    }
    
    // Cumulative count
    for (let i = 1; i <= max; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output (reverse for stability)
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    
    return output;
}

// ============================================
// 2. RADIX SORT
// ============================================

/**
 * Sort by each digit, least significant first
 * Time: O(d * (n + k)) where d = digits, k = base
 */
function radixSort(arr) {
    if (arr.length === 0) return arr;
    
    const max = Math.max(...arr);
    
    // Sort by each digit
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
    
    return arr;
}

function countingSortByDigit(arr, exp) {
    const output = new Array(arr.length);
    const count = new Array(10).fill(0);
    
    // Count occurrences
    for (const num of arr) {
        const digit = Math.floor(num / exp) % 10;
        count[digit]++;
    }
    
    // Cumulative count
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output (reverse for stability)
    for (let i = arr.length - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    // Copy back
    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
    }
}

// ============================================
// 3. BUCKET SORT
// ============================================

/**
 * Distribute into buckets, sort each, concatenate
 * Best for uniformly distributed data
 */
function bucketSort(arr, bucketCount = 10) {
    if (arr.length === 0) return arr;
    
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = (max - min) / bucketCount || 1;
    
    // Create buckets
    const buckets = Array.from({ length: bucketCount }, () => []);
    
    // Distribute elements
    for (const num of arr) {
        const idx = Math.min(
            Math.floor((num - min) / range),
            bucketCount - 1
        );
        buckets[idx].push(num);
    }
    
    // Sort buckets and concatenate
    return buckets.flatMap(bucket => bucket.sort((a, b) => a - b));
}

// ============================================
// 4. WHEN TO USE WHICH
// ============================================

/**
 * Use Insertion Sort when:
 * - Small arrays (n < 20)
 * - Nearly sorted data
 * - Online sorting needed
 * 
 * Use Merge Sort when:
 * - Stability required
 * - Linked lists
 * - External sorting
 * - Guaranteed O(n log n) needed
 * 
 * Use Quick Sort when:
 * - Average case matters
 * - Memory is limited
 * - Cache efficiency important
 * 
 * Use Heap Sort when:
 * - Guaranteed O(n log n) needed
 * - Memory is very limited
 * - Need k largest/smallest
 * 
 * Use Counting/Radix when:
 * - Integers in limited range
 * - Need O(n) performance
 * 
 * Use Bucket Sort when:
 * - Uniformly distributed floating point
 */

// ============================================
// 5. JAVASCRIPT'S BUILT-IN SORT
// ============================================

/**
 * Array.prototype.sort() uses TimSort
 * - Hybrid of Merge Sort and Insertion Sort
 * - O(n log n) worst case
 * - Stable in modern browsers
 * - Adaptive: O(n) for nearly sorted
 */

function jsSort(arr) {
    // Default sorts as strings!
    return arr.sort((a, b) => a - b);
}

// Sort objects
function sortObjects(arr, key, order = 'asc') {
    return arr.sort((a, b) => {
        if (order === 'desc') [a, b] = [b, a];
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
    });
}

// Multi-key sort
function sortByMultipleKeys(arr, keys) {
    return arr.sort((a, b) => {
        for (const { key, order } of keys) {
            const mult = order === 'desc' ? -1 : 1;
            if (a[key] < b[key]) return -1 * mult;
            if (a[key] > b[key]) return 1 * mult;
        }
        return 0;
    });
}

// ============================================
// 6. STABILITY DEMONSTRATION
// ============================================

function demonstrateStability() {
    const data = [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 30 },
        { name: 'Charlie', age: 25 },
        { name: 'David', age: 30 }
    ];
    
    // Stable sort preserves relative order of equal elements
    // After sorting by age, Alice should still come before Charlie
    const sorted = data.sort((a, b) => a.age - b.age);
    
    console.log('Stable: Alice before Charlie?', 
        sorted.findIndex(p => p.name === 'Alice') < 
        sorted.findIndex(p => p.name === 'Charlie'));
}

module.exports = {
    countingSort,
    radixSort,
    bucketSort,
    jsSort,
    sortObjects,
    sortByMultipleKeys
};
