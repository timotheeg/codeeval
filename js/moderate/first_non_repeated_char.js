var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var map = {};

	for (var idx=line.length; idx--;)
	{
		var c = line.charAt(idx);
		if (map[c]) map[c]++;
		else map[c] = 1;
	}

	for (var idx=0; idx<line.length; idx++)
	{
		var c = line.charAt(idx);
		if (map[c] <= 1) return process.stdout.write(c + '\n');
	}
});