const Agent = require('../../autonomousagents/Agent.js');

class SCLeaf extends Agent {
  constructor(v){
    super(v);
    this.pos = createVector(random(width), random(height - 100));
    this.reached = false;
  }

  show() {
    fill(255);
    noStroke();
    circle(this.pos.x, this.pos.y, 4);
  }
}

module.exports = SCLeaf;
