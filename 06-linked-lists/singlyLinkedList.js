/**
 * ============================================
 * SINGLY LINKED LIST
 * ============================================
 * 
 * Time: Insert/Delete Head O(1), Search O(n), Insert at tail O(n)
 * Space: O(n)
 */

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    // Insert at head - O(1)
    insertAtHead(val) {
        const node = new ListNode(val);
        node.next = this.head;
        this.head = node;
        this.size++;
    }
    
    // Insert at tail - O(n)
    insertAtTail(val) {
        const node = new ListNode(val);
        if (!this.head) {
            this.head = node;
        } else {
            let curr = this.head;
            while (curr.next) curr = curr.next;
            curr.next = node;
        }
        this.size++;
    }
    
    // Insert at index - O(n)
    insertAt(index, val) {
        if (index < 0 || index > this.size) return false;
        if (index === 0) { this.insertAtHead(val); return true; }
        
        const node = new ListNode(val);
        let curr = this.head;
        for (let i = 0; i < index - 1; i++) curr = curr.next;
        node.next = curr.next;
        curr.next = node;
        this.size++;
        return true;
    }
    
    // Delete at head - O(1)
    deleteAtHead() {
        if (!this.head) return null;
        const val = this.head.val;
        this.head = this.head.next;
        this.size--;
        return val;
    }
    
    // Delete by value - O(n)
    delete(val) {
        if (!this.head) return false;
        if (this.head.val === val) {
            this.head = this.head.next;
            this.size--;
            return true;
        }
        
        let curr = this.head;
        while (curr.next && curr.next.val !== val) curr = curr.next;
        if (!curr.next) return false;
        curr.next = curr.next.next;
        this.size--;
        return true;
    }
    
    // Search - O(n)
    find(val) {
        let curr = this.head, idx = 0;
        while (curr) {
            if (curr.val === val) return idx;
            curr = curr.next;
            idx++;
        }
        return -1;
    }
    
    // Reverse - O(n)
    reverse() {
        let prev = null, curr = this.head;
        while (curr) {
            const next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        this.head = prev;
    }
    
    // To array
    toArray() {
        const arr = [];
        let curr = this.head;
        while (curr) {
            arr.push(curr.val);
            curr = curr.next;
        }
        return arr;
    }
    
    // Get middle node
    getMiddle() {
        let slow = this.head, fast = this.head;
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
    
    // Detect cycle
    hasCycle() {
        let slow = this.head, fast = this.head;
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow === fast) return true;
        }
        return false;
    }
}

// ============================================
// COMMON OPERATIONS
// ============================================

// Merge two sorted lists
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

// Remove nth node from end
function removeNthFromEnd(head, n) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let fast = dummy, slow = dummy;
    
    for (let i = 0; i <= n; i++) fast = fast.next;
    while (fast) {
        slow = slow.next;
        fast = fast.next;
    }
    
    slow.next = slow.next.next;
    return dummy.next;
}

// Check palindrome
function isPalindrome(head) {
    // Find middle
    let slow = head, fast = head;
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
    let left = head, right = prev;
    while (right) {
        if (left.val !== right.val) return false;
        left = left.next;
        right = right.next;
    }
    
    return true;
}

module.exports = { ListNode, SinglyLinkedList, mergeTwoLists, removeNthFromEnd, isPalindrome };
