var fs  = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;
	var args = line.split(/\s+/);
	process.stdout.write(
		args[args.length-2]
		+ "\n"
	);
});