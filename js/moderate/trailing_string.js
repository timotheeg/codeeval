var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var args = line.split(',');
	var end = args[0].substr(-args[1].length);

	process.stdout.write(
		(end === args[1] ? 1 : 0)
		+ '\n'
	);
});