/**
 * ============================================
 * SYSTEM DESIGN PATTERNS FOR INTERVIEWS
 * ============================================
 * 
 * CONCEPT:
 * These are common data structure designs that appear in
 * object-oriented design and coding interviews at MAANG.
 * 
 * COMMON PATTERNS:
 * - LRU Cache
 * - LFU Cache
 * - Iterator
 * - Rate Limiter
 * - Min Stack
 * 
 * INDUSTRY APPLICATIONS:
 * - Caching systems
 * - Database query caching
 * - API rate limiting
 * - Browser history
 */

// ============================================
// 1. LRU CACHE (Least Recently Used)
// ============================================

/**
 * LRU Cache:
 * - When cache is full, evict the least recently used item
 * - All operations must be O(1)
 * 
 * Implementation:
 * - HashMap for O(1) lookup
 * - Doubly Linked List for O(1) removal/insertion
 * 
 * Most recently used at tail, least at head
 */

class LRUNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // key → node
        
        // Dummy head and tail for easier operations
        this.head = new LRUNode(0, 0);
        this.tail = new LRUNode(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    
    /**
     * Get value - O(1)
     * Move accessed node to tail (most recent)
     */
    get(key) {
        if (!this.cache.has(key)) return -1;
        
        const node = this.cache.get(key);
        this._moveToTail(node);
        return node.value;
    }
    
    /**
     * Put key-value - O(1)
     * If exists: update and move to tail
     * If new: add to tail, evict head if over capacity
     */
    put(key, value) {
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            node.value = value;
            this._moveToTail(node);
        } else {
            const newNode = new LRUNode(key, value);
            this.cache.set(key, newNode);
            this._addToTail(newNode);
            
            if (this.cache.size > this.capacity) {
                const lru = this.head.next;
                this._removeNode(lru);
                this.cache.delete(lru.key);
            }
        }
    }
    
    _removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    _addToTail(node) {
        node.prev = this.tail.prev;
        node.next = this.tail;
        this.tail.prev.next = node;
        this.tail.prev = node;
    }
    
    _moveToTail(node) {
        this._removeNode(node);
        this._addToTail(node);
    }
}

// ============================================
// 2. LFU CACHE (Least Frequently Used)
// ============================================

/**
 * LFU Cache:
 * - Evict least frequently used item
 * - If tie, evict least recently used among them
 * - All operations O(1)
 * 
 * Implementation:
 * - HashMap: key → value, frequency
 * - HashMap: frequency → list of keys (in order of use)
 */

class LFUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.minFreq = 0;
        this.keyToVal = new Map();      // key → value
        this.keyToFreq = new Map();     // key → frequency
        this.freqToKeys = new Map();    // frequency → Set of keys (insertion order)
    }
    
    get(key) {
        if (!this.keyToVal.has(key)) return -1;
        
        this._updateFreq(key);
        return this.keyToVal.get(key);
    }
    
    put(key, value) {
        if (this.capacity === 0) return;
        
        if (this.keyToVal.has(key)) {
            this.keyToVal.set(key, value);
            this._updateFreq(key);
            return;
        }
        
        // Evict if at capacity
        if (this.keyToVal.size >= this.capacity) {
            const keysAtMinFreq = this.freqToKeys.get(this.minFreq);
            const lfu = keysAtMinFreq.values().next().value; // First (LRU among LFU)
            keysAtMinFreq.delete(lfu);
            this.keyToVal.delete(lfu);
            this.keyToFreq.delete(lfu);
        }
        
        // Add new key
        this.keyToVal.set(key, value);
        this.keyToFreq.set(key, 1);
        if (!this.freqToKeys.has(1)) {
            this.freqToKeys.set(1, new Set());
        }
        this.freqToKeys.get(1).add(key);
        this.minFreq = 1;
    }
    
    _updateFreq(key) {
        const freq = this.keyToFreq.get(key);
        this.keyToFreq.set(key, freq + 1);
        
        // Remove from current frequency list
        this.freqToKeys.get(freq).delete(key);
        
        // Update minFreq if needed
        if (this.freqToKeys.get(freq).size === 0) {
            this.freqToKeys.delete(freq);
            if (this.minFreq === freq) {
                this.minFreq++;
            }
        }
        
        // Add to new frequency list
        if (!this.freqToKeys.has(freq + 1)) {
            this.freqToKeys.set(freq + 1, new Set());
        }
        this.freqToKeys.get(freq + 1).add(key);
    }
}

