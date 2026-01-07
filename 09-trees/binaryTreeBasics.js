/**
 * ============================================
 * BINARY TREE BASICS
 * ============================================
 * 
 * CONCEPT:
 * A binary tree is a hierarchical data structure where each node has
 * at most two children, referred to as left child and right child.
 * 
 * Tree Terminology:
 * - Root: Top node with no parent
 * - Leaf: Node with no children
 * - Height: Longest path from root to leaf
 * - Depth: Distance from root to a node
 * - Subtree: Tree formed by a node and its descendants
 * 
 * REAL-WORLD ANALOGY:
 * Family Tree:
 * - Each person (node) can have at most 2 children
 * - The ancestor at top is the root
 * - People with no children are leaves
 * - Finding a relative requires traversing the tree
 * 
 * INDUSTRY APPLICATIONS:
 * - Expression parsing (compiler syntax trees)
 * - Decision trees in ML
 * - File system structure
 * - Database indexing (B-trees)
 * - HTML DOM structure
 * - Huffman encoding (compression)
 * 
 * COMPLEXITY:
 * | Operation    | Average   | Worst (Skewed) |
 * |--------------|-----------|----------------|
 * | Search       | O(log n)  | O(n)           |
 * | Insert       | O(log n)  | O(n)           |
 * | Delete       | O(log n)  | O(n)           |
 * | Traversal    | O(n)      | O(n)           |
 * 
 * Space: O(n) for n nodes
 * Recursion Stack: O(h) where h = height
 */

// ============================================
// 1. TREE NODE STRUCTURE
// ============================================

/**
 * Basic building block of a binary tree
 * Each node stores value and pointers to children
 */
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

// ============================================
// 2. TREE TRAVERSALS (DFS)
// ============================================

/**
 * Three DFS Traversals - Order of visiting root vs children
 * 
 * Example Tree:
 *        1
 *       / \
 *      2   3
 *     / \
 *    4   5
 * 
 * Preorder:  1, 2, 4, 5, 3  (Root → Left → Right)
 * Inorder:   4, 2, 5, 1, 3  (Left → Root → Right)
 * Postorder: 4, 5, 2, 3, 1  (Left → Right → Root)
 */

/**
 * PREORDER: Root → Left → Right
 * 
 * Use cases:
 * - Copy a tree
 * - Get prefix expression
 * - Print tree structure
 */
function preorder(root, result = []) {
    if (!root) return result;
    
    result.push(root.val);        // Visit root FIRST
    preorder(root.left, result);  // Then left subtree
    preorder(root.right, result); // Then right subtree
    
    return result;
}

/**
 * INORDER: Left → Root → Right
 * 
 * Use cases:
 * - Get sorted order from BST
 * - Validate BST
 * - Get infix expression
 */
function inorder(root, result = []) {
    if (!root) return result;
    
    inorder(root.left, result);   // Left subtree FIRST
    result.push(root.val);        // Then visit root
    inorder(root.right, result);  // Then right subtree
    
    return result;
}

/**
 * POSTORDER: Left → Right → Root
 * 
 * Use cases:
 * - Delete tree (children before parent)
 * - Calculate directory size
 * - Get postfix expression
 */
function postorder(root, result = []) {
    if (!root) return result;
    
    postorder(root.left, result);  // Left subtree
    postorder(root.right, result); // Right subtree
    result.push(root.val);         // Visit root LAST
    
    return result;
}

// ============================================
// 3. LEVEL ORDER TRAVERSAL (BFS)
// ============================================

/**
 * Level Order: Visit nodes level by level
 * 
 * Uses queue to process nodes by level
 * Key: Track level boundaries using queue size
 * 
 * Example:
 *        1          → Level 0: [1]
 *       / \
 *      2   3        → Level 1: [2, 3]
 *     / \   \
 *    4   5   6      → Level 2: [4, 5, 6]
 */
