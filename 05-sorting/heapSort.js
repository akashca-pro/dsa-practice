/**
 * ============================================
 * HEAP SORT
 * ============================================
 * 
 * Time: O(n log n) | Space: O(1) | Stable: No
 */

function heapSort(arr) {
    const n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

// Min heap version for descending order
function heapSortDescending(arr) {
    const n = arr.length;
    
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        minHeapify(arr, n, i);
    }
    
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        minHeapify(arr, i, 0);
    }
    
    return arr;
}

function minHeapify(arr, n, i) {
    let smallest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n && arr[left] < arr[smallest]) smallest = left;
    if (right < n && arr[right] < arr[smallest]) smallest = right;
    
    if (smallest !== i) {
        [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
        minHeapify(arr, n, smallest);
    }
}

// Find k largest elements
function kLargest(arr, k) {
    const n = arr.length;
    
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    const result = [];
    let heapSize = n;
    
    for (let i = 0; i < k && heapSize > 0; i++) {
        result.push(arr[0]);
        [arr[0], arr[heapSize - 1]] = [arr[heapSize - 1], arr[0]];
        heapSize--;
        heapify(arr, heapSize, 0);
    }
    
    return result;
}

module.exports = { heapSort, heapSortDescending, kLargest };
