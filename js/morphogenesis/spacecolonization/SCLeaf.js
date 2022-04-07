const Agent = require('../../autonomousagents/Agent.js');

class SCLeaf extends Agent {
  constructor(v){
    super(v);
    this.reached = false;
  }

  draw() {
    fill(100);
    noStroke();
    circle(this.pos.x, this.pos.y, 4);
  }
}

module.exports = SCLeaf;
