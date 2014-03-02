var fs  = require("fs");
var sum = 0;
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line === "") return;

    var val = parseInt(line, 10);
    if (val) sum += val;
});

process.stdout.write(
	sum
	+ "\n"
);
