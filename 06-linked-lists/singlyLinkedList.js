/**
 * ============================================
 * SINGLY LINKED LIST
 * ============================================
 * 
 * CONCEPT:
 * A singly linked list is a linear data structure where each element
 * (node) contains data and a pointer to the next node. Unlike arrays,
 * elements are not stored in contiguous memory locations.
 * 
 * Structure:
 * [Data|Next] → [Data|Next] → [Data|Next] → null
 *    Head                                    Tail
 * 
 * REAL-WORLD ANALOGY:
 * Think of a scavenger hunt or treasure hunt:
 * - Each clue (node) has information (data) and tells you where to find the next clue (pointer)
 * - You must follow the chain from start to finish
 * - You can't jump directly to clue #5 - you must go through 1, 2, 3, 4 first
 * - Adding/removing a clue in the middle just means updating the "next" instructions
 * 
 * INDUSTRY APPLICATIONS:
 * - Undo functionality in applications (history chain)
 * - Music player playlists
 * - Browser forward/back navigation (with doubly linked)
 * - Memory allocation (free list)
 * - Hash table collision handling (chaining)
 * - Polynomial representation
 * 
 * COMPLEXITY COMPARISON:
 * | Operation          | Array    | Linked List |
 * |--------------------|----------|-------------|
 * | Access by index    | O(1)     | O(n)        |
 * | Insert at head     | O(n)     | O(1)        |
 * | Insert at tail     | O(1)*    | O(n)**      |
 * | Insert at middle   | O(n)     | O(1)***     |
 * | Delete at head     | O(n)     | O(1)        |
 * | Search             | O(n)     | O(n)        |
 * 
 * * Amortized for dynamic arrays
 * ** O(1) if tail pointer maintained
 * *** After finding the position
 */

// ============================================
// 1. NODE STRUCTURE
// ============================================

/**
 * ListNode: Basic building block of linked list
 * Contains data value and pointer to next node
 */
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

// ============================================
// 2. SINGLY LINKED LIST CLASS
// ============================================

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    /**
     * Insert at head - O(1)
     * Create new node, point it to current head, update head
     * 
     * Before: head → [A] → [B] → null
     * After:  head → [NEW] → [A] → [B] → null
     */
    insertAtHead(val) {
        const node = new ListNode(val);
        node.next = this.head;
        this.head = node;
        this.size++;
    }
    
    /**
     * Insert at tail - O(n)
     * Traverse to end, then add new node
     * 
     * Before: head → [A] → [B] → null
     * After:  head → [A] → [B] → [NEW] → null
     */
    insertAtTail(val) {
        const node = new ListNode(val);
        
        if (!this.head) {
            this.head = node;
        } else {
            let curr = this.head;
            while (curr.next) {
                curr = curr.next;
            }
            curr.next = node;
        }
        
        this.size++;
    }
    
    /**
     * Insert at specific index - O(n)
     * Traverse to position, adjust pointers
     */
    insertAt(index, val) {
        if (index < 0 || index > this.size) return false;
        
        if (index === 0) {
            this.insertAtHead(val);
            return true;
        }
        
        const node = new ListNode(val);
        let curr = this.head;
        
        // Traverse to node BEFORE insertion point
        for (let i = 0; i < index - 1; i++) {
            curr = curr.next;
        }
        
        // Insert new node
        node.next = curr.next;
        curr.next = node;
        this.size++;
        
        return true;
    }
    
    /**
     * Delete at head - O(1)
     * Move head pointer to next node
     * 
     * Before: head → [A] → [B] → [C] → null
     * After:  head → [B] → [C] → null (A is garbage collected)
     */
    deleteAtHead() {
        if (!this.head) return null;
        
        const val = this.head.val;
        this.head = this.head.next;
        this.size--;
        
        return val;
    }
    
    /**
     * Delete by value - O(n)
     * Find node with value, adjust previous node's pointer
     */
    delete(val) {
        if (!this.head) return false;
        
        // Special case: head contains the value
        if (this.head.val === val) {
            this.head = this.head.next;
            this.size--;
            return true;
        }
        
        // Find node BEFORE the one to delete
        let curr = this.head;
        while (curr.next && curr.next.val !== val) {
            curr = curr.next;
        }
        
        // Value not found
        if (!curr.next) return false;
        
        // Skip the node to delete
        curr.next = curr.next.next;
        this.size--;
        
        return true;
    }
    
    /**
     * Search for value - O(n)
     * Returns index if found, -1 otherwise
     */
    find(val) {
        let curr = this.head;
        let idx = 0;
        
        while (curr) {
            if (curr.val === val) return idx;
            curr = curr.next;
            idx++;
        }
        
        return -1;
    }
    
    /**
     * Reverse the list - O(n) time, O(1) space
     * Use three pointers: prev, curr, next
     * 
     * Key insight: At each step, reverse the arrow direction
     * Before: A → B → C → null
     * After:  null ← A ← B ← C
     */
    reverse() {
        let prev = null;
        let curr = this.head;
        
        while (curr) {
            const next = curr.next;  // Save next
            curr.next = prev;        // Reverse pointer
            prev = curr;             // Move prev forward
            curr = next;             // Move curr forward
        }
        
        this.head = prev;
    }
    
    /**
     * Convert to array for easy debugging
     */
    toArray() {
        const arr = [];
        let curr = this.head;
        
        while (curr) {
            arr.push(curr.val);
            curr = curr.next;
        }
        
        return arr;
    }
    
    /**
     * Find middle node - O(n) using slow/fast pointers
     * Slow moves 1 step, fast moves 2 steps
     * When fast reaches end, slow is at middle
     */
    getMiddle() {
        let slow = this.head;
        let fast = this.head;
        
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        return slow;
    }
    
    /**
     * Detect cycle - Floyd's Cycle Detection
     * If slow and fast pointers meet, there's a cycle
     */
    hasCycle() {
        let slow = this.head;
        let fast = this.head;
        
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
            
            if (slow === fast) return true;
        }
        
        return false;
    }
}

