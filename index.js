import Node from "./nodes.js";

class Tree{

    constructor(arr){
        let inArr = removeDuplicates(arr);
        inArr.sort(function(a, b){return a-b});
        this.root = this.buildTree(inArr);
    }

    buildTree(inArr,begin=0,end=inArr.length-1){
        
        if(begin>=end) return null;
        
        let mid=Math.floor((begin+end)/2);


        let root=new Node(
            inArr[mid],
            this.right=this.buildTree(inArr,mid+1,end),
            this.left=this.buildTree(inArr,0,mid)
        );
        
        
        
        return root;
    }

    insert(root,value){
        let temp=root;
        if(temp.value==null)
        {
            temp.value=new Node(value,null,null);
        }
        if(value>temp.value)
        {
            this.insert(temp.right,value);
        }
        if(value<temp.value)
        {
            this.insert(temp.left,value);
        }
    }
    
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}


let arr=[1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let t = new Tree(arr);
//t.buildTree(arr);
prettyPrint(t.root);


