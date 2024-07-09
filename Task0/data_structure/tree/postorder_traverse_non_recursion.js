import { TreeNode } from "./tree_node";

function postOrderTraverse(root) {
    const result = [];
    const stack = [];
    let pNode = root;
    let lastVisitedNode = null;

    while ( pNode || stack.length ) {
        if ( pNode ) {
            stack.push(pNode);
            pNode = pNode.lchild;
        }
        else {
            pNode = stack[stack.length - 1]; // 查看栈顶结点

            // 如果右子树为空或右子树已被访问过，则访问根节点
            if ( !pNode.rchild || lastVisitedNode === pNode.rchild ) {
                result.push(pNode.val);
                lastVisitedNode = pNode; // 更新
                stack.pop();
                pNode = null; // 防止重复访问
            }
            else {
                pNode = pNode.rchild;
            }
        }
    } // end while-loop

    return result;
}

// test
const biTree = new TreeNode(1);
biTree.lchild = new TreeNode(2);
biTree.rchild = new TreeNode(3);
biTree.lchild.lchild = new TreeNode(4);
biTree.rchild.lchild = new TreeNode(5);

console.log(postOrderTraverse(biTree));