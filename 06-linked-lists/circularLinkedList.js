/**
 * ============================================
 * CIRCULAR LINKED LIST
 * ============================================
 */

class CListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class CircularLinkedList {
    constructor() {
        this.tail = null;
        this.size = 0;
    }
    
    insertAtHead(val) {
        const node = new CListNode(val);
        if (!this.tail) {
            this.tail = node;
            node.next = node;
        } else {
            node.next = this.tail.next;
            this.tail.next = node;
        }
        this.size++;
    }
    
    insertAtTail(val) {
        this.insertAtHead(val);
        this.tail = this.tail.next;
    }
    
    deleteHead() {
        if (!this.tail) return null;
        const head = this.tail.next;
        if (head === this.tail) {
            this.tail = null;
        } else {
            this.tail.next = head.next;
        }
        this.size--;
        return head.val;
    }
    
    toArray() {
        if (!this.tail) return [];
        const arr = [];
        let curr = this.tail.next;
        do {
            arr.push(curr.val);
            curr = curr.next;
        } while (curr !== this.tail.next);
        return arr;
    }
}

// Josephus Problem
function josephus(n, k) {
    const list = new CircularLinkedList();
    for (let i = 1; i <= n; i++) list.insertAtTail(i);
    
    let curr = list.tail;
    while (list.size > 1) {
        for (let i = 1; i < k; i++) curr = curr.next;
        const toRemove = curr.next;
        curr.next = toRemove.next;
        if (toRemove === list.tail) list.tail = curr;
        list.size--;
    }
    
    return list.tail.val;
}

module.exports = { CListNode, CircularLinkedList, josephus };
