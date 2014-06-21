var fs = require("fs");
function num_sort(a, b) {return parseFloat(a)-parseFloat(b);}
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (line === "") return;

	process.stdout.write(
		line.split(' ').sort(num_sort).join(' ')
		+ "\n"
	);
});