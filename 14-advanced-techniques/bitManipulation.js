/**
 * BIT MANIPULATION
 */

// Check if power of 2
const isPowerOfTwo = n => n > 0 && (n & (n - 1)) === 0;

// Count set bits
function countBits(n) {
    let count = 0;
    while (n) { count += n & 1; n >>>= 1; }
    return count;
}

// Single number (appears once, others twice)
const singleNumber = nums => nums.reduce((a, b) => a ^ b, 0);

// Single number II (appears once, others thrice)
function singleNumberII(nums) {
    let ones = 0, twos = 0;
    for (const n of nums) {
        ones = (ones ^ n) & ~twos;
        twos = (twos ^ n) & ~ones;
    }
    return ones;
}

// Missing number
const missingNumber = nums => nums.reduce((a, n, i) => a ^ n ^ i, nums.length);

// Reverse bits
function reverseBits(n) {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>>= 1;
    }
    return result >>> 0;
}

// Hamming distance
const hammingDistance = (x, y) => countBits(x ^ y);

// Subsets using bits
function subsets(nums) {
    const result = [];
    const n = 1 << nums.length;
    for (let i = 0; i < n; i++) {
        const subset = [];
        for (let j = 0; j < nums.length; j++) {
            if (i & (1 << j)) subset.push(nums[j]);
        }
        result.push(subset);
    }
    return result;
}

// Check if kth bit is set
const isKthBitSet = (n, k) => (n & (1 << k)) !== 0;

// Set kth bit
const setKthBit = (n, k) => n | (1 << k);

// Clear kth bit
const clearKthBit = (n, k) => n & ~(1 << k);

// Toggle kth bit
const toggleKthBit = (n, k) => n ^ (1 << k);

module.exports = { 
    isPowerOfTwo, countBits, singleNumber, singleNumberII, 
    missingNumber, reverseBits, hammingDistance, subsets,
    isKthBitSet, setKthBit, clearKthBit, toggleKthBit
};
