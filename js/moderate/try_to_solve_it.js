var fs = require("fs");
var map = 'uvwxyznopqrstghijklmabcdef'.split('');
var offset = 'a'.charCodeAt(0);

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (!line) return;

	var res = '';

	for (var idx=0, len=line.length; idx<len; idx++)
	{
		res += map[line.charCodeAt(idx) - offset];
	}

	process.stdout.write(
		res
		+ "\n"
	);
});