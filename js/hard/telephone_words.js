var fs  = require("fs");

var map = [
	['0'],
	['1'],
	['a','b','c'],
	['d','e','f'],
	['g','h','i'],
	['j','k','l'],
	['m','n','o'],
	['p','q','r','s'],
	['t','u','v'],
	['w','x','y','z']
];

var lines = fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line)
{
	if (line === "") return;
	process.stdout.write(getWords(line) + '\n');
});

function getWords(digits)
{
	if (digits.length === 1) return map[digits.charAt(0)].concat();
	var ls = map[digits.charAt(0)];
	var ws = getWords(digits.substr(1));
	var rs = [];

	for (var l_idx=ls.length; l_idx--; )
	{
		var l = ls[l_idx];
		for(var w_idx=ws.length; w_idx--; )
		{
			rs.unshift(l + ws[w_idx]);
		}
	}

	return rs;
}
