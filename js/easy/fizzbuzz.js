var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (line === "") return;

	var args = line.split(' ').map(function(n) { return parseInt(n, 10); });
	var f   = args[0];
	var b   = args[1];
	var max = args[2];
	var fb  = f*b;
	var res = '';

	for (var num=1; num<=max; num++) {
		if (num % fb === 0)     res += 'FB';
		else if (num % f === 0) res += 'F';
		else if (num % b === 0) res += 'B';
		else res += num + '';

		if (num<max) res += ' ';
	}

	process.stdout.write(res + '\n');
});
