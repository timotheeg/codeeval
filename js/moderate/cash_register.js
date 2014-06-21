var fs  = require("fs");

// we work with ints to prevent floating point rounding issues
var denominations = [
['PENNY',           1],
['NICKEL',          5],
['DIME',           10],
['QUARTER',        25],
['HALF DOLLAR',    50],
['ONE',           100],
['TWO',           200],
['FIVE',          500],
['TEN',          1000],
['TWENTY',       2000],
['FIFTY',        5000],
['ONE HUNDRED', 10000]
];

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;
	var args = line.split(';');
	// assumes the prices are always presented with 2 decimal places
	var PP = args[0].indexOf('.') > -1 ? parseInt(args[0].replace('.', '')) : parseInt(args[0], 10) * 100;
	var CH = args[1].indexOf('.') > -1 ? parseInt(args[1].replace('.', '')) : parseInt(args[1], 10) * 100;

	if (PP > CH) process.stdout.write('ERROR\n');
	else if (PP === CH) process.stdout.write('ZERO\n');
	else
	{
		var remainder = CH - PP, change = [];
		for (var ch_idx = denominations.length; ch_idx--; )
		{
			while (remainder >= denominations[ch_idx][1])
			{
				change.push(denominations[ch_idx][0]);
				remainder -= denominations[ch_idx][1];
			}
		}
		process.stdout.write(change.join(',') + '\n');
	}
});