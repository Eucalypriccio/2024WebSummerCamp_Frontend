import { TreeNode } from "./tree_node";

function preOrderTraverse(root) {
    const result = [];
    const stack = [];
    let pNode = root;

    while ( pNode || stack.length ) {
        if ( pNode ) {
            result.push(pNode.val);
            stack.push(pNode);
            pNode = pNode.lchild;
        }
        else {
            pNode = stack.pop();
            pNode = pNode.rchild;
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

console.log(preOrderTraverse(biTree));