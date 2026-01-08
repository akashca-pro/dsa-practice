/**
 * ============================================
 * LINKED LIST PROBLEMS - COMPREHENSIVE GUIDE
 * ============================================
 * 
 * LEARNING ORDER:
 * 1. Basic Operations (reverse, merge)
 * 2. Fast/Slow Pointers (cycle, middle)
 * 3. Two Pointers (intersection, remove nth)
 * 4. Rearrangement Problems
 * 5. Arithmetic Operations
 */

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

// ============================================
// CATEGORY 1: BASIC OPERATIONS
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - Browser history (back/forward)
 * - Music playlist (prev/next)
 * - Undo/Redo stack
 * - Memory allocation
 */

// ------------------------------------------
// 1.1 REVERSE LINKED LIST
// ------------------------------------------

/**
 * Problem: Reverse the list
 * 
 * THE most common linked list problem!
 */
function reverseList(head) {
    let prev = null;
    let curr = head;
    
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    
    return prev;
}

// Recursive version
function reverseListRecursive(head) {
    if (!head || !head.next) return head;
    
    const newHead = reverseListRecursive(head.next);
    head.next.next = head;
    head.next = null;
    
    return newHead;
}

/**
 * RELATED QUESTIONS:
 * - Reverse Linked List (LeetCode 206)
 * - Reverse Linked List II (LeetCode 92) - reverse from m to n
 * - Reverse Nodes in k-Group (LeetCode 25)
 */

// ------------------------------------------
// 1.2 MERGE TWO SORTED LISTS
// ------------------------------------------

/**
 * Problem: Merge two sorted lists into one
 */
function mergeTwoLists(l1, l2) {
    const dummy = new ListNode(0);
    let curr = dummy;
    
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            curr.next = l1;
            l1 = l1.next;
        } else {
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next;
    }
    
    curr.next = l1 || l2;
    return dummy.next;
}

// ------------------------------------------
// 1.3 REMOVE DUPLICATES FROM SORTED LIST
// ------------------------------------------

function deleteDuplicates(head) {
    let curr = head;
    
    while (curr && curr.next) {
        if (curr.val === curr.next.val) {
            curr.next = curr.next.next;
        } else {
            curr = curr.next;
        }
    }
    
    return head;
}

// Remove all duplicates (keep none)
function deleteDuplicatesII(head) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    
    while (prev.next) {
        let curr = prev.next;
        
        if (curr.next && curr.val === curr.next.val) {
            while (curr.next && curr.val === curr.next.val) {
                curr = curr.next;
            }
            prev.next = curr.next;
        } else {
            prev = prev.next;
        }
    }
    
    return dummy.next;
}

// ============================================
// CATEGORY 2: FAST/SLOW POINTERS
// ============================================

/**
 * KEY TECHNIQUE: Floyd's Cycle Detection
 * - Slow moves 1 step, Fast moves 2 steps
 * - If cycle exists, they will meet
 * - Also used to find middle element
 */

// ------------------------------------------
// 2.1 LINKED LIST CYCLE
// ------------------------------------------

/**
 * Problem: Detect if cycle exists
 */
function hasCycle(head) {
    let slow = head, fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) return true;
    }
    
    return false;
}

// ------------------------------------------
// 2.2 LINKED LIST CYCLE II
// ------------------------------------------

/**
 * Problem: Find where cycle begins
 * 
 * After meeting, reset one pointer to head.
 * Move both at same speed - they meet at cycle start!
 */
function detectCycle(head) {
    let slow = head, fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            // Found cycle, find start
            slow = head;
            while (slow !== fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow;
        }
    }
    
    return null;
}

/**
 * RELATED QUESTIONS:
 * - Linked List Cycle (LeetCode 141)
 * - Linked List Cycle II (LeetCode 142)
 * - Happy Number (LeetCode 202) - uses same concept!
 */

// ------------------------------------------
// 2.3 MIDDLE OF LINKED LIST
// ------------------------------------------

/**
 * Problem: Find middle node
 * 
 * When fast reaches end, slow is at middle
 */
function middleNode(head) {
    let slow = head, fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;
}

// ============================================
// CATEGORY 3: TWO POINTERS
// ============================================

// ------------------------------------------
// 3.1 REMOVE NTH NODE FROM END
// ------------------------------------------

/**
 * Problem: Remove nth node from end
 * 
 * Use two pointers n apart
 */
function removeNthFromEnd(head, n) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let fast = dummy, slow = dummy;
    
    // Move fast n+1 ahead
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }
    
    // Move both until fast reaches end
    while (fast) {
        slow = slow.next;
        fast = fast.next;
    }
    
    // Remove the nth node
    slow.next = slow.next.next;
    
    return dummy.next;
}

// ------------------------------------------
// 3.2 INTERSECTION OF TWO LINKED LISTS
// ------------------------------------------

/**
 * Problem: Find intersection point
 * 
 * Clever trick: A+B and B+A have same length!
 */
function getIntersectionNode(headA, headB) {
    if (!headA || !headB) return null;
    
    let pA = headA, pB = headB;
    
    while (pA !== pB) {
        pA = pA ? pA.next : headB;
        pB = pB ? pB.next : headA;
    }
    
    return pA;
}

// ------------------------------------------
// 3.3 PALINDROME LINKED LIST
// ------------------------------------------

