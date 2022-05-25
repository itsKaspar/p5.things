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
