/**
 * ============================================
 * BINARY SEARCH TREE (BST)
 * ============================================
 * 
 * CONCEPT:
 * A Binary Search Tree is a binary tree with an ordering property:
 * - Left subtree contains only nodes with values LESS than parent
 * - Right subtree contains only nodes with values GREATER than parent
 * - Both subtrees are also BSTs
 * 
 * This ordering enables O(log n) operations on average.
 * 
 * REAL-WORLD ANALOGY:
 * Dictionary/Phone Book:
 * - Words are sorted alphabetically
 * - To find "Mango", open to middle
 * - If middle is "Lemon", go right half
 * - If middle is "Orange", go left half
 * - Quickly narrow down to the word
 * 
 * INDUSTRY APPLICATIONS:
 * - Database indexing
 * - File system organization
 * - Autocomplete systems
 * - Priority queues (with modifications)
 * - Expression parsing
 * 
 * COMPLEXITY:
 * | Operation | Average   | Worst (Skewed) |
 * |-----------|-----------|----------------|
 * | Search    | O(log n)  | O(n)           |
 * | Insert    | O(log n)  | O(n)           |
 * | Delete    | O(log n)  | O(n)           |
 * | Min/Max   | O(log n)  | O(n)           |
 * 
 * Worst case occurs when tree becomes a linked list (sorted insertions)
 */

// ============================================
// 1. TREE NODE STRUCTURE
// ============================================

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

// ============================================
// 2. BST IMPLEMENTATION
// ============================================

class BST {
    constructor() {
        this.root = null;
    }
    
    /**
     * INSERT - O(log n) average
     * 
     * Compare with current node:
     * - Smaller → go left
     * - Larger → go right
     * - Found null → insert here
     */
    insert(val) {
        this.root = this._insert(this.root, val);
    }
    
    _insert(node, val) {
        // Base case: found insertion point
        if (!node) return new TreeNode(val);
        
        // Recursive case: navigate to correct position
        if (val < node.val) {
            node.left = this._insert(node.left, val);
        } else {
            node.right = this._insert(node.right, val);
        }
        
        return node;
    }
    
    /**
     * SEARCH - O(log n) average
     * 
     * Binary search through the tree
     */
    search(val) {
        return this._search(this.root, val);
    }
    
    _search(node, val) {
        // Base cases: not found or found
        if (!node || node.val === val) return node;
        
        // Navigate based on comparison
        return val < node.val 
            ? this._search(node.left, val) 
            : this._search(node.right, val);
    }
    
    /**
     * DELETE - O(log n) average
     * 
     * Three cases:
     * 1. Leaf node: Simply remove
     * 2. One child: Replace with child
     * 3. Two children: Replace with inorder successor
     */
    delete(val) {
        this.root = this._delete(this.root, val);
    }
    
    _delete(node, val) {
        if (!node) return null;
        
        // Find the node to delete
        if (val < node.val) {
            node.left = this._delete(node.left, val);
        } else if (val > node.val) {
            node.right = this._delete(node.right, val);
        } else {
            // Found node to delete
            
            // Case 1 & 2: No left child or no right child
            if (!node.left) return node.right;
            if (!node.right) return node.left;
            
            // Case 3: Two children
            // Find inorder successor (smallest in right subtree)
            let minNode = node.right;
            while (minNode.left) {
                minNode = minNode.left;
            }
            
            // Replace value with successor's value
            node.val = minNode.val;
            
            // Delete the successor
            node.right = this._delete(node.right, minNode.val);
        }
        
        return node;
    }
    
    /**
     * FIND MINIMUM - O(log n) average
     * Leftmost node in BST
     */
    min() {
        let node = this.root;
        while (node?.left) {
            node = node.left;
        }
        return node?.val;
    }
    
    /**
     * FIND MAXIMUM - O(log n) average
     * Rightmost node in BST
     */
    max() {
        let node = this.root;
        while (node?.right) {
            node = node.right;
        }
        return node?.val;
    }
    
