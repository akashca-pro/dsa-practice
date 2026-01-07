/**
 * BALANCED TREES - AVL Tree concept
 */

class AVLNode {
    constructor(val) { this.val = val; this.left = null; this.right = null; this.height = 1; }
}

class AVLTree {
    constructor() { this.root = null; }
    
    height(n) { return n ? n.height : 0; }
    balance(n) { return n ? this.height(n.left) - this.height(n.right) : 0; }
    updateHeight(n) { n.height = 1 + Math.max(this.height(n.left), this.height(n.right)); }
    
    rotateRight(y) {
        const x = y.left, T = x.right;
        x.right = y; y.left = T;
        this.updateHeight(y); this.updateHeight(x);
        return x;
    }
    
    rotateLeft(x) {
        const y = x.right, T = y.left;
        y.left = x; x.right = T;
        this.updateHeight(x); this.updateHeight(y);
        return y;
    }
    
    insert(val) { this.root = this._insert(this.root, val); }
    _insert(node, val) {
        if (!node) return new AVLNode(val);
        if (val < node.val) node.left = this._insert(node.left, val);
        else node.right = this._insert(node.right, val);
        
        this.updateHeight(node);
        const bal = this.balance(node);
        
        if (bal > 1 && val < node.left.val) return this.rotateRight(node);
        if (bal < -1 && val > node.right.val) return this.rotateLeft(node);
        if (bal > 1 && val > node.left.val) { node.left = this.rotateLeft(node.left); return this.rotateRight(node); }
        if (bal < -1 && val < node.right.val) { node.right = this.rotateRight(node.right); return this.rotateLeft(node); }
        
        return node;
    }
    
    inorder() { const r = []; this._inorder(this.root, r); return r; }
    _inorder(n, r) { if (n) { this._inorder(n.left, r); r.push(n.val); this._inorder(n.right, r); } }
}

module.exports = { AVLNode, AVLTree };
