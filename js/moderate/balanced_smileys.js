var fs  = require("fs");
var no_care_re = /[a-z :]/i;
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var stack = [];
	for (var idx=0, len=line.length; idx<len; idx++)
	{
		var c = line.charAt(idx);
		if (c === '(') 
		{
			stack.push(c);
		}
		else if (c === ':') {
			
		}
		else if (no_care_re.test(c))
	}

	process.stdout.write(list.join(',') + '\n');
});

