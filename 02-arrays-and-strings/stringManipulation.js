/**
 * ============================================
 * STRING MANIPULATION
 * ============================================
 * 
 * CONCEPT:
 * Strings are sequences of characters. In JavaScript, strings are immutable,
 * meaning operations create new strings rather than modifying existing ones.
 * Understanding this is crucial for writing efficient string algorithms.
 * 
 * REAL-WORLD ANALOGY:
 * Strings are like printed text on paper:
 * - You can read any position (index access)
 * - You can't erase or change characters (immutability)
 * - Making changes means rewriting the entire string
 * - You can compare strings like comparing paragraphs
 * 
 * INDUSTRY APPLICATIONS:
 * - Text editors and word processors
 * - Search engines (text matching)
 * - DNA sequence analysis
 * - Compilers (lexical analysis)
 * - Data validation (passwords, emails)
 */

// ============================================
// 1. STRING FUNDAMENTALS
// ============================================

/**
 * String Immutability Demonstration
 */
function stringImmutability() {
    let str = "hello";
    
    // This creates a NEW string, doesn't modify original
    str = str.toUpperCase();
    
    // Cannot change individual characters
    str[0] = 'X'; // This does nothing!
    console.log(str); // Still "HELLO"
    
    // Each concatenation creates new string
    let result = '';
    for (let i = 0; i < 1000; i++) {
        result += 'a'; // O(n) each time!
    }
    // Total: O(1 + 2 + 3 + ... + n) = O(n²)
}

/**
 * Efficient String Building
 */
function efficientStringBuilding(chars) {
    // Use array and join instead
    const parts = [];
    for (const char of chars) {
        parts.push(char); // O(1) amortized
    }
    return parts.join(''); // O(n) once
    // Total: O(n)
}

/**
 * String Method Complexities:
 * 
 * | Method              | Time Complexity |
 * |---------------------|-----------------|
 * | str[i]              | O(1)            |
 * | str.length          | O(1)            |
 * | str.charAt(i)       | O(1)            |
 * | str.slice(i, j)     | O(j - i)        |
 * | str.substring()     | O(n)            |
 * | str.concat()        | O(n + m)        |
 * | str.split()         | O(n)            |
 * | str.indexOf()       | O(n * m)        |
 * | str.includes()      | O(n * m)        |
 * | str.replace()       | O(n)            |
 * | str.toLowerCase()   | O(n)            |
 * | str.trim()          | O(n)            |
 */

// ============================================
// 2. COMMON STRING OPERATIONS
// ============================================

/**
 * Reverse a String
 */
function reverseString(str) {
    return str.split('').reverse().join('');
    // O(n) time, O(n) space
}

// More efficient for very long strings
function reverseStringEfficient(str) {
    let result = '';
    for (let i = str.length - 1; i >= 0; i--) {
        result = result + str[i];
    }
    return result;
    // Still O(n²) due to string concatenation
    // For efficiency, use array approach above
}

/**
 * Check if Palindrome
 */
