// backend/models/Node.js
class Node {
    constructor(node_type, value = null, left = null, right = null) {
      this.type = node_type;
      this.value = value;
      this.left = left;
      this.right = right;
    }
  
    toDict() {
      return {
        type: this.type,
        value: this.value,
        left: this.left ? this.left.toDict() : null,
        right: this.right ? this.right.toDict() : null,
      };
    }
  
    toJSON() {
      return JSON.stringify(this.toDict());
    }
  }
  
  module.exports = Node;