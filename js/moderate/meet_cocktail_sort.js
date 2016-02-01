var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (!line) return;

	var
		tokens =         line.split(' ').map(parseInt10),
		num_iterations = tokens.splice(-2)[1],
		first_idx = 0,
		last_idx = tokens.length-1;
		
	iterations:
	while(num_iterations--)
	{
		if (last_idx < first_idx) break;
		
		for (var idx=first_idx; idx<last_idx; idx++)
		{
			if (tokens[idx] > tokens[idx+1]) {
				var tmp = tokens[idx];
				tokens[idx] = tokens[idx+1];
				tokens[idx+1] = tmp;
			}
		}
		
		for (var idx=last_idx; idx-->first_idx; )
		{
			if (tokens[idx] > tokens[idx+1]) {
				var tmp = tokens[idx];
				tokens[idx] = tokens[idx+1];
				tokens[idx+1] = tmp;
			}
		}
		
		first_idx++;
		last_idx--;
	}
	
	process.stdout.write( tokens.join(' ') + "\n" );
});

function parseInt10(n)
{
	return parseInt(n, 10);
}