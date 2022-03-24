(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  contains(point) {
    //let d = distSq(point.pos, createVector(this.x,this.y));
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
},{}],2:[function(require,module,exports){
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
},{"./Circle.js":1,"./Rectangle.js":3}],3:[function(require,module,exports){
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
    return !(range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h);
  }
}

module.exports = Rectangle;
},{}],4:[function(require,module,exports){
const Rectangle = require('./Rectangle.js'); // import from other files
const Circle = require('./Circle.js');
const Quadtree = require('./Quadtree.js');

if(typeof window !== 'undefined') window.Q = { Quadtree, Rectangle, Circle }; // would change Q to the name of the library
else module.exports = { Quadtree, Rectangle, Circle }; // in node would create a context



 
},{"./Circle.js":1,"./Quadtree.js":2,"./Rectangle.js":3}]},{},[4]);