function isPalindrome(str) {
    str = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    let left = 0;
    let right = str.length - 1;
    
    while (left < right) {
        if (str[left] !== str[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
    // O(n) time, O(1) extra space (after preprocessing)
}

/**
 * Check Anagram
 */
function isAnagram(str1, str2) {
    if (str1.length !== str2.length) return false;
    
    const charCount = {};
    
    // Count characters in first string
    for (const char of str1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Decrease count for second string
    for (const char of str2) {
        if (!charCount[char]) return false;
        charCount[char]--;
    }
    
    return true;
    // O(n) time, O(k) space where k = unique characters
}

/**
 * Count Character Frequency
 */
function charFrequency(str) {
    const freq = {};
    
    for (const char of str) {
        freq[char] = (freq[char] || 0) + 1;
    }
    
    return freq;
    // O(n) time, O(k) space
}

/**
 * Find First Non-Repeating Character
 */
function firstNonRepeating(str) {
    const freq = {};
    
    for (const char of str) {
        freq[char] = (freq[char] || 0) + 1;
    }
    
    for (let i = 0; i < str.length; i++) {
        if (freq[str[i]] === 1) {
            return { char: str[i], index: i };
        }
    }
    
    return null;
    // O(n) time, O(k) space
}

// ============================================
// 3. STRING SEARCHING
// ============================================

/**
 * Naive String Search - O(n * m)
 */
function naiveSearch(text, pattern) {
    const indices = [];
    
    for (let i = 0; i <= text.length - pattern.length; i++) {
        let match = true;
        
        for (let j = 0; j < pattern.length; j++) {
            if (text[i + j] !== pattern[j]) {
                match = false;
                break;
            }
        }
        
        if (match) {
            indices.push(i);
        }
    }
    
    return indices;
    // Worst case: O(n * m) where n = text length, m = pattern length
}

/**
 * Rabin-Karp Algorithm - Average O(n + m)
 * Uses rolling hash for efficient comparison
 */
function rabinKarp(text, pattern) {
    const BASE = 256;
    const MOD = 101;
    const n = text.length;
    const m = pattern.length;
    const indices = [];
    
    if (m > n) return indices;
    
    // Calculate hash for pattern and first window
    let patternHash = 0;
    let windowHash = 0;
    let h = 1;
    
    // h = BASE^(m-1) % MOD
    for (let i = 0; i < m - 1; i++) {
        h = (h * BASE) % MOD;
    }
    
    // Calculate initial hashes
    for (let i = 0; i < m; i++) {
        patternHash = (BASE * patternHash + pattern.charCodeAt(i)) % MOD;
        windowHash = (BASE * windowHash + text.charCodeAt(i)) % MOD;
    }
    
    // Slide the window
    for (let i = 0; i <= n - m; i++) {
        if (patternHash === windowHash) {
            // Verify character by character (avoid hash collision)
            let match = true;
            for (let j = 0; j < m; j++) {
                if (text[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) indices.push(i);
        }
        
        // Calculate hash for next window
        if (i < n - m) {
            windowHash = (BASE * (windowHash - text.charCodeAt(i) * h) + 
                         text.charCodeAt(i + m)) % MOD;
            if (windowHash < 0) windowHash += MOD;
        }
    }
    
    return indices;
}

/**
 * KMP (Knuth-Morris-Pratt) Algorithm - O(n + m)
 * Preprocesses pattern to skip unnecessary comparisons
 */
function buildLPS(pattern) {
    const m = pattern.length;
    const lps = new Array(m).fill(0);
    let len = 0;
    let i = 1;
    
    while (i < m) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else if (len !== 0) {
            len = lps[len - 1];
        } else {
            lps[i] = 0;
            i++;
        }
    }
    
    return lps;
}

function kmpSearch(text, pattern) {
    const n = text.length;
    const m = pattern.length;
    const lps = buildLPS(pattern);
    const indices = [];
    
    let i = 0; // text index
    let j = 0; // pattern index
    
    while (i < n) {
        if (text[i] === pattern[j]) {
            i++;
            j++;
        }
        
        if (j === m) {
            indices.push(i - j);
            j = lps[j - 1];
        } else if (i < n && text[i] !== pattern[j]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    
    return indices;
    // O(n + m) time, O(m) space for LPS array
}

// ============================================
// 4. STRING TRANSFORMATION
// ============================================

/**
 * Remove Duplicates (maintain order)
 */
function removeDuplicates(str) {
    const seen = new Set();
    const result = [];
    
    for (const char of str) {
        if (!seen.has(char)) {
            seen.add(char);
            result.push(char);
        }
    }
    
    return result.join('');
}

/**
 * Compress String (Run-Length Encoding)
 */
function compress(str) {
    if (str.length === 0) return str;
    
    const result = [];
    let count = 1;
    
    for (let i = 1; i <= str.length; i++) {
        if (i < str.length && str[i] === str[i - 1]) {
            count++;
        } else {
            result.push(str[i - 1]);
            if (count > 1) {
                result.push(count.toString());
            }
            count = 1;
        }
    }
    
    const compressed = result.join('');
    return compressed.length < str.length ? compressed : str;
}

/**
 * Decompress String
 */
function decompress(str) {
    const result = [];
    let i = 0;
    
    while (i < str.length) {
        const char = str[i++];
        let numStr = '';
        
        while (i < str.length && /\d/.test(str[i])) {
            numStr += str[i++];
        }
        
        const count = numStr ? parseInt(numStr) : 1;
        result.push(char.repeat(count));
    }
    
    return result.join('');
}

/**
 * String Rotation Check
 */
function isRotation(str1, str2) {
    if (str1.length !== str2.length) return false;
    
    // If str2 is a rotation of str1, str2 must be a substring of str1+str1
    const doubled = str1 + str1;
    return doubled.includes(str2);
    // O(n) time using efficient substring search
}

// ============================================
// 5. SUBSTRING PROBLEMS
// ============================================

/**
 * Longest Substring Without Repeating Characters
 * Sliding window approach
 */
function longestUniqueSubstring(str) {
    const charIndex = new Map();
    let maxLength = 0;
    let start = 0;
    
    for (let end = 0; end < str.length; end++) {
        const char = str[end];
        
        if (charIndex.has(char) && charIndex.get(char) >= start) {
            start = charIndex.get(char) + 1;
        }
        
        charIndex.set(char, end);
        maxLength = Math.max(maxLength, end - start + 1);
    }
    
    return maxLength;
    // O(n) time, O(min(n, k)) space where k = alphabet size
}

/**
 * Find All Substrings
 */
function allSubstrings(str) {
    const substrings = [];
    
    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j <= str.length; j++) {
            substrings.push(str.slice(i, j));
        }
    }
    
    return substrings;
    // O(n³) time (n² substrings, each takes O(n) to create)
}

/**
 * Longest Common Prefix
 */
function longestCommonPrefix(strs) {
    if (strs.length === 0) return '';
    
    let prefix = strs[0];
    
    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, -1);
            if (prefix === '') return '';
        }
    }
    
    return prefix;
    // O(S) where S = sum of all string lengths
}

// ============================================
// 6. COMMON MISTAKES & EDGE CASES
// ============================================

/**
 * Edge Case 1: Empty String
 */
function handleEmpty(str) {
    if (!str || str.length === 0) {
        return ''; // or appropriate default
    }
    // Continue processing...
}

/**
 * Edge Case 2: Single Character
 */
function handleSingleChar(str) {
    if (str.length === 1) {
        return str; // Often special case for palindrome, reverse, etc.
    }
}

/**
 * Edge Case 3: Unicode and Special Characters
 */
function handleUnicode() {
    const emoji = '😀';
    console.log(emoji.length); // 2 (surrogate pairs!)
    
    // Use Array.from for proper splitting
    const chars = Array.from(emoji);
    console.log(chars.length); // 1
    
    // Or spread operator
    const chars2 = [...emoji];
    console.log(chars2.length); // 1
}

/**
 * Mistake 1: Case Sensitivity
 */
function caseSensitivity() {
    const str = 'Hello';
    
    // These are NOT equal
    console.log(str === 'hello'); // false
    
    // Normalize for comparison
    console.log(str.toLowerCase() === 'hello'.toLowerCase()); // true
}

/**
 * Mistake 2: Whitespace Handling
 */
function whitespaceHandling() {
    const str = '  hello world  ';
    
    str.trim();       // Removes leading/trailing whitespace
    str.trimStart();  // Only leading
    str.trimEnd();    // Only trailing
    
    // For multiple spaces between words
    const normalized = str.trim().replace(/\s+/g, ' ');
}

// ============================================
// 7. INTERVIEW PERSPECTIVE
// ============================================

/**
 * Common string interview patterns:
 * 
 * 1. Two Pointers - Palindrome, reversal
 * 2. Sliding Window - Substring problems
 * 3. Hash Map - Character frequency
 * 4. Dynamic Programming - Edit distance, LCS
 * 5. Trie - Prefix matching, autocomplete
 * 
 * Questions to ask:
 * - Are strings case-sensitive?
 * - What characters are allowed?
 * - Should I consider Unicode?
 * - Can I modify the original string?
 */

// ============================================
// 8. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Easy): Valid Anagram with frequency array
 */
function validAnagram(s, t) {
    if (s.length !== t.length) return false;
    
    const count = new Array(26).fill(0);
    const aCode = 'a'.charCodeAt(0);
    
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - aCode]++;
        count[t.charCodeAt(i) - aCode]--;
    }
    
    return count.every(c => c === 0);
}

