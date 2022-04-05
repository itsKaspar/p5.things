(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"../particlesystem/Particle.js":11}],2:[function(require,module,exports){
const Agent = require('./Agent.js');
const ParticleSystem = require('../particlesystem/ParticleSystem.js');

class AgentSystem extends ParticleSystem{

	constructor(o, Instance=Agent){
		super(o, Instance);

		this.safeDistance = 20;																														// DOES THIS RLY NEED TO BE THERE ?
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

},{"../particlesystem/ParticleSystem.js":13,"./Agent.js":1}],3:[function(require,module,exports){
const Agent = require('../autonomousagents/Agent.js');

class ChainNode extends Agent {
  constructor(v){
    super(v);
  }
}

module.exports = ChainNode;

},{"../autonomousagents/Agent.js":1}],4:[function(require,module,exports){
const AgentSystem = require('../autonomousagents/AgentSystem.js'); // import from other files
const Maths = require('../maths/Maths.js'); // import from other files

class ChainSystem extends AgentSystem{
	constructor(o, Instance){

		super(o, Instance);

		this.Instance = Instance;
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
		return new this.Instance(v);
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

},{"../autonomousagents/AgentSystem.js":2,"../maths/Maths.js":8}],5:[function(require,module,exports){
class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  contains(point) {
    let d = (point.pos.x - this.x) ** 2 + (point.pos.y - this.y) ** 2;
    return d <= this.r ** 2;
  }

  intersects(range) {

    var xDist = Math.abs(range.x - this.x);
    var yDist = Math.abs(range.y - this.y);

    // radius of the circle
    var r = this.r;

    var w = range.w;
    var h = range.h;

    var edges = (xDist - w) ** 2 + (yDist - h) ** 2;

    // no intersection
    if (xDist > (r + w) || yDist > (r + h))
      return false;

    // intersection within the circle
    if (xDist <= w || yDist <= h)
      return true;

    // intersection on the edge of the circle
    return edges <= this.r ** 2;
  }
}

module.exports = Circle;

},{}],6:[function(require,module,exports){
class Point{
    constructor(v){
      this.pos = v.pos || createVector(width/2,height/2);
      noStroke();
      fill(200);
    }
    draw(){
      circle(this.pos.x, this.pos.y, 10);
    }

    debug(){
      noStroke();
      fill(255,0,0);
      circle(this.pos.x, this.pos.y, 10);
    }
}

module.exports = Point;

},{}],7:[function(require,module,exports){
class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(point) {
    return (point.pos.x >= this.x - this.w &&
            point.pos.x <= this.x + this.w &&
            point.pos.y >= this.y - this.h &&
            point.pos.y <= this.y + this.h);
  }

  intersects(range) {
    return !( range.x - range.w > this.x + this.w ||
              range.x + range.w < this.x - this.w ||
              range.y - range.h > this.y + this.h ||
              range.y + range.h < this.y - this.h);
  }
}

module.exports = Rectangle;

},{}],8:[function(require,module,exports){
class Maths{
  //static PHI = 1.6543;
  static distSq(x1, y1, x2, y2){ return (x2 - x1)**2 + (y2 - y1)**2; }

  // PROBABILITY

  // static randInt(min, max){ return int(random(min, max+1)); }

// LINEAR AND NON LINEAR MAPPING
// EXPIN EXPOUT EXPINOUT
// QUADRATICIN OUT
 //  static expInOut(x) {
 //  if(x == 0.0 || x == 1.0) return x;
 //
 //  	if(x < 0.5){
 //  		return(0.5 * pow(2, (20 * x) - 10));
 //  	}
 //  	else{
 //  		return(-0.5 * pow(2, (-20 * x) + 10) + 1);
 //  	}
 // }
 // GEOMETRY

 static isPointinCircle(px, py, cx, cy, cr){
 	return (distSq(px, py, cx, cy) < cr**2);
 }

 static isPointinSquare(){}


 // GENERATE RANDOM UNIFORM POINTS

 static pointInQuad(){}

 static pointInSquare(){}

//  static pointInTriangle(x0, y0, x1, y1, x2, y2){
// 	// we must put x1,x2 and y1 y2 at the origin before transformation
// 	// and put them back afterwards
//
// 	let a1 = random(); // nice fades if i put an sqrt here
// 	let a2 = random();
// 	if((a1 + a2) >=1 ){ // reflect the points that are outside 1st triangle
// 		a1 = 1 - a1; // https://blogs.sas.com/content/iml/2020/10/19/random-points-in-triangle.html
// 		a2 = 1 - a2;
// 	}
// 	const px = a1 * (x1-x0) + a2 * (x2-x0) + x0;
// 	const py = a1 * (y1-y0) + a2 * (y2-y0) + y0;
//
// 	return createVector(px, py);
// }

  static pointInCircle(cx, cy, cr){
  	// uniformely generate points in a circle
  	// https://stackoverflow.com/questions/5837572/generate-a-random-point-within-a-circle-uniformly

  	const r = cr * Math.sqrt(Math.random()); // if i add a second square root here I get something more intense along the curves
  	const theta = Math.random() * 2 * Math.PI;   // if we add an sqrt here it does a neat spiral

  	const px = cx + r * Math.cos(theta)
  	const py = cy + r * Math.sin(theta)

  	return {x : px, y : py};
}

// Vector Functions

static midpoint(v1, v2) { return (createVector((v1.x + v2.x) / 2, (v1.y + v2.y) / 2)); }
static distSq(v1, v2) { return (v2.x - v1.x) ** 2 + (v2.y - v1.y) ** 2; }

static fixId(i, max) {
    if (i >= 0) {
      return i % max;
    } else if (i < 0) {
      return max + i;
    }
}

}


if(typeof window !== 'undefined') window.maths = { Maths }; // would change Q to the name of the library
else module.exports = { Maths }; // in node would create a context

},{}],9:[function(require,module,exports){
const ChainSystem = require('../../chainsystem/ChainSystem.js');

class DifferentialLine extends ChainSystem {
  constructor(o, Instance){
    super(o, Instance);

  }
}

module.exports = DifferentialLine;

},{"../../chainsystem/ChainSystem.js":4}],10:[function(require,module,exports){
const ChainNode = require('../../chainsystem/ChainNode.js');

class DifferentialNode extends ChainNode {
  constructor(v){
    super(v);
  }
}

module.exports = DifferentialNode;

},{"../../chainsystem/ChainNode.js":3}],11:[function(require,module,exports){
const Point = require('../geometry/Point.js')

class Particle extends Point{
	constructor(v)
	{
		super(v);
		this.vel = v.vel || createVector(0,0);
		this.acc = v.acc || createVector(0,0);
	}
}

module.exports = Particle;

},{"../geometry/Point.js":6}],12:[function(require,module,exports){
const Quadtree = require('../quadtree/Quadtree.js')
const Particle = require('./Particle.js'); // import from other files
const Rectangle = require('../geometry/Rectangle.js'); // import from other files

// # - Todo list

// 1 - add GPU support

class ParticleData{
  constructor(o, Instance=Particle){

    this.spawnNb = o.spawnNb !== undefined ? o.spawnNb : 100 ;
		this.spawnVel = o.spawnVel || "null"; // null, random, outside, inside
		this.spawnPos = o.spawnPos || "random"; // circle, random, poisson,center ..
    this.Instance = Instance;

    this.table = [];
    //this.tableGPU = [];

    // # Grid System with new center and new boundaries
		this.padding = o.padding || 0;	// padding for the boundary
		const p = this.padding;
		const p2 = this.padding * 2;
		const w = width;
		const h = height;

		this.boundary = new Rectangle(w/2, h/2, w, h) // initialize to whole canvas
		this.c = createVector(w/2, h/2);
		this.xMin = 0 + p;
		this.yMin = 0 + p;
		this.xMax = w - p;
		this.yMax = h - p;
		this.w = w - p2;
		this.h = h - p2;

		this.grid = o.grid || false;
		const grid = this.grid;
		if(grid){
			const cx = w	/ grid.c - w / grid.c / 2;
			const cy = h	/ grid.r - h / grid.r / 2;
			this.c = createVector(cx,cy); // new center of sim
			this.w = w	/ grid.c - p2; // new width of sim
			this.h = h	/ grid.r - p2; // new height of sim
			this.xMin = this.c.x - this.w / 2 + p; // x-bound min
			this.xMax = this.c.x + this.w / 2 - p; // x-bound max
			this.yMin = this.c.y - this.h / 2 + p; // y-bound min
			this.yMax = this.c.y + this.h / 2 - p;// y-bound max
			this.boundary = new Rectangle(cx, cy, this.w, this.h);
		}

    if(this.spawnNb > 0) this.spawn(this.spawnPos);
    this.writeQuadtree();

  }

  //====================================================

	// # - Todo list

  // 1 - spawn at a vector if vector given as input

  spawn(){
    switch(this.spawnPos){
      case "random":
        this.spawnRandom();
        break;
      case "circle":
        this.spawnCircle();
        break;
      case "center":
        this.spawnCenter();
        break;
      default:
        this.spawnRandom();
        break;
    }

    // Velocity
    if(this.spawnVel == "null"){
      this.setVelNull()
    }
    if(this.spawnVel == "random"){
      this.setVelRandom()
    }
  }

  //====================================================

  spawnCircle(){
    const radius = 20;
    for(let i = 0; i < this.spawnNb; i++){
      const x = Math.sin(i/this.spawnNb*TWO_PI)*radius + this.boundary.x;
      const y =	Math.cos(i/this.spawnNb*TWO_PI)*radius + this.boundary.y;
      const v = { pos : createVector(x,y) };
      this.table.push(new this.Instance(v));
    }
  }

  //====================================================

  spawnRandom(){
    for(let i = 0; i < this.spawnNb; i++){
      const v = { pos : createVector(
                          random(this.boundary.x-this.w/2, this.boundary.x+this.w/2),
                          random(this.boundary.y-this.h/2, this.boundary.y+this.h/2))
                };
      this.table.push(new this.Instance(v));
    }
  }

  //====================================================

  spawnCenter(){
    for(let i = 0; i < this.spawnNb; i++){
      const v = { pos : createVector(createVector(this.boundary.x,this.boundary.y)) };
      this.table.push(new this.Instance(v));
    }
  }

  //====================================================

  setVelNull(){
		for(let i = 0, len = this.table.length ; i < len; i++){
      this.table[i].vel = createVector(0,0);
    }
  }

  //====================================================

  setVelRandom(){
		for(let i = 0, len = this.table.length ; i < len; i++){
      this.table[i].vel = createVector(random()-0.5,random()-0.5);
    }
  }

  //====================================================

  writeQuadtree(){
      this.qtree = new Quadtree();
		    for(let i = 0, len = this.table.length ; i < len; i++){
          this.qtree.insert(this.table[i]);
        }
  }

  //====================================================

}

module.exports = ParticleData;

},{"../geometry/Rectangle.js":7,"../quadtree/Quadtree.js":14,"./Particle.js":11}],13:[function(require,module,exports){
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

},{"./Particle.js":11,"./ParticleData.js":12}],14:[function(require,module,exports){
// ##### Quadtree Class

const Rectangle = require('../geometry/Rectangle.js') // import from other files
const Circle = require('../geometry/Circle.js')

class Quadtree {

  constructor(boundary=new Rectangle(width / 2, height / 2, width, height), capacity=4) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }

  subdivide() {
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w / 2;
    let h = this.boundary.h / 2;

    let ne = new Rectangle(x + w, y - h, w, h);
    this.northeast = new Quadtree(ne, this.capacity);
    let nw = new Rectangle(x - w, y - h, w, h);
    this.northwest = new Quadtree(nw, this.capacity);
    let se = new Rectangle(x + w, y + h, w, h);
    this.southeast = new Quadtree(se, this.capacity);
    let sw = new Rectangle(x - w, y + h, w, h);
    this.southwest = new Quadtree(sw, this.capacity);

    this.divided = true;
  }

  insert(point) {                                      // MAKE THE FUNCTION BE ABLE TO TAKE ONE POINT Or AN ARRAY OF POINTS
    if (!this.boundary.contains(point)) {
      return false;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }

    if (!this.divided) {
      this.subdivide();
    }

    if (this.northeast.insert(point) || this.northwest.insert(point) ||
        this.southeast.insert(point) || this.southwest.insert(point)) {
      return true;
    }
  }

  query(x,y,r, found=[]) {

    const range = new Circle(x,y,r);

    if (!range.intersects(this.boundary)) {
      return found;
    }

    for (let p of this.points) {
      if (range.contains(p)) {
        found.push(p);
      }
    }
    if (this.divided) {
      this.northwest.query(range.x, range.y, range.r, found);
      this.northeast.query(range.x, range.y, range.r, found);
      this.southwest.query(range.x, range.y, range.r, found);
      this.southeast.query(range.x, range.y, range.r, found);
    }

    return found;
  }

  renderPoints() {

    for (let p of this.points) {
      noStroke();
      fill(225, 100, 180);
      circle(p.pos.x, p.pos.y, 10);
    }

    if (this.divided) {
      this.northwest.renderPoints();
      this.northeast.renderPoints();
      this.southwest.renderPoints();
      this.southeast.renderPoints();
    }
  }

  renderQuads() {
    if (this.divided) {
      this.northwest.renderQuads();
      this.northeast.renderQuads();
      this.southwest.renderQuads();
      this.southeast.renderQuads();
    } else {
      rectMode(CENTER);
      noFill();
      rect(this.boundary.x, this.boundary.y, this.boundary.w*2-1, this.boundary.h*2-1);
    }
  }

  draw(){
    this.renderQuads();
    this.renderPoints();
  }
}


module.exports = Quadtree;

},{"../geometry/Circle.js":5,"../geometry/Rectangle.js":7}],15:[function(require,module,exports){
// Maths
const Maths = require('./js/maths/Maths.js'); // import from other files
// Geometry
const Point = require('./js/geometry/Point.js')
const Rectangle = require('./js/geometry/Rectangle.js'); // import from other files
const Circle = require('./js/geometry/Circle.js');
// Quadtree
const Quadtree = require('./js/quadtree/Quadtree.js');
// Particle System
const Particle = require('./js/particlesystem/Particle.js')
const ParticleSystem = require('./js/particlesystem/ParticleSystem.js')
const ParticleData = require('./js/particlesystem/ParticleData.js')
// Autonomous Agents
const Agent = require('./js/autonomousagents/Agent.js')
const AgentSystem = require('./js/autonomousagents/AgentSystem.js')
// Chain System
const ChainSystem = require('./js/chainsystem/ChainSystem.js');
const ChainNode = require('./js/chainsystem/ChainNode.js');
// Morphogenesis
// - Differential Growth
const DifferentialLine = require('./js/morphogenesis/differentialgrowth/DifferentialLine.js');
const DifferentialNode = require('./js/morphogenesis/differentialgrowth/DifferentialNode.js');

const modules = {
  Maths,
  Point, Rectangle, Circle,
  Quadtree,
  Particle, ParticleSystem, ParticleData,
  Agent, AgentSystem,
  ChainSystem, ChainNode,
  DifferentialLine, DifferentialNode
}

if(typeof window !== 'undefined') window.tilde = modules; // would change Q to the name of the library
else module.exports = modules; // in node would create a context

},{"./js/autonomousagents/Agent.js":1,"./js/autonomousagents/AgentSystem.js":2,"./js/chainsystem/ChainNode.js":3,"./js/chainsystem/ChainSystem.js":4,"./js/geometry/Circle.js":5,"./js/geometry/Point.js":6,"./js/geometry/Rectangle.js":7,"./js/maths/Maths.js":8,"./js/morphogenesis/differentialgrowth/DifferentialLine.js":9,"./js/morphogenesis/differentialgrowth/DifferentialNode.js":10,"./js/particlesystem/Particle.js":11,"./js/particlesystem/ParticleData.js":12,"./js/particlesystem/ParticleSystem.js":13,"./js/quadtree/Quadtree.js":14}]},{},[15]);
