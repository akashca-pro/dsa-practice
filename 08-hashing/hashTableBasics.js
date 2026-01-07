/**
 * ============================================
 * HASH TABLE BASICS
 * ============================================
 * Average: O(1) insert/search/delete | Worst: O(n) with collisions
 */

class HashTable {
    constructor(size = 53) {
        this.keyMap = new Array(size);
        this.size = size;
    }
    
    _hash(key) {
        let total = 0;
        const PRIME = 31;
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            total = (total * PRIME + key.charCodeAt(i)) % this.size;
        }
        return total;
    }
    
    set(key, value) {
        const idx = this._hash(key);
        if (!this.keyMap[idx]) this.keyMap[idx] = [];
        
        for (const pair of this.keyMap[idx]) {
            if (pair[0] === key) { pair[1] = value; return; }
        }
        this.keyMap[idx].push([key, value]);
    }
    
    get(key) {
        const idx = this._hash(key);
        if (!this.keyMap[idx]) return undefined;
        
        for (const pair of this.keyMap[idx]) {
            if (pair[0] === key) return pair[1];
        }
        return undefined;
    }
    
    delete(key) {
        const idx = this._hash(key);
        if (!this.keyMap[idx]) return false;
        
        const bucket = this.keyMap[idx];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    
    keys() {
        const keys = [];
        for (const bucket of this.keyMap) {
            if (bucket) for (const [key] of bucket) keys.push(key);
        }
        return keys;
    }
    
    values() {
        const values = [];
        for (const bucket of this.keyMap) {
            if (bucket) for (const [, value] of bucket) values.push(value);
        }
        return values;
    }
}

module.exports = { HashTable };
