/**
 * ============================================
 * INSERTION SORT
 * ============================================
 * 
 * CONCEPT:
 * Insertion Sort builds the sorted array one element at a time by
 * inserting each new element into its correct position among the
 * previously sorted elements.
 * 
 * REAL-WORLD ANALOGY:
 * Like sorting playing cards in your hand - pick up each card
 * and insert it into the correct position among already sorted cards.
 * 
 * COMPLEXITY:
 * Time: O(n²) average/worst, O(n) best (nearly sorted)
 * Space: O(1) - in-place
 * Stable: Yes
 * 
 * BEST FOR:
 * - Small arrays (n < 10-20)
 * - Nearly sorted arrays
 * - Online sorting (data arrives one at a time)
 */

// ============================================
// 1. BASIC IMPLEMENTATION
// ============================================

function insertionSort(arr) {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        
        // Shift elements greater than key to the right
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Insert key at correct position
        arr[j + 1] = key;
    }
    
    return arr;
}

// ============================================
// 2. BINARY INSERTION SORT
// ============================================

/**
 * Uses binary search to find insertion position
 * Reduces comparisons but shifts remain O(n)
 * Total: O(n log n) comparisons, O(n²) shifts
 */
function binaryInsertionSort(arr) {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        
        // Binary search for insertion position
        let left = 0;
        let right = i;
        
        while (left < right) {
            const mid = left + Math.floor((right - left) / 2);
            if (arr[mid] <= key) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        // Shift elements and insert
        for (let j = i; j > left; j--) {
            arr[j] = arr[j - 1];
        }
        arr[left] = key;
    }
    
    return arr;
}

// ============================================
// 3. WITH VISUALIZATION
// ============================================

function insertionSortWithSteps(arr) {
    const n = arr.length;
    const steps = [];
    
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        let insertPos = i;
        
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            insertPos = j;
            j--;
        }
        
        arr[j + 1] = key;
        
        steps.push({
            element: key,
            from: i,
            to: insertPos,
            array: [...arr]
        });
    }
    
    return { sorted: arr, steps };
}

// ============================================
// 4. RECURSIVE VERSION
// ============================================

function insertionSortRecursive(arr, n = arr.length) {
    if (n <= 1) return arr;
    
    // Sort first n-1 elements
    insertionSortRecursive(arr, n - 1);
    
    // Insert nth element into sorted portion
    const key = arr[n - 1];
    let j = n - 2;
    
    while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = key;
    
    return arr;
}

// ============================================
// 5. SORT LINKED LIST
// ============================================

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function insertionSortList(head) {
    if (!head || !head.next) return head;
    
    const dummy = new ListNode(0);
    let curr = head;
    
    while (curr) {
        const nextTemp = curr.next;
        
        // Find insertion position
        let prev = dummy;
        while (prev.next && prev.next.val < curr.val) {
            prev = prev.next;
        }
        
        // Insert current node
        curr.next = prev.next;
        prev.next = curr;
        
        curr = nextTemp;
    }
    
    return dummy.next;
}

// ============================================
// 6. DESCENDING ORDER
// ============================================

function insertionSortDescending(arr) {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        
        while (j >= 0 && arr[j] < key) { // Changed comparison
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;
    }
    
    return arr;
}

// ============================================
// 7. SORT PART OF ARRAY
// ============================================

function insertionSortRange(arr, left, right) {
    for (let i = left + 1; i <= right; i++) {
        const key = arr[i];
        let j = i - 1;
        
        while (j >= left && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;
    }
    
    return arr;
}

module.exports = { 
    insertionSort, 
    binaryInsertionSort,
    insertionSortRecursive,
    insertionSortList,
    insertionSortDescending,
    insertionSortRange,
    ListNode
};
