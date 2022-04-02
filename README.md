# Quadtree

> A quadtree is a tree data structure in which each internal node has exactly four children. Quadtrees are the two-dimensional analog of octrees and are most often used to partition a two-dimensional space by recursively subdividing it into four quadrants or regions. The data associated with a leaf cell varies by application, but the leaf cell represents a "unit of interesting spatial information". - [https://en.wikipedia.org/wiki/Quadtree](https://en.wikipedia.org/wiki/Quadtree)

This quadtree javascript library was designed for use with p5.js and is based from an implementation by Daniel Shiffman

I use this type of spatial indexing to avoid making nested for loops when particles have to check something with surrounding particles.
In the staged example the particles are checking if they are overlapping, lighting up if they do.

## Install

You can install the library via npm :
```
$ npm install git+https://github.com/itsKaspar/Quadtree.git
```
or download a minified version [here](https://raw.githubusercontent.com/itsKaspar/Quadtree/main/build/quadtree.min.js) and include it in your project this way :
```html
<script src="quadtree.min.js"></script>
````

## Usage

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
