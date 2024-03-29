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

  insert(value) {
    this.root = this.#insertRec(this.root, value);
  }

  #insertRec(root, value) {
    if (root === null) {
      root = new Node(value);
      return root;
    }

    if (value < root.data) root.left = this.#insertRec(root.left, value);
    else if (value > root.data) root.right = this.#insertRec(root.right, value);

    return root;
  }

  delete(value) {
    this.root = this.#deleteRec(this.root, value);
  }

  #deleteRec(root, value) {
    if (root === null) return null;

    if (value < root.data) {
      root.left = this.#deleteRec(root.left, value);
      return root;
    }
    if (value > root.data) {
      root.right = this.#deleteRec(root.right, value);
      return root;
    }

    if (root.left === null) {
      return root.right;
    }
    if (root.right === null) {
      return root.left;
    }

    let succParent = root;
    let succ = root.right;
    while (succ.left !== null) {
      succParent = succ;
      succ = succ.left;
    }
    if (succParent !== root) succParent.left = succ.right;
    else succParent.right = succ.right;

    root.data = succ.data;

    return root;
  }

  find(value) {
    return this.#findRec(this.root, value);
  }

  #findRec(root, value) {
    if (root === null) return null;

    if (value < root.data) return this.#findRec(root.left, value);
    if (value > root.data) return this.#findRec(root.right, value);
    if (value === root.data) return root;

    return null;
  }

  levelOrder(cb = null) {
    if (this.root === null) return null;

    const nodes = [];
    const queue = [];
    queue.unshift(this.root);

    while (queue.length !== 0) {
      const cur = queue.at(-1);
      if (cb !== null) cb(cur);
      else nodes.push(cur.data);
      if (cur.left !== null) queue.unshift(cur.left);
      if (cur.right !== null) queue.unshift(cur.right);
      queue.pop();
    }

    if (cb === null) return nodes;
  }

  preOrder(cb = null) {
    return this.#preOrderRec(this.root, cb);
  }

  #preOrderRec(root, cb = null) {
    if (cb === null) {
      if (root === null) return [];

      const nodes = [];
      nodes.push(root.data);
      nodes.push(...this.#preOrderRec(root.left, cb));
      nodes.push(...this.#preOrderRec(root.right, cb));

      return nodes;
    }

    if (root === null) return null;

    cb(root);
    this.#preOrderRec(root.left, cb);
    this.#preOrderRec(root.right, cb);
  }

  inOrder(cb = null) {
    return this.#inOrderRec(this.root, cb);
  }

  #inOrderRec(root, cb = null) {
    if (cb === null) {
      if (root === null) return [];

      const nodes = [];
      nodes.push(...this.#inOrderRec(root.left, cb));
      nodes.push(root.data);
      nodes.push(...this.#inOrderRec(root.right, cb));

      return nodes;
    }

    if (root === null) return null;

    this.#inOrderRec(root.left, cb);
    cb(root);
    this.#inOrderRec(root.right, cb);
  }

  postOrder(cb = null) {
    return this.#postOrderRec(this.root, cb);
  }

  #postOrderRec(root, cb = null) {
    if (cb === null) {
      if (root === null) return [];

      const nodes = [];
      nodes.push(...this.#postOrderRec(root.left, cb));
      nodes.push(...this.#postOrderRec(root.right, cb));
      nodes.push(root.data);

      return nodes;
    }

    if (root === null) return null;

    this.#postOrderRec(root.left, cb);
    this.#postOrderRec(root.right, cb);
    cb(root);
  }

  height(node) {
    if (node === null) return null;

    let heightL = 0;
    let heightR = 0;

    if (node.left !== null) {
      heightL += 1;
      heightL += this.height(node.left);
    }
    if (node.right !== null) {
      heightR += 1;
      heightR += this.height(node.right);
    }

    if (heightL > heightR) return heightL;
    return heightR;
  }

  depth(node) {
    return this.#depthRec(this.root, node);
  }

  #depthRec(root, node) {
    if (root === null || node === null) return null;

    let depth = 0;

    if (node.data < root.data) {
      depth += 1;
      depth += this.#depthRec(root.left, node);
    } else if (node.data > root.data) {
      depth += 1;
      depth += this.#depthRec(root.right, node);
    }

    return depth;
  }

  isBalanced() {
    return this.#isBalancedRec(this.root);
  }

  #isBalancedRec(root) {
    if (root === null) return true;

    const heightL = this.height(root.left);
    const heightR = this.height(root.right);

    if (
      Math.abs(heightL - heightR) <= 1 &&
      this.#isBalancedRec(root.left) &&
      this.#isBalancedRec(root.right)
    )
      return true;
    return false;
  }

  rebalance() {
    this.root = Tree.buildTree(this.inOrder());
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
