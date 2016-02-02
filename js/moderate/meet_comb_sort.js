var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (!line) return;

	var
		tokens = line.split(' ').map(parseInt10),
		factor = 1.25,
		gap = tokens.length,
		has_changed = true,
		iterations = -1,
		len = tokens.length;

	do
	{
		iterations++;

		gap = Math.floor(gap / factor);
		if (gap < 1) gap = 1;

		has_changed = false;

		for (var idx=0; idx<len-gap; idx++)
		{
			if (tokens[idx] > tokens[idx+gap])
			{
				has_changed = true;
				var tmp = tokens[idx];
				tokens[idx] = tokens[idx+gap];
				tokens[idx+gap] = tmp;
			}
		}

	}
	while(has_changed || gap > 1)

	process.stdout.write( iterations + "\n" );
});

function parseInt10(n)
{
	return parseInt(n, 10);
}