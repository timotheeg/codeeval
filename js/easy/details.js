var fs  = require("fs");
var dots_re = /X(\.+)Y/;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (line === '') return;

	var min = Infinity;

	var rows = line.split(',');
	for (idx = rows.length; idx--; ) {
		var m = rows[idx].match(dots_re);
		if (!m) {
			min = 0;
			break;
		}
		min = Math.min(min, m[1].length);
	}

	process.stdout.write(min + '\n');
});

