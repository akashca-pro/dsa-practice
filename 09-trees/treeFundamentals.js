/**
 * ============================================
 * TREE FUNDAMENTALS - CORE CONCEPTS
 * ============================================
 * 
 * WHAT IS A TREE?
 * ===============
 * A tree is a hierarchical, non-linear data structure consisting of 
 * nodes connected by edges. Unlike arrays or linked lists (linear),
 * trees branch out like an actual tree (but upside down!).
 * 
 * 
 * VISUAL REPRESENTATION:
 * ======================
 * 
 *              ● Root (Level 0)
 *             /|\
 *            / | \
 *           ●  ●  ● (Level 1)
 *          /|     |\
 *         / |     | \
 *        ●  ●     ●  ● (Level 2 - Leaves)
 * 
 * 
 * REAL-WORLD EXAMPLES:
 * ====================
 * 
 * 1. FAMILY TREE:
 *    
 *         Grandfather
 *            /    \
 *        Father   Uncle
 *        /   \      \
 *      You  Sister  Cousin
 * 
 * 2. FILE SYSTEM:
 *    
 *           root/
 *          /    \
 *       home/   var/
 *        |       |
 *      user/   log/
 *      /   \
 *   docs/  pics/
 * 
 * 3. COMPANY HIERARCHY:
 *    
 *              CEO
 *            /     \
 *         CTO      CFO
 *        /   \       \
 *    Dev Lead QA Lead Accountant
 * 
 * 
 * KEY TERMINOLOGY:
 * ================
 * 
 *            ● A (Root)
 *           / \
 *          ●   ● B, C (Internal Nodes)
 *         /|   |\
 *        ● ●   ● ● D, E, F, G (Leaves)
 * 
 * | Term | Definition | Example |
 * |------|------------|---------|
 * | Node | An element in the tree | A, B, C, D, E, F, G |
 * | Root | The topmost node (no parent) | A |
 * | Parent | Node directly above | A is parent of B, C |
 * | Child | Node directly below | B, C are children of A |
 * | Siblings | Nodes with same parent | B and C are siblings |
 * | Leaf | Node with no children | D, E, F, G |
 * | Internal Node | Node with at least one child | A, B, C |
 * | Edge | Connection between nodes | Line from A to B |
 * | Path | Sequence of edges | A → B → D |
 * | Depth | Distance from root to node | Depth of D = 2 |
 * | Height | Longest path to a leaf | Height of A = 2 |
 * | Level | All nodes at same depth | B, C are at level 1 |
 * | Subtree | Tree formed by a node + descendants | B with D, E |
 * | Degree | Number of children | Degree of A = 2 |
 * 
 * 
 * TREE PROPERTIES:
 * ================
 * 
 * 1. Connected: All nodes are reachable from root
 * 2. Acyclic: No loops/cycles exist
 * 3. N nodes = N-1 edges (always!)
 * 4. One unique path between any two nodes
 * 
 * 
 * TYPES OF TREES:
 * ===============
 * 
 * 1. GENERAL TREE
 *    - Any number of children per node
 *    
 *         ●
 *       / | \
 *      ●  ●  ●
 *     /|\    |
 *    ● ● ●   ●
 * 
 * 2. BINARY TREE
 *    - At most 2 children per node (left and right)
 *    
 *         ●
 *        / \
 *       ●   ●
 *      / \   \
 *     ●   ●   ●
 * 
 * 3. BINARY SEARCH TREE (BST)
 *    - Binary tree with ordering: left < parent < right
 *    
 *         8
 *        / \
 *       3   10
 *      / \    \
 *     1   6    14
 * 
 * 4. BALANCED TREE (AVL, Red-Black)
 *    - Height difference between subtrees ≤ 1
 *    - Guarantees O(log n) operations
 * 
 * 5. COMPLETE BINARY TREE
 *    - All levels filled except possibly last
 *    - Last level filled from left to right
 *    
 *         ●
 *        / \
 *       ●   ●
 *      / \
 *     ●   ●
 * 
 * 6. FULL BINARY TREE
 *    - Every node has 0 or 2 children (never 1)
 *    
 *         ●
 *        / \
 *       ●   ●
 *      / \
 *     ●   ●
 * 
 * 7. PERFECT BINARY TREE
 *    - All internal nodes have 2 children
 *    - All leaves at same level
 *    
 *         ●
 *        / \
 *       ●   ●
 *      /|   |\
 *     ● ●   ● ●
 * 
 * 8. HEAP
 *    - Complete binary tree with heap property
 *    - Min-heap: Parent ≤ Children
 *    - Max-heap: Parent ≥ Children
 * 
 * 9. TRIE (Prefix Tree)
 *    - For storing strings
 *    - Each path represents a word
 * 
 * 
 * WHY USE TREES?
 * ==============
 * 
 * | Data Structure | Search | Insert | Delete |
 * |----------------|--------|--------|--------|
 * | Array (sorted) | O(log n) | O(n) | O(n) |
 * | Linked List | O(n) | O(1) | O(1) |
 * | BST (balanced) | O(log n) | O(log n) | O(log n) |
 * | Hash Table | O(1)* | O(1)* | O(1)* |
 * 
 * Trees are great when you need:
 * - Hierarchical data (file systems, HTML DOM)
 * - Fast search + insert + delete (BST)
 * - Ordered data with efficient updates
 * - Range queries
 * 
 * 
 * BINARY TREE NODE:
 * =================
 */

