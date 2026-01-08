/**
 * ============================================
 * TREE PROBLEMS - COMPREHENSIVE GUIDE
 * ============================================
 * 
 * LEARNING ORDER:
 * 1. Traversal (foundation - DFS/BFS)
 * 2. Tree Properties (height, depth, balance)
 * 3. Path Problems
 * 4. Construction & Modification
 * 5. BST Specific
 */

// ============================================
// CATEGORY 1: TREE TRAVERSAL
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - File system navigation
 * - HTML DOM parsing
 * - Expression evaluation
 * - Game AI decision trees
 * 
 * KEY TECHNIQUES:
 * - Preorder: Root first (good for copying tree)
 * - Inorder: Sorted order for BST
 * - Postorder: Process children first (good for deletion)
 * - Level order: BFS with queue
 */

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

// ------------------------------------------
// 1.1 BINARY TREE INORDER TRAVERSAL
// ------------------------------------------

/**
 * Problem: Return inorder traversal of binary tree
 * 
 * Real-world: Getting sorted order from BST
 * 
 * Time: O(n), Space: O(h) for recursion
 */
function inorderTraversal(root) {
    const result = [];
    
    const traverse = (node) => {
        if (!node) return;
        traverse(node.left);
        result.push(node.val);
        traverse(node.right);
    };
    
    traverse(root);
    return result;
}

// Iterative version (asked in interviews!)
function inorderIterative(root) {
    const result = [];
    const stack = [];
    let curr = root;
    
    while (curr || stack.length) {
        while (curr) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop();
        result.push(curr.val);
        curr = curr.right;
    }
    
    return result;
}

/**
 * RELATED QUESTIONS:
 * - Binary Tree Preorder Traversal (LeetCode 144)
 * - Binary Tree Postorder Traversal (LeetCode 145)
 * - N-ary Tree Level Order Traversal (LeetCode 429)
 */

// ------------------------------------------
// 1.2 LEVEL ORDER TRAVERSAL
// ------------------------------------------

/**
 * Problem: Return nodes level by level
 * 
 * Real-world: Printing org chart by hierarchy level
 */
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
 * RELATED QUESTIONS:
 * - Binary Tree Level Order Traversal II (LeetCode 107)
 * - Binary Tree Zigzag Level Order (LeetCode 103)
 * - Average of Levels (LeetCode 637)
 */

// ============================================
// CATEGORY 2: TREE PROPERTIES
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - Checking if database index is balanced
 * - Validating tree structure
 * - Computing tree metrics
 */

// ------------------------------------------
// 2.1 MAXIMUM DEPTH OF BINARY TREE
// ------------------------------------------

/**
 * Problem: Find height of tree
 * 
 * Real-world: Depth of folder hierarchy
 */
