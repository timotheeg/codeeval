var fs  = require("fs");

var specs_re = /^(\d+)\s+(\d+)$/

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var m = line.match(specs_re);
	var doors = new Array(parseInt(m[1], 10));
	var iterations = parseInt(m[2], 10);
	var len = doors.length;

	// brute force implementation (no smarts, just making a agent opening/closing doors per specs :p)
	while(--iterations) {
		for (var idx=1; idx<len; idx+=2) {
			doors[idx] = !doors[idx];
		}
		for (var idx=2; idx<len; idx+=3) {
			doors[idx] = !doors[idx];
		}
	}

	// last pass changes the last door state
	doors[doors.length-1] = !doors[doors.length-1];

	var unlocked = 0;
	for (var idx=doors.length; idx--;) {
		if (!doors[idx]) unlocked++;
	}

	process.stdout.write(unlocked + '\n');
});