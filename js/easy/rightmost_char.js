var fs  = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;
	var args = line.split(',');
	process.stdout.write(
		args[0].lastIndexOf(args[1])
		+ "\n"
	);
});