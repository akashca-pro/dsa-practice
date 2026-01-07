/**
 * ============================================
 * STACK IMPLEMENTATION
 * ============================================
 * LIFO: Last In, First Out | All ops O(1)
 */

class Stack {
    constructor() {
        this.items = [];
    }
    
    push(item) { this.items.push(item); }
    pop() { return this.items.pop(); }
    peek() { return this.items[this.items.length - 1]; }
    isEmpty() { return this.items.length === 0; }
    size() { return this.items.length; }
    clear() { this.items = []; }
}

// Stack with minimum tracking - O(1) getMin
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }
    
    push(val) {
        this.stack.push(val);
        const min = this.minStack.length === 0 ? val 
            : Math.min(val, this.minStack[this.minStack.length - 1]);
        this.minStack.push(min);
    }
    
    pop() {
        this.minStack.pop();
        return this.stack.pop();
    }
    
    top() { return this.stack[this.stack.length - 1]; }
    getMin() { return this.minStack[this.minStack.length - 1]; }
}

// ============================================
// CLASSIC STACK PROBLEMS
// ============================================

// Valid parentheses
function isValidParentheses(s) {
    const stack = [];
    const map = { '(': ')', '[': ']', '{': '}' };
    
    for (const c of s) {
        if (map[c]) stack.push(map[c]);
        else if (stack.pop() !== c) return false;
    }
    
    return stack.length === 0;
}

// Evaluate RPN expression
function evalRPN(tokens) {
    const stack = [];
    const ops = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b)
    };
    
    for (const t of tokens) {
        if (ops[t]) {
            const b = stack.pop(), a = stack.pop();
            stack.push(ops[t](a, b));
        } else {
            stack.push(parseInt(t));
        }
    }
    
    return stack.pop();
}

// Daily temperatures - next greater element
function dailyTemperatures(T) {
    const result = new Array(T.length).fill(0);
    const stack = []; // Store indices
    
    for (let i = 0; i < T.length; i++) {
        while (stack.length && T[i] > T[stack[stack.length - 1]]) {
            const j = stack.pop();
            result[j] = i - j;
        }
        stack.push(i);
    }
    
    return result;
}

// Largest rectangle in histogram
function largestRectangleArea(heights) {
    const stack = [];
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

module.exports = { Stack, MinStack, isValidParentheses, evalRPN, dailyTemperatures, largestRectangleArea };
