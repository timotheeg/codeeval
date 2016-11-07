var
	fs  = require("fs"),
	mps = [
		3,
		7,
		31,
		127,
		2047
	];

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === '') return;

	var idx, max = parseInt(line, 10);

	for (idx = mps.length; idx--; )
	{
		if (mps[idx] < max) break;
	}

	process.stdout.write(
		(idx >= 4 ? mps : mps.slice(0, idx + 1)).join(', ')
		+ '\n'
	);
});
