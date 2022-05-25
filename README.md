# bits

bits is a repository of data structures and algorithms used in the context of creating living things inspired by nature, code and mathematics.
The project was designed to be used with p5.js for practical and educational purposes.

## Install

You can install the library via npm :
```
$ npm install git+https://github.com/itsKaspar/bits.git
```
or download a minified version [here](https://raw.githubusercontent.com/itsKaspar/bits/main/build/bits.min.js) and include it in your project this way :

```html
<script src="bits.min.js"></script>
````

## Usage

You can open the examples folder for an example of each of the data structures and or algorithms

Creating a new quadtree
```
let qtree = new quadtree.Quadtree();
```
Inserting a point
```
qtree.insert({x, y});
```
Get all points within a circle of position {cx, cy} and radius r
```
const request = qtree.query(cx, cy, r);
```
This will return an array of points within the range

Kaspar Ravel<br />
@. <kaspar.ravel@gmail.com><br />
w. [kaspar.wtf](https://www.kaspar.wtf)<br />
ig. [@kaspar.wtf](https://www.instagram.com/kaspar.wtf/)<br />
