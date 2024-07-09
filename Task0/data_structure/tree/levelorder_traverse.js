import { TreeNode } from "./tree_node";

function levelOrderTraverse(root) {
    const result = [];
    const queue = [];
    let pNode = root;

    queue.push(root);
    result.push(root.val);

    while ( queue.length ) {
        pNode = queue.shift();
        if ( pNode.lchild ) {
            result.push(pNode.lchild.val);
            queue.push(pNode.lchild);
        }
        if ( pNode.rchild ) {
            result.push(pNode.rchild.val);
            queue.push(pNode.rchild);
        }
    }

    return result;
}

// test
const biTree = new TreeNode(1);
biTree.lchild = new TreeNode(2);
biTree.rchild = new TreeNode(3);
biTree.lchild.lchild = new TreeNode(4);
biTree.rchild.lchild = new TreeNode(5);

console.log(levelOrderTraverse(biTree));