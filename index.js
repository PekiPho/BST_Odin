import Node from "./nodes.js";

class Tree{

    constructor(arr){
        let inArr = removeDuplicates(arr);
        inArr.sort(function(a, b){return a-b});
        this.root = this.buildTree(inArr);
    }

    buildTree(inArr,begin=0,end=inArr.length){
        
        if(begin>=end) return null;
        
        let mid=Math.floor((begin+end)/2);


        let root=new Node(
            inArr[mid],
            null,null
        );
        root.right=this.buildTree(inArr,mid+1,end);
        root.left=this.buildTree(inArr,begin,mid);
        
        
        return root;
    }

    insert(element,position=this.root,parent=this.root){
        
        if(this.root.value==null)
        {
            this.root=new Node(element,null,null);
            return;
        }
        if(position==null)
        {
            position=new Node(element,null,null);
            if(parent<position.value)
                parent.left=position;
            else parent.right=position;
        }
        if(element>position.value)
        {
            this.insert(element,position.right,position);
        }
        if(element<position.value)
        {
            this.insert(element,position.left,position);
        }

    }

    find(value,temp=this.root){
        
        if(temp==null)
            return new Node(-1,null,null);

        if(temp.value==value)
            return temp;

        if(temp.value<value){
            return this.find(value,temp.right);
        }
        if(temp.value>value)
            return this.find(value,temp.left);
        
    }

    height(node){
        if(node==null)
            return 0;
        return Math.max(this.height(node.right)+1,this.height(node.left)+1)
    }

    depth(node,temp=t.root){
        if(temp==null)
            return -999;
        if(temp.value==node.value)
            return 1;
        if(node.value<temp.value){
            return this.depth(node,temp.left)+1;
        }
        if(node.value>temp.value){
            return this.depth(node,temp.right)+1;
        }
    }

    isBalanced(temp=this.root){
        if(temp==null)
            return true;

        let lh=this.height(temp.left);
        let rh=this.height(temp.right);

        if(Math.abs(lh-rh)<=1 && this.isBalanced(temp.left)==true && this.isBalanced(temp.right)==true)
            return true;
        return false;
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
//let a= removeDuplicates(arr);
//a.sort(function(a, b){return a-b});
//prettyPrint(t.root);
//t.insert(1);
//t.insert(323);
//t.insert(27);
prettyPrint(t.root);
//let n = t.find(67);
//console.log(n.value);
//let d=t.depth(n);
//console.log(d);
//let h=t.height(n);
//console.log(h);
console.log(t.isBalanced());

