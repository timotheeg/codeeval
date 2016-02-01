var fs  = require("fs");

var bridges_re = /(\d+):\s*\(\[([0-9.-]+),\s*([0-9.-]+)\],\s*\[([0-9.-]+),\s*([0-9.-]+)\]\)/;
var bridges = [];
var input = fs.readFileSync(process.argv[2]).toString();

// read input and compute the line object the bridges are on
input.split('\n').forEach(function (line)
{
	var m = line.match(bridges_re);
	if (!m) return;

	var bridge = {
		n:  parseInt(m[1], 10),
		p1: {x: parseFloat(m[2]), y: parseFloat(m[3])},
		p2: {x: parseFloat(m[4]), y: parseFloat(m[5])},
		collisions: []
	};
	bridge.line = getLine(bridge.p1, bridge.p2);

	bridges.push(bridge);
});

// Brute force check of all bridge intersections
for (var idx=bridges.length; idx--; ) {
	var bridge1 = bridges[idx];
	for (var jdx=idx; jdx-- > 0; ) {
		var bridge2 = bridges[jdx];
		var b1_b2_intersection = getLineCross(bridge1.line, bridge2.line);
		if (
			b1_b2_intersection
			&& isOnSegment(bridge1.p1, bridge1.p2, b1_b2_intersection)
			&& isOnSegment(bridge2.p1, bridge2.p2, b1_b2_intersection)
		) {
			bridge1.collisions.push(bridge2);
			bridge2.collisions.push(bridge1);
		}
	}
}

// remove the bridges that have the most collisions with others until there is collision left
do {
	bridges.sort(byCollisions);
	if (bridges[0].collisions.length <= 0) break;

	// remove most offensive bridge and remove all the collisions it was causing
	var bridge1 = bridges.shift();
	for (var idx=bridge1.collisions.length; idx--; ) {
		var bridge2 = bridge1.collisions[idx];
		var b_idx = bridge2.collisions.indexOf(bridge1);
		bridge2.collisions.splice(b_idx, 1);
	}
}
while (bridges.length > 0);

bridges.sort(byId);
process.stdout.write(bridges.map(function(b){return b.n}).join('\n') + '\n');

// done!

function byCollisions(b1, b2) {
	return b2.collisions.length - b1.collisions.length;
}

function byId(b1, b2) {
	return b1.n - b2.n;
}

function getLine(p0, p1) {
	var l = {};
	var x0 = p0.x;
	var y0 = p0.y;
	var x1 = p1.x;
	var y1 = p1.y;

	if (x0 == x1) {
		if (y0 == y1) {
			// p0 and p1 are same point, return null
			l = null;
		} else {
			// Otherwise, the line is a vertical line
			l.c = x0;
		}
	} else {
		l.a = (y0 - y1) / (x0 - x1);
		l.b = y0 - (l.a * x0);
	}
	
	// returns the line object
	return l;
}

function getLineCross(l0, l1) {
	// Make sure both line exists
	if ((l0 === null) || (l1 === null)) return null;

	// define local variables
	var a0 = l0.a;
	var b0 = l0.b;
	var c0 = l0.c;
	var a1 = l1.a;
	var b1 = l1.b;
	var c1 = l1.c;
	var u;

	// checks whether both lines are vertical
	if ((c0 === undefined) && (c1 === undefined)) {

		// lines are not verticals but parallel, intersection does not exist
		if (a0 == a1) return null;

		// calculate common x value.
		u = (b1 - b0) / (a0 - a1);
		
		// return the new Point
		return {x: u, y: (a0*u + b0)}

	} else {

		if (c0 !== undefined) {
			if (c1 !== undefined) {
				// both lines vertical, intersection does not exist
				return null;
			} else {
				// return the point on l1 with x = c0
				return {x: c0, y: (a1*c0 + b1)};
			}

		} else if (c1 !== undefined) {
			// no need to test c0 as it was tested above
			// return the point on l0 with x = c1
			return {x: c1, y: (a0*c1 + b0)};
		}
	}
}

function isOnSegment(p1, p2, p3) {
	var x_ratio = (p3.x - p1.x) / (p2.x - p1.x);
	var y_ratio = (p3.y - p1.y) / (p2.y - p1.y);
	return (
		   x_ratio > 0 && x_ratio < 1
		&& y_ratio > 0 && y_ratio < 1
	);
}
