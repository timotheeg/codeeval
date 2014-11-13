var fs  = require("fs");

var hole_re = /\[(-?\d+),(-?\d+)\]\s+\[(-?\d+),(-?\d+)\]/;
var brick_re = /\((\d+) \[(-?\d+),(-?\d+),(-?\d+)\] \[(-?\d+),(-?\d+),(-?\d+)\]\)/;
var abs = Math.abs;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var
		tokens = line.split('|'),
		m   = tokens[0].match(hole_re),
		hw  = abs(parseInt(m[3], 10) - parseInt(m[1], 10)),
		hh  = abs(parseInt(m[4], 10) - parseInt(m[2], 10)),
		res = []
	;

	tokens[1].split(';').forEach(function(brick_str) {
		var
			m = brick_str.match(brick_re),
			w = abs(parseInt(m[5], 10) - parseInt(m[2], 10)),
			h = abs(parseInt(m[6], 10) - parseInt(m[3], 10)),
			d = abs(parseInt(m[7], 10) - parseInt(m[4], 10))
		;

		// need to test 
		// widthxheight
		// widthxdepth
		// heightxdepth
		if (
			   (w<=hw && h<=hh)
			|| (h<=hw && w<=hh)

			|| (w<=hw && d<=hh)
			|| (d<=hw && w<=hh)

			|| (h<=hw && d<=hh)
			|| (d<=hw && h<=hh)
		) {
			res.push(parseInt(m[1], 10));
		}
	});

	res.sort(num_sort);
	process.stdout.write((res.length ? res.join(',') : '-') + '\n');
});

function num_sort(a, b) {
	return a - b;
}