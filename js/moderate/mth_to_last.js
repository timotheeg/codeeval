var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;
	var list = line.replace(/^\s+|\s+$/, '').split(/ +/);
	var idx = parseInt(list.pop(), 10);
	if (idx > list.length) return;
	process.stdout.write(list[list.length-idx] + '\n');
});
