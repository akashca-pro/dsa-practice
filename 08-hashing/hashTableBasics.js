/**
 * ============================================
 * HASH TABLE BASICS
 * ============================================
 * 
 * CONCEPT:
 * A hash table (hash map) is a data structure that maps keys to values
 * using a hash function. It provides near O(1) average time for
 * insert, delete, and lookup operations.
 * 
 * How it works:
 * 1. Hash function converts key to array index
 * 2. Store value at that index
 * 3. Handle collisions when different keys hash to same index
 * 
 * REAL-WORLD ANALOGY:
 * Library Card Catalog:
 * - Books (values) are stored by call number (hash)
 * - To find a book, you don't search every shelf
 * - You use the call number to go directly to the location
 * - Multiple books might be in the same section (collision)
 * 
 * INDUSTRY APPLICATIONS:
 * - Database indexing
 * - Caching (Redis, Memcached)
 * - Symbol tables in compilers
 * - Spell checkers (dictionary lookup)
 * - Router tables (IP lookup)
 * - Deduplication
 * 
 * COMPLEXITY:
 * | Operation | Average | Worst (many collisions) |
 * |-----------|---------|-------------------------|
 * | Insert    | O(1)    | O(n)                    |
 * | Delete    | O(1)    | O(n)                    |
 * | Search    | O(1)    | O(n)                    |
 * 
 * Space: O(n)
 * Load Factor: n/size (keep below 0.75 for good performance)
 */

// ============================================
// 1. HASH TABLE IMPLEMENTATION
// ============================================

/**
 * Hash Table with Separate Chaining
 * 
 * Collision handling: Each bucket is a list of [key, value] pairs
 * When collision occurs, append to the list
 */
class HashTable {
    constructor(size = 53) {
        this.keyMap = new Array(size);
        this.size = size;
        this.count = 0;
    }
    
    /**
     * Hash Function
     * 
     * Good hash functions:
     * - Distribute keys uniformly
     * - Are deterministic (same input = same output)
     * - Are fast to compute
     * 
     * Using prime number (31) helps reduce collisions
     */
    _hash(key) {
        let total = 0;
        const PRIME = 31;
        
        // Only hash first 100 chars for efficiency
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            const charCode = key.charCodeAt(i);
            total = (total * PRIME + charCode) % this.size;
        }
        
        return total;
    }
    
    /**
     * Set: Insert or update key-value pair - O(1) average
     */
    set(key, value) {
        const idx = this._hash(key);
        
        // Initialize bucket if empty
        if (!this.keyMap[idx]) {
            this.keyMap[idx] = [];
        }
        
        // Check if key already exists (update)
        for (const pair of this.keyMap[idx]) {
            if (pair[0] === key) {
                pair[1] = value;
                return;
            }
        }
        
        // Add new key-value pair
        this.keyMap[idx].push([key, value]);
        this.count++;
    }
    
    /**
     * Get: Retrieve value by key - O(1) average
     */
    get(key) {
        const idx = this._hash(key);
        
        if (!this.keyMap[idx]) return undefined;
        
        for (const pair of this.keyMap[idx]) {
            if (pair[0] === key) return pair[1];
        }
        
        return undefined;
    }
    
    /**
     * Delete: Remove key-value pair - O(1) average
     */
    delete(key) {
        const idx = this._hash(key);
        
        if (!this.keyMap[idx]) return false;
        
        const bucket = this.keyMap[idx];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.count--;
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Check if key exists - O(1) average
     */
    has(key) {
        return this.get(key) !== undefined;
    }
    
    /**
     * Get all keys - O(n)
     */
    keys() {
        const keys = [];
        for (const bucket of this.keyMap) {
            if (bucket) {
                for (const [key] of bucket) {
                    keys.push(key);
                }
            }
        }
        return keys;
    }
    
    /**
     * Get all values - O(n)
     */
    values() {
        const values = [];
        for (const bucket of this.keyMap) {
            if (bucket) {
                for (const [, value] of bucket) {
                    values.push(value);
                }
            }
        }
        return values;
    }
    
    /**
     * Get all entries - O(n)
     */
    entries() {
        const entries = [];
        for (const bucket of this.keyMap) {
            if (bucket) {
                for (const pair of bucket) {
                    entries.push([...pair]);
                }
            }
        }
        return entries;
    }
}

// ============================================
// 2. HASH TABLE WITH OPEN ADDRESSING
// ============================================

/**
 * Linear Probing: Alternative collision handling
 * 
 * Instead of chaining, find next empty slot
 * When bucket is full, check bucket+1, bucket+2, etc.
 */
class HashTableLinearProbing {
    constructor(size = 53) {
        this.keys = new Array(size);
        this.values = new Array(size);
        this.size = size;
        this.count = 0;
    }
    
