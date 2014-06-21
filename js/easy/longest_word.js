var fs  = require("fs");

var white_re = /\s+/;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var longest = '';

	line.split(white_re).forEach(function(word)
	{
		if (word.length > longest.length) longest = word;
	});

	process.stdout.write(longest + "\n");
});