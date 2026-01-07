/**
 * ============================================
 * HASH FUNCTIONS
 * ============================================
 */

// Simple string hash
function simpleHash(str, size) {
    let hash = 0;
    for (const char of str) hash += char.charCodeAt(0);
    return hash % size;
}

// DJB2 hash (good distribution)
function djb2Hash(str) {
    let hash = 5381;
    for (const char of str) hash = ((hash << 5) + hash) + char.charCodeAt(0);
    return hash >>> 0;
}

// Polynomial rolling hash
function polynomialHash(str, base = 31, mod = 1e9 + 9) {
    let hash = 0, p = 1;
    for (const char of str) {
        hash = (hash + (char.charCodeAt(0) - 96) * p) % mod;
        p = (p * base) % mod;
    }
    return hash;
}

// Rolling hash for string matching (Rabin-Karp)
function rabinKarp(text, pattern) {
    const base = 256, mod = 101;
    const n = text.length, m = pattern.length;
    const indices = [];
    
    let patternHash = 0, textHash = 0, h = 1;
    
    for (let i = 0; i < m - 1; i++) h = (h * base) % mod;
    
    for (let i = 0; i < m; i++) {
        patternHash = (base * patternHash + pattern.charCodeAt(i)) % mod;
        textHash = (base * textHash + text.charCodeAt(i)) % mod;
    }
    
    for (let i = 0; i <= n - m; i++) {
        if (patternHash === textHash) {
            if (text.slice(i, i + m) === pattern) indices.push(i);
        }
        
        if (i < n - m) {
            textHash = (base * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % mod;
            if (textHash < 0) textHash += mod;
        }
    }
    
    return indices;
}

module.exports = { simpleHash, djb2Hash, polynomialHash, rabinKarp };
