const Rectangle = require('./Rectangle.js'); // import from other files
const Circle = require('./Circle.js');
const Quadtree = require('./Quadtree.js');

if(typeof window !== 'undefined') window.Q = { Quadtree, Rectangle, Circle }; // would change Q to the name of the library
else module.exports = { Quadtree, Rectangle, Circle }; // in node would create a context



 