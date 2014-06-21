var fs  = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var args = line.split(',');
	var str1 = args[0];
	var str2 = args[1];
	var iterations = str1.length;
	var res = false;

	while(iterations-- > 0)
	{
		str1 = str1.substr(1) + str1.charAt(0);
		if (str1 === str2)
		{
			res = true;
			break;
		}
	}

	process.stdout.write(
		(res ? 'True' : 'False')
		+ '\n'
	);
});