var fs  = require("fs");

var cycles = [
	null,
	null,
	[2,4,8,6], //2
	[3,9,7,1], //3
	[4,6], //4
	[5], //5
	[6], //6
	[7,9,3,1], //7
	[8,4,2,6], //8
	[9,1], //9
];

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line)
{
	if ("" === line) return;
	var args = line.split(/\s+/).map(myParseInt);
	var base = args[0];
	var power = args[1];

	var results = [0,0,0,0,0,0,0,0,0,0];

	// how many full cycles were done
	var cycle = cycles[base];
	var full_cycles = Math.floor(power / cycle.length);
	var leftovers = power % cycle.length;

	// first we set the full cycles
	for (var idx in cycle) {
		var digit = cycle[idx];
		results[digit] = full_cycles;
	}
	for (var idx=0; idx<leftovers; idx++) {
		var digit = cycle[idx];
		results[digit]++;
	}

	process.stdout.write(results.map(getRes).join(', ') + '\n');
});

function myParseInt(n)
{
	return parseInt(n, 10);
}

function getRes(n, idx)
{
	return idx + ': ' + n; 
}
