var fs  = require("fs");

var memory = {};
var sqrt = Math.sqrt;
var first_line = true;
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;
	if (first_line) {
		first_line = false;
		return;
	}

	var pairs = [];
	var num = parseInt(line, 10);
	var cur = Math.floor(sqrt(num)) + 1;
	var lower = -1;

	while(cur--) {
		if (cur <= lower) break;
		var remainder = num - (cur * cur);
		var potential = sqrt(remainder);
		if (potential % 1) continue;
		pairs.push([cur, lower = potential]);
	}

	process.stdout.write(pairs.length + '\n');
});