var fs  = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (!line) return;

	var flattened_matrix = line.replace(/\| /g, '').split(' ').map(parseInt10);
	var n = Math.sqrt(flattened_matrix.length);
	var m = new Array(n);

	// read into a rotated form
	for (var idx=0, len = flattened_matrix.length; idx<len; idx++) {
		var col_idx = idx % n;
		(m[col_idx] || (m[col_idx] = [])).push(flattened_matrix[idx]);
	}

	// use native sort
	m.sort(by_col_values);

	// print un-rotated
	var res = [], row;
	for (var col_idx=0; col_idx<n; col_idx++) {
		res.push(row = []);
		for (var row_idx=0; row_idx<n; row_idx++) {
			row.push( m[row_idx][col_idx] );
		}
	}

	process.stdout.write(
		res.map(joinSpaces).join(' | ')
		+ '\n'
	);
});

function joinSpaces(arr) {
	return arr.join(' ');
}

function by_col_values(col_a, col_b) {
	var res;
	for (var idx=0, len = col_a.length; idx<len; idx++) {
		var res = col_a[idx] - col_b[idx];
		if (res === 0) continue;
		return res;
	}
	return 0;
}

function parseInt10(n) {
	return parseInt(n, 10);
}