import Node from './node.js';

class Tree {
  constructor(arr) {
    this.root = Tree.buildTree(arr);
  }

  static buildTree(arr) {
    const sorted = [...new Set(arr)].sort((a, b) => a - b);

    if (sorted.length === 0) return null;

    const mid = Math.floor((sorted.length - 1) / 2);
    const root = new Node(sorted[mid]);
    root.left = Tree.buildTree(sorted.slice(0, mid));
    root.right = Tree.buildTree(sorted.slice(mid + 1));

    return root;
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
