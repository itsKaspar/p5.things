const ChainNode = require('../../chainsystem/ChainNode.js');

class DifferentialNode extends ChainNode {
  constructor(v){
    super(v);
  }

  draw(){
    circle(this.pos.x, this.pos.y, 10);
  }
}

module.exports = DifferentialNode;
