var fs  = require("fs");

// we work with ints to prevent floating point rounding issues
var coin_vals = [1, 3, 5];

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;
	var remainder = parseInt(line, 10), coins = [];
	for (var coin_idx=coin_vals.length; coin_idx--;)
	{
		while (remainder >= coin_vals[coin_idx])
		{
			coins.push(coin_vals[coin_idx]);
			remainder -= coin_vals[coin_idx];
		}
	}

	process.stdout.write(coins.length + '\n');
});