    /**
     * INORDER TRAVERSAL - O(n)
     * Gives sorted order!
     */
    inorder() {
        const result = [];
        this._inorder(this.root, result);
        return result;
    }
    
    _inorder(node, result) {
        if (node) {
            this._inorder(node.left, result);
            result.push(node.val);
            this._inorder(node.right, result);
        }
    }
    
    /**
     * CHECK IF BST CONTAINS VALUE - O(log n)
     */
    contains(val) {
        return this.search(val) !== null;
    }
}

// ============================================
// 3. BST VALIDATION
// ============================================

/**
 * Validate BST
 * 
 * Common mistake: Just comparing node with its children
 * Correct: Each node must be within a valid RANGE
 * 
 * Pass down min/max constraints as we traverse
 */
function isValidBST(root, min = -Infinity, max = Infinity) {
    if (!root) return true;
    
    // Current node must be within range
    if (root.val <= min || root.val >= max) return false;
    
    // Left subtree: max becomes current value
    // Right subtree: min becomes current value
    return isValidBST(root.left, min, root.val) 
        && isValidBST(root.right, root.val, max);
}

/**
 * Alternative: Use inorder traversal
 * BST's inorder is always sorted
 */
function isValidBSTInorder(root) {
    let prev = -Infinity;
    
    const inorder = (node) => {
        if (!node) return true;
        
        if (!inorder(node.left)) return false;
        
        if (node.val <= prev) return false;
        prev = node.val;
        
        return inorder(node.right);
    };
    
    return inorder(root);
}

// ============================================
// 4. LOWEST COMMON ANCESTOR (BST)
// ============================================

/**
 * LCA in BST is simpler than general binary tree
 * 
 * Use BST property:
 * - Both p and q are smaller → go left
 * - Both p and q are larger → go right
 * - Otherwise → current node is LCA
 */
function lowestCommonAncestor(root, p, q) {
    while (root) {
        if (p.val < root.val && q.val < root.val) {
            root = root.left;
        } else if (p.val > root.val && q.val > root.val) {
            root = root.right;
        } else {
            return root; // Split point is LCA
        }
    }
    return null;
}

// ============================================
// 5. KTH SMALLEST/LARGEST
// ============================================

/**
 * Kth Smallest Element - O(H + k)
 * 
 * Use iterative inorder traversal
 * Count k elements, return kth
 */
function kthSmallest(root, k) {
    const stack = [];
    let count = 0;
    
    while (root || stack.length) {
        // Go left as far as possible
        while (root) {
            stack.push(root);
            root = root.left;
        }
        
        // Process smallest unvisited node
        root = stack.pop();
        count++;
        
        if (count === k) return root.val;
        
        // Move to right subtree
        root = root.right;
    }
    
    return -1;
}

/**
 *  Recursive version
 */
function kthSmallest(root, k) {
  let count = 0;
  let result = null;

  function inorder(node) {
    if (!node || result !== null) return;

    inorder(node.left);
    count++;
    if (count === k) {
      result = node.val;
      return;
    }

    inorder(node.right);
  }

  inorder(root);
  return result ?? -1;
}


/**
 * Kth Largest Element
 * Reverse inorder: Right → Root → Left
 */
function kthLargest(root, k) {
    const stack = [];
    let count = 0;
    
    while (root || stack.length) {
        while (root) {
            stack.push(root);
            root = root.right; // Go right first
        }
        
        root = stack.pop();
        count++;
        
        if (count === k) return root.val;
        
        root = root.left; // Then left
    }
    
    return -1;
}

// ============================================
// 6. COMMON MISTAKES & EDGE CASES
// ============================================

/**
 * Mistake 1: BST validation only checks immediate children
 * Must check entire subtree ranges!
 * 
 * Mistake 2: Handling deletion poorly
 * Case with two children is tricky - use inorder successor
 * 
 * Mistake 3: Assuming BST is always balanced
 * Can degrade to O(n) with sorted insertions
 * 
 * Edge Cases:
 * - Empty tree
 * - Single node
 * - Duplicate values (clarify handling)
 * - Skewed tree (all left or all right)
 */