function maxDepth(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

/**
 * RELATED QUESTIONS:
 * - Minimum Depth of Binary Tree (LeetCode 111)
 * - Balanced Binary Tree (LeetCode 110)
 * - Diameter of Binary Tree (LeetCode 543)
 */

// ------------------------------------------
// 2.2 BALANCED BINARY TREE
// ------------------------------------------

/**
 * Problem: Check if tree is height-balanced
 *          (left and right subtree heights differ by at most 1)
 */
function isBalanced(root) {
    const checkHeight = (node) => {
        if (!node) return 0;
        
        const left = checkHeight(node.left);
        if (left === -1) return -1;
        
        const right = checkHeight(node.right);
        if (right === -1) return -1;
        
        if (Math.abs(left - right) > 1) return -1;
        
        return 1 + Math.max(left, right);
    };
    
    return checkHeight(root) !== -1;
}

// ------------------------------------------
// 2.3 SYMMETRIC TREE
// ------------------------------------------

/**
 * Problem: Check if tree is mirror of itself
 * 
 * Real-world: UI layout symmetry check
 */
function isSymmetric(root) {
    if (!root) return true;
    
    const isMirror = (left, right) => {
        if (!left && !right) return true;
        if (!left || !right) return false;
        
        return left.val === right.val
            && isMirror(left.left, right.right)
            && isMirror(left.right, right.left);
    };
    
    return isMirror(root.left, root.right);
}

/**
 * RELATED QUESTIONS:
 * - Same Tree (LeetCode 100)
 * - Subtree of Another Tree (LeetCode 572)
 * - Invert Binary Tree (LeetCode 226)
 */

// ============================================
// CATEGORY 3: PATH PROBLEMS
// ============================================

/**
 * REAL-WORLD EXAMPLES:
 * - Finding file path
 * - Computing max profit path
 * - Decision tree outcomes
 */

// ------------------------------------------
// 3.1 PATH SUM
// ------------------------------------------

/**
 * Problem: Check if root-to-leaf path with given sum exists
 */
function hasPathSum(root, targetSum) {
    if (!root) return false;
    
    // Leaf node
    if (!root.left && !root.right) {
        return root.val === targetSum;
    }
    
    const remaining = targetSum - root.val;
    return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
}

// ------------------------------------------
// 3.2 PATH SUM II (Find all paths)
// ------------------------------------------

function pathSum(root, targetSum) {
    const result = [];
    
    const dfs = (node, remaining, path) => {
        if (!node) return;
        
        path.push(node.val);
        
        if (!node.left && !node.right && node.val === remaining) {
            result.push([...path]);
        } else {
            dfs(node.left, remaining - node.val, path);
            dfs(node.right, remaining - node.val, path);
        }
        
        path.pop(); // backtrack
    };
    
    dfs(root, targetSum, []);
    return result;
}

// ------------------------------------------
// 3.3 BINARY TREE MAXIMUM PATH SUM
// ------------------------------------------

/**
 * Problem: Find path with maximum sum (any path, not just root-to-leaf)
 * 
 * Hard problem! Path can start and end anywhere.
 */
function maxPathSum(root) {
    let maxSum = -Infinity;
    
    const maxGain = (node) => {
        if (!node) return 0;
        
        // Max sum from left/right (ignore negative)
        const leftGain = Math.max(0, maxGain(node.left));
        const rightGain = Math.max(0, maxGain(node.right));
        
        // Path through current node
        const pathSum = node.val + leftGain + rightGain;
        maxSum = Math.max(maxSum, pathSum);
        
        // Return max single path (can only go one direction up)
        return node.val + Math.max(leftGain, rightGain);
    };
    
    maxGain(root);
    return maxSum;
}

/**
 * RELATED QUESTIONS:
 * - Path Sum III (LeetCode 437)
 * - Diameter of Binary Tree (LeetCode 543)
 * - Longest Univalue Path (LeetCode 687)
 */

// ============================================
// CATEGORY 4: CONSTRUCTION & MODIFICATION
// ============================================

// ------------------------------------------
// 4.1 INVERT BINARY TREE
// ------------------------------------------

/**
 * Problem: Mirror the tree (swap left and right)
 * 
 * Famous problem - "Google: 90% of our engineers use the software
 * you wrote, but you can't invert a binary tree on a whiteboard"
 */
function invertTree(root) {
    if (!root) return null;
    
    [root.left, root.right] = [root.right, root.left];
    
    invertTree(root.left);
    invertTree(root.right);
    
    return root;
}

// ------------------------------------------
// 4.2 CONSTRUCT TREE FROM PREORDER AND INORDER
// ------------------------------------------

/**
 * Problem: Build tree from traversal arrays
 * 
 * Key insight: Preorder first = root, Inorder splits left/right
 */
function buildTree(preorder, inorder) {
    if (!preorder.length || !inorder.length) return null;
    
    const rootVal = preorder[0];
    const root = new TreeNode(rootVal);
    
    const mid = inorder.indexOf(rootVal);
    
    root.left = buildTree(
        preorder.slice(1, mid + 1),
        inorder.slice(0, mid)
    );
    root.right = buildTree(
        preorder.slice(mid + 1),
        inorder.slice(mid + 1)
    );
    
    return root;
}

// ------------------------------------------
// 4.3 FLATTEN BINARY TREE TO LINKED LIST
// ------------------------------------------

/**
 * Problem: Flatten to right-skewed tree (preorder)
 */
function flatten(root) {
    if (!root) return;
    
    flatten(root.left);
    flatten(root.right);
    
    const rightSubtree = root.right;
    root.right = root.left;
    root.left = null;
    
    // Find end of flattened left subtree
    let curr = root;
    while (curr.right) curr = curr.right;
    curr.right = rightSubtree;
}

/**
 * RELATED QUESTIONS:
 * - Construct Binary Tree from Inorder and Postorder (LeetCode 106)
 * - Serialize and Deserialize Binary Tree (LeetCode 297)
 * - Convert Sorted Array to BST (LeetCode 108)
 */

// ============================================
// CATEGORY 5: BST SPECIFIC
// ============================================

/**
 * KEY BST PROPERTY: left < root < right
 * Inorder traversal gives sorted order!
 */

// ------------------------------------------
// 5.1 VALIDATE BST
// ------------------------------------------

/**
 * Problem: Check if valid BST
 * 
 * Common mistake: Only comparing with parent (wrong!)
 * Must check entire valid range.
 */
function isValidBST(root, min = -Infinity, max = Infinity) {
    if (!root) return true;
    
    if (root.val <= min || root.val >= max) return false;
    
    return isValidBST(root.left, min, root.val)
        && isValidBST(root.right, root.val, max);
}

// ------------------------------------------
// 5.2 LOWEST COMMON ANCESTOR IN BST
// ------------------------------------------

/**
 * Problem: Find LCA of two nodes in BST
 * 
 * Use BST property: If both < root, go left; both > root, go right
 */
function lowestCommonAncestorBST(root, p, q) {
    while (root) {
        if (p.val < root.val && q.val < root.val) {
            root = root.left;
        } else if (p.val > root.val && q.val > root.val) {
            root = root.right;
        } else {
            return root;
        }
    }
    return null;
}

// ------------------------------------------
// 5.3 KTH SMALLEST IN BST
// ------------------------------------------

/**
 * Problem: Find kth smallest element
 * 
 * Use inorder traversal (gives sorted order)
 */
function kthSmallest(root, k) {
    const stack = [];
    let curr = root;
    
    while (curr || stack.length) {
        while (curr) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop();
        k--;
        if (k === 0) return curr.val;
        curr = curr.right;
    }
    
    return -1;
}

// ------------------------------------------
// 5.4 LOWEST COMMON ANCESTOR (General Binary Tree)
// ------------------------------------------

/**
 * Problem: Find LCA in any binary tree (not just BST)
 */
function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) return root;
    
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    
    if (left && right) return root;
    return left || right;
}

