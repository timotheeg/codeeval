var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
    if (line === "") return;

	var words = line.split(/\s+/);
	words.reverse();

	var words = [];
	var nums = [];
	var num_re = /^\d+$/;

	for (var idx=0; idx<tokens.length; idx++)
	{
		var token = tokens[idx];
		if (num_re.test(token)) nums.push(token);
		else words.push(token);
	}

	if (words.length)
	{
		process.stdout.write(words.join(','));
		if (nums.length) process.stdout.write('|');
	}
 
	if (nums.length) process.stdout.write(nums.join(','));

	process.stdout.write('\n');
});