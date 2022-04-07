const AgentSystem = require('../../autonomousagents/AgentSystem.js');
const SCBranch = require('./SCBranch.js');
const SCLeaf = require('./SCLeaf');

class SCTree {
  constructor(start, IBranch=SCBranch, ILeaf=SCLeaf){

    const o1 = {
      spawnNb: 3000,
      spawnPos: "random",
      spawnVel: "null",
      instance: ILeaf
    };

    const o2 = {
      spawnNb : 5,
      spawnPos: "random",
      spawnVel: "null",
      instance: IBranch
    };

    this.leaves = new AgentSystem(o1);
    this.branches = new AgentSystem(o2);

    this.max_dist = 100;
    this.min_dist = 5;

    // algorithm to grow in one direction until a leaf is found
    // should update this to go forwards the closest leaf

    for(let i = 0; i < this.branches.a.length ; i++){
      this.trunk(this.branches.a[i])
    }

  }

  trunk(root){
    let current = root;
    let found = false;

    while (!found) {
      for (let i = 0, len = this.leaves.a.length; i < len; i++) {
        const d = p5.Vector.dist(current.pos, this.leaves.a[i].pos);
        if (d < this.max_dist) {
          found = true;
        }
      }
      if (!found) {
        var branch = current.next();
        current = branch;
        this.branches.a.push(current);
      }
    }
  }

  grow(){

    for (let i = 0, len = this.leaves.a.length; i < len; i++) {

      var leaf = this.leaves.a[i];
      var closestBranch = null;
      var record = this.max_dist;

      const branches = this.branches.data.qtree.query(leaf.pos.x, leaf.pos.y, this.max_dist); // Quadtree request

      for (var j = 0; j < branches.length; j++) {

        var branch = branches[j];

        var d = p5.Vector.dist(leaf.pos, branch.pos);
        if (d < this.min_dist) {

          leaf.reached = true;
          closestBranch = null;
          break;

        } else if (d < record) {

          closestBranch = branch;
          record = d;

        }
      }

      if (closestBranch != null) {

        var newDir = p5.Vector.sub(leaf.pos, closestBranch.pos);
        newDir.normalize();
        closestBranch.dir.add(newDir);
        closestBranch.count++;

      }
    }

    for (var i = this.leaves.a.length - 1; i >= 0; i--) {

      if (this.leaves.a[i].reached) {
        this.leaves.a.splice(i, 1);
      }

    }

    for (var i = this.branches.a.length - 1; i >= 0; i--) {

      var branch = this.branches.a[i];
      if (branch.count > 0) {
        branch.dir.div(branch.count + 1);
        this.branches.a.push(branch.next());
        branch.reset();

      }
    }
  }

  draw() {
    for (let i = 0, len = this.leaves.a.length; i < len; i++) {
      this.leaves.a[i].draw();
    }

      for (let i = 0, len = this.branches.a.length; i < len; i++) {
      this.branches.a[i].draw();
    }

  }

}

module.exports = SCTree;
