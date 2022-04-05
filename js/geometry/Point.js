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
