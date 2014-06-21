var fs  = require("fs");

var tuple_re = /\((\d+),(\d+)\)/g;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var m, points = [];
	while(m = tuple_re.exec(line)) points.push({x:parseInt(m[1], 10), y:parseInt(m[2], 10)});

	process.stdout.write(is_square(points) + '\n');
});


function is_square(points)
{
	// assumes there are exactly 4 points
	// assumes we are looking for a grid-aligned square
	var xs=[], xseen={};
	var ys=[], yseen={};
	points.forEach(function(p) {
		if (!xseen.hasOwnProperty(p.x)) {
			xs.push(p.x);
			xseen[p.x] = 1;
		}
		if (!yseen.hasOwnProperty(p.y)) {
			ys.push(p.y);
			yseen[p.y] = 1;
		}
	});

	if (2 != xs.length || 2 != ys.length) return false;

	return Math.abs(xs[1] - xs[0]) === Math.abs(ys[1] - ys[0]);
}