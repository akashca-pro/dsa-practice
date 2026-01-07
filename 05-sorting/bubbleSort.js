/**
 * ============================================
 * BUBBLE SORT
 * ============================================
 * 
 * CONCEPT:
 * Bubble Sort repeatedly steps through the list, compares adjacent elements,
 * and swaps them if they're in the wrong order. Larger elements "bubble up"
 * to the end of the array.
 * 
 * REAL-WORLD ANALOGY:
 * Like bubbles rising in water - heavier elements sink to the bottom
 * while lighter elements rise to the top.
 * 
 * COMPLEXITY:
 * Time: O(n²) average and worst, O(n) best (already sorted)
 * Space: O(1) - in-place
 * Stable: Yes (equal elements maintain relative order)
 */

// ============================================
// 1. BASIC IMPLEMENTATION
// ============================================

function bubbleSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        // Each pass bubbles the largest unsorted element to its position
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    
    return arr;
}

// ============================================
// 2. OPTIMIZED VERSION
// ============================================

/**
 * Optimized with early termination
 * If no swaps occur in a pass, array is sorted
 */
function bubbleSortOptimized(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        // If no swaps, array is sorted
        if (!swapped) break;
    }
    
    return arr;
}

// ============================================
// 3. WITH VISUALIZATION/STEPS
// ============================================

function bubbleSortWithSteps(arr) {
    const n = arr.length;
    const steps = [];
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                steps.push({
                    action: 'swap',
                    indices: [j, j + 1],
                    array: [...arr]
                });
            }
        }
    }
    
    return { sorted: arr, steps };
}

// ============================================
// 4. DESCENDING ORDER
// ============================================

function bubbleSortDescending(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] < arr[j + 1]) { // Change comparison
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    
    return arr;
}

// ============================================
// 5. RECURSIVE VERSION
// ============================================

function bubbleSortRecursive(arr, n = arr.length) {
    if (n === 1) return arr;
    
    // One pass of bubble sort
    for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        }
    }
    
    // Recurse for remaining array
    return bubbleSortRecursive(arr, n - 1);
}

module.exports = { bubbleSort, bubbleSortOptimized, bubbleSortDescending, bubbleSortRecursive };
