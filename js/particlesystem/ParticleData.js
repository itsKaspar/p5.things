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
