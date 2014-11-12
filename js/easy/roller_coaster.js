var fs  = require("fs");
var lines = [];
var content = fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line) {
	var cnt = 0;
	lines.push(
		line.replace(/[a-z]/gi, function(c) {
			return ( 0 === cnt++ % 2
				? c.toUpperCase()
				: c.toLowerCase()
			);
		})
	);
});

process.stdout.write(lines.join("\n"));