var fs  = require("fs");
var building_re = /\((\d+),(\d+),(\d+)\);?/g;

var lines = fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line)
{
	if (line === "") return;

	var skyline = [], m, i, len, start_idx = Infinity;

	while(m = building_re.exec(line))
	{
		var l = parseInt(m[1], 10);
		var h = parseInt(m[2], 10);
		var r = parseInt(m[3], 10);

		if (l < start_idx) start_idx = l;

		// each index in skyline represents the skyline range idx-to-idx-plus-one
		for (i=l; i<r; i++)
		{
			if (!skyline[i] || h > skyline[i]) skyline[i] = h;
		}
	}

	var res = [], last_h = -1;

	for (i=start_idx, len=skyline.length; i<=len; i++) {
		var h = skyline[i];
		if (h !== last_h) {
			res.push(i);
			res.push(h || 0);
			last_h = h;
		}
	}

	process.stdout.write(res.join(' ') + '\n');
});
