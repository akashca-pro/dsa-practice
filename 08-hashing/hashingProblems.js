/**
 * ============================================
 * HASHING PROBLEMS
 * ============================================
 */

// Two Sum
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) return [map.get(complement), i];
        map.set(nums[i], i);
    }
    return [];
}

// Group Anagrams
function groupAnagrams(strs) {
    const map = new Map();
    for (const s of strs) {
        const key = s.split('').sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(s);
    }
    return Array.from(map.values());
}

// Longest Consecutive Sequence
function longestConsecutive(nums) {
    const set = new Set(nums);
    let longest = 0;
    
    for (const num of set) {
        if (!set.has(num - 1)) {
            let len = 1;
            while (set.has(num + len)) len++;
            longest = Math.max(longest, len);
        }
    }
    
    return longest;
}

// Subarray Sum Equals K
function subarraySum(nums, k) {
    const prefixCount = new Map([[0, 1]]);
    let sum = 0, count = 0;
    
    for (const num of nums) {
        sum += num;
        if (prefixCount.has(sum - k)) count += prefixCount.get(sum - k);
        prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
    }
    
    return count;
}

// Valid Sudoku
function isValidSudoku(board) {
    const rows = new Array(9).fill(null).map(() => new Set());
    const cols = new Array(9).fill(null).map(() => new Set());
    const boxes = new Array(9).fill(null).map(() => new Set());
    
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const num = board[i][j];
            if (num === '.') continue;
            
            const boxIdx = Math.floor(i / 3) * 3 + Math.floor(j / 3);
            
            if (rows[i].has(num) || cols[j].has(num) || boxes[boxIdx].has(num)) {
                return false;
            }
            
            rows[i].add(num);
            cols[j].add(num);
            boxes[boxIdx].add(num);
        }
    }
    
    return true;
}

// Contains Duplicate II
function containsNearbyDuplicate(nums, k) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i]) && i - map.get(nums[i]) <= k) return true;
        map.set(nums[i], i);
    }
    return false;
}

// First Unique Character
function firstUniqChar(s) {
    const count = new Map();
    for (const c of s) count.set(c, (count.get(c) || 0) + 1);
    for (let i = 0; i < s.length; i++) if (count.get(s[i]) === 1) return i;
    return -1;
}

module.exports = { 
    twoSum, groupAnagrams, longestConsecutive, 
    subarraySum, isValidSudoku, containsNearbyDuplicate, firstUniqChar 
};