/**
 * Problem 2 (Medium): Group Anagrams
 */
function groupAnagrams(strs) {
    const groups = new Map();
    
    for (const str of strs) {
        // Sort chars as key
        const key = str.split('').sort().join('');
        
        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key).push(str);
    }
    
    return Array.from(groups.values());
    // O(n * k log k) where n = number of strings, k = max string length
}

/**
 * Problem 3 (Medium): Longest Palindromic Substring
 */
function longestPalindrome(s) {
    if (s.length < 2) return s;
    
    let start = 0, maxLen = 1;
    
    function expandFromCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            const len = right - left + 1;
            if (len > maxLen) {
                start = left;
                maxLen = len;
            }
            left--;
            right++;
        }
    }
    
    for (let i = 0; i < s.length; i++) {
        expandFromCenter(i, i);     // Odd length
        expandFromCenter(i, i + 1); // Even length
    }
    
    return s.slice(start, start + maxLen);
    // O(n²) time, O(1) space
}

/**
 * Problem 4 (Hard): Minimum Window Substring
 */
function minWindow(s, t) {
    if (t.length > s.length) return '';
    
    const need = new Map();
    for (const char of t) {
        need.set(char, (need.get(char) || 0) + 1);
    }
    
    let required = need.size;
    let formed = 0;
    const windowCounts = new Map();
    
    let left = 0;
    let minLen = Infinity;
    let minStart = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        windowCounts.set(char, (windowCounts.get(char) || 0) + 1);
        
        if (need.has(char) && windowCounts.get(char) === need.get(char)) {
            formed++;
        }
        
        while (formed === required) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }
            
            const leftChar = s[left];
            windowCounts.set(leftChar, windowCounts.get(leftChar) - 1);
            
            if (need.has(leftChar) && windowCounts.get(leftChar) < need.get(leftChar)) {
                formed--;
            }
            
            left++;
        }
    }
    
    return minLen === Infinity ? '' : s.slice(minStart, minStart + minLen);
    // O(S + T) time, O(S + T) space
}

module.exports = {
    reverseString,
    isPalindrome,
    isAnagram,
    charFrequency,
    firstNonRepeating,
    naiveSearch,
    kmpSearch,
    rabinKarp,
    removeDuplicates,
    compress,
    decompress,
    isRotation,
    longestUniqueSubstring,
    longestCommonPrefix,
    groupAnagrams,
    longestPalindrome,
    minWindow
};
