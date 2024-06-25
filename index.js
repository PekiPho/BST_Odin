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
            if(parent.value>position.value)
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

    deleteItem(value,root){


        let prev;
        while(root.value!=value){
            prev=root;
            if(value<root.value)
                root=root.left;
            else root=root.right;
        }
        let node=root;

        if(node.right==null)
            node=node.left;
        else if(node.left==null)
            node=node.right;
        else{
            let temp=node.left;
            let prev=node;
            while(temp.right!=null){
                prev=temp;
                temp=temp.right;
            }
            node.value=temp.value;
            if(prev==node)
                prev.left=temp.left;
            else prev.right=temp.right;
            return;
        }
        if(root==this.root){
            this.root=node;
        }
        else if(prev.left=root)
            prev.left=node;
        else prev.right=node;


        // if(root==null)
        //     return root;
        
        // if(root.value<value)
        //     root.right= this.deleteItem(value,root.right);

        // if(root.value>value)
        //     root.left= this.deleteItem(value,root.left);

        // if(root.value==value){

        //     if(root.left!=null && root.right!=null){
        //         root.value=minValue(root.left);
                
        //         root.left=this.deleteItem(root.value,root.left);
        //         return root;
        //     }
        //     if(root.left==null)
        //         return root.right;
        //     if(root.right==null)
        //         return root.left;
        // }
        
        
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
function minValue(link){
    let minv=link.value;
    while(link.right!=null){
        link=link.right;
        minv=link.value;
    }
    return minv;
}

let arr=[1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let t = new Tree(arr);
//let a= removeDuplicates(arr);
//a.sort(function(a, b){return a-b});
//prettyPrint(t.root);
//t.insert(1);
//t.insert(323);
t.insert(27);
t.insert(24);
prettyPrint(t.root);
//let n = t.find(67);
//console.log(n.value);
//let d=t.depth(n);
//console.log(d);
//let h=t.height(n);
//console.log(h);
//console.log(t.isBalanced());
t.deleteItem(3,t.root);
prettyPrint(t.root);


