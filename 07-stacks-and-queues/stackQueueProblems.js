/**
 * ============================================
 * STACK & QUEUE PROBLEMS
 * ============================================
 */

// Implement stack using queues
class StackUsingQueues {
    constructor() {
        this.queue = [];
    }
    
    push(x) {
        this.queue.push(x);
        for (let i = 0; i < this.queue.length - 1; i++) {
            this.queue.push(this.queue.shift());
        }
    }
    
    pop() { return this.queue.shift(); }
    top() { return this.queue[0]; }
    isEmpty() { return this.queue.length === 0; }
}

// Next greater element
function nextGreaterElement(nums1, nums2) {
    const map = new Map();
    const stack = [];
    
    for (const num of nums2) {
        while (stack.length && stack[stack.length - 1] < num) {
            map.set(stack.pop(), num);
        }
        stack.push(num);
    }
    
    return nums1.map(n => map.get(n) ?? -1);
}

// Simplify path
function simplifyPath(path) {
    const stack = [];
    const parts = path.split('/');
    
    for (const part of parts) {
        if (part === '..' && stack.length) stack.pop();
        else if (part && part !== '.' && part !== '..') stack.push(part);
    }
    
    return '/' + stack.join('/');
}

// Decode string: "3[a2[c]]" -> "accaccacc"
function decodeString(s) {
    const countStack = [];
    const strStack = [];
    let current = '';
    let count = 0;
    
    for (const c of s) {
        if (c >= '0' && c <= '9') {
            count = count * 10 + parseInt(c);
        } else if (c === '[') {
            countStack.push(count);
            strStack.push(current);
            count = 0;
            current = '';
        } else if (c === ']') {
            const repeat = countStack.pop();
            current = strStack.pop() + current.repeat(repeat);
        } else {
            current += c;
        }
    }
    
    return current;
}

// Basic calculator
function calculate(s) {
    const stack = [];
    let result = 0, num = 0, sign = 1;
    
    for (const c of s) {
        if (c >= '0' && c <= '9') {
            num = num * 10 + parseInt(c);
        } else if (c === '+') {
            result += sign * num;
            num = 0;
            sign = 1;
        } else if (c === '-') {
            result += sign * num;
            num = 0;
            sign = -1;
        } else if (c === '(') {
            stack.push(result);
            stack.push(sign);
            result = 0;
            sign = 1;
        } else if (c === ')') {
            result += sign * num;
            num = 0;
            result *= stack.pop();
            result += stack.pop();
        }
    }
    
    return result + sign * num;
}

// Remove duplicate letters
function removeDuplicateLetters(s) {
    const lastIdx = {};
    for (let i = 0; i < s.length; i++) lastIdx[s[i]] = i;
    
    const stack = [];
    const seen = new Set();
    
    for (let i = 0; i < s.length; i++) {
        if (seen.has(s[i])) continue;
        
        while (stack.length && stack[stack.length - 1] > s[i] && lastIdx[stack[stack.length - 1]] > i) {
            seen.delete(stack.pop());
        }
        
        stack.push(s[i]);
        seen.add(s[i]);
    }
    
    return stack.join('');
}

module.exports = { 
    StackUsingQueues, nextGreaterElement, simplifyPath, 
    decodeString, calculate, removeDuplicateLetters 
};