function levelOrder(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
    while (queue.length) {
        const level = [];
        const size = queue.length; // Current level size
        
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

// ============================================
// 4. TREE PROPERTIES
// ============================================

/**
 * Maximum Depth (Height)
 * 
 * Depth = 1 + max(left depth, right depth)
 * Base case: null node has depth 0
 */
function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

/**
 * Minimum Depth
 * 
 * Shortest path from root to a LEAF
 * Be careful: must be a leaf, not just null child
 */
function minDepth(root) {
    if (!root) return 0;
    if (!root.left) return 1 + minDepth(root.right);
    if (!root.right) return 1 + minDepth(root.left);
    return 1 + Math.min(minDepth(root.left), minDepth(root.right));
}

/**
 * Check if Balanced
 * 
 * Balanced: Height difference of left and right subtrees ≤ 1
 * at every node
 * 
 * Trick: Return -1 if unbalanced, height otherwise
 */
function isBalanced(root) {
    const check = (node) => {
        if (!node) return 0;
        
        const left = check(node.left);
        const right = check(node.right);
        
        // Propagate -1 if any subtree is unbalanced
        if (left === -1 || right === -1) return -1;
        
        // Check balance at current node
        if (Math.abs(left - right) > 1) return -1;
        
        return 1 + Math.max(left, right);
    };
    
    return check(root) !== -1;
}

/**
 * Check if Same Tree
 * 
 * Structure and values must be identical
 */
function isSameTree(p, q) {
    // Both null → same
    if (!p && !q) return true;
    
    // One null, one not → different
    if (!p || !q) return false;
    
    // Values different → different
    if (p.val !== q.val) return false;
    
    // Check both subtrees
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

/**
 * Invert (Mirror) Tree
 * 
 * Swap left and right children at every node
 * Classic interview question!
 */
function invertTree(root) {
    if (!root) return null;
    
    // Swap children
    [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
    
    return root;
}

/**
 * Count nodes in tree
 */
function countNodes(root) {
    if (!root) return 0;
    return 1 + countNodes(root.left) + countNodes(root.right);
}

// ============================================
// 5. COMMON MISTAKES & EDGE CASES
// ============================================

/**
 * Mistake 1: Not handling null root
 * Always check if (!root) first
 * 
 * Mistake 2: Confusing depth vs height
 * - Depth: From root to node (top-down)
 * - Height: From node to deepest leaf (bottom-up)
 * 
 * Mistake 3: Not distinguishing leaf vs null
 * Leaf has no children; null is absence of node
 * 
 * Edge Cases:
 * - Empty tree (root is null)
 * - Single node tree
 * - Skewed tree (like linked list)
 * - Complete vs incomplete tree
 */

// ============================================
// 6. INTERVIEW PERSPECTIVE
// ============================================

/**
 * Traversal Usage:
 * - Preorder: Serialize, copy tree
 * - Inorder: Get sorted order (BST), validate BST
 * - Postorder: Delete tree, calculate from leaves up
 * - Level order: Level by level problems
 * 
 * Common Patterns:
 * 1. Top-down (preorder): Pass info from parent to children
 * 2. Bottom-up (postorder): Compute from leaves, return up
 * 3. Level by level (BFS): Process by depth
 * 
 * Questions to ask:
 * - Is it a BST or general binary tree?
 * - Are all values positive?
 * - Can the tree be empty?
 */

// ============================================
// 7. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Easy): Check Symmetric Tree
 */
function isSymmetric(root) {
    const isMirror = (left, right) => {
        if (!left && !right) return true;
        if (!left || !right) return false;
        return left.val === right.val 
            && isMirror(left.left, right.right) 
            && isMirror(left.right, right.left);
    };
    return root ? isMirror(root.left, root.right) : true;
}

/**
 * Problem 2 (Easy): Path Sum
 */
function hasPathSum(root, targetSum) {
    if (!root) return false;
    if (!root.left && !root.right) return root.val === targetSum;
    return hasPathSum(root.left, targetSum - root.val) 
        || hasPathSum(root.right, targetSum - root.val);
}

/**
 * Problem 3 (Medium): Build Tree from Preorder and Inorder
 */
function buildTree(preorder, inorder) {
    if (!preorder.length) return null;
    
    const rootVal = preorder[0];
    const root = new TreeNode(rootVal);
    const mid = inorder.indexOf(rootVal);
    
    root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
    root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
    
    return root;
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * BINARY TREE CHEAT SHEET:
 * 
 * TRAVERSAL ORDERS:
 * - Preorder:  Root → Left → Right (serialize, copy)
 * - Inorder:   Left → Root → Right (sorted from BST)
 * - Postorder: Left → Right → Root (delete, calculate)
 * - Level:     BFS with queue (level problems)
 * 
 * PROPERTIES:
 * | Property   | Definition                            |
 * |------------|---------------------------------------|
 * | Height     | Edges from root to deepest leaf       |
 * | Depth      | Edges from root to current node       |
 * | Balanced   | Height diff ≤ 1 at every node         |
 * | Complete   | All levels full except possibly last  |
 * | Perfect    | All internal nodes have 2 children    |
 * 
 * COMPLEXITY:
 * - All traversals: O(n) time, O(h) space
 * - Balanced tree height: O(log n)
 * - Skewed tree height: O(n)
 * 
 * INTERVIEW TIP:
 * Most tree problems use recursion.
 * Define: What does my function return?
 * Think: How do I combine left and right results?
 */

module.exports = { 
    TreeNode, 
    preorder, 
    inorder, 
    postorder, 
    levelOrder, 
    maxDepth,
    minDepth,
    isBalanced, 
    isSameTree, 
    invertTree,
    countNodes,
    isSymmetric,
    hasPathSum,
    buildTree
};