/**
 * RELATED QUESTIONS:
 * - Delete Node in a BST (LeetCode 450)
 * - Insert into a BST (LeetCode 701)
 * - Range Sum of BST (LeetCode 938)
 * - Recover BST (LeetCode 99)
 */

// ============================================
// SUMMARY
// ============================================

/**
 * TREE PROBLEMS CHEAT SHEET:
 * 
 * TRAVERSAL PATTERNS:
 * - Recursive: Simple, uses call stack
 * - Iterative: Uses explicit stack
 * - Morris: O(1) space, modifies tree temporarily
 * 
 * COMMON PATTERNS:
 * 1. Pass info down (parameters)
 * 2. Pass info up (return values)
 * 3. Use global variable for complex returns
 * 
 * BST TRICKS:
 * - Inorder = sorted order
 * - Use range [min, max] for validation
 * - LCA uses BST property for O(h) solution
 * 
 * INTERVIEW TIP:
 * Always clarify: Binary tree or BST?
 * BST gives you ordering properties to exploit!
 */

module.exports = {
    TreeNode,
    inorderTraversal,
    inorderIterative,
    levelOrder,
    maxDepth,
    isBalanced,
    isSymmetric,
    hasPathSum,
    pathSum,
    maxPathSum,
    invertTree,
    buildTree,
    flatten,
    isValidBST,
    lowestCommonAncestorBST,
    kthSmallest,
    lowestCommonAncestor
};
