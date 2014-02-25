var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
    if (line === "") return;

	var words = line.split(/\s+/);
	words.reverse();
	process.stdout.write(words.join(' ') + '\n');
});