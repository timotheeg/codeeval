var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	process.stdout.write(countWays(line, 0) + '\n');
});

function countWays(str, from_idx)
{
	if (str.length - from_idx <= 1) return 1;

	var n1 = parseInt(str.substr(from_idx, 1), 10);
	var n2 = parseInt(str.substr(from_idx, 2), 10);

	if (n1 > 2 || n2 > 26)
	{
		return countWays(str, from_idx+1);
	}
	else
	{
		return countWays(str, from_idx+1) + countWays(str, from_idx+2);
	}
}