// ============================================
// 3. ITERATOR PATTERNS
// ============================================

/**
 * Flatten Nested List Iterator
 */
class NestedIterator {
    constructor(nestedList) {
        this.stack = [];
        this._flatten(nestedList);
        this.index = 0;
    }
    
    _flatten(list) {
        for (const item of list) {
            if (typeof item === 'number') {
                this.stack.push(item);
            } else {
                this._flatten(item);
            }
        }
    }
    
    hasNext() {
        return this.index < this.stack.length;
    }
    
    next() {
        return this.stack[this.index++];
    }
}

/**
 * Peeking Iterator
 */
class PeekingIterator {
    constructor(iterator) {
        this.iterator = iterator;
        this.peekedValue = null;
        this.hasPeeked = false;
    }
    
    peek() {
        if (!this.hasPeeked) {
            this.peekedValue = this.iterator.next();
            this.hasPeeked = true;
        }
        return this.peekedValue;
    }
    
    next() {
        if (this.hasPeeked) {
            this.hasPeeked = false;
            return this.peekedValue;
        }
        return this.iterator.next();
    }
    
    hasNext() {
        return this.hasPeeked || this.iterator.hasNext();
    }
}

/**
 * Zigzag Iterator
 */
class ZigzagIterator {
    constructor(v1, v2) {
        this.vectors = [v1, v2].filter(v => v.length > 0);
        this.indices = this.vectors.map(() => 0);
        this.current = 0;
    }
    
    hasNext() {
        return this.vectors.some((v, i) => this.indices[i] < v.length);
    }
    
    next() {
        // Find next non-empty vector
        while (this.indices[this.current] >= this.vectors[this.current].length) {
            this.current = (this.current + 1) % this.vectors.length;
        }
        
        const val = this.vectors[this.current][this.indices[this.current]++];
        this.current = (this.current + 1) % this.vectors.length;
        return val;
    }
}

// ============================================
// 4. RATE LIMITER
// ============================================

/**
 * Token Bucket Rate Limiter
 * Allows bursts but limits average rate
 */
class TokenBucket {
    constructor(capacity, refillRate) {
        this.capacity = capacity;
        this.tokens = capacity;
        this.refillRate = refillRate; // tokens per second
        this.lastRefill = Date.now();
    }
    
    allowRequest() {
        this._refill();
        
        if (this.tokens >= 1) {
            this.tokens -= 1;
            return true;
        }
        return false;
    }
    
    _refill() {
        const now = Date.now();
        const elapsed = (now - this.lastRefill) / 1000;
        this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.refillRate);
        this.lastRefill = now;
    }
}

/**
 * Sliding Window Rate Limiter
 * Exact count in sliding time window
 */
class SlidingWindowRateLimiter {
    constructor(windowMs, maxRequests) {
        this.windowMs = windowMs;
        this.maxRequests = maxRequests;
        this.requests = [];
    }
    
    allowRequest() {
        const now = Date.now();
        
        // Remove old requests outside window
        const windowStart = now - this.windowMs;
        while (this.requests.length && this.requests[0] < windowStart) {
            this.requests.shift();
        }
        
        if (this.requests.length < this.maxRequests) {
            this.requests.push(now);
            return true;
        }
        
        return false;
    }
}

// ============================================
// 5. MIN STACK / MAX STACK
// ============================================

/**
 * Stack that supports getMin() in O(1)
 */
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }
    
    push(val) {
        this.stack.push(val);
        const min = this.minStack.length === 0 
            ? val 
            : Math.min(val, this.minStack[this.minStack.length - 1]);
        this.minStack.push(min);
    }
    
    pop() {
        this.stack.pop();
        this.minStack.pop();
    }
    
    top() {
        return this.stack[this.stack.length - 1];
    }
    
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}

/**
 * Stack that supports getMax() in O(1)
 */
