/**
 * MIN/MAX HEAP OPERATIONS
 */

// Build heap from array - O(n)
function buildMinHeap(arr) {
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) heapifyMin(arr, arr.length, i);
    return arr;
}

function heapifyMin(arr, n, i) {
    let smallest = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] < arr[smallest]) smallest = l;
    if (r < n && arr[r] < arr[smallest]) smallest = r;
    if (smallest !== i) {
        [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
        heapifyMin(arr, n, smallest);
    }
}

function buildMaxHeap(arr) {
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) heapifyMax(arr, arr.length, i);
    return arr;
}

function heapifyMax(arr, n, i) {
    let largest = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapifyMax(arr, n, largest);
    }
}

// Kth largest element
function findKthLargest(nums, k) {
    buildMinHeap(nums.slice(0, k));
    const heap = nums.slice(0, k);
    for (let i = k; i < nums.length; i++) {
        if (nums[i] > heap[0]) {
            heap[0] = nums[i];
            heapifyMin(heap, k, 0);
        }
    }
    return heap[0];
}

module.exports = { buildMinHeap, buildMaxHeap, findKthLargest };
