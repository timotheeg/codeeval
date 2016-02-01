var fs = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (!line) return;

	var
		tokens = line.split(' | '),
		num = parseInt(tokens[1], 10),
		names = tokens[0].split(' ');

	while(names.length > 1) {
		names.splice((num-1) % names.length, 1);
	}

	process.stdout.write(
		names[0]
		+ "\n"
	);
});