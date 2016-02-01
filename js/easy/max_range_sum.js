var
	fs = require('fs'),
	max = Math.max;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (!line) return;

	var tokens = line.split(';');
	var days = parseInt10(tokens[0]);
	var pnls = tokens[1].split(' ').map(parseInt10);
	var last_pnl = 0, max_pnl;

	// find sum for first window
	for (var idx=days; idx--; ) {
		last_pnl += pnls[idx];
	}

	max_pnl = last_pnl;

	// now iterate through all remaining windowswindows
	for (var idx=0, max_idx=pnls.length-days; idx<max_idx; idx++) {
		last_pnl = last_pnl - pnls[idx] + pnls[idx+days];
		max_pnl = max(last_pnl, max_pnl);
	}

	process.stdout.write(
		(max_pnl > 0 ? max_pnl : 0)
		+ '\n'
	);
});

function parseInt10(n) {
	return parseInt(n, 10);
}

function sum(prev, current) {
	return prev + current;
}
