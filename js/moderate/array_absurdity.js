var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var arr = line.split(';')[1].split(',');
	var map = {};

	for (var idx=arr.length; idx--;)
	{
		var entry = arr[idx];
		if (map[entry]) return process.stdout.write(entry + '\n');
		map[entry] = 1;
	}
});