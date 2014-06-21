var fs  = require("fs");

function myParseInt(n){ return parseInt(n, 10); }
var white_re = /\s+/;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var res = 0;
	var map = [];
	var args = line.split(white_re).map(myParseInt);

	for (var idx=args.length; idx--;)
	{
		var n = args[idx];
		(n in map) ? map[n].push(idx+1) : map[n] = [idx+1];
	}

	for (var idx=1; idx<map.length; idx++) {
		if (idx in map && map[idx].length <= 1) {
			res = map[idx][0];
			break;
		}
	}

	process.stdout.write(res + "\n");
});