var fs  = require("fs");
function parseInt10(n){ return parseInt(n, 10); }

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;
	var row_num = parseInt10(line);

	var triangle = [[1]], prev_row = triangle[0];

	for (var row_idx=1; row_idx<row_num; row_idx++) {
		var row = [];
		triangle.push(row);
		for (var i=0; i<=prev_row.length; i++) {
			row[i] = (prev_row[i-1] || 0) + (prev_row[i] || 0);
		}

		prev_row = row;
	}

	process.stdout.write(triangle.map(function(a){return a.join(' ')}).join(' ') + '\n');
});
