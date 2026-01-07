/**
 * ============================================
 * STACK IMPLEMENTATION
 * ============================================
 * 
 * CONCEPT:
 * A stack is a linear data structure that follows LIFO (Last In, First Out).
 * The last element added is the first one to be removed.
 * 
 * Think of it as a stack of plates:
 * - You can only add (push) to the top
 * - You can only remove (pop) from the top
 * - You can only see (peek) the top plate
 * 
 * REAL-WORLD ANALOGY:
 * Browser Back Button:
 * - Each page you visit is "pushed" onto the history stack
 * - Clicking "back" "pops" the current page
 * - The previous page is now on top
 * 
 * Other examples:
 * - Undo/Redo in text editors
 * - Function call stack in programming
 * - Backtracking in maze solving
 * 
 * INDUSTRY APPLICATIONS:
 * - Expression evaluation (calculators)
 * - Syntax parsing (compilers)
 * - Undo functionality in applications
 * - Browser history navigation
 * - Function call management (call stack)
 * - Backtracking algorithms
 * 
 * COMPLEXITY:
 * | Operation | Time | Space |
 * |-----------|------|-------|
 * | Push      | O(1) | O(1)  |
 * | Pop       | O(1) | O(1)  |
 * | Peek      | O(1) | O(1)  |
 * | isEmpty   | O(1) | O(1)  |
 * | Size      | O(1) | O(1)  |
 * 
 * Total Space: O(n) for n elements
 */

// ============================================
// 1. BASIC STACK IMPLEMENTATION
// ============================================

/**
 * Stack using JavaScript array
 * Arrays provide O(1) push/pop at the end
 */
class Stack {
    constructor() {
        this.items = [];
    }
    
    /**
     * Push: Add element to top - O(1)
     */
    push(item) {
        this.items.push(item);
    }
    
    /**
     * Pop: Remove and return top element - O(1)
     * Returns undefined if stack is empty
     */
    pop() {
        return this.items.pop();
    }
    
    /**
     * Peek: View top element without removing - O(1)
     */
    peek() {
        return this.items[this.items.length - 1];
    }
    
    /**
     * Check if stack is empty - O(1)
     */
    isEmpty() {
        return this.items.length === 0;
    }
    
    /**
     * Get number of elements - O(1)
     */
    size() {
        return this.items.length;
    }
    
    /**
     * Remove all elements - O(1)
     */
    clear() {
        this.items = [];
    }
}

// ============================================
// 2. MIN STACK - O(1) GET MINIMUM
// ============================================

/**
 * Stack that supports getMin() in O(1) time
 * 
 * Technique: Use auxiliary stack to track minimums
 * Each position in minStack stores the minimum at that point
 * 
 * Example:
 * Push: 5, 3, 7, 2, 8
 * Stack:    [5, 3, 7, 2, 8]
 * MinStack: [5, 3, 3, 2, 2]  ← Tracks running minimum
 */
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }
    
    push(val) {
        this.stack.push(val);
        
        // Push current minimum to minStack
        const min = this.minStack.length === 0 
            ? val 
            : Math.min(val, this.minStack[this.minStack.length - 1]);
        this.minStack.push(min);
    }
    
    pop() {
        this.minStack.pop();
        return this.stack.pop();
    }
    
    top() {
        return this.stack[this.stack.length - 1];
    }
    
    /**
     * Get minimum element - O(1)
     * Simply return top of minStack
     */
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}

// ============================================
// 3. CLASSIC STACK PROBLEMS
// ============================================

/**
 * Valid Parentheses
 * 
 * Technique: Push expected closing bracket, compare when closing
 * When we see '(', we expect ')' later
 * 
 * Example: "([{}])"
 * See '(' → push ')'   Stack: [)]
 * See '[' → push ']'   Stack: [), ]]
 * See '{' → push '}'   Stack: [), ], }]
 * See '}' → pop, match Stack: [), ]]
 * See ']' → pop, match Stack: [)]
 * See ')' → pop, match Stack: []
 * Empty stack → VALID
 */
function isValidParentheses(s) {
    const stack = [];
    const map = { '(': ')', '[': ']', '{': '}' };
    
    for (const c of s) {
        if (map[c]) {
            // Opening bracket: push expected closing
            stack.push(map[c]);
        } else if (stack.pop() !== c) {
            // Closing bracket: must match expected
            return false;
        }
    }
    
    return stack.length === 0;
}

/**
 * Evaluate Reverse Polish Notation (Postfix)
 * 
 * RPN: Operators come AFTER operands
 * "2 3 +" means 2 + 3
 * "4 13 5 / +" means 4 + (13 / 5) = 4 + 2 = 6
 * 
 * Algorithm:
 * - Number: push to stack
 * - Operator: pop two, compute, push result
 */
function evalRPN(tokens) {
    const stack = [];
    const ops = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b) // Truncate toward zero
    };
    
    for (const t of tokens) {
        if (ops[t]) {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(ops[t](a, b));
        } else {
            stack.push(parseInt(t));
        }
    }
    
    return stack.pop();
}

/**
 * Daily Temperatures - Next Greater Element Pattern
 * 
 * Find days until warmer temperature
 * Input:  [73, 74, 75, 71, 69, 72, 76, 73]
 * Output: [1,  1,  4,  2,  1,  1,  0,  0]
 * 
 * Technique: Monotonic Stack (decreasing)
 * Store indices of temperatures we haven't found answer for
 * When we find a warmer day, pop and calculate distance
 */
