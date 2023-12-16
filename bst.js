class Node{
  constructor(value){
    this.data = value;
    this.left = null;
    this.right = null;
  }
}

class Tree{
  constructor(arr){
    this.root = this.buildTree(arr,0,arr.length-1);
  }
  buildTree(arr,start,end){
    if(start>end)return null;
    const mid = parseInt(start+(end-start)/2);
    const node = new Node(arr[mid]);
    node.left = this.buildTree(arr,start,mid-1);
    node.right = this.buildTree(arr,mid+1,end);
    return node;
  }
  insert(root,value){
    if(root === null) return new Node(value);
    if(root.data<value){
      root.right = this.insert(root.right,value);
    }
    else if(root.data>value){
      root.left = this.insert(root.left,value);
    }
    return root;
  }
  remove(root, value) {
    if (root === null) {
      return root;
    }

    if (value < root.data) {
      root.left = this.remove(root.left, value);
    } else if (value > root.data) {
      root.right = this.remove(root.right, value);
    } else {
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }

      // Node with two children
      let minValueNode = this.findMinNode(root.right);
      root.data = minValueNode.data;
      root.right = this.remove(root.right, minValueNode.data);
    }
    
    return root;
  }
  find(root,value){
    if(root==null){
      return "not found";
    }
    if(root.data == value){
      return root;
    }
    if(value<root.data){
      return this.find(root.left,value);
    }
    else if(value>root.data){
      return this.find(root.right,value);
    }
  }

  levelOrder(callback) {
    const result = [];
    const queue = [];
    if (!this.root) return result;

    queue.push(this.root);
    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node.data);

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }

      if (callback) {
        callback(node);
      }
    }

    return result;
  }

  findMinNode(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }
}
function print(item){
  console.log(item.data);
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const bst = new Tree([1,2,3,3,4,5,7,9]);
console.log(bst.root);
prettyPrint(bst.root);
bst.insert(bst.root,8);
prettyPrint(bst.root);
bst.remove(bst.root,5);
prettyPrint(bst.root);
bst.insert(bst.root,5);
console.log(bst.find(bst.root,5));
console.log(bst.levelOrder());
//bst.levelOrder(console.log);