// ============================================
// 7. INTERVIEW PERSPECTIVE
// ============================================

/**
 * Key BST Properties:
 * 1. Inorder traversal gives sorted order
 * 2. Search/Insert/Delete are O(log n) average
 * 3. Can degrade to O(n) without balancing
 * 
 * Common Questions:
 * - Validate BST
 * - Kth smallest/largest
 * - LCA in BST
 * - Convert sorted array to BST
 * - Inorder successor/predecessor
 */

// ============================================
// 8. PRACTICE PROBLEMS
// ============================================

/**
 * Problem 1 (Easy): Sorted Array to Balanced BST
 */
function sortedArrayToBST(nums) {
    const build = (left, right) => {
        if (left > right) return null;
        
        const mid = Math.floor((left + right) / 2);
        const node = new TreeNode(nums[mid]);
        
        node.left = build(left, mid - 1);
        node.right = build(mid + 1, right);
        
        return node;
    };
    
    return build(0, nums.length - 1);
}

/**
 * Problem 2 (Medium): Inorder Successor in BST
 */
function inorderSuccessor(root, p) {
    let successor = null;
    
    while (root) {
        if (p.val < root.val) {
            successor = root; // Potential successor
            root = root.left;
        } else {
            root = root.right;
        }
    }
    
    return successor;
}

/**
 * Problem 3 (Medium): Delete Node in BST
 */
function deleteNode(root, key) {
    if (!root) return null;
    
    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key);
    } else {
        if (!root.left) return root.right;
        if (!root.right) return root.left;
        
        // Find inorder successor
        let minNode = root.right;
        while (minNode.left) minNode = minNode.left;
        
        root.val = minNode.val;
        root.right = deleteNode(root.right, minNode.val);
    }
    
    return root;
}

/**
 * Problem 4 (Medium): Range Sum of BST
 */
function rangeSumBST(root, low, high) {
    if (!root) return 0;
    
    let sum = 0;
    
    if (root.val >= low && root.val <= high) {
        sum += root.val;
    }
    
    if (root.val > low) {
        sum += rangeSumBST(root.left, low, high);
    }
    
    if (root.val < high) {
        sum += rangeSumBST(root.right, low, high);
    }
    
    return sum;
}

// -------------------------------------------------------------------------------------------
// SUMMARY & KEY TAKEAWAYS
// -------------------------------------------------------------------------------------------

/**
 * BST CHEAT SHEET:
 * 
 * PROPERTY:
 * Left < Parent < Right (for all nodes)
 * 
 * OPERATIONS:
 * | Operation  | Average   | Worst   |
 * |------------|-----------|---------|
 * | Search     | O(log n)  | O(n)    |
 * | Insert     | O(log n)  | O(n)    |
 * | Delete     | O(log n)  | O(n)    |
 * | Min/Max    | O(log n)  | O(n)    |
 * 
 * KEY INSIGHTS:
 * - Inorder traversal = sorted order
 * - Min = leftmost node
 * - Max = rightmost node
 * - Balanced BST = O(log n) guaranteed
 * 
 * DELETION CASES:
 * 1. Leaf: Just remove
 * 2. One child: Replace with child
 * 3. Two children: Replace with inorder successor
 * 
 * VALIDATION:
 * Pass min/max range constraints, not just parent comparison
 * 
 * INTERVIEW TIP:
 * Always clarify if duplicates are allowed and how to handle them.
 * Consider using balanced BST (AVL, Red-Black) for guaranteed O(log n).
 */

module.exports = { 
    TreeNode, 
    BST, 
    isValidBST,
    isValidBSTInorder,
    lowestCommonAncestor, 
    kthSmallest,
    kthLargest,
    sortedArrayToBST,
    inorderSuccessor,
    deleteNode,
    rangeSumBST
};