/**
 * Problem: Check if list is palindrome
 * 
 * Find middle, reverse second half, compare
 */
function isPalindrome(head) {
    if (!head || !head.next) return true;
    
    // Find middle
    let slow = head, fast = head;
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // Reverse second half
    let prev = null, curr = slow.next;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    
    // Compare halves
    let p1 = head, p2 = prev;
    while (p2) {
        if (p1.val !== p2.val) return false;
        p1 = p1.next;
        p2 = p2.next;
    }
    
    return true;
}

/**
 * RELATED QUESTIONS:
 * - Remove Nth Node From End (LeetCode 19)
 * - Intersection of Two Lists (LeetCode 160)
 * - Palindrome Linked List (LeetCode 234)
 */

// ============================================
// CATEGORY 4: REARRANGEMENT PROBLEMS
// ============================================

// ------------------------------------------
// 4.1 REORDER LIST
// ------------------------------------------

/**
 * Problem: L0→Ln→L1→Ln-1→L2→Ln-2→...
 * 
 * 1. Find middle
 * 2. Reverse second half
 * 3. Merge alternating
 */
function reorderList(head) {
    if (!head || !head.next) return;
    
    // Find middle
    let slow = head, fast = head;
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // Reverse second half
    let prev = null, curr = slow.next;
    slow.next = null;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    
    // Merge alternating
    let first = head, second = prev;
    while (second) {
        const temp1 = first.next, temp2 = second.next;
        first.next = second;
        second.next = temp1;
        first = temp1;
        second = temp2;
    }
}

// ------------------------------------------
// 4.2 SORT LIST
// ------------------------------------------

/**
 * Problem: Sort linked list in O(n log n)
 * 
 * Merge sort is natural for linked lists!
 */
function sortList(head) {
    if (!head || !head.next) return head;
    
    // Find middle and split
    let slow = head, fast = head.next;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    const mid = slow.next;
    slow.next = null;
    
    // Recursively sort both halves
    const left = sortList(head);
    const right = sortList(mid);
    
    // Merge sorted halves
    return mergeTwoLists(left, right);
}

// ------------------------------------------
// 4.3 ROTATE LIST
// ------------------------------------------

/**
 * Problem: Rotate list by k positions
 */
function rotateRight(head, k) {
    if (!head || !head.next || k === 0) return head;
    
    // Get length and make circular
    let len = 1, tail = head;
    while (tail.next) {
        tail = tail.next;
        len++;
    }
    tail.next = head;
    
    // Find new tail
    k = k % len;
    for (let i = 0; i < len - k; i++) {
        tail = tail.next;
    }
    
    // Break circle
    head = tail.next;
    tail.next = null;
    
    return head;
}

// ============================================
// CATEGORY 5: ARITHMETIC OPERATIONS
// ============================================

// ------------------------------------------
// 5.1 ADD TWO NUMBERS
// ------------------------------------------

/**
 * Problem: Add two numbers represented as linked lists
 * 
 * Numbers are stored in reverse order
 */
function addTwoNumbers(l1, l2) {
    const dummy = new ListNode(0);
    let curr = dummy;
    let carry = 0;
    
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

// ------------------------------------------
// 5.2 ADD TWO NUMBERS II (Not reversed)
// ------------------------------------------

function addTwoNumbersII(l1, l2) {
    // Use stacks
    const s1 = [], s2 = [];
    
    while (l1) { s1.push(l1.val); l1 = l1.next; }
    while (l2) { s2.push(l2.val); l2 = l2.next; }
    
    let carry = 0, head = null;
    
    while (s1.length || s2.length || carry) {
        const sum = (s1.pop() || 0) + (s2.pop() || 0) + carry;
        carry = Math.floor(sum / 10);
        
        const node = new ListNode(sum % 10);
        node.next = head;
        head = node;
    }
    
    return head;
}

/**
 * RELATED QUESTIONS:
 * - Add Two Numbers (LeetCode 2)
 * - Add Two Numbers II (LeetCode 445)
 * - Plus One Linked List (LeetCode 369)
 */

// ============================================
// SUMMARY
// ============================================

/**
 * LINKED LIST CHEAT SHEET:
 * 
 * TECHNIQUES:
 * 1. DUMMY NODE: Simplifies head operations
 * 2. TWO POINTERS: Fast/slow, start at different positions
 * 3. REVERSAL: prev, curr, next pattern
 * 4. MERGE: Compare and link
 * 
 * FAST/SLOW POINTERS:
 * - Cycle detection: slow=1, fast=2
 * - Middle: slow at middle when fast at end
 * - Cycle start: After meeting, reset one to head
 * 
 * COMMON PATTERNS:
 * - Reverse: prev = null, curr = head
 * - Merge: dummy node, compare heads
 * - Split: fast/slow to find middle
 * 
 * INTERVIEW TIP:
 * Always use dummy node when head might change!
 * Draw the pointers to visualize operations.
 */

module.exports = {
    ListNode,
    reverseList,
    reverseListRecursive,
    mergeTwoLists,
    deleteDuplicates,
    deleteDuplicatesII,
    hasCycle,
    detectCycle,
    middleNode,
    removeNthFromEnd,
    getIntersectionNode,
    isPalindrome,
    reorderList,
    sortList,
    rotateRight,
    addTwoNumbers,
    addTwoNumbersII
};
