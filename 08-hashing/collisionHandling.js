/**
 * ============================================
 * COLLISION HANDLING
 * ============================================
 */

// Chaining (separate chaining) - linked lists at each bucket
class ChainingHashTable {
    constructor(size = 53) {
        this.buckets = new Array(size).fill(null).map(() => []);
        this.size = size;
    }
    
    _hash(key) {
        let hash = 0;
        for (const char of String(key)) hash = (hash * 31 + char.charCodeAt(0)) % this.size;
        return hash;
    }
    
    set(key, value) {
        const idx = this._hash(key);
        for (const pair of this.buckets[idx]) {
            if (pair[0] === key) { pair[1] = value; return; }
        }
        this.buckets[idx].push([key, value]);
    }
    
    get(key) {
        const idx = this._hash(key);
        for (const [k, v] of this.buckets[idx]) if (k === key) return v;
        return undefined;
    }
}

// Open Addressing - Linear Probing
class LinearProbingHashTable {
    constructor(size = 53) {
        this.keys = new Array(size);
        this.values = new Array(size);
        this.size = size;
        this.count = 0;
    }
    
    _hash(key) {
        let hash = 0;
        for (const char of String(key)) hash = (hash * 31 + char.charCodeAt(0)) % this.size;
        return hash;
    }
    
    set(key, value) {
        if (this.count >= this.size * 0.7) this._resize();
        
        let idx = this._hash(key);
        while (this.keys[idx] !== undefined && this.keys[idx] !== key) {
            idx = (idx + 1) % this.size;
        }
        
        if (this.keys[idx] === undefined) this.count++;
        this.keys[idx] = key;
        this.values[idx] = value;
    }
    
    get(key) {
        let idx = this._hash(key);
        let probes = 0;
        
        while (this.keys[idx] !== undefined && probes < this.size) {
            if (this.keys[idx] === key) return this.values[idx];
            idx = (idx + 1) % this.size;
            probes++;
        }
        
        return undefined;
    }
    
    _resize() {
        const oldKeys = this.keys, oldValues = this.values;
        this.size = this.size * 2;
        this.keys = new Array(this.size);
        this.values = new Array(this.size);
        this.count = 0;
        
        for (let i = 0; i < oldKeys.length; i++) {
            if (oldKeys[i] !== undefined) this.set(oldKeys[i], oldValues[i]);
        }
    }
}

// Open Addressing - Quadratic Probing
// Uses i^2 as step size to reduce primary clustering
class QuadraticProbingHashTable {
    constructor(size = 53) {
        this.keys = new Array(size);
        this.values = new Array(size);
        this.size = size;
        this.count = 0;
    }
    
    _hash(key) {
        let hash = 0;
        for (const char of String(key)) hash = (hash * 31 + char.charCodeAt(0)) % this.size;
        return hash;
    }
    
    set(key, value) {
        if (this.count >= this.size * 0.7) this._resize();
        
        let idx = this._hash(key);
        let i = 0;
        
        // Quadratic probing: (hash + i^2) % size
        while (this.keys[idx] !== undefined && this.keys[idx] !== key) {
            i++;
            idx = (this._hash(key) + i * i) % this.size;
        }
        
        if (this.keys[idx] === undefined) this.count++;
        this.keys[idx] = key;
        this.values[idx] = value;
    }
    
    get(key) {
        let idx = this._hash(key);
        let i = 0;
        
        while (this.keys[idx] !== undefined && i < this.size) {
            if (this.keys[idx] === key) return this.values[idx];
            i++;
            idx = (this._hash(key) + i * i) % this.size;
        }
        
        return undefined;
    }
    
    delete(key) {
        let idx = this._hash(key);
        let i = 0;
        
        while (this.keys[idx] !== undefined && i < this.size) {
            if (this.keys[idx] === key) {
                this.keys[idx] = undefined;
                this.values[idx] = undefined;
                this.count--;
                return true;
            }
            i++;
            idx = (this._hash(key) + i * i) % this.size;
        }
        
        return false;
    }
    
    _resize() {
        const oldKeys = this.keys, oldValues = this.values;
        this.size = this.size * 2;
        this.keys = new Array(this.size);
        this.values = new Array(this.size);
        this.count = 0;
        
        for (let i = 0; i < oldKeys.length; i++) {
            if (oldKeys[i] !== undefined) this.set(oldKeys[i], oldValues[i]);
        }
    }
}

// Double Hashing
class DoubleHashingTable {
    constructor(size = 53) {
        this.keys = new Array(size);
        this.values = new Array(size);
        this.size = size;
    }
    
    _hash1(key) {
        let hash = 0;
        for (const char of String(key)) hash = (hash * 31 + char.charCodeAt(0)) % this.size;
        return hash;
    }
    
    _hash2(key) {
        let hash = 0;
        for (const char of String(key)) hash = (hash * 37 + char.charCodeAt(0)) % this.size;
        return 1 + (hash % (this.size - 1));
    }
    
    set(key, value) {
        let idx = this._hash1(key);
        const step = this._hash2(key);
        
        while (this.keys[idx] !== undefined && this.keys[idx] !== key) {
            idx = (idx + step) % this.size;
        }
        
        this.keys[idx] = key;
        this.values[idx] = value;
    }
    
    get(key) {
        let idx = this._hash1(key);
        const step = this._hash2(key);
        
        while (this.keys[idx] !== undefined) {
            if (this.keys[idx] === key) return this.values[idx];
            idx = (idx + step) % this.size;
        }
        
        return undefined;
    }
}

module.exports = { ChainingHashTable, LinearProbingHashTable, QuadraticProbingHashTable, DoubleHashingTable };
