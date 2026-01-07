/**
 * ============================================
 * CIRCULAR QUEUE
 * ============================================
 */

class CircularQueue {
    constructor(k) {
        this.data = new Array(k);
        this.size = k;
        this.head = 0;
        this.tail = 0;
        this.count = 0;
    }
    
    enQueue(value) {
        if (this.isFull()) return false;
        this.data[this.tail] = value;
        this.tail = (this.tail + 1) % this.size;
        this.count++;
        return true;
    }
    
    deQueue() {
        if (this.isEmpty()) return false;
        this.head = (this.head + 1) % this.size;
        this.count--;
        return true;
    }
    
    Front() { return this.isEmpty() ? -1 : this.data[this.head]; }
    Rear() { return this.isEmpty() ? -1 : this.data[(this.tail - 1 + this.size) % this.size]; }
    isEmpty() { return this.count === 0; }
    isFull() { return this.count === this.size; }
}

// Circular Deque
class CircularDeque {
    constructor(k) {
        this.data = new Array(k);
        this.size = k;
        this.head = 0;
        this.tail = 0;
        this.count = 0;
    }
    
    insertFront(value) {
        if (this.isFull()) return false;
        this.head = (this.head - 1 + this.size) % this.size;
        this.data[this.head] = value;
        this.count++;
        return true;
    }
    
    insertLast(value) {
        if (this.isFull()) return false;
        this.data[this.tail] = value;
        this.tail = (this.tail + 1) % this.size;
        this.count++;
        return true;
    }
    
    deleteFront() {
        if (this.isEmpty()) return false;
        this.head = (this.head + 1) % this.size;
        this.count--;
        return true;
    }
    
    deleteLast() {
        if (this.isEmpty()) return false;
        this.tail = (this.tail - 1 + this.size) % this.size;
        this.count--;
        return true;
    }
    
    getFront() { return this.isEmpty() ? -1 : this.data[this.head]; }
    getRear() { return this.isEmpty() ? -1 : this.data[(this.tail - 1 + this.size) % this.size]; }
    isEmpty() { return this.count === 0; }
    isFull() { return this.count === this.size; }
}

module.exports = { CircularQueue, CircularDeque };
