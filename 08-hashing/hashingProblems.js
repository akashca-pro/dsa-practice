/**
 * ============================================
 * HASHING PROBLEMS - COMPREHENSIVE GUIDE
 * ============================================
 * 
 * LEARNING ORDER:
 * 1. Counting & Frequency
 * 2. Two Sum Pattern
 * 3. Subarray Sum Problems
 * 4. Anagram & Grouping
 * 5. Design Problems
 */

// ============================================
// CATEGORY 1: COUNTING & FREQUENCY
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - Word frequency in documents
 * - Vote counting
 * - Inventory management
 * - Analytics dashboards
 * 
 * KEY INSIGHT: Hash map gives O(1) count lookup
 */

// ------------------------------------------
// 1.1 SINGLE NUMBER
// ------------------------------------------

/**
 * Problem: Find the element that appears once (others appear twice)
 * 
 * Real-world: Find the unique ID in duplicates
 * 
 * XOR trick: a ^ a = 0, a ^ 0 = a
 */
function singleNumber(nums) {
    let result = 0;
    for (const num of nums) {
        result ^= num;
    }
    return result;
}

// Hash map approach (works for any count)
function singleNumberHash(nums) {
    const count = new Map();
    for (const num of nums) {
        count.set(num, (count.get(num) || 0) + 1);
    }
    for (const [num, c] of count) {
        if (c === 1) return num;
    }
    return -1;
}

/**
 * RELATED QUESTIONS:
 * - Single Number II (LeetCode 137) - appears once, others 3 times
 * - Single Number III (LeetCode 260) - two elements appear once
 */

// ------------------------------------------
// 1.2 FIRST UNIQUE CHARACTER
// ------------------------------------------

/**
 * Problem: Find first non-repeating character
 * 
 * Real-world: First available username character
 */
function firstUniqChar(s) {
    const count = new Map();
    
    for (const char of s) {
        count.set(char, (count.get(char) || 0) + 1);
    }
    
    for (let i = 0; i < s.length; i++) {
        if (count.get(s[i]) === 1) return i;
    }
    
    return -1;
}

// ------------------------------------------
// 1.3 MAJORITY ELEMENT
// ------------------------------------------

/**
 * Problem: Find element that appears more than n/2 times
 * 
 * Boyer-Moore Voting Algorithm - O(1) space!
 */
function majorityElement(nums) {
    let candidate = null;
    let count = 0;
    
    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }
    
    return candidate;
}

/**
 * RELATED QUESTIONS:
 * - Majority Element (LeetCode 169)
 * - Majority Element II (LeetCode 229) - more than n/3
 */

// ============================================
// CATEGORY 2: TWO SUM PATTERN
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - Finding pairs that sum to budget
 * - Matching complementary items
 * - Security: finding hash collisions
 */

// ------------------------------------------
// 2.1 TWO SUM
// ------------------------------------------

/**
 * Problem: Find two numbers that add to target
 * 
 * The CLASSIC hash map problem!
 */
function twoSum(nums, target) {
    const seen = new Map(); // value -> index
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        
        seen.set(nums[i], i);
    }
    
    return [];
}

/**
 * RELATED QUESTIONS:
 * - Two Sum (LeetCode 1)
 * - Two Sum II - Sorted Array (LeetCode 167)
 * - Two Sum III - Data Structure (LeetCode 170)
 * - Two Sum IV - BST (LeetCode 653)
 */

// ------------------------------------------
// 2.2 FOUR SUM COUNT
// ------------------------------------------

/**
 * Problem: Count tuples where A[i] + B[j] + C[k] + D[l] = 0
 * 
 * Key insight: Split into two groups and use hash map
 */
function fourSumCount(A, B, C, D) {
    const sumAB = new Map();
    
    for (const a of A) {
        for (const b of B) {
            const sum = a + b;
            sumAB.set(sum, (sumAB.get(sum) || 0) + 1);
        }
    }
    
    let count = 0;
    for (const c of C) {
        for (const d of D) {
            const target = -(c + d);
            if (sumAB.has(target)) {
                count += sumAB.get(target);
            }
        }
    }
    
    return count;
}

// ============================================
// CATEGORY 3: SUBARRAY SUM PROBLEMS
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - Contiguous sales meeting target
 * - Finding transaction patterns
 * - Network packet analysis
 * 
 * KEY TECHNIQUE: Prefix sum + hash map
 */

// ------------------------------------------
// 3.1 SUBARRAY SUM EQUALS K
// ------------------------------------------

/**
 * Problem: Count subarrays with sum = k
 * 
 * Key insight: If prefixSum[j] - prefixSum[i] = k,
 * then subarray [i+1, j] has sum k
 */
function subarraySum(nums, k) {
    const prefixCount = new Map([[0, 1]]); // prefix sum -> count
    let sum = 0;
    let count = 0;
    
    for (const num of nums) {
        sum += num;
        
        // If (sum - k) exists, we found subarrays with sum k
        if (prefixCount.has(sum - k)) {
            count += prefixCount.get(sum - k);
        }
        
        prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
    }
    
    return count;
}

/**
 * RELATED QUESTIONS:
 * - Subarray Sum Equals K (LeetCode 560)
 * - Continuous Subarray Sum (LeetCode 523)
 * - Subarray Sums Divisible by K (LeetCode 974)
 */

