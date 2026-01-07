/**
 * ============================================
 * TRIE (PREFIX TREE)
 * ============================================
 * 
 * CONCEPT:
 * A Trie (pronounced "try") is a tree-like data structure used to store
 * a dynamic set of strings. Each node represents a single character,
 * and paths from root to nodes represent prefixes.
 * 
 * Key Properties:
 * - Root is empty
 * - Each node contains children (usually a-z)
 * - Nodes can be marked as "end of word"
 * - All descendants share common prefix
 * 
 * REAL-WORLD ANALOGY:
 * Phone Contacts Autocomplete:
 * - Type "Jo" → Shows "John", "Josh", "Jordan"
 * - Type "Joh" → Shows only "John"
 * - Each letter narrows down the possibilities
 * - The trie structure makes this instant!
 * 
 * INDUSTRY APPLICATIONS:
 * - Autocomplete systems (Google, IDEs)
 * - Spell checkers
 * - IP routing (longest prefix matching)
 * - Word games (Scrabble, Wordle)
 * - DNA sequence matching
 * - Search engine indexing
 * 
 * COMPLEXITY:
 * | Operation      | Time    | Space    |
 * |----------------|---------|----------|
 * | Insert         | O(m)    | O(m)     |
 * | Search         | O(m)    | O(1)     |
 * | StartsWith     | O(m)    | O(1)     |
 * | Delete         | O(m)    | O(1)     |
 * 
 * m = length of word
 * Total Space: O(ALPHABET_SIZE * m * n) for n words
 */

// ============================================
// 1. TRIE NODE
// ============================================

/**
 * Each node stores:
 * - children: Map or object of child nodes
 * - isEndOfWord: Boolean marking complete word
 */
class TrieNode {
    constructor() {
        this.children = new Map(); // char → TrieNode
        this.isEndOfWord = false;
    }
}

// ============================================
// 2. BASIC TRIE IMPLEMENTATION
// ============================================

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    /**
     * Insert a word - O(m)
     * 
     * For each character:
     * 1. If child doesn't exist, create it
     * 2. Move to child
     * 3. Mark last node as end of word
     */
    insert(word) {
        let node = this.root;
        
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        
        node.isEndOfWord = true;
    }
    
    /**
     * Search for exact word - O(m)
     * 
     * Traverse the trie following characters
     * Return true only if:
     * 1. All characters found
     * 2. Last node is marked as end of word
     */
    search(word) {
        const node = this._traverse(word);
        return node !== null && node.isEndOfWord;
    }
    
    /**
     * Check if any word starts with prefix - O(m)
     * 
     * Just traverse without checking isEndOfWord
     */
    startsWith(prefix) {
        return this._traverse(prefix) !== null;
    }
    
    /**
     * Helper: Traverse trie following characters
     * Returns null if path doesn't exist
     */
    _traverse(str) {
        let node = this.root;
        
        for (const char of str) {
            if (!node.children.has(char)) {
                return null;
            }
            node = node.children.get(char);
        }
        
        return node;
    }
    
    /**
     * Delete a word - O(m)
     * 
     * Use recursion to:
     * 1. Traverse to end of word
     * 2. Unmark as end of word
     * 3. Delete nodes if they have no children
     */
    delete(word) {
        this._deleteHelper(this.root, word, 0);
    }
    
    _deleteHelper(node, word, index) {
        if (index === word.length) {
            if (!node.isEndOfWord) return false;
            node.isEndOfWord = false;
            return node.children.size === 0;
        }
        
        const char = word[index];
        const childNode = node.children.get(char);
        
        if (!childNode) return false;
        
        const shouldDeleteChild = this._deleteHelper(childNode, word, index + 1);
        
        if (shouldDeleteChild) {
            node.children.delete(char);
            return node.children.size === 0 && !node.isEndOfWord;
        }
        
        return false;
    }
    
    /**
     * Get all words with given prefix - O(n)
     * 
     * 1. Navigate to prefix node
     * 2. DFS to find all complete words
     */
    getWordsWithPrefix(prefix) {
        const result = [];
        const node = this._traverse(prefix);
        
        if (node) {
            this._collectWords(node, prefix, result);
        }
        
        return result;
    }
    
    _collectWords(node, currentWord, result) {
        if (node.isEndOfWord) {
            result.push(currentWord);
        }
        
        for (const [char, childNode] of node.children) {
            this._collectWords(childNode, currentWord + char, result);
        }
    }
    
    /**
     * Count words with given prefix
     */
    countWordsWithPrefix(prefix) {
        const node = this._traverse(prefix);
        if (!node) return 0;
        return this._countWords(node);
    }
    
    _countWords(node) {
        let count = node.isEndOfWord ? 1 : 0;
        
        for (const childNode of node.children.values()) {
            count += this._countWords(childNode);
        }
        
        return count;
    }
}

