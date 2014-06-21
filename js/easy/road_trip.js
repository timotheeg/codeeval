var fs  = require("fs");
function num_sorter(a,b){ return a-b; }

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var distances = [];
	var re = /(\d+);/g, m;
	while(m = re.exec(line)) distances.push( parseInt(m[1], 10) );
	distances.sort(num_sorter);

	for (var idx=distances.length; idx-- > 1; ) {
		distances[idx] -= distances[idx-1];
	}

	process.stdout.write(distances.toString() + "\n");
});