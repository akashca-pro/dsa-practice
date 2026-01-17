/**
 * ============================================
 * STACK & QUEUE PROBLEMS - COMPREHENSIVE GUIDE
 * ============================================
 * 
 * LEARNING ORDER:
 * 1. Basic Stack Problems (parentheses, RPN)
 * 2. Monotonic Stack
 * 3. Queue Applications (BFS)
 * 4. Design Problems
 */

// ============================================
// CATEGORY 1: BASIC STACK PROBLEMS
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - Browser back/forward buttons
 * - Undo/Redo in editors
 * - Call stack in programming
 * - Expression evaluation
 * 
 * STACK = LIFO (Last In, First Out)
 * QUEUE = FIFO (First In, First Out)
 */

// ------------------------------------------
// 1.1 VALID PARENTHESES
// ------------------------------------------

/**
 * Problem: Check if brackets are balanced
 * 
 * Real-world: Validating code syntax
 * 
 * Classic stack problem!
 */
function isValid(s) {
    const stack = [];
    const pairs = { ')': '(', '}': '{', ']': '[' };
    
    for (const char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            if (stack.length === 0 || stack.pop() !== pairs[char]) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}

/**
 * RELATED QUESTIONS:
 * - Valid Parentheses (LeetCode 20)
 * - Minimum Remove to Make Valid (LeetCode 1249)
 * - Longest Valid Parentheses (LeetCode 32)
 */

// ------------------------------------------
// 1.2 REVERSE POLISH NOTATION (POSTFIX)
// ------------------------------------------

/**
 * Problem: Evaluate expression in RPN
 * 
 * Real-world: Calculator implementations, compilers
 */
function evalRPN(tokens) {
    const stack = [];
    const ops = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b)
    };
    
    for (const token of tokens) {
        if (ops[token]) {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(ops[token](a, b));
        } else {
            stack.push(parseInt(token));
        }
    }
    
    return stack[0];
}

// ------------------------------------------
// 1.3 SIMPLIFY PATH
// ------------------------------------------

/**
 * Problem: Simplify Unix file path
 * 
 * Real-world: File path normalization
 */
function simplifyPath(path) {
    const stack = [];
    const parts = path.split('/');
    
    for (const part of parts) {
        if (part === '..') {
            stack.pop();
        } else if (part && part !== '.') {
            stack.push(part);
        }
    }
    
    return '/' + stack.join('/');
}

// ------------------------------------------
// 1.4 DECODE STRING
// ------------------------------------------

/**
 * Problem: Decode encoded string like "3[a2[c]]"
 * 
 * Real-world: HTML entity decoding, compression
 */
function decodeString(s) {
    const numStack = [];
    const strStack = [];
    let currentNum = 0;
    let currentStr = '';
    
    for (const char of s) {
        if (char >= '0' && char <= '9') {
            currentNum = currentNum * 10 + parseInt(char);
        } else if (char === '[') {
            numStack.push(currentNum);
            strStack.push(currentStr);
            currentNum = 0;
            currentStr = '';
        } else if (char === ']') {
            const num = numStack.pop();
            const prevStr = strStack.pop();
            currentStr = prevStr + currentStr.repeat(num);
        } else {
            currentStr += char;
        }
    }
    
    return currentStr;
}

// ============================================
// CATEGORY 2: MONOTONIC STACK
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - Stock span problem (trading)
 * - Temperature forecast
 * - Skyline problems
 * 
 * KEY INSIGHT: Maintain stack in sorted order
 * - Monotonic increasing: Pop larger/equal elements
 * - Monotonic decreasing: Pop smaller/equal elements
 */

// ------------------------------------------
// 2.1 NEXT GREATER ELEMENT
// ------------------------------------------

/**
 * Problem: Find next greater element for each position
 * 
 * Real-world: Find next warmer day
 */
function nextGreaterElement(nums) {
    const result = new Array(nums.length).fill(-1);
    const stack = []; // indices
    
    for (let i = 0; i < nums.length; i++) {
        while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
            const idx = stack.pop();
            result[idx] = nums[i];
        }
        stack.push(i);
    }
    
    return result;
}

/**
 * RELATED QUESTIONS:
 * - Next Greater Element I (LeetCode 496)
 * - Next Greater Element II (LeetCode 503) - circular
 * - Next Greater Node in Linked List (LeetCode 1019)
 */

