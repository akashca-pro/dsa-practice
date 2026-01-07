/**
 * ============================================
 * DEQUE (Double-Ended Queue)
 * ============================================
 */

class Deque {
    constructor() {
        this.items = {};
        this.head = 0;
        this.tail = 0;
    }
    
    addFront(item) { this.items[--this.head] = item; }
    addBack(item) { this.items[this.tail++] = item; }
    
    removeFront() {
        if (this.isEmpty()) return undefined;
        const item = this.items[this.head];
        delete this.items[this.head++];
        return item;
    }
    
    removeBack() {
        if (this.isEmpty()) return undefined;
        const item = this.items[--this.tail];
        delete this.items[this.tail];
        return item;
    }
    
    peekFront() { return this.items[this.head]; }
    peekBack() { return this.items[this.tail - 1]; }
    isEmpty() { return this.tail === this.head; }
    size() { return this.tail - this.head; }
}

// Sliding window maximum using monotonic deque
function maxSlidingWindow(nums, k) {
    const result = [];
    const deque = []; // Store indices
    
    for (let i = 0; i < nums.length; i++) {
        // Remove out-of-window indices
        while (deque.length && deque[0] < i - k + 1) {
            deque.shift();
        }
        
        // Remove smaller elements (they'll never be max)
        while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        
        deque.push(i);
        
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    
    return result;
}

module.exports = { Deque, maxSlidingWindow };
