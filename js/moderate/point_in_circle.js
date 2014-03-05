var fs  = require("fs");
var args_re = /Center: \(([-.0-9]+), ([-.0-9]+)\); Radius: ([-.0-9]+); Point: \(([-.0-9]+), ([-.0-9]+)\)/
var m;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (!(m = line.match(args_re))) return;

	var dx = parseFloat(m[4]) - parseFloat(m[1]);
	var dy = parseFloat(m[5]) - parseFloat(m[2]);
	var r = parseFloat(m[3]);

	process.stdout.write(
		(dx*dx+dy*dy <= r*r)
		+ '\n'
	);
});