/**
 * ============================================
 * QUICK SORT
 * ============================================
 * 
 * CONCEPT:
 * Quick Sort is a divide-and-conquer algorithm that picks a pivot element
 * and partitions the array around it, placing smaller elements before
 * and larger elements after. Then recursively sorts the subarrays.
 * 
 * REAL-WORLD ANALOGY:
 * Like organizing a group photo by height - pick someone as reference,
 * shorter people go left, taller go right, then repeat in each group.
 * 
 * COMPLEXITY:
 * Time: O(n log n) average, O(n²) worst (poor pivot choice)
 * Space: O(log n) for recursion stack
 * Stable: No (standard implementation)
 * 
 * BEST FOR:
 * - General purpose sorting
 * - In-memory sorting (cache efficient)
 * - When average case matters more than worst case
 */

// ============================================
// 1. BASIC IMPLEMENTATION (LOMUTO PARTITION)
// ============================================

function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIdx = partition(arr, low, high);
        
        quickSort(arr, low, pivotIdx - 1);
        quickSort(arr, pivotIdx + 1, high);
    }
    
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high]; // Last element as pivot
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    // Place pivot in correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// ============================================
// 2. HOARE PARTITION (ORIGINAL, FASTER)
// ============================================

function quickSortHoare(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIdx = partitionHoare(arr, low, high);
        
        quickSortHoare(arr, low, pivotIdx);
        quickSortHoare(arr, pivotIdx + 1, high);
    }
    
    return arr;
}

function partitionHoare(arr, low, high) {
    const pivot = arr[Math.floor((low + high) / 2)];
    let i = low - 1;
    let j = high + 1;
    
    while (true) {
        do { i++; } while (arr[i] < pivot);
        do { j--; } while (arr[j] > pivot);
        
        if (i >= j) return j;
        
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// ============================================
// 3. RANDOMIZED QUICK SORT
// ============================================

/**
 * Avoid worst case by choosing random pivot
 * Expected time: O(n log n)
 */
function quickSortRandom(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        // Randomize pivot
        const randomIdx = low + Math.floor(Math.random() * (high - low + 1));
        [arr[randomIdx], arr[high]] = [arr[high], arr[randomIdx]];
        
        const pivotIdx = partition(arr, low, high);
        
        quickSortRandom(arr, low, pivotIdx - 1);
        quickSortRandom(arr, pivotIdx + 1, high);
    }
    
    return arr;
}

// ============================================
// 4. THREE-WAY PARTITION (DUTCH FLAG)
// ============================================

/**
 * Handles duplicates efficiently
 * Partitions into: < pivot, = pivot, > pivot
 */
function quickSort3Way(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const [lt, gt] = partition3Way(arr, low, high);
        
        quickSort3Way(arr, low, lt - 1);
        quickSort3Way(arr, gt + 1, high);
    }
    
    return arr;
}

function partition3Way(arr, low, high) {
    const pivot = arr[low]; // Could randomize
    let lt = low, gt = high;
    let i = low + 1;
    
    while (i <= gt) {
        if (arr[i] < pivot) {
            [arr[lt], arr[i]] = [arr[i], arr[lt]];
            lt++;
            i++;
        } else if (arr[i] > pivot) {
            [arr[i], arr[gt]] = [arr[gt], arr[i]];
            gt--;
        } else {
            i++;
        }
    }
    
    return [lt, gt]; // Range of equal elements
}

// ============================================
// 5. MEDIAN OF THREE PIVOT
// ============================================

/**
 * Choose pivot as median of first, middle, last
 * Better pivot selection than random
 */
function quickSortMedian(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIdx = medianOfThree(arr, low, high);
        [arr[pivotIdx], arr[high]] = [arr[high], arr[pivotIdx]];
        
        const p = partition(arr, low, high);
        
        quickSortMedian(arr, low, p - 1);
        quickSortMedian(arr, p + 1, high);
    }
    
    return arr;
}

function medianOfThree(arr, low, high) {
    const mid = low + Math.floor((high - low) / 2);
    
    // Sort low, mid, high
    if (arr[low] > arr[mid]) [arr[low], arr[mid]] = [arr[mid], arr[low]];
    if (arr[low] > arr[high]) [arr[low], arr[high]] = [arr[high], arr[low]];
    if (arr[mid] > arr[high]) [arr[mid], arr[high]] = [arr[high], arr[mid]];
    
    return mid; // Return index of median
}

// ============================================
// 6. ITERATIVE QUICK SORT
// ============================================