// ------------------------------------------
// 3.2 CONTIGUOUS ARRAY (Equal 0s and 1s)
// ------------------------------------------

/**
 * Problem: Longest subarray with equal 0s and 1s
 * 
 * Trick: Replace 0 with -1, find longest subarray with sum 0
 */
function findMaxLength(nums) {
    const sumIndex = new Map([[0, -1]]); // sum -> first index
    let sum = 0;
    let maxLen = 0;
    
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i] === 0 ? -1 : 1;
        
        if (sumIndex.has(sum)) {
            maxLen = Math.max(maxLen, i - sumIndex.get(sum));
        } else {
            sumIndex.set(sum, i);
        }
    }
    
    return maxLen;
}

// ============================================
// CATEGORY 4: ANAGRAM & GROUPING
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - Word games (Scrabble)
 * - Detecting plagiarism
 * - Grouping similar items
 */

// ------------------------------------------
// 4.1 VALID ANAGRAM
// ------------------------------------------

/**
 * Problem: Check if two strings are anagrams
 */
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    
    const count = new Map();
    
    for (const char of s) {
        count.set(char, (count.get(char) || 0) + 1);
    }
    
    for (const char of t) {
        if (!count.has(char) || count.get(char) === 0) {
            return false;
        }
        count.set(char, count.get(char) - 1);
    }
    
    return true;
}

// ------------------------------------------
// 4.2 GROUP ANAGRAMS
// ------------------------------------------

/**
 * Problem: Group words that are anagrams
 * 
 * Key: Use sorted string as key
 */
function groupAnagrams(strs) {
    const groups = new Map();
    
    for (const str of strs) {
        const key = str.split('').sort().join('');
        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key).push(str);
    }
    
    return Array.from(groups.values());
}

// Alternative: Use character count as key
function groupAnagramsCount(strs) {
    const groups = new Map();
    
    for (const str of strs) {
        const count = new Array(26).fill(0);
        for (const char of str) {
            count[char.charCodeAt(0) - 97]++;
        }
        const key = count.join('#');
        
        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key).push(str);
    }
    
    return Array.from(groups.values());
}

/**
 * RELATED QUESTIONS:
 * - Valid Anagram (LeetCode 242)
 * - Group Anagrams (LeetCode 49)
 * - Find All Anagrams in String (LeetCode 438)
 */

// ------------------------------------------
// 4.3 FIND ALL ANAGRAMS IN STRING
// ------------------------------------------

/**
 * Problem: Find all start indices of p's anagrams in s
 * 
 * Sliding window with character count
 */
function findAnagrams(s, p) {
    if (s.length < p.length) return [];
    
    const pCount = new Array(26).fill(0);
    const sCount = new Array(26).fill(0);
    const result = [];
    
    for (const char of p) {
        pCount[char.charCodeAt(0) - 97]++;
    }
    
    for (let i = 0; i < s.length; i++) {
        sCount[s.charCodeAt(i) - 97]++;
        
        if (i >= p.length) {
            sCount[s.charCodeAt(i - p.length) - 97]--;
        }
        
        if (i >= p.length - 1) {
            if (pCount.join() === sCount.join()) {
                result.push(i - p.length + 1);
            }
        }
    }
    
    return result;
}

// ============================================
// CATEGORY 5: DESIGN PROBLEMS
// ============================================

// ------------------------------------------
// 5.1 LRU CACHE
// ------------------------------------------

/**
 * Problem: Implement LRU cache with O(1) operations
 * 
 * Use Hash Map + Doubly Linked List
 */
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }
    
    get(key) {
        if (!this.cache.has(key)) return -1;
        
        // Move to end (most recent)
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        
        return value;
    }
    
    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        
        this.cache.set(key, value);
        
        if (this.cache.size > this.capacity) {
            // Delete oldest (first key)
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
    }
}

// ------------------------------------------
// 5.2 CONTAINS DUPLICATE II
// ------------------------------------------

/**
 * Problem: Check if duplicate exists within k distance
 */
function containsNearbyDuplicate(nums, k) {
    const seen = new Map(); // value -> last index
    
    for (let i = 0; i < nums.length; i++) {
        if (seen.has(nums[i]) && i - seen.get(nums[i]) <= k) {
            return true;
        }
        seen.set(nums[i], i);
    }
    
    return false;
}

// ============================================
// SUMMARY
// ============================================

/**
 * HASHING CHEAT SHEET:
 * 
 * WHEN TO USE HASH MAP:
 * - Need O(1) lookup by key
 * - Counting occurrences
 * - Finding pairs/complements
 * - Grouping by some property
 * 
 * COMMON PATTERNS:
 * 1. COUNTING: freq[x]++
 * 2. TWO SUM: seen[target - x]
 * 3. PREFIX SUM: count of (prefixSum - k)
 * 4. ANAGRAM: sorted key or count key
 * 
 * INTERVIEW TIP:
 * When you need O(1) lookup, think hash map!
 * Consider what should be the KEY and VALUE.
 */

module.exports = {
    singleNumber,
    singleNumberHash,
    firstUniqChar,
    majorityElement,
    twoSum,
    fourSumCount,
    subarraySum,
    findMaxLength,
    isAnagram,
    groupAnagrams,
    groupAnagramsCount,
    findAnagrams,
    LRUCache,
    containsNearbyDuplicate
};
