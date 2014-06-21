var fs  = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var args = line.split(',');
	var n = parseInt(args[0], 10);
	var base = parseInt(args[1], 10);
	var multiplier = 0;
	var cur;

	while(true) {
		cur = base * ++multiplier;
		if (cur >= n) break;
	}

	process.stdout.write(cur + "\n");
});