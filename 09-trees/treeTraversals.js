/**
 * TREE TRAVERSALS
 */

class TreeNode {
    constructor(val) { this.val = val; this.left = null; this.right = null; }
}

// Iterative preorder
function preorderIterative(root) {
    if (!root) return [];
    const result = [], stack = [root];
    while (stack.length) {
        const node = stack.pop();
        result.push(node.val);
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
    return result;
}

// Iterative inorder
function inorderIterative(root) {
    const result = [], stack = [];
    while (root || stack.length) {
        while (root) { stack.push(root); root = root.left; }
        root = stack.pop();
        result.push(root.val);
        root = root.right;
    }
    return result;
}

// Iterative postorder
function postorderIterative(root) {
    if (!root) return [];
    const result = [], stack = [root];
    while (stack.length) {
        const node = stack.pop();
        result.unshift(node.val);
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
    }
    return result;
}

// Morris traversal - O(1) space inorder
function morrisInorder(root) {
    const result = [];
    while (root) {
        if (!root.left) {
            result.push(root.val);
            root = root.right;
        } else {
            let pred = root.left;
            while (pred.right && pred.right !== root) pred = pred.right;
            if (!pred.right) {
                pred.right = root;
                root = root.left;
            } else {
                pred.right = null;
                result.push(root.val);
                root = root.right;
            }
        }
    }
    return result;
}

// Vertical order
function verticalOrder(root) {
    if (!root) return [];
    const map = new Map(), queue = [[root, 0]];
    let minCol = 0, maxCol = 0;
    
    while (queue.length) {
        const [node, col] = queue.shift();
        if (!map.has(col)) map.set(col, []);
        map.get(col).push(node.val);
        minCol = Math.min(minCol, col);
        maxCol = Math.max(maxCol, col);
        if (node.left) queue.push([node.left, col - 1]);
        if (node.right) queue.push([node.right, col + 1]);
    }
    
    const result = [];
    for (let i = minCol; i <= maxCol; i++) result.push(map.get(i));
    return result;
}

// Zigzag level order
function zigzagLevelOrder(root) {
    if (!root) return [];
    const result = [], queue = [root];
    let leftToRight = true;
    
    while (queue.length) {
        const level = [], size = queue.length;
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            if (leftToRight) level.push(node.val);
            else level.unshift(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(level);
        leftToRight = !leftToRight;
    }
    return result;
}

module.exports = { TreeNode, preorderIterative, inorderIterative, postorderIterative, morrisInorder, verticalOrder, zigzagLevelOrder };