// ============================================
// 3. COMMON OPERATIONS (STANDALONE)
// ============================================

/**
 * Merge two sorted lists
 * Use a dummy node to simplify edge cases
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
    
    // Attach remaining nodes
    curr.next = l1 || l2;
    
    return dummy.next;
}

/**
 * Remove Nth node from end
 * Use two pointers: fast starts N ahead of slow
 * When fast reaches end, slow is just before target
 */
function removeNthFromEnd(head, n) {
    const dummy = new ListNode(0);
    dummy.next = head;
    
    let fast = dummy;
    let slow = dummy;
    
    // Move fast N+1 steps ahead
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }
    
    // Move both until fast reaches end
    while (fast) {
        slow = slow.next;
        fast = fast.next;
    }
    
    // Skip the Nth node
    slow.next = slow.next.next;
    
    return dummy.next;
}

/**
 * Check if list is palindrome
 * 1. Find middle using slow/fast
 * 2. Reverse second half
 * 3. Compare first and second half
 */
function isPalindrome(head) {
    if (!head || !head.next) return true;
    
    // Find middle
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // Reverse second half
    let prev = null;
    while (slow) {
        const next = slow.next;
        slow.next = prev;
        prev = slow;
        slow = next;
    }
    
    // Compare halves
    let left = head;
    let right = prev;
    
    while (right) {
        if (left.val !== right.val) return false;
        left = left.next;
        right = right.next;
    }
    
    return true;
}

// ============================================
// 4. COMMON MISTAKES & EDGE CASES
// ============================================

/**
 * Mistake 1: Forgetting to update the head
 * When modifying the list, always check if head needs to change
 * 
 * Mistake 2: Losing reference to next node
 * Always save next BEFORE modifying curr.next
 * 
 * Mistake 3: Off-by-one errors
 * When traversing to position i, loop i-1 times
 * 
 * Edge Cases:
 * - Empty list (head is null)
 * - Single node list
 * - Operation on head node
 * - Operation on tail node
 * - List with cycle (for cycle-related problems)
 */

// ============================================
// 5. INTERVIEW PERSPECTIVE
// ============================================

/**
 * Common linked list patterns:
 * 
 * 1. DUMMY NODE: Simplifies head edge cases
 *    const dummy = new ListNode(0);
 *    dummy.next = head;
 * 
 * 2. TWO POINTERS (SLOW/FAST):
 *    - Find middle
 *    - Detect cycle
 *    - Find cycle start
 *    - Nth from end
 * 
 * 3. REVERSAL:
 *    - Full reversal
 *    - Partial reversal (between positions)
 *    - K-group reversal
 * 
 * 4. MERGE:
 *    - Two sorted lists
 *    - K sorted lists (use heap)
 * 
 * Questions to ask:
 * - Is it singly or doubly linked?
 * - Can there be duplicates?
 * - Is there a cycle?
 * - Do I need to modify in-place?
 */

// ============================================
// 6. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Easy): Get nth node value
 */
function getNthValue(head, n) {
    let curr = head;
    let count = 0;
    
    while (curr) {
        if (count === n) return curr.val;
        curr = curr.next;
        count++;
    }
    
    return null;
}

/**
 * Problem 2 (Medium): Find intersection of two lists
 */
function getIntersectionNode(headA, headB) {
    if (!headA || !headB) return null;
    
    let pA = headA;
    let pB = headB;
    
    // Each pointer traverses both lists
    // They meet at intersection or both reach null
    while (pA !== pB) {
        pA = pA ? pA.next : headB;
        pB = pB ? pB.next : headA;
    }
    
    return pA;
}

/**
 * Problem 3 (Hard): Reverse nodes in k-group
 */
function reverseKGroup(head, k) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let prevGroupEnd = dummy;
    
    while (true) {
        // Check if k nodes exist
        let kth = prevGroupEnd;
        for (let i = 0; i < k && kth; i++) {
            kth = kth.next;
        }
        if (!kth) break;
        
        // Reverse k nodes
        const groupStart = prevGroupEnd.next;
        let prev = kth.next;
        let curr = groupStart;
        
        while (curr !== kth.next) {
            const next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        
        prevGroupEnd.next = kth;
        prevGroupEnd = groupStart;
    }
    
    return dummy.next;
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * SINGLY LINKED LIST CHEAT SHEET:
 * 
 * COMPLEXITY:
 * | Operation        | Time   | Notes                    |
 * |------------------|--------|--------------------------|
 * | Insert at head   | O(1)   | Just update head pointer |
 * | Insert at tail   | O(n)   | Must traverse to end     |
 * | Delete at head   | O(1)   | Just move head           |
 * | Search           | O(n)   | Linear traversal         |
 * | Reverse          | O(n)   | Single pass with 3 ptrs  |
 * 
 * KEY PATTERNS:
 * - Dummy node: Simplifies head edge cases
 * - Slow/Fast pointers: Middle, cycle detection
 * - Three pointers: Reversal (prev, curr, next)
 * 
 * COMMON MISTAKES:
 * - Losing next reference before updating
 * - Not handling head separately
 * - Off-by-one in position-based operations
 * 
 * INTERVIEW TIP:
 * Draw the list! Visual representation helps avoid errors.
 * Always handle edge cases: empty, single node, head operation.
 */

module.exports = { 
    ListNode, 
    SinglyLinkedList, 
    mergeTwoLists, 
    removeNthFromEnd, 
    isPalindrome,
    getNthValue,
    getIntersectionNode,
    reverseKGroup
};
