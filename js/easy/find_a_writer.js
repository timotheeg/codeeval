var fs  = require("fs");

function make_idx(n){return parseInt(n, 10) - 1;}
var trim_re = /^\s+|\s+$/g;
var white_re = /\s+/;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var args = line.split('|');
	var charset = args[0];
	var keys = args[1].replace(trim_re, '').split(white_re).map(make_idx);

	var res = "";
	for (var idx=0, len=keys.length; idx<len; idx++)
	{
		res += charset.charAt(keys[idx]);
	}

	process.stdout.write(res + "\n");
});