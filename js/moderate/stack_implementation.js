var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var stack = line.split(' '); // implies all pushed in one go, yay!
	var need_space = false;

	while (stack.length)
	{
		process.stdout.write((need_space ? ' ' : '') + stack.pop());
		need_space = true;
		stack.pop();
	}

	process.stdout.write("\n");
});