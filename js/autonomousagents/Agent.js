const Particle = require('../particlesystem/Particle.js'); // import from other files

class Agent extends Particle{
	constructor(v)
	{
		super(v);
		noStroke();
		fill(color(90,200,140,200));
	}

	setWanderAngle(){
		if(this.wander === undefined) this.wander = random(TWO_PI);
	}

	setHome(home=this.pos){
		if(this.home === undefined) this.home = home;
	}

	draw(){
		const triHeight = 15; // triangle height
		const triBase = 10; // triange base size
		const triHalfBase = triBase / 2;

		let copyDir = this.vel.copy();
		if(copyDir.mag() == 0){ copyDir = createVector(0,-1); } // default dir for triangle

		const dir = copyDir.setMag(triHeight);
		const head =  p5.Vector.add(this.pos, dir);

		const leftdir = copyDir.setMag(triHalfBase).rotate(PI/2);
		const left = p5.Vector.add(this.pos, leftdir)

		const rightdir = copyDir.rotate(-PI);
		const right = p5.Vector.add(this.pos, rightdir);

		triangle(left.x, left.y, right.x, right.y, head.x, head.y);
	}
}

module.exports = Agent;