function dailyTemperatures(T) {
    const result = new Array(T.length).fill(0);
    const stack = []; // Store indices, not values
    
    for (let i = 0; i < T.length; i++) {
        // While current temp is warmer than stack top
        while (stack.length && T[i] > T[stack[stack.length - 1]]) {
            const j = stack.pop();
            result[j] = i - j; // Days until warmer
        }
        stack.push(i);
    }
    
    return result;
}

/**
 * Largest Rectangle in Histogram
 * 
 * Classic monotonic stack problem
 * For each bar, find how far left and right it can extend
 * 
 * Technique: Maintain increasing stack of heights
 * When we see a shorter bar, calculate area for taller bars
 */
function largestRectangleArea(heights) {
    const stack = [];
    let maxArea = 0;
    
    // Add sentinel 0 at end to flush remaining bars
    for (let i = 0; i <= heights.length; i++) {
        const h = i === heights.length ? 0 : heights[i];
        
        // While current height is less than stack top
        while (stack.length && h < heights[stack[stack.length - 1]]) {
            const height = heights[stack.pop()];
            
            // Width extends from after previous stack top to current
            const width = stack.length === 0 
                ? i 
                : i - stack[stack.length - 1] - 1;
            
            maxArea = Math.max(maxArea, height * width);
        }
        
        stack.push(i);
    }
    
    return maxArea;
}

// ============================================
// 4. COMMON MISTAKES & EDGE CASES
// ============================================

/**
 * Mistake 1: Popping from empty stack
 * Always check isEmpty() before pop()
 * 
 * Mistake 2: Using stack.top() instead of stack.peek()
 * Some languages use different method names
 * 
 * Mistake 3: Confusing stack indices
 * Remember: top is at length - 1, not at 0
 * 
 * Edge Cases:
 * - Empty stack operations
 * - Single element
 * - All same elements
 * - For parentheses: odd length (always invalid)
 */

// ============================================
// 5. INTERVIEW PERSPECTIVE
// ============================================

/**
 * When to use a stack:
 * 
 * 1. MATCHING PAIRS: Parentheses, tags, brackets
 * 2. EXPRESSION EVALUATION: Infix, postfix, prefix
 * 3. NEXT GREATER/SMALLER ELEMENT: Monotonic stack
 * 4. BACKTRACKING: DFS, maze solving
 * 5. UNDO OPERATIONS: Text editors, transactions
 * 
 * Stack vs Recursion:
 * - Every recursive solution can be converted to iterative with stack
 * - Stack gives more control over memory
 * - Useful when recursion depth might cause stack overflow
 * 
 * Monotonic Stack Pattern:
 * - Maintains elements in sorted order
 * - Increasing stack: finds next smaller element
 * - Decreasing stack: finds next greater element
 */

// ============================================
// 6. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Easy): Implement stack using linked list
 */
class LinkedStack {
    constructor() {
        this.top = null;
        this.length = 0;
    }
    
    push(val) {
        const node = { val, next: this.top };
        this.top = node;
        this.length++;
    }
    
    pop() {
        if (!this.top) return undefined;
        const val = this.top.val;
        this.top = this.top.next;
        this.length--;
        return val;
    }
    
    peek() {
        return this.top ? this.top.val : undefined;
    }
}

/**
 * Problem 2 (Medium): Next Greater Element
 */
function nextGreaterElement(nums) {
    const result = new Array(nums.length).fill(-1);
    const stack = [];
    
    for (let i = 0; i < nums.length; i++) {
        while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
            result[stack.pop()] = nums[i];
        }
        stack.push(i);
    }
    
    return result;
}

/**
 * Problem 3 (Hard): Maximum Frequency Stack
 */
class FreqStack {
    constructor() {
        this.freq = new Map();      // val → frequency
        this.group = new Map();     // frequency → stack of vals
        this.maxFreq = 0;
    }
    
    push(val) {
        const f = (this.freq.get(val) || 0) + 1;
        this.freq.set(val, f);
        this.maxFreq = Math.max(this.maxFreq, f);
        
        if (!this.group.has(f)) this.group.set(f, []);
        this.group.get(f).push(val);
    }
    
    pop() {
        const val = this.group.get(this.maxFreq).pop();
        this.freq.set(val, this.freq.get(val) - 1);
        
        if (this.group.get(this.maxFreq).length === 0) {
            this.maxFreq--;
        }
        
        return val;
    }
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * STACK CHEAT SHEET:
 * 
 * PRINCIPLE: LIFO (Last In, First Out)
 * 
 * OPERATIONS (ALL O(1)):
 * - push(x): Add to top
 * - pop(): Remove from top
 * - peek(): View top
 * - isEmpty(): Check if empty
 * 
 * USE CASES:
 * - Matching brackets/parentheses
 * - Expression evaluation (RPN)
 * - Next greater/smaller element
 * - Undo/Redo functionality
 * - DFS (iterative)
 * - Function call stack
 * 
 * MONOTONIC STACK:
 * - Decreasing: Find next greater element
 * - Increasing: Find next smaller element
 * - Store indices, not values (for distance calculation)
 * 
 * INTERVIEW TIP:
 * If problem involves "nearest", "next greater/smaller",
 * or "matching pairs" → Think STACK!
 */

module.exports = { 
    Stack, 
    MinStack, 
    isValidParentheses, 
    evalRPN, 
    dailyTemperatures, 
    largestRectangleArea,
    LinkedStack,
    nextGreaterElement,
    FreqStack
};
