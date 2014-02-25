var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line === "") return;

	process.stdout.write(
		line.replace(/\b([a-z])/g, function(m) { return m.toUpperCase(); })
		+ "\n"
	);
});