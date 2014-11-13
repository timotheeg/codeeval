var fs  = require("fs");

function myParseInt(n) {
  return parseInt(n, 10);
}

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;
	
	var
		tokens = line.split(' '),
		iterations = myParseInt(tokens.pop());
		
	tokens.pop(); // remove the '|'
	tokens = tokens.map(myParseInt);
	
	if (iterations > tokens.length) iterations = tokens.length;

	var done = 0, len, tmp;
	while(done < iterations)
	{
		var last = tokens[0];
		for (var idx=1, len=tokens.length-done; idx<len; idx++)
		{
			var cur = tokens[idx];
			if (cur < last)
			{
				tokens[idx]   = last;
				tokens[idx-1] = cur;
			}
			else
			{
				last = cur;
			}
		}
		
		done++;
	}
	
	process.stdout.write(
		tokens.join(' ')
		+ '\n'
	);
});
