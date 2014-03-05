var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var idx, stack = [];

	loop:
	for (idx=0; idx<line.length; idx++)
	{
		switch(c = line.charAt(idx))
		{
			case '}':
				if (stack[0] !== '{') break loop;
				stack.shift();
				break;
			case ']':
				if (stack[0] !== '[') break loop;
				stack.shift();
				break;
			case ')':
				if (stack[0] !== '(') break loop;
				stack.shift();
				break;
			default:
				stack.unshift(c);
		}
	}

	process.stdout.write(
		(idx >= line.length && stack.length <= 0 ? 'True' : 'False')
		+ '\n'
	);
});