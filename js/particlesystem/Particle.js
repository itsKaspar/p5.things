const Point = require('../geometry/Point.js')

class Particle extends Point{
	constructor(v)
	{
		super(v);
		this.vel = v.vel || createVector(0,0);
		this.acc = v.acc || createVector(0,0);
	}
}

module.exports = Particle;
