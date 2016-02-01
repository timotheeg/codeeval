var
	fs = require('fs'),
	arrows = {
		'>': '>>-->',
		'<': '<--<<'
	};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (!line) return;

	var num_arrow = 0;

	for (var idx=line.length-4; idx--; ) {
		var arrow = arrows[ line.charAt(idx) ];
		if (!arrow) continue;
		if (line.substr(idx, 5) == arrow) num_arrow++;
	}

	process.stdout.write(
		num_arrow
		+ '\n'
	);
});