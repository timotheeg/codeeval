var fs = require("fs");

var bug_counts = [
	[0, 'Low'],
	[2, 'Medium'],
	[4, 'High'],
	[6, 'Critical']
];

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (!line) return;

	var
		tokens  = line.split(' | '),
		input   = tokens[0],
		desired = tokens[1],
		bugs    = 0,
		severity;

	for (var idx = input.length; idx--;)
	{
		if (input.charAt(idx) !== desired.charAt(idx)) bugs++;
	}

	for (var idx = bug_counts.length; idx--; )
	{
		if (bugs > bug_counts[idx][0]) {
			severity = bug_counts[idx][1];
			break;
		}
	}

	process.stdout.write(
		(severity || 'Done')
		+ "\n"
	);
});