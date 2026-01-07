/**
 * BINARY SEARCH TREE
 */

class TreeNode {
    constructor(val) { this.val = val; this.left = null; this.right = null; }
}

class BST {
    constructor() { this.root = null; }
    
    insert(val) { this.root = this._insert(this.root, val); }
    _insert(node, val) {
        if (!node) return new TreeNode(val);
        if (val < node.val) node.left = this._insert(node.left, val);
        else node.right = this._insert(node.right, val);
        return node;
    }
    
    search(val) { return this._search(this.root, val); }
    _search(node, val) {
        if (!node || node.val === val) return node;
        return val < node.val ? this._search(node.left, val) : this._search(node.right, val);
    }
    
    delete(val) { this.root = this._delete(this.root, val); }
    _delete(node, val) {
        if (!node) return null;
        if (val < node.val) node.left = this._delete(node.left, val);
        else if (val > node.val) node.right = this._delete(node.right, val);
        else {
            if (!node.left) return node.right;
            if (!node.right) return node.left;
            let minNode = node.right;
            while (minNode.left) minNode = minNode.left;
            node.val = minNode.val;
            node.right = this._delete(node.right, minNode.val);
        }
        return node;
    }
    
    min() { let n = this.root; while (n?.left) n = n.left; return n?.val; }
    max() { let n = this.root; while (n?.right) n = n.right; return n?.val; }
    
    inorder() { const r = []; this._inorder(this.root, r); return r; }
    _inorder(n, r) { if (n) { this._inorder(n.left, r); r.push(n.val); this._inorder(n.right, r); } }
}

function isValidBST(root, min = -Infinity, max = Infinity) {
    if (!root) return true;
    if (root.val <= min || root.val >= max) return false;
    return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
}

function lowestCommonAncestor(root, p, q) {
    while (root) {
        if (p.val < root.val && q.val < root.val) root = root.left;
        else if (p.val > root.val && q.val > root.val) root = root.right;
        else return root;
    }
    return null;
}

function kthSmallest(root, k) {
    const stack = [];
    while (root || stack.length) {
        while (root) { stack.push(root); root = root.left; }
        root = stack.pop();
        if (--k === 0) return root.val;
        root = root.right;
    }
}

module.exports = { TreeNode, BST, isValidBST, lowestCommonAncestor, kthSmallest };