class TreeNode {
    constructor(val) {
        this.val = val;       // Data stored in node
        this.left = null;     // Left child
        this.right = null;    // Right child
    }
}

/**
 * TREE TRAVERSALS:
 * ================
 * 
 * Four ways to visit all nodes:
 * 
 *         1
 *        / \
 *       2   3
 *      / \
 *     4   5
 * 
 * 1. PREORDER (Root → Left → Right): 1, 2, 4, 5, 3
 *    "Visit root BEFORE children"
 * 
 * 2. INORDER (Left → Root → Right): 4, 2, 5, 1, 3
 *    "Visit root IN BETWEEN children"
 *    ★ Gives SORTED order for BST!
 * 
 * 3. POSTORDER (Left → Right → Root): 4, 5, 2, 3, 1
 *    "Visit root AFTER children"
 * 
 * 4. LEVEL ORDER (BFS): 1, 2, 3, 4, 5
 *    "Visit level by level"
 */

// Preorder: Root → Left → Right
function preorder(root, result = []) {
    if (!root) return result;
    result.push(root.val);        // Visit root first
    preorder(root.left, result);  // Then left subtree
    preorder(root.right, result); // Then right subtree
    return result;
}

// Inorder: Left → Root → Right
function inorder(root, result = []) {
    if (!root) return result;
    inorder(root.left, result);   // Left subtree first
    result.push(root.val);        // Then visit root
    inorder(root.right, result);  // Then right subtree
    return result;
}

// Postorder: Left → Right → Root
function postorder(root, result = []) {
    if (!root) return result;
    postorder(root.left, result);  // Left subtree first
    postorder(root.right, result); // Then right subtree
    result.push(root.val);         // Visit root last
    return result;
}

// Level Order (BFS)
function levelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length) {
        const level = [];
        const size = queue.length;
        
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            level.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        result.push(level);
    }
    
    return result;
}

/**
 * TREE CALCULATIONS:
 * ==================
 */

// Height of tree (edges from root to deepest leaf)
function height(root) {
    if (!root) return -1;  // -1 for edges, 0 for nodes
    return 1 + Math.max(height(root.left), height(root.right));
}

// Count total nodes
function countNodes(root) {
    if (!root) return 0;
    return 1 + countNodes(root.left) + countNodes(root.right);
}

