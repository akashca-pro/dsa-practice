/**
 * ============================================
 * DOUBLY LINKED LIST
 * ============================================
 * 
 * Advantage: O(1) delete if node reference known, bidirectional traversal
 */

class DListNode {
    constructor(val) {
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    
    insertAtHead(val) {
        const node = new DListNode(val);
        if (!this.head) {
            this.head = this.tail = node;
        } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
        this.size++;
    }
    
    insertAtTail(val) {
        const node = new DListNode(val);
        if (!this.tail) {
            this.head = this.tail = node;
        } else {
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        }
        this.size++;
    }
    
    deleteNode(node) {
        if (!node) return;
        
        if (node.prev) node.prev.next = node.next;
        else this.head = node.next;
        
        if (node.next) node.next.prev = node.prev;
        else this.tail = node.prev;
        
        this.size--;
    }
    
    moveToHead(node) {
        if (node === this.head) return;
        this.deleteNode(node);
        node.prev = null;
        node.next = this.head;
        if (this.head) this.head.prev = node;
        this.head = node;
        if (!this.tail) this.tail = node;
        this.size++;
    }
    
    toArray() {
        const arr = [];
        let curr = this.head;
        while (curr) {
            arr.push(curr.val);
            curr = curr.next;
        }
        return arr;
    }
    
    toArrayReverse() {
        const arr = [];
        let curr = this.tail;
        while (curr) {
            arr.push(curr.val);
            curr = curr.prev;
        }
        return arr;
    }
}

// LRU Cache using Doubly Linked List
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
        this.list = new DoublyLinkedList();
    }
    
    get(key) {
        if (!this.map.has(key)) return -1;
        const node = this.map.get(key);
        this.list.moveToHead(node);
        return node.val.value;
    }
    
    put(key, value) {
        if (this.map.has(key)) {
            const node = this.map.get(key);
            node.val.value = value;
            this.list.moveToHead(node);
        } else {
            if (this.map.size >= this.capacity) {
                this.map.delete(this.list.tail.val.key);
                this.list.deleteNode(this.list.tail);
            }
            const node = new DListNode({ key, value });
            this.list.insertAtHead(node.val);
            this.map.set(key, this.list.head);
        }
    }
}

module.exports = { DListNode, DoublyLinkedList, LRUCache };
