/**
 * ============================================
 * SELECTION SORT
 * ============================================
 * 
 * CONCEPT:
 * Selection Sort divides the array into sorted and unsorted regions.
 * It repeatedly finds the minimum element from the unsorted region
 * and places it at the beginning of the unsorted region.
 * 
 * REAL-WORLD ANALOGY:
 * Like sorting playing cards by finding the smallest card and placing
 * it first, then finding the next smallest, and so on.
 * 
 * COMPLEXITY:
 * Time: O(n²) in all cases (always makes n² comparisons)
 * Space: O(1) - in-place
 * Stable: No (can change relative order of equal elements)
 */

// ============================================
// 1. BASIC IMPLEMENTATION
// ============================================

function selectionSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        
        // Find minimum in unsorted portion
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        // Swap minimum with first unsorted element
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    
    return arr;
}

// ============================================
// 2. STABLE SELECTION SORT
// ============================================

/**
 * Stable version using insertion instead of swap
 */
function selectionSortStable(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        // Insert minimum at position i (shift elements)
        const minVal = arr[minIdx];
        while (minIdx > i) {
            arr[minIdx] = arr[minIdx - 1];
            minIdx--;
        }
        arr[i] = minVal;
    }
    
    return arr;
}

// ============================================
// 3. DOUBLE ENDED SELECTION SORT
// ============================================

/**
 * Find both min and max in each pass
 * Reduces number of passes by half
 */
function selectionSortDoubleEnded(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        let minIdx = left;
        let maxIdx = left;
        
        // Find min and max in unsorted portion
        for (let i = left + 1; i <= right; i++) {
            if (arr[i] < arr[minIdx]) minIdx = i;
            if (arr[i] > arr[maxIdx]) maxIdx = i;
        }
        
        // Place minimum at left
        [arr[left], arr[minIdx]] = [arr[minIdx], arr[left]];
        
        // If max was at left, it got swapped to minIdx
        if (maxIdx === left) {
            maxIdx = minIdx;
        }
        
        // Place maximum at right
        [arr[right], arr[maxIdx]] = [arr[maxIdx], arr[right]];
        
        left++;
        right--;
    }
    
    return arr;
}

// ============================================
// 4. WITH VISUALIZATION
// ============================================

function selectionSortWithSteps(arr) {
    const n = arr.length;
    const steps = [];
    
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            steps.push({
                pass: i + 1,
                minFound: minIdx,
                swap: [i, minIdx],
                array: [...arr]
            });
        }
    }
    
    return { sorted: arr, steps };
}

// ============================================
// 5. RECURSIVE VERSION
// ============================================

function selectionSortRecursive(arr, start = 0) {
    const n = arr.length;
    
    if (start >= n - 1) return arr;
    
    // Find minimum in remaining array
    let minIdx = start;
    for (let i = start + 1; i < n; i++) {
        if (arr[i] < arr[minIdx]) {
            minIdx = i;
        }
    }
    
    // Swap
    [arr[start], arr[minIdx]] = [arr[minIdx], arr[start]];
    
    // Recurse for remaining
    return selectionSortRecursive(arr, start + 1);
}

module.exports = { 
    selectionSort, 
    selectionSortStable, 
    selectionSortDoubleEnded,
    selectionSortRecursive 
};
