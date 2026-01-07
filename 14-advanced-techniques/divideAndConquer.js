/**
 * DIVIDE AND CONQUER
 */

// Merge sort
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    return [...result, ...left.slice(i), ...right.slice(j)];
}

// Quick select (kth smallest)
function quickSelect(arr, k) {
    const pivot = arr[Math.floor(Math.random() * arr.length)];
    const left = arr.filter(x => x < pivot);
    const mid = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    
    if (k <= left.length) return quickSelect(left, k);
    if (k <= left.length + mid.length) return pivot;
    return quickSelect(right, k - left.length - mid.length);
}

// Power function
function pow(x, n) {
    if (n === 0) return 1;
    if (n < 0) return 1 / pow(x, -n);
    const half = pow(x, Math.floor(n / 2));
    return n % 2 === 0 ? half * half : half * half * x;
}

// Maximum subarray (D&C)
function maxSubArrayDC(nums) {
    const helper = (left, right) => {
        if (left === right) return nums[left];
        const mid = Math.floor((left + right) / 2);
        
        let leftSum = -Infinity, rightSum = -Infinity, sum = 0;
        for (let i = mid; i >= left; i--) { sum += nums[i]; leftSum = Math.max(leftSum, sum); }
        sum = 0;
        for (let i = mid + 1; i <= right; i++) { sum += nums[i]; rightSum = Math.max(rightSum, sum); }
        
        return Math.max(helper(left, mid), helper(mid + 1, right), leftSum + rightSum);
    };
    return helper(0, nums.length - 1);
}

// Count inversions
function countInversions(arr) {
    let count = 0;
    const mergeCount = (left, right) => {
        const result = [];
        let i = 0, j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) result.push(left[i++]);
            else { result.push(right[j++]); count += left.length - i; }
        }
        return [...result, ...left.slice(i), ...right.slice(j)];
    };
    
    const sort = (arr) => {
        if (arr.length <= 1) return arr;
        const mid = Math.floor(arr.length / 2);
        return mergeCount(sort(arr.slice(0, mid)), sort(arr.slice(mid)));
    };
    
    sort(arr);
    return count;
}

// Closest pair of points
function closestPair(points) {
    points.sort((a, b) => a[0] - b[0]);
    
    const dist = (p1, p2) => Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
    
    const helper = (pts) => {
        if (pts.length <= 3) {
            let min = Infinity;
            for (let i = 0; i < pts.length; i++) {
                for (let j = i + 1; j < pts.length; j++) {
                    min = Math.min(min, dist(pts[i], pts[j]));
                }
            }
            return min;
        }
        
        const mid = Math.floor(pts.length / 2);
        const left = pts.slice(0, mid), right = pts.slice(mid);
        const d = Math.min(helper(left), helper(right));
        
        const strip = pts.filter(p => Math.abs(p[0] - pts[mid][0]) < d);
        strip.sort((a, b) => a[1] - b[1]);
        
        let minD = d;
        for (let i = 0; i < strip.length; i++) {
            for (let j = i + 1; j < strip.length && strip[j][1] - strip[i][1] < minD; j++) {
                minD = Math.min(minD, dist(strip[i], strip[j]));
            }
        }
        return minD;
    };
    
    return helper(points);
}

module.exports = { mergeSort, quickSelect, pow, maxSubArrayDC, countInversions, closestPair };
