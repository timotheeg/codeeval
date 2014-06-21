var fs  = require("fs");

var input_re = /^\s*\((-?\d+),\s*(-?\d+)\)\s*\((-?\d+),\s*(-?\d+)\)\s*$/
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line === "") return;

    var m = line.match(input_re);
    var dx = parseInt(m[1], 10) - parseInt(m[3], 10);
    var dy = parseInt(m[2], 10) - parseInt(m[4], 10);

    process.stdout.write(
		Math.round(Math.sqrt(dx*dx + dy*dy))
		+ "\n"
	);
});