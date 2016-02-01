var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (!line) return;

	var
		tokens =         line.split(' ').map(parseInt10),
		num_iterations = tokens.splice(-2)[1],
		len = tokens.length-1;
		
	iterations:
	while(num_iterations--)
	{
		for (var idx=0; idx<len; idx++)
		{
			if (tokens[idx] > tokens[idx+1]) {
				var tmp = tokens[idx];
				tokens[idx] = tokens[idx+1];
				tokens[idx+1] = tmp;
				continue iterations;
			}
		}

		break;
	}
	
	process.stdout.write( tokens.join(' ') + "\n" );
});

function parseInt10(n)
{
	return parseInt(n, 10);
}