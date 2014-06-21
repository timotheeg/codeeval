var fs  = require("fs");

function myParseInt(n){ return parseInt(n, 10); }

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var args = line.split(';');
	var list1 = args[0].split(',').map(myParseInt);
	var list2 = args[1].split(',').map(myParseInt);

	var idx1=0, idx2=0;
	var res = [];

	while(idx1<list1.length && idx2<list2.length)
	{
		if (list1[idx1] === list2[idx2])
		{
			res.push(list1[idx1]); idx1++; idx2++;
		}
		else if (list1[idx1] < list2[idx2])
		{
			idx1++;
		}
		else if (list1[idx1] > list2[idx2])
		{
			idx2++;
		}
	}

	process.stdout.write(res.join(',') + "\n");
});