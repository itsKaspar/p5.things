class OS{
	constructor(){}

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
    //text(0,0,""test");
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
	// draw cross
	//descending line
	line(cx - w, cy + w, cx + w, cy - w);
	//ascending line
	line(cx - w, cy - w, cx + w, cy + w);
}

if(typeof window !== 'undefined') window.Windox = Windox; // export for window
module.exports = Windox; // and export for module
