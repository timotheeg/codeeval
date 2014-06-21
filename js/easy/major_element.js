var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var list = line.split(',');
	var half_len = list.length / 2;
	var map = {};
	var found = 'None';
	for (var idx=list.length; idx--;)
	{
		var n = list[idx];
		if (!(n in map)) map[n] = 0;
		if (++map[n] > half_len) {
			found = n;
			break;
		}
	}

	process.stdout.write(
		found + "\n"
	);
});