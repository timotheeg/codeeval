var fs = require('fs');

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (!line) return;
	var
		rows = line.split(' | ').map(rowToCells),
		num_rows = rows.length,
		num_cols = rows[0].length,
		max = Math.max,
		res = new Array();

	//console.log(rows[0]);

	for (var col_idx=num_cols; col_idx--; ) {
		var cur_max = rows[0][col_idx];

		for (var row_idx=num_rows; row_idx-- > 1; ) {
			cur_max = max(cur_max, rows[row_idx][col_idx]);
		}

		res[col_idx] = cur_max;
	}

	process.stdout.write(
		res.join(' ')
		+ '\n'
	);
});

function parseInt10(n) {
	return parseInt(n, 10);
}

function rowToCells(row) {
	return row.split(' ').map(parseInt10);
}