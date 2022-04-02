class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  contains(point) {
    let d = (point.x - this.x) ** 2 + (point.y - this.y) ** 2;
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