// ------------------------------------------
// 2.2 DAILY TEMPERATURES
// ------------------------------------------

/**
 * Problem: Days to wait for warmer temperature
 */
function dailyTemperatures(temperatures) {
    const result = new Array(temperatures.length).fill(0);
    const stack = []; // indices
    
    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const idx = stack.pop();
            result[idx] = i - idx;
        }
        stack.push(i);
    }
    
    return result;
}

// ------------------------------------------
// 2.3 LARGEST RECTANGLE IN HISTOGRAM
// ------------------------------------------

/**
 * Problem: Find largest rectangle area in histogram
 * 
 * Classic hard problem! Uses monotonic stack.
 */
function largestRectangleArea(heights) {
    const stack = []; // indices
    let maxArea = 0;
    
    for (let i = 0; i <= heights.length; i++) {
        const h = i === heights.length ? 0 : heights[i];
        
        while (stack.length && h < heights[stack[stack.length - 1]]) {
            const height = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        
        stack.push(i);
    }
    
    return maxArea;
}

/**
 * RELATED QUESTIONS:
 * - Largest Rectangle in Histogram (LeetCode 84)
 * - Maximal Rectangle (LeetCode 85)
 * - Trapping Rain Water (LeetCode 42)
 */

// ------------------------------------------
// 2.4 TRAPPING RAIN WATER
// ------------------------------------------

/**
 * Problem: Calculate trapped rain water
 */
function trap(height) {
    const stack = [];
    let water = 0;
    
    for (let i = 0; i < height.length; i++) {
        while (stack.length && height[i] > height[stack[stack.length - 1]]) {
            const mid = stack.pop();
            if (!stack.length) break;
            
            const left = stack[stack.length - 1];
            const h = Math.min(height[left], height[i]) - height[mid];
            const w = i - left - 1;
            water += h * w;
        }
        stack.push(i);
    }
    
    return water;
}

// Two pointer solution (simpler)
function trapTwoPointer(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let water = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    
    return water;
}

// ============================================
// CATEGORY 3: QUEUE APPLICATIONS
// ============================================

/**
 * KEY APPLICATION: BFS (Breadth-First Search)
 * Queues naturally handle level-by-level exploration
 */

// ------------------------------------------
// 3.1 SLIDING WINDOW MAXIMUM
// ------------------------------------------

/**
 * Problem: Maximum in each window of size k
 * 
 * Uses monotonic deque!
 */
function maxSlidingWindow(nums, k) {
    const result = [];
    const deque = []; // indices, decreasing values
    
    for (let i = 0; i < nums.length; i++) {
        // Remove indices outside window
        while (deque.length && deque[0] <= i - k) {
            deque.shift();
        }
        
        // Remove smaller elements
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

// ------------------------------------------
// 3.2 IMPLEMENT QUEUE USING STACKS
// ------------------------------------------

class MyQueue {
    constructor() {
        this.pushStack = [];
        this.popStack = [];
    }
    
    push(x) {
        this.pushStack.push(x);
    }
    
    pop() {
        this._transfer();
        return this.popStack.pop();
    }
    
    peek() {
        this._transfer();
        return this.popStack[this.popStack.length - 1];
    }
    
    empty() {
        return this.pushStack.length === 0 && this.popStack.length === 0;
    }
    
    _transfer() {
        if (this.popStack.length === 0) {
            while (this.pushStack.length) {
                this.popStack.push(this.pushStack.pop());
            }
        }
    }
}

// ------------------------------------------
// 3.3 IMPLEMENT STACK USING QUEUES
// ------------------------------------------

class MyStack {
    constructor() {
        this.queue = [];
    }
    
    push(x) {
        this.queue.push(x);
        // Rotate to make new element at front
        for (let i = 0; i < this.queue.length - 1; i++) {
            this.queue.push(this.queue.shift());
        }
    }
    
    pop() {
        return this.queue.shift();
    }
    
    top() {
        return this.queue[0];
    }
    
    empty() {
        return this.queue.length === 0;
    }
}

// ============================================
// CATEGORY 4: DESIGN PROBLEMS
// ============================================

// ------------------------------------------
// 4.1 MIN STACK
// ------------------------------------------

/**
 * Problem: Stack with O(1) getMin
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

// ------------------------------------------
// 4.2 UNDO/REDO STACK
// ------------------------------------------

/**
 * Problem: Implement Undo/Redo functionality
 * 
 * REAL-WORLD USE CASES:
 * - Text editors (VS Code, Word)
 * - Image editors (Photoshop)
 * - Browser history (back/forward)
 * - Drawing applications
 * - Any state management with history
 * 
 * KEY INSIGHT:
 * - Use TWO stacks: undo stack and redo stack
 * - Each action pushes to undo, clears redo
 * - Undo: pop from undo, push to redo
 * - Redo: pop from redo, push to undo
 */
class UndoRedo {
    constructor(initialState) {
        this.undoStack = [];
        this.redoStack = [];
        this.current = initialState;
    }

    // Record new state
    do(newState) {
        this.undoStack.push(this.current);  // Save current to undo stack
        this.current = newState;
        this.redoStack.length = 0;          // Clear redo (new branch)
    }

    // Go back to previous state
    undo() {
        if (this.undoStack.length === 0) return this.current;

        this.redoStack.push(this.current);
        this.current = this.undoStack.pop();
        return this.current;
    }

    // Go forward to next state
    redo() {
        if (this.redoStack.length === 0) return this.current;

        this.undoStack.push(this.current);
        this.current = this.redoStack.pop();
        return this.current;
    }

    getState() { return this.current; }
    canUndo() { return this.undoStack.length > 0; }
    canRedo() { return this.redoStack.length > 0; }
}

/**
 * USAGE EXAMPLE:
 * 
 * const editor = new UndoRedo("Hello");
 * editor.do("Hello World");
 * editor.do("Hello World!");
 * console.log(editor.getState());  // "Hello World!"
 * 
 * editor.undo();
 * console.log(editor.getState());  // "Hello World"
 * 
 * editor.undo();
 * console.log(editor.getState());  // "Hello"
 * 
 * editor.redo();
 * console.log(editor.getState());  // "Hello World"
 * 
 * editor.do("Hello There");        // New branch, clears redo
 * console.log(editor.canRedo());   // false
 * 
 * 
 * TIME COMPLEXITY: O(1) for all operations
 * SPACE COMPLEXITY: O(n) where n = number of states
 */

/**
 * RELATED QUESTIONS:
 * - Design Browser History (LeetCode 1472)
 * - Design Text Editor (LeetCode 2296)
 */

// ------------------------------------------
// 4.3 DESIGN CIRCULAR QUEUE
// ------------------------------------------

class MyCircularQueue {
    constructor(k) {
        this.queue = new Array(k);
        this.head = 0;
        this.tail = -1;
        this.size = 0;
        this.capacity = k;
    }
    
    enQueue(value) {
        if (this.isFull()) return false;
        this.tail = (this.tail + 1) % this.capacity;
        this.queue[this.tail] = value;
        this.size++;
        return true;
    }
    
    deQueue() {
        if (this.isEmpty()) return false;
        this.head = (this.head + 1) % this.capacity;
        this.size--;
        return true;
    }
    
    Front() {
        return this.isEmpty() ? -1 : this.queue[this.head];
    }
    
    Rear() {
        return this.isEmpty() ? -1 : this.queue[this.tail];
    }
    
    isEmpty() {
        return this.size === 0;
    }
    
    isFull() {
        return this.size === this.capacity;
    }
}

// ============================================
// SUMMARY
// ============================================

/**
 * STACK & QUEUE CHEAT SHEET:
 * 
 * STACK PATTERNS:
 * 1. MATCHING: Parentheses, tags
 * 2. EVALUATION: RPN, expression parsing
 * 3. MONOTONIC: Next greater, histogram
 * 4. UNDO/HISTORY: Browser, editor
 * 
 * QUEUE PATTERNS:
 * 1. BFS: Level-order traversal
 * 2. SLIDING WINDOW: With deque
 * 3. SCHEDULING: Task processing
 * 
 * MONOTONIC STACK:
 * - Next greater element: decreasing stack
 * - Next smaller element: increasing stack
 * - Pop when current breaks monotonicity
 * 
 * INTERVIEW TIP:
 * When you see "nearest", "next", or "previous"
 * greater/smaller → think monotonic stack!
 */

module.exports = {
    isValid,
    evalRPN,
    simplifyPath,
    decodeString,
    nextGreaterElement,
    dailyTemperatures,
    largestRectangleArea,
    trap,
    trapTwoPointer,
    maxSlidingWindow,
    MyQueue,
    MyStack,
    MinStack,
    UndoRedo,
    MyCircularQueue
};