// ============================================
// 3. TRIE WITH ARRAY (OPTIMIZED)
// ============================================

/**
 * Using array instead of Map for lowercase letters only
 * Slightly faster due to direct indexing
 */
class TrieArray {
    constructor() {
        this.root = this._createNode();
    }
    
    _createNode() {
        return {
            children: new Array(26).fill(null),
            isEndOfWord: false
        };
    }
    
    _charIndex(char) {
        return char.charCodeAt(0) - 97; // 'a' = 0
    }
    
    insert(word) {
        let node = this.root;
        
        for (const char of word.toLowerCase()) {
            const idx = this._charIndex(char);
            if (!node.children[idx]) {
                node.children[idx] = this._createNode();
            }
            node = node.children[idx];
        }
        
        node.isEndOfWord = true;
    }
    
    search(word) {
        let node = this.root;
        
        for (const char of word.toLowerCase()) {
            const idx = this._charIndex(char);
            if (!node.children[idx]) return false;
            node = node.children[idx];
        }
        
        return node.isEndOfWord;
    }
    
    startsWith(prefix) {
        let node = this.root;
        
        for (const char of prefix.toLowerCase()) {
            const idx = this._charIndex(char);
            if (!node.children[idx]) return false;
            node = node.children[idx];
        }
        
        return true;
    }
}

// ============================================
// 4. WORD SEARCH PROBLEMS
// ============================================

/**
 * Search word with wildcards (. matches any character)
 */
class WordDictionary {
    constructor() {
        this.root = new TrieNode();
    }
    
    addWord(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        node.isEndOfWord = true;
    }
    
    search(word) {
        return this._searchHelper(word, 0, this.root);
    }
    
    _searchHelper(word, index, node) {
        if (index === word.length) {
            return node.isEndOfWord;
        }
        
        const char = word[index];
        
        if (char === '.') {
            // Wildcard: try all children
            for (const childNode of node.children.values()) {
                if (this._searchHelper(word, index + 1, childNode)) {
                    return true;
                }
            }
            return false;
        } else {
            if (!node.children.has(char)) return false;
            return this._searchHelper(word, index + 1, node.children.get(char));
        }
    }
}

// ============================================
// 5. WORD SEARCH II (LEETCODE HARD)
// ============================================

/**
 * Find all words from dictionary in a board
 * Classic trie + backtracking problem
 */
function findWords(board, words) {
    const result = [];
    const trie = new Trie();
    
    // Build trie from words
    for (const word of words) {
        trie.insert(word);
    }
    
    const rows = board.length;
    const cols = board[0].length;
    
    const dfs = (r, c, node, path) => {
        if (r < 0 || r >= rows || c < 0 || c >= cols) return;
        
        const char = board[r][c];
        if (char === '#' || !node.children.has(char)) return;
        
        const nextNode = node.children.get(char);
        const newPath = path + char;
        
        if (nextNode.isEndOfWord) {
            result.push(newPath);
            nextNode.isEndOfWord = false; // Avoid duplicates
        }
        
        // Mark as visited
        board[r][c] = '#';
        
        // Explore 4 directions
        dfs(r + 1, c, nextNode, newPath);
        dfs(r - 1, c, nextNode, newPath);
        dfs(r, c + 1, nextNode, newPath);
        dfs(r, c - 1, nextNode, newPath);
        
        // Restore
        board[r][c] = char;
    };
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            dfs(r, c, trie.root, '');
        }
    }
    
    return result;
}

// ============================================
// 6. COMMON MISTAKES & EDGE CASES
// ============================================

/**
 * Mistake 1: Not marking isEndOfWord
 * "app" and "apple" share prefix, need to mark "app" as complete word
 * 
 * Mistake 2: Confusing search vs startsWith
 * search("app") in ["apple"] → false
 * startsWith("app") in ["apple"] → true
 * 
 * Mistake 3: Not handling empty string
 * Empty string is a valid word in some problems
 * 
 * Edge Cases:
 * - Empty trie
 * - Single character words
 * - Words that are prefixes of other words
 * - Case sensitivity (convert to lowercase if needed)
 */

// ============================================
// 7. INTERVIEW PERSPECTIVE
// ============================================

/**
 * When to use Trie:
 * 
 * 1. AUTOCOMPLETE: Get all words with prefix
 * 2. SPELL CHECKER: Find similar words
 * 3. WORD GAMES: Check if prefix can form word
 * 4. IP ROUTING: Longest prefix match
 * 
 * Trie vs Hash Set:
 * - Hash Set: O(m) search, O(1) per word space
 * - Trie: O(m) search, shared prefix space, prefix queries
 * 
 * Use Trie when:
 * - Need prefix-based queries
 * - Many words share common prefixes
 * - Need autocomplete functionality
 */

