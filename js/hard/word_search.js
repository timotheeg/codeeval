var grid = [
'ABCE'.split(''),
'SFCS'.split(''),
'ADEE'.split('')
];

var
	index = charGridToObjGrid(grid),
	run = 0;

require("fs").readFileSync(process.argv[2]).toString().split('\n').forEach(function(line)
{
	if (!line) return;

	run++;

	var start_letter = line.charAt(0);
	var start_obj = index[start_letter];
	var found = false;

	if (start_obj) {
		for(var idx=index[start_letter].length; idx--; ) {
			if (traverse(start_obj, line.substr(1))) {
				found = true;
				break;
			}
		}
	}

	process.stdout.write(
		(found ? 'True' : 'False')
		+ '\n'
	);
});

function myParseInt(n) {
	return parseInt(n, 10);
}

function traverse() {

}

function charGridToObjGrid(grid, size) {
	var map = {};

	for (var row_idx=size; row_idx--; ) {
		for (var col_idx=size; col_idx--; ) {
			var c = grid[row_idx][col_idx];
			var obj = {
				c: c,
				row: row_idx,
				col: col_idx,
				seen: 0
			};
			grid[row_idx][col_idx] = obj;
			if (!map[c]) map[c] = [obj];
			else map[c].push(obj);
		}
	}

	return map;
}