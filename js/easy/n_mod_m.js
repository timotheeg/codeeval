var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line === "") return;

    var args = line.split(',');
    var n = parseInt(args[0], 10);
    var m = parseInt(args[1], 10);

    while(n>=m) n-=m;

	process.stdout.write(
		n + "\n"
	);
});