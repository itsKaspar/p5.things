class Windox{
	constructor(o){

    this.content = "hello world"
    this.width = width/2;
    this.height = height/2;
    this.pos = createVector(width/2, height/2);
    this.BAR = 30;

	}

  //====================================================

  // DRAWING

  //====================================================

	draw() {
    rectMode(CENTER);
    fill(255,255,255);
    stroke(0,0,0);

    // window
    rect(this.pos.x, this.pos.y, this.width, this.height);

    // top fo the window
    stroke(255,0,0);
    line(this.pos.x - this.width/2, this.pos.y - this.height/2 + this.BAR,
         this.pos.x + this.width/2, this.pos.y - this.height/2 + this.BAR);

    // draw cross

    // draw content of the window
    //text(0,0,""test");

	}

  //====================================================

  // ACTIONS

  //====================================================

  move(){

  }

}

if(typeof window !== 'undefined') window.Windox = Windox; // export for window
module.exports = Windox; // and export for module
