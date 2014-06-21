var fs  = require("fs");

var white_re = /\s+/;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var input = line.split(white_re);
	var res = [];
	var cur, n, cur_idx = 0;

	while(cur_idx<input.length)
	{
		cur = input[cur_idx];
		n=1;
		while(cur === input[++cur_idx]) n++;
		res.push(n);
		res.push(cur);
	}

	process.stdout.write(res.join(' ') + "\n");
});