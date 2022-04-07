const Agent = require('./Agent.js');
const ParticleSystem = require('../particlesystem/ParticleSystem.js');

class AgentSystem extends ParticleSystem{

	constructor(o){
		super(o);

		this.safeDistance = 20; 	// DOES THIS RLY NEED TO BE THERE ?
	}

	//====================================================

	// BEHAVIORS

  //====================================================

	// # - Todo list

	// 1 - make it exponential the closer we are to walls

  avoidWalls(coef=1, wallRange=20) {
    let forces = []

    for (let i = 0; i < this.a.length; i++) {
      let desiredLR = this.a[i].vel.copy();
      let desiredTB = this.a[i].vel.copy();

      if (this.a[i].pos.x > this.boundary.x + this.boundary.w/2 - this.padding - wallRange) { // right wall
        desiredLR = createVector( -this.maxVel, this.a[i].vel.y );
      } else if (this.a[i].pos.x < this.boundary.x - this.boundary.w/2 + this.padding + wallRange) { // left wall
        desiredLR = createVector(  this.maxVel, this.a[i].vel.y );
      }

      if (this.a[i].pos.y < this.boundary.y - this.boundary.h/2 + this.padding + wallRange) { // top wall
        desiredTB = createVector(  this.a[i].vel.x, this.maxVel );
      } else if (this.a[i].pos.y > this.boundary.y + this.boundary.h/2 - this.padding - wallRange) { // bottom wall
        desiredTB = createVector(  this.a[i].vel.x, -this.maxVel );
      }

      const desired = p5.Vector.add(desiredLR, desiredTB).div(2);
      const steering = p5.Vector.sub(desired, this.a[i].vel);
      forces[i] = steering;
  	}
  	this.applyForces(forces, coef);
	}

	//====================================================

	// # - Todo list

	// 1 - should we give the array size to the force array to make it faster ?

  randomWalk(coef=1) {
    let forces = [];
    for (let a of this.a) {
      forces.push(p5.Vector.random2D());
    }
    this.applyForces(forces, coef);
  }

	//====================================================

	// # - Todo List

	// 1 - add a debug draw the wander circle

  wander(coef=1, debug=false) {
    let forces = [];
    for (let i = 0; i < this.a.length; i++) {
    	this.a[i].setWanderAngle(); // set the wander variable if not set
      const circleDistance = 25; // distance between particle and circle
      const angleStep = 0.1; // size of random angle step increment

      const circlePosition = this.a[i].vel.copy().setMag(circleDistance); // copy velocity into circle

      // now we need to have an angle set, and increment it with some random every step
      this.a[i].wander += random() * angleStep - angleStep * 0.5;

			// initial direction
      // set direction magnitude
      // rotate direction according to the wander angle
      const displacement = createVector(0, -1).mult(circleDistance/4).rotate(this.a[i].wander);

      const desired = p5.Vector.add(circlePosition, displacement);
      const steering = p5.Vector.sub(desired, this.a[i].vel);
      forces[i] = steering;

			if(debug){
				noStroke();
				fill(200,150);

				circle(circlePosition.x + this.a[i].pos.x, circlePosition.y + this.a[i].pos.y, 10);

				noFill();
				stroke(255,0,0,100)
				strokeWeight(1);
				line(	circlePosition.x + this.a[i].pos.x,
							circlePosition.y + this.a[i].pos.y,
							circlePosition.x + this.a[i].pos.x + displacement.x,
							circlePosition.y + this.a[i].pos.y + displacement.y )
			}


  	}
  	this.applyForces(forces, coef);
	}

	//====================================================

	// # - Todo List

	// 1 - fix it

  home(coef=1, radius=50) {

		let forces = [];

    for (let i = 0, len = this.a.length ; i < len ; i++) {
    	this.a[i].setHome(); // set the home variable if not set
    	let desired = p5.Vector.sub(this.a[i].home, this.a[i].pos);// calculate desired
      const distance = desired.mag();
      desired.normalize();
      if (distance < radius) {
        const m = map(distance, radius, 0, this.maxVel, 0);
        desired.mult(m);
      } else {
        desired.setMag(this.maxVel);
      }

      forces[i] = p5.Vector.sub(desired, this.a[i].vel); // desired - velocity
    }
    this.applyForces(forces, coef);
  }

		//====================================================

  	repulsionExp(coef=1, safeDistance=this.safeDistance, ps=this) {

    	let forces = [];
    	for (let i = 0, len = this.a.length ; i < len ; i++) {
      		let seek = createVector();

      		const other = ps.data.qtree.query(this.a[i].pos.x, this.a[i].pos.y, safeDistance); // Quadtree request
					for (let j = 0, len = other.length; j < len ; j++){
        		if (this.a[i].pos != other[j].pos) {
          			const d = this.a[i].pos.dist(other[j].pos);
          			const diff = p5.Vector.sub(this.a[i].pos, other[j].pos).mult(exp(safeDistance - d));
          			// invertly proportional
          			// this makes it so that the influence inside the edgebreak radius is big
          			// the influence at the edgebreak radius is one
          			// the influence outside the edgebreak radius is decreasingly proportional
          			seek.add(diff);
        		}
      		}
      		forces[i] = seek;
    	}
    	this.applyForces(forces, coef);
  	}


}

module.exports = AgentSystem;