/**
 * Use explicit stack instead of recursion
 * Avoids stack overflow for large arrays
 */
function quickSortIterative(arr) {
    const stack = [];
    stack.push([0, arr.length - 1]);
    
    while (stack.length > 0) {
        const [low, high] = stack.pop();
        
        if (low < high) {
            const pivotIdx = partition(arr, low, high);
            
            // Push smaller partition first (optimization)
            if (pivotIdx - low < high - pivotIdx) {
                stack.push([pivotIdx + 1, high]);
                stack.push([low, pivotIdx - 1]);
            } else {
                stack.push([low, pivotIdx - 1]);
                stack.push([pivotIdx + 1, high]);
            }
        }
    }
    
    return arr;
}

// ============================================
// 7. QUICK SORT WITH INSERTION SORT
// ============================================

/**
 * Hybrid approach for better performance
 * Switch to insertion sort for small subarrays
 */
function quickSortHybrid(arr, low = 0, high = arr.length - 1, threshold = 16) {
    if (high - low + 1 <= threshold) {
        insertionSort(arr, low, high);
        return arr;
    }
    
    if (low < high) {
        const pivotIdx = partition(arr, low, high);
        
        quickSortHybrid(arr, low, pivotIdx - 1, threshold);
        quickSortHybrid(arr, pivotIdx + 1, high, threshold);
    }
    
    return arr;
}

function insertionSort(arr, low, high) {
    for (let i = low + 1; i <= high; i++) {
        const key = arr[i];
        let j = i - 1;
        
        while (j >= low && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// ============================================
// 8. QUICK SELECT (Kth SMALLEST)
// ============================================

/**
 * Find kth smallest element without full sort
 * Average O(n), worst O(n²)
 */
function quickSelect(arr, k) {
    return quickSelectHelper(arr, 0, arr.length - 1, k - 1);
}

function quickSelectHelper(arr, low, high, k) {
    if (low === high) return arr[low];
    
    // Randomize pivot
    const randomIdx = low + Math.floor(Math.random() * (high - low + 1));
    [arr[randomIdx], arr[high]] = [arr[high], arr[randomIdx]];
    
    const pivotIdx = partition(arr, low, high);
    
    if (k === pivotIdx) {
        return arr[k];
    } else if (k < pivotIdx) {
        return quickSelectHelper(arr, low, pivotIdx - 1, k);
    } else {
        return quickSelectHelper(arr, pivotIdx + 1, high, k);
    }
}

// ============================================
// 9. TAIL RECURSION OPTIMIZATION
// ============================================

/**
 * Eliminate one recursive call
 * Reduces stack depth
 */
function quickSortTailOptimized(arr, low = 0, high = arr.length - 1) {
    while (low < high) {
        const pivotIdx = partition(arr, low, high);
        
        // Recurse on smaller partition
        if (pivotIdx - low < high - pivotIdx) {
            quickSortTailOptimized(arr, low, pivotIdx - 1);
            low = pivotIdx + 1;
        } else {
            quickSortTailOptimized(arr, pivotIdx + 1, high);
            high = pivotIdx - 1;
        }
    }
    
    return arr;
}

// ============================================
// 10. SORT LINKED LIST
// ============================================

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function quickSortList(head) {
    if (!head || !head.next) return head;
    
    // Use first node as pivot
    const pivot = head;
    head = head.next;
    pivot.next = null;
    
    // Partition into less and greater
    let lessHead = null, lessTail = null;
    let greaterHead = null, greaterTail = null;
    
    while (head) {
        const next = head.next;
        head.next = null;
        
        if (head.val < pivot.val) {
            if (!lessHead) {
                lessHead = lessTail = head;
            } else {
                lessTail.next = head;
                lessTail = head;
            }
        } else {
            if (!greaterHead) {
                greaterHead = greaterTail = head;
            } else {
                greaterTail.next = head;
                greaterTail = head;
            }
        }
        
        head = next;
    }
    
    // Recursively sort partitions
    lessHead = quickSortList(lessHead);
    greaterHead = quickSortList(greaterHead);
    
    // Connect partitions
    pivot.next = greaterHead;
    
    if (!lessHead) return pivot;
    
    let tail = lessHead;
    while (tail.next) tail = tail.next;
    tail.next = pivot;
    
    return lessHead;
}

module.exports = {
    quickSort,
    quickSortHoare,
    quickSortRandom,
    quickSort3Way,
    quickSortMedian,
    quickSortIterative,
    quickSortHybrid,
    quickSelect,
    quickSortTailOptimized,
    quickSortList,
    ListNode
};
