/**
 * TREE PROBLEMS
 */

class TreeNode {
    constructor(val) { this.val = val; this.left = null; this.right = null; }
}

// Path sum
function hasPathSum(root, sum) {
    if (!root) return false;
    if (!root.left && !root.right) return root.val === sum;
    return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val);
}

// All paths with sum
function pathSum(root, sum) {
    const result = [];
    const dfs = (node, remaining, path) => {
        if (!node) return;
        path.push(node.val);
        if (!node.left && !node.right && node.val === remaining) result.push([...path]);
        dfs(node.left, remaining - node.val, path);
        dfs(node.right, remaining - node.val, path);
        path.pop();
    };
    dfs(root, sum, []);
    return result;
}

// Diameter of binary tree
function diameterOfBinaryTree(root) {
    let diameter = 0;
    const depth = (node) => {
        if (!node) return 0;
        const left = depth(node.left), right = depth(node.right);
        diameter = Math.max(diameter, left + right);
        return 1 + Math.max(left, right);
    };
    depth(root);
    return diameter;
}

// Serialize and deserialize
function serialize(root) {
    if (!root) return 'null';
    return `${root.val},${serialize(root.left)},${serialize(root.right)}`;
}

function deserialize(data) {
    const values = data.split(',');
    let idx = 0;
    const build = () => {
        if (values[idx] === 'null') { idx++; return null; }
        const node = new TreeNode(parseInt(values[idx++]));
        node.left = build();
        node.right = build();
        return node;
    };
    return build();
}

// Lowest common ancestor
function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) return root;
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    if (left && right) return root;
    return left || right;
}

// Flatten to linked list
function flatten(root) {
    let prev = null;
    const dfs = (node) => {
        if (!node) return;
        dfs(node.right);
        dfs(node.left);
        node.right = prev;
        node.left = null;
        prev = node;
    };
    dfs(root);
}

// Right side view
function rightSideView(root) {
    if (!root) return [];
    const result = [], queue = [root];
    while (queue.length) {
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            if (i === size - 1) result.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return result;
}

module.exports = { TreeNode, hasPathSum, pathSum, diameterOfBinaryTree, serialize, deserialize, lowestCommonAncestor, flatten, rightSideView };
