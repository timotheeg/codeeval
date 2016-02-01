var fs = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (!line) return;

	var
		even = true,
		sum  = 0;

	for (var idx=0; idx<line.length; idx++)
	{
		if (line[idx] === ' ') continue;

		var val = parseInt(line[idx], 10);
		sum += (even ? val+val : val);
		even = !even;
	}

	process.stdout.write(
		(sum % 10 === 0 ? 'Real' : 'Fake')
		+ "\n"
	);
});