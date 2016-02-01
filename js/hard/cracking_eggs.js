var fs  = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line)
{
	if ("" === line) return;
	var args = line.split(/\s+/).map(myParseInt);
	var eggs = args[0];
	var n = args[1];

	100/2 -> 50

	33 66 100

	33 -> breaks
	1,2,3,4,5,6,7,8,9,10,11,12,13,...,32 ->breaks (win) drops: 33 :/

	10 ok
	20 ok
	30 ok
	40 breaks
	31,32 breaks win!

	1000

	999
	10,20,30,40,50,...1000 (100 drops)
	991,992,993,994,995,996,997,998,999 (9 drops win) 109


	process.stdout.write(results.map(getRes).join(', ') + '\n');
});

function myParseInt(n)
{
	return parseInt(n, 10);
}
