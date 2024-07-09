import { TreeNode } from "./tree_node";

function inOrderTraverse(root) {
    const result = [];

    function Traverse(pNode) {
        if ( pNode ) {
            Traverse(pNode.lchild);
            result.push(pNode.val);
            Traverse(pNode.rchild);
        }
    }

    Traverse(root);
    return result;
}

// test
const biTree = new TreeNode(1);
biTree.lchild = new TreeNode(2);
biTree.rchild = new TreeNode(3);
biTree.lchild.lchild = new TreeNode(4);
biTree.rchild.lchild = new TreeNode(5);

console.log(inOrderTraverse(biTree));