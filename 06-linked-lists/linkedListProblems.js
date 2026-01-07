/**
 * ============================================
 * LINKED LIST PROBLEMS
 * ============================================
 */

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

// Reverse in groups of k
function reverseKGroup(head, k) {
    const count = getLength(head);
    if (count < k) return head;
    
    let prev = null, curr = head;
    for (let i = 0; i < k; i++) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    
    head.next = reverseKGroup(curr, k);
    return prev;
}

function getLength(head) {
    let len = 0;
    while (head) { len++; head = head.next; }
    return len;
}

// Detect cycle start
function detectCycleStart(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) break;
    }
    
    if (!fast || !fast.next) return null;
    
    slow = head;
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }
    return slow;
}

// Add two numbers (digits reversed)
function addTwoNumbers(l1, l2) {
    const dummy = new ListNode(0);
    let curr = dummy, carry = 0;
    
    while (l1 || l2 || carry) {
        const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
        carry = Math.floor(sum / 10);
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
        l1 = l1?.next;
        l2 = l2?.next;
    }
    
    return dummy.next;
}

// Intersection point
function getIntersectionNode(headA, headB) {
    let a = headA, b = headB;
    while (a !== b) {
        a = a ? a.next : headB;
        b = b ? b.next : headA;
    }
    return a;
}

// Deep copy with random pointers
function copyRandomList(head) {
    if (!head) return null;
    
    // Interleave copies
    let curr = head;
    while (curr) {
        const copy = new ListNode(curr.val);
        copy.next = curr.next;
        curr.next = copy;
        curr = copy.next;
    }
    
    // Copy random pointers
    curr = head;
    while (curr) {
        if (curr.random) {
            curr.next.random = curr.random.next;
        }
        curr = curr.next.next;
    }
    
    // Separate lists
    const dummy = new ListNode(0);
    let copy = dummy;
    curr = head;
    while (curr) {
        copy.next = curr.next;
        copy = copy.next;
        curr.next = copy.next;
        curr = curr.next;
    }
    
    return dummy.next;
}

// Flatten multilevel list
function flatten(head) {
    if (!head) return null;
    
    const stack = [];
    let curr = head;
    
    while (curr) {
        if (curr.child) {
            if (curr.next) stack.push(curr.next);
            curr.next = curr.child;
            curr.next.prev = curr;
            curr.child = null;
        }
        
        if (!curr.next && stack.length) {
            const next = stack.pop();
            curr.next = next;
            next.prev = curr;
        }
        
        curr = curr.next;
    }
    
    return head;
}

module.exports = { 
    ListNode, reverseKGroup, detectCycleStart, 
    addTwoNumbers, getIntersectionNode, copyRandomList 
};
