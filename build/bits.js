(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Maths = require('./Maths.js');

class Grafix{

static grainCircle(cx,cy,cr,c=color(0), dir=TWO_PI){

	stroke(c);
	strokeWeight(1.1); // so that it is not pixels

	const AREA = PI * cr * cr;

	// LIGHTING SYSTEM
	const v = p5.Vector.fromAngle(dir,cr); // pick random point on edge of sphere
	const light = createVector(cx+v.x, cy+v.y);

	//GENERATE POINTS
	for(let i = 0; i < AREA / 2 ; i++){

		while(true){

			const p = Maths.pointInCircle(cx, cy, cr);
			const probability = map(dist(p.x, p.y, light.x, light.y),0,(cr*2),1,0);

			if(random() < probability == 0){          // I DONT UDBNERSTAND WHY I HAVE AN EQL 0 here
				point(p.x,p.y);
				break;
			}
		}
	}
}

static grainTriangle(x0, y0, x1, y1, x2, y2){
	strokeWeight(1.1); // so that it is not pixels

	const AREA = ( x0 * ( y1 - y2 ) + x1 * ( y2 - y0 ) + x2 * (y0 - y1) ) / 2;

	// LIGHTING SYSTEM
	//const v = p5.Vector.fromAngle(dir,cr); // pick random point on edge of sphere
	//const light = createVector(cx+v.x, cy+v.y);

	// GENERATE POINTS
	for(let i = 0; i < AREA / 2 ; i++){

		//while(true){
			//const p = pointInCircle(cx, cy, cr);
			const p = Maths.pointInTriangle(x0,y0,x1,y1,x2,y2);
			//const probability = map(dist(p.x, p.y, light.x, light.y),0,(cr*2),1,0);

			//if(random() < probability == 0){          // I DONT UDBNERSTAND WHY I HAVE AN EQL 0 here
				point(p.x,p.y);
				//break;
			//}
		//}
	 }
  }

  static hello(){
    console.log("hello world")
  }
}

if(typeof window !== 'undefined') window.Grafix = Grafix; // export for window
module.exports = Grafix; // and export for module

},{"./Maths.js":2}],2:[function(require,module,exports){
class Maths{
  //static PHI = 1.6543;
  static distSq(x1, y1, x2, y2){ return (x2 - x1)**2 + (y2 - y1)**2; }

  // Vector Functions
  static distSq(v1, v2) { return (v2.x - v1.x) ** 2 + (v2.y - v1.y) ** 2; }
  static midpoint(v1, v2) { return (createVector((v1.x + v2.x) / 2, (v1.y + v2.y) / 2)); }

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

   // # Geometry
   // # Check if points are inside polygons
   static isPointinCircle(px, py, cx, cy, cr){ return (distSq(px, py, cx, cy) < cr**2); }
   static isPointinSquare(){}

   // # Generate uniform points inside polygons
   static pointInQuad(){}
   static pointInSquare(){}

   static pointInTriangle(x0, y0, x1, y1, x2, y2){
  	// we must put x1,x2 and y1 y2 at the origin before transformation
  	// and put them back afterwards

  	let a1 = random(); // nice fades if i put an sqrt here
  	let a2 = random();
  	if((a1 + a2) >=1 ){ // reflect the points that are outside 1st triangle
  		a1 = 1 - a1; // https://blogs.sas.com/content/iml/2020/10/19/random-points-in-triangle.html
  		a2 = 1 - a2;
  	}
  	const px = a1 * (x1-x0) + a2 * (x2-x0) + x0;
  	const py = a1 * (y1-y0) + a2 * (y2-y0) + y0;

  	return createVector(px, py);
  }

  static pointInCircle(cx, cy, cr){
    // uniformely generate points in a circle
    // https://stackoverflow.com/questions/5837572/generate-a-random-point-within-a-circle-uniformly

    const r = cr * Math.sqrt(Math.random()); // if i add a second square root here I get something more intense along the curves
    const theta = Math.random() * 2 * Math.PI;   // if we add an sqrt here it does a neat spiral

    const px = cx + r * Math.cos(theta)
    const py = cy + r * Math.sin(theta)

    return {x : px, y : py};
  }

  // # Misc

  static fixId(i, max) {
      if (i >= 0) {
        return i % max;
      } else if (i < 0) {
        return max + i;
      }
  }

}

if(typeof window !== 'undefined') window.Maths = Maths; // export for window
module.exports = Maths; // and module

},{}],3:[function(require,module,exports){
class Ox{
	constructor(){
		let windoxs = [];
		let sysFontSize = 12;
	}

	draw(){
		for(let i = 0; i < windoxs.length; i++){
			windoxs[i].draw();
		}
	}

	mousePressed(){
		for(let i = 0; i < windoxs.length; i++){
			windoxs[i].mousePressed();
		}
	}
	mouseDragged(){
		for(let i = 0; i < windoxs.length; i++){
			windoxs[i].mouseDragged();
		}
	}

	addWindox(){
		let w = new Windox();
		windoxs.push(w)
	}
}

class Windox{
	constructor(o){

    this.content = "hello world"
    this.width = width/2;
    this.height = height/2;
		let x = random(0 + this.width/2, width - this.width/2);
		let y = random(0 + this.height/2, height - this.height/2);
    this.pos = createVector(x, y);
    this.s = 30; // space
		this.padding = 30;

		this.display = true;
	}

  //====================================================

  // DRAWING

  //====================================================

	draw() {
		if(this.display){

    rectMode(CENTER);
    fill(255,255,255);
    stroke(0,0,0);

    // window
    rect(this.pos.x, this.pos.y, this.width, this.height);

    // top fo the window
    line(this.pos.x - this.width/2, this.pos.y - this.height/2 + this.s,
         this.pos.x + this.width/2, this.pos.y - this.height/2 + this.s);

		//draw cross
		drawCross(this.pos.x + this.width/2 - this.s/2,
							this.pos.y - this.height/2 + this.s/2,
							this.s/4);

    // draw content of the window
		noStroke();
		fill(0);
    text(this.content,
					this.pos.x - this.width/2 + this.padding,
					this.pos.y - this.height/2 + textAscent() + this.padding + this.s);
		}
	}

  //====================================================

  // ACTIONS

  //====================================================

	mousePressed(){
		// if mouse is pressed on X
		if(	mouseX > this.pos.x + this.width/2 - this.s && mouseX < this.pos.x + this.width/2 + this.s &&
				mouseY > this.pos.y - this.height/2 - this.s && mouseY < this.pos.y - this.height/2 + this.s){
			this.close();
		}
		// if mouse is pressed somewhere else
	}

	mouseDragged(){
		// if mouse is pressed on X
		if(	mouseX > this.pos.x - this.width/2 && mouseX < this.pos.x + this.width/2 &&
				mouseY > this.pos.y - this.height/2 && mouseY < this.pos.y - this.height/2 + this.s){
			this.move();
		}
	}

  move(){
		this.pos.x += (mouseX - pmouseX);
		this.pos.y += (mouseY - pmouseY);
  }

	close(){
		this.display = false;
	}

}

function drawCross(cx, cy, w){
	line(cx - w, cy + w, cx + w, cy - w); //descending line
	line(cx - w, cy - w, cx + w, cy + w); //ascending line
}

if(typeof window !== 'undefined') window.Ox = Ox; // export for window
module.exports = Ox; // and export for module

},{}],4:[function(require,module,exports){
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

},{"../particlesystem/Particle.js":16}],5:[function(require,module,exports){
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

},{"../particlesystem/ParticleSystem.js":18,"./Agent.js":4}],6:[function(require,module,exports){
const Agent = require('../autonomousagents/Agent.js');

class ChainNode extends Agent {
  constructor(v){
    super(v);
  }
}

module.exports = ChainNode;

},{"../autonomousagents/Agent.js":4}],7:[function(require,module,exports){
const AgentSystem = require('../autonomousagents/AgentSystem.js'); // import from other files
const Maths = require('../Maths.js'); // import from other files

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

},{"../Maths.js":2,"../autonomousagents/AgentSystem.js":5}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
const ChainSystem = require('../../chainsystem/ChainSystem.js');

class DifferentialLine extends ChainSystem {
  constructor(o){
    super(o);

  }
}

module.exports = DifferentialLine;

},{"../../chainsystem/ChainSystem.js":7}],12:[function(require,module,exports){
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

},{"../../chainsystem/ChainNode.js":6}],13:[function(require,module,exports){
const Agent = require('../../autonomousagents/Agent.js');

class SCBranch extends Agent{
  constructor(v, parent, dir){
    super(v);
    this.parent = parent || null;
    this.dir = dir || createVector(0, -1);
    this.origDir = this.dir.copy();
    this.count = 0;
    this.len = 2;

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

  draw() {
    stroke(0);
    strokeWeight(3);
    if (this.parent != null) {
      line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
    }

  }

}

module.exports = SCBranch;

},{"../../autonomousagents/Agent.js":4}],14:[function(require,module,exports){
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

},{"../../autonomousagents/Agent.js":4}],15:[function(require,module,exports){
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

},{"../../autonomousagents/AgentSystem.js":5,"./SCBranch.js":13,"./SCLeaf":14}],16:[function(require,module,exports){
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

},{"../geometry/Point.js":9}],17:[function(require,module,exports){
const Quadtree = require('../quadtree/Quadtree.js')
const Particle = require('./Particle.js'); // import from other files
const Rectangle = require('../geometry/Rectangle.js'); // import from other files

// # - Todo list

// 1 - add GPU support

class ParticleData{
  constructor(o){

    this.spawnSettings = o.spawnSettings;

    this.spawnNb = o.spawnNb !== undefined ? o.spawnNb : 100 ;
		this.spawnVel = o.spawnVel || "null"; // null, random, outside, inside
		this.spawnPos = o.spawnPos || "random"; // circle, random, poisson,center ..

    this.instance = o.instance || Particle;

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
    if(this.spawnPos.x !== undefined){
      this.spawnLocation(this.spawnPos);
    }
    else{
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

  // NEED TO FIX THIS SO THAT IT WORKS WITH A GRID

  spawnLocation(location){
    for(let i = 0; i < this.spawnNb; i++){
      const v = { pos : location };
      this.table.push(new this.instance(v));
    }
  }

  //====================================================

  spawnCircle(){
    const radius = 20;
    for(let i = 0; i < this.spawnNb; i++){
      const x = Math.sin(i/this.spawnNb*TWO_PI)*radius + this.boundary.x;
      const y =	Math.cos(i/this.spawnNb*TWO_PI)*radius + this.boundary.y;
      const v = { pos : createVector(x,y) };
      this.table.push(new this.instance(v));
    }
  }

  //====================================================

  spawnRandom(){
    for(let i = 0; i < this.spawnNb; i++){
      const v = { pos : createVector(
                          random(this.boundary.x-this.w/2, this.boundary.x+this.w/2),
                          random(this.boundary.y-this.h/2, this.boundary.y+this.h/2))
                };
      this.table.push(new this.instance(v));
    }
  }

  //====================================================

  spawnCenter(){
    for(let i = 0; i < this.spawnNb; i++){
      const v = { pos : createVector(createVector(this.boundary.x,this.boundary.y)) };
      this.table.push(new this.instance(v));
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

},{"../geometry/Rectangle.js":10,"../quadtree/Quadtree.js":19,"./Particle.js":16}],18:[function(require,module,exports){
const Particle = require('./Particle.js');
const ParticleData = require('./ParticleData.js');

class ParticleSystem{
	constructor(o){

		this.instance = o.instance || Particle;

		// Default Values
		this.maxVel = o.maxVel || 10;
		this.maxAcc = o.maxAcc || 50;

		this.col = o.col || color(200);

		// Create Particle Data
		this.data = new ParticleData(o);
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

},{"./Particle.js":16,"./ParticleData.js":17}],19:[function(require,module,exports){
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

},{"../geometry/Circle.js":8,"../geometry/Rectangle.js":10}],20:[function(require,module,exports){
// Maths
const Maths = require('./js/Maths.js'); // import from other files
// Graphics
const Grafix = require('./js/Grafix.js');
// Geometry
const Point = require('./js/geometry/Point.js')
const Rectangle = require('./js/geometry/Rectangle.js'); // import from other files
const Circle = require('./js/geometry/Circle.js');
// Quadtree
const Quadtree = require('./js/quadtree/Quadtree.js');
// Particle System
const Particle = require('./js/particlesystem/Particle.js');
const ParticleSystem = require('./js/particlesystem/ParticleSystem.js');
const ParticleData = require('./js/particlesystem/ParticleData.js');
// Autonomous Agents
const Agent = require('./js/autonomousagents/Agent.js');
const AgentSystem = require('./js/autonomousagents/AgentSystem.js');
// Chain System
const ChainSystem = require('./js/chainsystem/ChainSystem.js');
const ChainNode = require('./js/chainsystem/ChainNode.js');
// Morphogenesis
// - Differential Growth
const DifferentialLine = require('./js/morphogenesis/differentialgrowth/DifferentialLine.js');
const DifferentialNode = require('./js/morphogenesis/differentialgrowth/DifferentialNode.js');
// - Space Colonization
const SCTree = require('./js/morphogenesis/spacecolonization/SCTree.js');
const SCBranch = require('./js/morphogenesis/spacecolonization/SCBranch.js');
const SCLeaf = require('./js/morphogenesis/spacecolonization/SCLeaf.js');
// Operating System
const Ox = require('./js/OperatingSystem.js');

const modules = {
  Maths,
  Grafix,
  Point, Rectangle, Circle,
  Quadtree,
  Particle, ParticleSystem, ParticleData,
  Agent, AgentSystem,
  ChainSystem, ChainNode,
  DifferentialLine, DifferentialNode,
  SCTree, SCBranch, SCLeaf,
  Ox
}

if(typeof window !== 'undefined') window.bits = modules; // would change Q to the name of the library
else module.exports = modules; // in node would create a context

},{"./js/Grafix.js":1,"./js/Maths.js":2,"./js/OperatingSystem.js":3,"./js/autonomousagents/Agent.js":4,"./js/autonomousagents/AgentSystem.js":5,"./js/chainsystem/ChainNode.js":6,"./js/chainsystem/ChainSystem.js":7,"./js/geometry/Circle.js":8,"./js/geometry/Point.js":9,"./js/geometry/Rectangle.js":10,"./js/morphogenesis/differentialgrowth/DifferentialLine.js":11,"./js/morphogenesis/differentialgrowth/DifferentialNode.js":12,"./js/morphogenesis/spacecolonization/SCBranch.js":13,"./js/morphogenesis/spacecolonization/SCLeaf.js":14,"./js/morphogenesis/spacecolonization/SCTree.js":15,"./js/particlesystem/Particle.js":16,"./js/particlesystem/ParticleData.js":17,"./js/particlesystem/ParticleSystem.js":18,"./js/quadtree/Quadtree.js":19}]},{},[20]);
