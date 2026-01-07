/**
 * ============================================
 * MERGE SORT
 * ============================================
 * 
 * CONCEPT:
 * Merge Sort is a divide-and-conquer algorithm that recursively divides
 * the array into halves, sorts each half, and merges them back together.
 * 
 * REAL-WORLD ANALOGY:
 * Like sorting a deck of cards by splitting it in half repeatedly
 * until you have single cards, then merging sorted piles together.
 * 
 * COMPLEXITY:
 * Time: O(n log n) in all cases
 * Space: O(n) - requires additional array
 * Stable: Yes
 * 
 * BEST FOR:
 * - Large datasets
 * - Linked lists (can merge without extra space)
 * - External sorting (when data doesn't fit in memory)
 * - When stability is required
 */

// ============================================
// 1. BASIC IMPLEMENTATION
// ============================================

function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    // Add remaining elements
    while (i < left.length) result.push(left[i++]);
    while (j < right.length) result.push(right[j++]);
    
    return result;
}

// ============================================
// 2. IN-PLACE MERGE SORT
// ============================================

/**
 * More memory efficient - modifies original array
 * Still O(n) auxiliary space for merge buffer
 */
function mergeSortInPlace(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        
        mergeSortInPlace(arr, left, mid);
        mergeSortInPlace(arr, mid + 1, right);
        
        mergeInPlace(arr, left, mid, right);
    }
    
    return arr;
}

function mergeInPlace(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k++] = leftArr[i++];
        } else {
            arr[k++] = rightArr[j++];
        }
    }
    
    while (i < leftArr.length) arr[k++] = leftArr[i++];
    while (j < rightArr.length) arr[k++] = rightArr[j++];
}

// ============================================
// 3. ITERATIVE MERGE SORT
// ============================================

/**
 * Bottom-up approach without recursion
 * Avoids call stack overhead
 */
function mergeSortIterative(arr) {
    const n = arr.length;
    
    // Start with size 1, double each iteration
    for (let size = 1; size < n; size *= 2) {
        // Merge subarrays of current size
        for (let left = 0; left < n - size; left += 2 * size) {
            const mid = left + size - 1;
            const right = Math.min(left + 2 * size - 1, n - 1);
            
            mergeInPlace(arr, left, mid, right);
        }
    }
    
    return arr;
}

// ============================================
// 4. WITH INSERTION SORT FOR SMALL ARRAYS
// ============================================

/**
 * Hybrid approach: use insertion sort for small subarrays
 * Often faster in practice (insertion sort has lower overhead)
 */
function mergeSortHybrid(arr, threshold = 16) {
    return mergeSortHybridHelper(arr, 0, arr.length - 1, threshold);
}

function mergeSortHybridHelper(arr, left, right, threshold) {
    if (right - left + 1 <= threshold) {
        // Use insertion sort for small arrays
        for (let i = left + 1; i <= right; i++) {
            const key = arr[i];
            let j = i - 1;
            while (j >= left && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
        return;
    }
    
    const mid = left + Math.floor((right - left) / 2);
    
    mergeSortHybridHelper(arr, left, mid, threshold);
    mergeSortHybridHelper(arr, mid + 1, right, threshold);
    
    // Skip merge if already sorted
    if (arr[mid] <= arr[mid + 1]) return;
    
    mergeInPlace(arr, left, mid, right);
    
    return arr;
}

// ============================================
// 5. MERGE SORTED LINKED LISTS
// ============================================

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function mergeSortList(head) {
    if (!head || !head.next) return head;
    
    // Find middle using slow/fast pointers
    let slow = head, fast = head.next;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // Split the list
    const mid = slow.next;
    slow.next = null;
    
    // Recursively sort both halves
    const left = mergeSortList(head);
    const right = mergeSortList(mid);
    
    // Merge sorted halves
    return mergeList(left, right);
}

function mergeList(l1, l2) {
    const dummy = new ListNode(0);
    let curr = dummy;
    
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            curr.next = l1;
            l1 = l1.next;
        } else {
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next;
    }
    
    curr.next = l1 || l2;
    return dummy.next;
}

// ============================================
// 6. COUNT INVERSIONS
// ============================================

/**
 * Count inversions while merge sorting
 * Inversion: pair (i,j) where i < j but arr[i] > arr[j]
 */
function countInversions(arr) {
    const result = { count: 0 };
    mergeSortCount(arr.slice(), result);
    return result.count;
}

function mergeSortCount(arr, result) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSortCount(arr.slice(0, mid), result);
    const right = mergeSortCount(arr.slice(mid), result);
    
    return mergeCount(left, right, result);
}

function mergeCount(left, right, result) {
    const merged = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            merged.push(left[i++]);
        } else {
            merged.push(right[j++]);
            // All remaining elements in left are inversions
            result.count += left.length - i;
        }
    }
    
    while (i < left.length) merged.push(left[i++]);
    while (j < right.length) merged.push(right[j++]);
    
    return merged;
}

// ============================================
// 7. MERGE K SORTED ARRAYS
// ============================================

function mergeKArrays(arrays) {
    if (arrays.length === 0) return [];
    if (arrays.length === 1) return arrays[0];
    
    return divideAndMerge(arrays, 0, arrays.length - 1);
}

function divideAndMerge(arrays, left, right) {
    if (left === right) return arrays[left];
    
    const mid = left + Math.floor((right - left) / 2);
    const leftMerged = divideAndMerge(arrays, left, mid);
    const rightMerged = divideAndMerge(arrays, mid + 1, right);
    
    return merge(leftMerged, rightMerged);
}

// ============================================
// 8. EXTERNAL MERGE SORT (CONCEPT)
// ============================================

/**
 * For data that doesn't fit in memory:
 * 
 * 1. Divide file into chunks that fit in memory
 * 2. Sort each chunk and write to temp file
 * 3. Merge sorted chunks using k-way merge
 * 
 * Uses:
 * - Buffer for each sorted chunk
 * - Min-heap to efficiently find minimum
 * - Write merged output to final file
 */

// Simulated k-way merge with min-heap concept
function kWayMerge(sortedArrays) {
    const result = [];
    
    // Track current index for each array
    const indices = new Array(sortedArrays.length).fill(0);
    
    while (true) {
        let minVal = Infinity;
        let minIdx = -1;
        
        // Find minimum among all current elements
        for (let i = 0; i < sortedArrays.length; i++) {
            if (indices[i] < sortedArrays[i].length) {
                if (sortedArrays[i][indices[i]] < minVal) {
                    minVal = sortedArrays[i][indices[i]];
                    minIdx = i;
                }
            }
        }
        
        if (minIdx === -1) break;
        
        result.push(minVal);
        indices[minIdx]++;
    }
    
    return result;
}

module.exports = {
    mergeSort,
    mergeSortInPlace,
    mergeSortIterative,
    mergeSortHybrid,
    mergeSortList,
    countInversions,
    mergeKArrays,
    kWayMerge,
    ListNode
};
