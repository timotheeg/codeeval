var fs  = require("fs");
var map = {
	zero: 0,
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9
};

function mapper(word) { return map[word]; }

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;
	process.stdout.write(
		line.split(';').map(mapper).join('')
		+ "\n"
	);
});