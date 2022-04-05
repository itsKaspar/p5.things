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