// ============================================
// 8. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Easy): Longest Common Prefix
 */
function longestCommonPrefix(strs) {
    if (!strs.length) return '';
    
    const trie = new Trie();
    for (const str of strs) {
        if (str === '') return '';
        trie.insert(str);
    }
    
    let prefix = '';
    let node = trie.root;
    
    while (node.children.size === 1 && !node.isEndOfWord) {
        const [char, childNode] = [...node.children.entries()][0];
        prefix += char;
        node = childNode;
    }
    
    return prefix;
}

/**
 * Problem 2 (Medium): Replace Words
 * Replace derivatives with their root in a sentence
 */
function replaceWords(dictionary, sentence) {
    const trie = new Trie();
    for (const root of dictionary) {
        trie.insert(root);
    }
    
    const words = sentence.split(' ');
    
    const findRoot = (word) => {
        let node = trie.root;
        let prefix = '';
        
        for (const char of word) {
            if (!node.children.has(char)) break;
            prefix += char;
            node = node.children.get(char);
            if (node.isEndOfWord) return prefix;
        }
        
        return word;
    };
    
    return words.map(findRoot).join(' ');
}

/**
 * Problem 3 (Hard): Stream of Characters
 */
class StreamChecker {
    constructor(words) {
        this.trie = new TrieNode();
        this.stream = [];
        
        // Insert reversed words
        for (const word of words) {
            let node = this.trie;
            for (let i = word.length - 1; i >= 0; i--) {
                const char = word[i];
                if (!node.children.has(char)) {
                    node.children.set(char, new TrieNode());
                }
                node = node.children.get(char);
            }
            node.isEndOfWord = true;
        }
    }
    
    query(letter) {
        this.stream.push(letter);
        let node = this.trie;
        
        // Check from end of stream backwards
        for (let i = this.stream.length - 1; i >= 0; i--) {
            const char = this.stream[i];
            if (!node.children.has(char)) return false;
            node = node.children.get(char);
            if (node.isEndOfWord) return true;
        }
        
        return false;
    }
}

/**
 * Problem 4 (Medium): Maximum XOR of Two Numbers
 * Use binary trie for bit manipulation
 */
function findMaximumXOR(nums) {
    const root = { children: {} };
    
    // Insert all numbers as 32-bit binary
    for (const num of nums) {
        let node = root;
        for (let i = 31; i >= 0; i--) {
            const bit = (num >> i) & 1;
            if (!node.children[bit]) {
                node.children[bit] = { children: {} };
            }
            node = node.children[bit];
        }
    }
    
    let maxXor = 0;
    
    // For each number, find the number that maximizes XOR
    for (const num of nums) {
        let node = root;
        let xor = 0;
        
        for (let i = 31; i >= 0; i--) {
            const bit = (num >> i) & 1;
            const oppositeBit = 1 - bit;
            
            // Try to go opposite direction (maximize XOR)
            if (node.children[oppositeBit]) {
                xor |= (1 << i);
                node = node.children[oppositeBit];
            } else {
                node = node.children[bit];
            }
        }
        
        maxXor = Math.max(maxXor, xor);
    }
    
    return maxXor;
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * TRIE CHEAT SHEET:
 * 
 * STRUCTURE:
 * - Root is empty
 * - Each node has children (Map or Array[26])
 * - Nodes marked as "end of word"
 * 
 * OPERATIONS:
 * | Operation   | Time   | Description                    |
 * |-------------|--------|--------------------------------|
 * | insert      | O(m)   | Add word character by character|
 * | search      | O(m)   | Find exact word                |
 * | startsWith  | O(m)   | Check if prefix exists         |
 * | delete      | O(m)   | Remove word, cleanup empty nodes|
 * 
 * IMPLEMENTATION CHOICES:
 * - Map: Flexible, any character set
 * - Array[26]: Faster for lowercase only
 * 
 * COMMON PATTERNS:
 * - Autocomplete: getWordsWithPrefix()
 * - Word search with wildcards: DFS with '.' handling
 * - Word search in grid: Trie + backtracking
 * - Binary trie: For XOR problems
 * 
 * USE CASES:
 * - Prefix queries (autocomplete)
 * - Dictionary word lookup
 * - IP routing (longest prefix match)
 * - Word games
 * 
 * TRIE vs HASH SET:
 * - Use Trie when you need prefix operations
 * - Use Hash Set for simple contains() check
 */

module.exports = { 
    TrieNode,
    Trie, 
    TrieArray,
    WordDictionary,
    findWords,
    longestCommonPrefix,
    replaceWords,
    StreamChecker,
    findMaximumXOR
};
