var fs  = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var digits = line.replace(/\s+/g, '').split('').reverse(); // being lazy here :p
	var len = digits.length, sum = 0;

	for (var idx=0; idx<len; idx++) {
		var n = parseInt(digits[idx], 10);
		if (1 === idx % 2) {
			n *= 2;
			if (n > 9) n -= 9; // adding the 2 digits of n, which ten-something, so: n - 10 + 1
		}
		sum += n;
	}

	process.stdout.write((0 === sum % 10 ? 1 : 0) + '\n');
});