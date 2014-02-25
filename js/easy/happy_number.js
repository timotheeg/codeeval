var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
    if (line === "") return;

	var seen = {};
    var res = parseInt(line, 10);
    var reducer = function(previousValue, currentValue)
	{
		return previousValue + Math.pow(parseInt(currentValue, 10), 2);
	};

	while(res != 1) {
		seen[res] = true;
		res = (res + "").split('').reduce(reducer, 0);
		if (seen[res]) break;
	}

	process.stdout.write((res === 1 ? 1 : 0) + '\n');
});