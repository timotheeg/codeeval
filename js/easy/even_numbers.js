var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line === "") return;

	var num = parseInt(line, 10);
	process.stdout.write(
		(num%2 === 0 ? 1 : 0)
		+ "\n"
	);
});