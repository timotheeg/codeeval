var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line === "") return;

	var args = line.split(',').map(function(s){ return parseInt(s, 10); });
	var num = args[0];
	var idx1 = args[1]-1;
	var idx2 = args[2]-1;

	process.stdout.write(
		(((num >> idx1) & 1) === ((num >> idx2) & 1))
		+ "\n"
	);
});