class MaxStack {
    constructor() {
        this.stack = [];
        this.maxStack = [];
    }
    
    push(val) {
        this.stack.push(val);
        const max = this.maxStack.length === 0 
            ? val 
            : Math.max(val, this.maxStack[this.maxStack.length - 1]);
        this.maxStack.push(max);
    }
    
    pop() {
        this.maxStack.pop();
        return this.stack.pop();
    }
    
    top() {
        return this.stack[this.stack.length - 1];
    }
    
    peekMax() {
        return this.maxStack[this.maxStack.length - 1];
    }
}

// ============================================
// 6. RANDOM DATA STRUCTURES
// ============================================

/**
 * Insert Delete GetRandom O(1)
 */
class RandomizedSet {
    constructor() {
        this.map = new Map(); // val → index
        this.list = [];
    }
    
    insert(val) {
        if (this.map.has(val)) return false;
        
        this.map.set(val, this.list.length);
        this.list.push(val);
        return true;
    }
    
    remove(val) {
        if (!this.map.has(val)) return false;
        
        const idx = this.map.get(val);
        const last = this.list[this.list.length - 1];
        
        // Swap with last element
        this.list[idx] = last;
        this.map.set(last, idx);
        
        // Remove last element
        this.list.pop();
        this.map.delete(val);
        
        return true;
    }
    
    getRandom() {
        const idx = Math.floor(Math.random() * this.list.length);
        return this.list[idx];
    }
}

// ============================================
// 7. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1: Design Twitter
 */
class Twitter {
    constructor() {
        this.tweets = new Map();     // userId → [{tweetId, time}]
        this.following = new Map();  // userId → Set<userId>
        this.time = 0;
    }
    
    postTweet(userId, tweetId) {
        if (!this.tweets.has(userId)) {
            this.tweets.set(userId, []);
        }
        this.tweets.get(userId).push({ tweetId, time: this.time++ });
    }
    
    getNewsFeed(userId) {
        const candidates = [];
        
        // Get own tweets
        if (this.tweets.has(userId)) {
            candidates.push(...this.tweets.get(userId));
        }
        
        // Get followed users' tweets
        if (this.following.has(userId)) {
            for (const followeeId of this.following.get(userId)) {
                if (this.tweets.has(followeeId)) {
                    candidates.push(...this.tweets.get(followeeId));
                }
            }
        }
        
        // Sort by time descending, take 10 most recent
        candidates.sort((a, b) => b.time - a.time);
        return candidates.slice(0, 10).map(t => t.tweetId);
    }
    
    follow(followerId, followeeId) {
        if (followerId === followeeId) return;
        if (!this.following.has(followerId)) {
            this.following.set(followerId, new Set());
        }
        this.following.get(followerId).add(followeeId);
    }
    
    unfollow(followerId, followeeId) {
        if (this.following.has(followerId)) {
            this.following.get(followerId).delete(followeeId);
        }
    }
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * DESIGN PATTERNS CHEAT SHEET:
 * 
 * LRU CACHE:
 * - HashMap + Doubly Linked List
 * - O(1) get, O(1) put
 * - Most recent at tail, evict from head
 * 
 * LFU CACHE:
 * - HashMap for key→val, key→freq, freq→keys
 * - Track minFreq for O(1) eviction
 * 
 * MIN/MAX STACK:
 * - Two stacks: main + min/max tracking
 * - Each push records current min/max
 * 
 * RANDOMIZED SET:
 * - HashMap + Array
 * - Swap with last for O(1) delete
 * 
 * RATE LIMITER:
 * - Token Bucket: Allows bursts
 * - Sliding Window: Exact count
 * 
 * COMMON INTERVIEW PATTERNS:
 * - "Design a cache" → LRU/LFU
 * - "Get min/max in O(1)" → Extra tracking stack
 * - "Random in O(1)" → Array + HashMap
 * - "Limit requests" → Rate limiter
 */

module.exports = { 
    LRUCache,
    LFUCache,
    NestedIterator,
    PeekingIterator,
    ZigzagIterator,
    TokenBucket,
    SlidingWindowRateLimiter,
    MinStack,
    MaxStack,
    RandomizedSet,
    Twitter
};
