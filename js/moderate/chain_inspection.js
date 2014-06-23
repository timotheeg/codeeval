var fs  = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var chain = {};
	var hasBegin = false;
	var hasEnd   = false;

	// not sure if we really need to store both start and end in the tokens... oh well...
	line.split(';').forEach(function(token)
	{
		var parts = token.split('-');
		var token = chain[parts[0]] = parts[1];
		if (parts[0] === 'BEGIN') hasBegin = true;
		if (parts[1] === 'END')   hasEnd   = true;
	});

	var good = false;

	if (hasBegin && hasEnd)
	{
		good = true;

		var key = 'BEGIN', next;
		while(next = chain[key])
		{
			delete chain[key];
			key = next;
		}

		if (key == 'END')
		{
			for (var k in chain)
			{
				good = false;
				break;
			}
		}
		else
		{
			good = false;
		}
	}

	process.stdout.write(
		(good? 'GOOD' : 'BAD')
		+ '\n'
	);
});