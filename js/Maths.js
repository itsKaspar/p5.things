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