    _hash(key) {
        let total = 0;
        const PRIME = 31;
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            total = (total * PRIME + key.charCodeAt(i)) % this.size;
        }
        return total;
    }
    
    set(key, value) {
        // Resize if load factor > 0.7
        if (this.count / this.size > 0.7) {
            this._resize();
        }
        
        let idx = this._hash(key);
        
        // Linear probing: find empty slot or existing key
        while (this.keys[idx] !== undefined && this.keys[idx] !== key) {
            idx = (idx + 1) % this.size;
        }
        
        if (this.keys[idx] === undefined) {
            this.count++;
        }
        
        this.keys[idx] = key;
        this.values[idx] = value;
    }
    
    get(key) {
        let idx = this._hash(key);
        let probes = 0;
        
        while (this.keys[idx] !== undefined && probes < this.size) {
            if (this.keys[idx] === key) {
                return this.values[idx];
            }
            idx = (idx + 1) % this.size;
            probes++;
        }
        
        return undefined;
    }
    
    _resize() {
        const oldKeys = this.keys;
        const oldValues = this.values;
        
        this.size = this.size * 2;
        this.keys = new Array(this.size);
        this.values = new Array(this.size);
        this.count = 0;
        
        for (let i = 0; i < oldKeys.length; i++) {
            if (oldKeys[i] !== undefined) {
                this.set(oldKeys[i], oldValues[i]);
            }
        }
    }
}

// ============================================
// 3. COMMON MISTAKES & EDGE CASES
// ============================================

/**
 * Mistake 1: Not handling collisions
 * Without collision handling, we lose data
 * 
 * Mistake 2: Poor hash function
 * Bad distribution leads to many collisions
 * 
 * Mistake 3: Not resizing
 * High load factor degrades to O(n)
 * 
 * Mistake 4: Using mutable objects as keys
 * If key changes, hash changes, lookup fails
 * 
 * Edge Cases:
 * - Empty string as key
 * - Very long keys
 * - Duplicate keys (should update, not duplicate)
 * - Deleting non-existent key
 */

// ============================================
// 4. INTERVIEW PERSPECTIVE
// ============================================

/**
 * When to use hash table:
 * 
 * 1. FREQUENCY COUNTING: Count occurrences
 * 2. DEDUPLICATION: Track seen elements
 * 3. GROUPING: Group anagrams, etc.
 * 4. CACHING: Store computed results
 * 5. TWO SUM PATTERN: Find complement
 * 
 * JavaScript built-ins:
 * - Object {}: String keys only, prototype chain issues
 * - Map(): Any key type, maintains insertion order
 * - Set(): Values only, no duplicates
 * 
 * Interview tip:
 * "Can I trade space for time with a hash table?"
 * Often converts O(n²) to O(n)
 */

// ============================================
// 5. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Easy): Two Sum
 */
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}

/**
 * Problem 2 (Easy): Valid Anagram
 */
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    
    const count = new Map();
    
    for (const c of s) {
        count.set(c, (count.get(c) || 0) + 1);
    }
    
    for (const c of t) {
        if (!count.has(c) || count.get(c) === 0) {
            return false;
        }
        count.set(c, count.get(c) - 1);
    }
    
    return true;
}

/**
 * Problem 3 (Medium): Group Anagrams
 */
function groupAnagrams(strs) {
    const map = new Map();
    
    for (const s of strs) {
        // Sort string to create key
        const key = s.split('').sort().join('');
        
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key).push(s);
    }
    
    return Array.from(map.values());
}

/**
 * Problem 4 (Medium): Longest Consecutive Sequence
 */
function longestConsecutive(nums) {
    const set = new Set(nums);
    let longest = 0;
    
    for (const num of set) {
        // Only start counting if this is sequence start
        if (!set.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;
            
            while (set.has(currentNum + 1)) {
                currentNum++;
                currentStreak++;
            }
            
            longest = Math.max(longest, currentStreak);
        }
    }
    
    return longest;
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * HASH TABLE CHEAT SHEET:
 * 
 * COMPLEXITY (Average):
 * - Insert: O(1)
 * - Delete: O(1)
 * - Search: O(1)
 * 
 * COLLISION HANDLING:
 * - Separate Chaining: Buckets are linked lists
 * - Open Addressing: Probe for next empty slot
 * 
 * GOOD HASH FUNCTION:
 * - Deterministic
 * - Uniform distribution
 * - Fast to compute
 * 
 * JAVASCRIPT OPTIONS:
 * - Object: { } - simple, string keys only
 * - Map: new Map() - any key type, ordered
 * - Set: new Set() - unique values only
 * 
 * COMMON PATTERNS:
 * - Two Sum: Find complement
 * - Frequency counting: Count occurrences
 * - Deduplication: Track seen items
 * - Grouping: Group by computed key
 * 
 * INTERVIEW TIP:
 * Hash table often converts O(n²) brute force to O(n)!
 */

module.exports = { 
    HashTable, 
    HashTableLinearProbing,
    twoSum,
    isAnagram,
    groupAnagrams,
    longestConsecutive
};
