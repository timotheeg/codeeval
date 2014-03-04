var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	process.stdout.write(
		line.replace(/[a-zA-Z]/g, replacer)
		+ '\n'
	);
});

function replacer(a)
{
	var c = a.charCodeAt(0);
	if (c >= 97 && c <= 122) return a.toUpperCase();
	else return a.toLowerCase();
}