// Count leaf nodes
function countLeaves(root) {
    if (!root) return 0;
    if (!root.left && !root.right) return 1;  // Is a leaf
    return countLeaves(root.left) + countLeaves(root.right);
}

// Check if two trees are identical
function isSameTree(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    return p.val === q.val 
        && isSameTree(p.left, q.left) 
        && isSameTree(p.right, q.right);
}

/**
 * BUILDING A TREE:
 * ================
 */

// Build tree from array (level order)
// Example: [1, 2, 3, 4, 5] creates:
//        1
//       / \
//      2   3
//     / \
//    4   5
function buildTree(arr) {
    if (!arr.length || arr[0] === null) return null;
    
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    
    while (queue.length && i < arr.length) {
        const node = queue.shift();
        
        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode(arr[i]);
            queue.push(node.left);
        }
        i++;
        
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]);
            queue.push(node.right);
        }
        i++;
    }
    
    return root;
}

/**
 * TREE vs OTHER DATA STRUCTURES:
 * ==============================
 * 
 * ARRAY:
 * - ✅ Fast access by index O(1)
 * - ❌ Slow insert/delete O(n)
 * - Use when: Index-based access needed
 * 
 * LINKED LIST:
 * - ✅ Fast insert/delete O(1)
 * - ❌ Slow search O(n)
 * - Use when: Frequent insertions/deletions
 * 
 * TREE (BST):
 * - ✅ Fast search, insert, delete O(log n)
 * - ✅ Maintains sorted order
 * - ❌ Can degrade to O(n) if unbalanced
 * - Use when: Need all operations to be fast
 * 
 * HASH TABLE:
 * - ✅ Fastest O(1) average
 * - ❌ No ordering
 * - ❌ Extra space for hash
 * - Use when: Just need fast lookup
 * 
 * 
 * INTERVIEW TIPS:
 * ===============
 * 
 * 1. Most tree problems use RECURSION
 *    - Think: "What does my function return?"
 *    - Think: "How do I combine left and right results?"
 * 
 * 2. Base cases are crucial
 *    - Empty tree: if (!root) return ...
 *    - Leaf node: if (!root.left && !root.right) return ...
 * 
 * 3. Know your traversals:
 *    - Inorder for BST = sorted order
 *    - Preorder for serialization
 *    - Postorder for deletion
 *    - Level order for level-by-level
 * 
 * 4. Common patterns:
 *    - Pass info down (parameters)
 *    - Pass info up (return values)
 *    - Use global/instance variable for complex returns
 */

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * TREE FUNDAMENTALS CHEAT SHEET:
 * 
 * TERMINOLOGY:
 * - Root: Top node
 * - Leaf: Node with no children
 * - Height: Longest path to leaf
 * - Depth: Distance from root
 * 
 * TYPES:
 * - Binary Tree: Max 2 children
 * - BST: Left < Parent < Right
 * - Balanced: Height difference ≤ 1
 * - Complete: Fill left to right
 * - Heap: Parent ≤ or ≥ Children
 * 
 * TRAVERSALS:
 * | Order     | Sequence           | Use Case |
 * |-----------|--------------------| ---------|
 * | Preorder  | Root → Left → Right| Copy tree|
 * | Inorder   | Left → Root → Right| Sorted   |
 * | Postorder | Left → Right → Root| Delete   |
 * | Level     | BFS with queue     | By level |
 * 
 * PROPERTIES:
 * - N nodes = N-1 edges
 * - Height of balanced tree = O(log n)
 * - Height of skewed tree = O(n)
 * 
 * COMPLEXITY (Balanced BST):
 * - Search: O(log n)
 * - Insert: O(log n)
 * - Delete: O(log n)
 * 
 * REMEMBER:
 * Trees are just graphs without cycles!
 */

module.exports = { 
    TreeNode, 
    preorder, 
    inorder, 
    postorder, 
    levelOrder,
    height,
    countNodes,
    countLeaves,
    isSameTree,
    buildTree
};
