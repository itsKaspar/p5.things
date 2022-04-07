const Agent = require('../../autonomousagents/Agent.js');

class SCBranch extends Agent{
  constructor(v, parent, dir){
    super(v);
    this.parent = parent || null;
    this.dir = dir || createVector(0, -1);
    this.origDir = this.dir.copy();
    this.count = 0;
    this.len = 5;

  }

  reset() {
    this.dir = this.origDir.copy();
    this.count = 0;
  }

  next() {
    const nextDir = p5.Vector.mult(this.dir, this.len);
    const nextPos = p5.Vector.add(this.pos, nextDir);
    return new SCBranch({ pos : nextPos }, this, this.dir.copy());         // NEEED TO SWITCH THIS TO THIS INSTANCE
  }

  show() {
    if (this.parent != null) {
      stroke(255);
      line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
    }

  }

}

module.exports = SCBranch;
