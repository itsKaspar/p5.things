// ##### Quadtree Class

const WIDTH = 600 ; // default to p5js vars // (typeof width == undefined) ?
const HEIGHT = 600 ;

const Rectangle = require('./Rectangle.js') // import from other files
const Circle = require('./Circle.js')

class Quadtree {

  constructor(boundary=new Rectangle(WIDTH / 2, HEIGHT / 2, WIDTH, HEIGHT), capacity=4) {
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

  query(range, found) {
    if (!found) {
      found = [];
    }

    if (!range.intersects(this.boundary)) {
      return found;
    }

    for (let p of this.points) {
      if (range.contains(p)) {
        found.push(p);
      }
    }
    if (this.divided) {
      this.northwest.query(range, found);
      this.northeast.query(range, found);
      this.southwest.query(range, found);
      this.southeast.query(range, found);
    }

    return found;
  }

  // renderPoints() {

  //   for (let p of this.points) {
  //     noStroke();
  //     fill(255, 0, 0);
  //     circle(p.pos.x, p.pos.y, 3);
  //   }

  //   if (this.divided) {
  //     this.northwest.renderPoints();
  //     this.northeast.renderPoints();
  //     this.southwest.renderPoints();
  //     this.southeast.renderPoints();
  //   }
  // }

  // renderQuads() {
  //   if (this.divided) {
  //     this.northwest.renderQuads();
  //     this.northeast.renderQuads();
  //     this.southwest.renderQuads();
  //     this.southeast.renderQuads();
  //   } else {
  //     rectMode(CENTER);
  //     noFill();
  //     stroke(0, 255, 0);
  //     rect(this.boundary.x, this.boundary.y, this.boundary.w*2-3, this.boundary.h*2-3);
  //   }
  // }
}


module.exports = Quadtree;