var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var num_str = line;
	var num = parseInt(line, 10);
	var arm_sum = line
		.split('')
		.reduce(function(prev, cur)
		{
			return prev + Math.pow(parseInt(cur, 10), num_str.length);
		}, 0);

	process.stdout.write(
		(arm_sum === num ? 'True' : 'False') + "\n"
	);
});