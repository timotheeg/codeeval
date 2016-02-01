var fs  = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var
		tokens = line.split(' '),
		num_zeros = parseInt(tokens[0], 10),
		num = parseInt(tokens[1], 10),
		ans = 0;

	for (; num; num--)
	{
		var bin = num.toString(2);
		for (var idx=bin.length, n=0; idx--; )
		{
			if (bin.charAt(idx) === '0') n++;
		}
		if (n === num_zeros) ans++;
	}

	process.stdout.write(
		ans
		+ "\n"
	);
});