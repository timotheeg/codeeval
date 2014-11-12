var fs  = require("fs");

var roman_map = {
	I: 1,
	V: 5,
	X: 10,
	L: 50,
	C: 100,
	D: 500,
	M: 1000
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var last_base = Infinity;
	var last_val = 0;
	var res = 0;

	for (var idx=0; idx<line.length; idx++) {
		var num = parseInt(line.charAt(idx++), 10);
		var base = roman_map[line.charAt(idx)];
		var val = num * base;

		if (base > last_base) {
			res -= (last_val);
		}
		else {
			res += (last_val);
		}

		last_base = base;
		last_val  = val;
	}

	res += last_val;

	process.stdout.write(res + '\n');
});