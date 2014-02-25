var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line === "") return;

	var digits = line.split('');
	var sum = digits.reduce(function(a, b) { return (parseInt(a, 10)||0) + (parseInt(b, 10)||0); });
	process.stdout.write(sum + "\n");
});