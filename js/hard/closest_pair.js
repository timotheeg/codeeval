var input = require("fs").readFileSync(process.argv[2]).toString().split('\n');
var idx = 0;
var len = input.length;

// assume correctly formatted input
// inefficient file parsing to quickly get to a usable data structure
do
{
	var n = parseInt(input[idx++], 10);
	if (n <= 0) break;
	var points = input.slice(idx, idx+n).map(getPoint);
	idx += n;

	// brute force nested decrementing loops to find closest pair
	var pair_indexes = null;
	var min_squared_distance = Infinity;

	for (var i=points.length; i-->1;)
	{
		var
			base_point = points[i],
			bx = base_point[0],
			by = base_point[1];

		for (var j=i; j--;)
		{
			var
				compare_point = points[j],
				x = bx - compare_point[0],
				y = by - compare_point[1],
				distance = x*x + y*y;

			if (distance < min_squared_distance) {
				min_squared_distance = distance;
				// pair_indexes = [i, j];
			}
		}
	}

	var closest_distance = Math.sqrt(min_squared_distance);
	process.stdout.write(
		closest_distance >= 10000 ? 'INFINITY' : closest_distance.toFixed(4)
		+ '\n'
	);
}
while(true);

function myParseInt(n)
{
	return parseInt(n, 10);
}

function getPoint(point_str)
{
	return point_str.split(' ').map(myParseInt);
}
