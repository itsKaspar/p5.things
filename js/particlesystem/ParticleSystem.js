const Particle = require('./Particle.js');
const ParticleData = require('./ParticleData.js');

class ParticleSystem{
	constructor(o, Instance=Particle){

		// Default Values
		this.maxVel = o.maxVel || 10;
		this.maxAcc = o.maxAcc || 50;

		this.col = o.col || color(200);

		// Create Particle Data
		this.data = new ParticleData(o, Instance);
		this.a = this.data.table; // get particle array

		// Get Calculate Boundary Data from ParticleData
		this.c = this.data.c;
		this.xMin = this.data.xMin;
		this.yMin = this.data.yMin;
		this.xMax = this.data.xMax;
		this.yMax = this.data.yMax;
		this.w = this.data.w;
		this.h = this.data.h;
		this.boundary = this.data.boundary;
		this.padding = this.data.padding;

	}

  //====================================================

	draw(){
		for(let i = 0, len = this.a.length ; i < len; i++){
			this.a[i].draw();
		}
	}

	debug(){
		for(let i = 0, len = this.a.length ; i < len; i++){
			this.a[i].debug();
		}
	}

	//====================================================

  // GENERAL PHYSICS

  //====================================================

  update() {

			for(let i = 0, len = this.a.length ; i < len; i++){

				  // Update Velocity
          this.a[i].vel.add(this.a[i].acc);
          this.a[i].vel.limit(this.maxVel);

					// Update Position
					this.a[i].pos.add(this.a[i].vel);
					this.a[i].acc = createVector(0, 0);
      }

      // Update Quad Tree

      this.data.writeQuadtree();
  }

  //====================================================

  applyForces(forces, coef=1) {

		for(let i = 0, len = this.a.length ; i < len; i++){

          forces[i].limit(this.maxAcc);
          forces[i].mult(coef);
          this.a[i].acc.add(forces[i]);
          //this.a[i].acc.limit(this.maxAcc);

      }
    }

	//====================================================

  // MOVEMENT CONSTRAINTS

  //====================================================

  wrap() {
		for(let i = 0, len = this.a.length ; i < len; i++){
        if (this.a[i].pos.x > this.xMax )  { this.a[i].pos.x = this.xMin; }
        if (this.a[i].pos.x < this.xMin )  { this.a[i].pos.x = this.xMax; }
        if (this.a[i].pos.y > this.yMax )  { this.a[i].pos.y = this.yMin; }
        if (this.a[i].pos.y < this.yMin )  { this.a[i].pos.y = this.yMax; }
    }
  }

  //====================================================

  constrain() {
		for(let i = 0, len = this.a.length ; i < len; i++){
        this.a[i].pos.x = constrain(this.a[i].pos.x, this.xMin, this.xMax);
        this.a[i].pos.y = constrain(this.a[i].pos.y, this.yMin, this.yMax);
    }
  }

  //====================================================

	// # - Todo list

	// 1 - bouncewall doesnt work when flowfield is on

  bounceWalls(coef=1) {

		for(let i = 0, len = this.a.length ; i < len; i++){

			// Bounce off left and right walls
      if (this.a[i].pos.x > this.boundary.x + this.boundary.w/2 - this.padding ||
				this.a[i].pos.x < this.boundary.x - this.boundary.w/2 + this.padding ) {
        this.a[i].vel = createVector( - this.a[i].vel.x, this.a[i].vel.y );
      }

			// Bounce off top and bottom walls
      if (this.a[i].pos.y < this.boundary.y - this.boundary.h/2 + this.padding ||
				this.a[i].pos.y > this.boundary.y + this.boundary.h/2 - this.padding) {
        this.a[i].vel = createVector(  this.a[i].vel.x, - this.a[i].vel.y );
      }
    }
  }

	//====================================================

  // FORCES

  //====================================================

	// # - Todo list

	// 1 - wrap the noise around the sketch

  flowfield(coef=1) {
    angleMode(RADIANS);

		let noiseScale = 0.015;
    let noiseSpeed = 0.005;
    let forces = [];

		for(let i = 0, len = this.a.length ; i < len; i++){
      const n = noise(this.a[i].pos.x*noiseScale, this.a[i].pos.y*noiseScale, noiseSpeed * frameCount);
      const angle = map(n, 0, 1, 0, TWO_PI*3);
      const desired = p5.Vector.fromAngle(angle);
      forces[i] = p5.Vector.sub(desired, this.a[i].vel);

    }
    this.applyForces(forces, coef);
  }

	//====================================================

	gravity(coef=1){

		let forces = [];

		for(let i = 0, len = this.a.length ; i < len; i++){
			forces[i] = p5.Vector.sub(p5.Vector.fromAngle(PI/2), this.a[i].vel);
		}
		this.applyForces(forces, coef);
	}

	//====================================================

	force(f=p5.Vector.fromAngle(-PI/2), coef=1){

		let forces = [];

		for (let i = 0; i < this.a.length; i++) {
			forces[i] = p5.Vector.sub(f, this.a[i].vel);
		}
		this.applyForces(forces, coef);
	}

	//====================================================

	wind(coef = 1){

		// # - Todo list

		// 1 - fix the wobble from the frameCount * noiseSpeed
		// 2 - noise wrap around sides

		let noiseScale = 0.015;
    let noiseSpeed = 0.005;
    let forces = [];

    for (let i = 0; i < this.a.length; i++) {
      const n = noise(this.a[i].pos.x*noiseScale, this.a[i].pos.y*noiseScale, noiseSpeed * frameCount);
      const desired = createVector(n-0.5,this.a[i].vel.y);
      forces[i] = p5.Vector.sub(desired, this.a[i].vel);

    }
    this.applyForces(forces, coef);
	}

	//====================================================
	//====================================================
}

module.exports = ParticleSystem;
