const AgentSystem = require('../autonomousagents/AgentSystem.js'); // import from other files
const Maths = require('../maths/Maths.js'); // import from other files

class ChainSystem extends AgentSystem{
	constructor(o){

		super(o);

		this.chainDiv = o.chainDiv || 20; // defines the distance between each node ( for subdivisions )
		this.chainClose = o.chainClose !== undefined ? o.chainClose : true ;

	}

  //====================================================

  // CHAIN FORCES

  //====================================================

	chainAttraction(coef=1) {
		let forces = [];
		for (let i = 0, len = this.a.length ; i < len; i++) {

				const n1 = this.a[maths.Maths.fixId(i - 1, this.a.length)].pos;
				const n2 = this.a[maths.Maths.fixId(i + 1, this.a.length)].pos;

				const desired = p5.Vector.sub(maths.Maths.midpoint(n1, n2), this.a[i].pos);
				const seek = p5.Vector.sub(desired, this.a[i].vel);

				forces[i] = seek;
		}
		this.applyForces(forces, coef);
	}

  //====================================================

  // CHAIN GEOMETRY

  //====================================================

	chainSubdivide() {

	// # Adds a particle in between two consecutive particles
	// # that have a distance superior to the chainDiv

		let istart = this.a.length - 2;															// NOT SURE IF THIS WORKS YET
		if(this.chainClose === true){ istart = this.a.length - 1; }												// MAKE THIS A TERNARY OPERATOR

		for (let i = istart; i >= 0; i--) {

				const p1 = this.a[maths.Maths.fixId(i, this.a.length)];
				const p2 = this.a[maths.Maths.fixId(i + 1, this.a.length)];                        // CAN I USE A NEGATIVE MODULO INSTEAD OF THIS FIXID FUNCTION ?

				if (maths.Maths.distSq(p1.pos, p2.pos) > this.chainDiv ** 2) {
					splice(this.a, this.makeChild(p1,p2), i + 1); // splice will be deprecated soon, use array.splice instead
				}
		}
	}

	//====================================================

	makeChild(parent1, parent2){
		const mid = maths.Maths.midpoint(parent1.pos, parent2.pos);
		const v = { pos : mid };
		return new this.instance(v);
	}

  //====================================================

  // DRAWING

  //====================================================

	drawChainClosed() {

    noFill();
		strokeWeight(1);
    stroke(this.col);

		beginShape();

		for (let i = 0, len = this.a.length ; i < len; i++) {
				curveVertex(this.a[i].pos.x, this.a[i].pos.y);
		}

		endShape(CLOSE);
	}

  //====================================================

  drawChainOpen() {

		noFill();
		strokeWeight(1);
		stroke(this.col);

		beginShape();

		curveVertex(this.a[0].pos.x, this.a[0].pos.y); // double first vertex

		for (let i = 0, len = this.a.length ; i < len; i++) {
			curveVertex(this.a[i].pos.x, this.a[i].pos.y);
		}

		curveVertex(this.a[this.a.length-1].pos.x, this.a[this.a.length-1].pos.y); // double last vertex

		endShape();

  }
}

module.exports = ChainSystem;
