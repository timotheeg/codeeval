var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
    if (line === "") return;

	var args = line.split(/\s+\|\s+/);
	var list1 = args[0].split(' ');
	var list2 = args[1].split(' ');

	for (var idx=list1.length; idx--;)
	{
		list1[idx] = parseInt(list1[idx], 10) * parseInt(list2[idx], 10);
	}

	process.stdout.write(
		list1.join(' ')
		+ "\n"
	);
});