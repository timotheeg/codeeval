var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;
	var args = line.split(/\s+:\s+/);
	var list = args[0].split(/\s+/);
	var swaps = args[1].split(/,\s+/)

	for (var idx=0; idx<=swaps.length-1; idx++) {
		var indexes = swaps[idx].split('-');
		var from = parseInt(indexes[0], 10);
		var to = parseInt(indexes[1], 10);
		var temp = list[to];
		list[to] = list[from];
		list[from] = temp;
	}

	process.stdout.write(
		list.join(' ')
		+ '\n'
	);
});