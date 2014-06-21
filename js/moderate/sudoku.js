var fs  = require("fs");
function parseInt10(n){ return parseInt(n, 10); }

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;
	var args = line.split(';');
	var size = parseInt10(args[0]);
	var entries = args[1].split(',').map(parseInt10);

	// make the entries into an actual 2-dimensional array
	var row_idx = -1, col_idx=0, matrix=[];

	for (var entry_idx=0; entry_idx<entries.length; entry_idx++) {
		if (0 === col_idx % size) {
			col_idx = 0;
			matrix.push([]);
			row_idx++;
		}
		matrix[row_idx][col_idx++] = entries[entry_idx];
	}

	var res;

	if (9 === size) {
		res = checkRowsCols(matrix)
			&& validGrid(matrix, 0, 0, 3)
			&& validGrid(matrix, 0, 3, 3)
			&& validGrid(matrix, 0, 6, 3)
			&& validGrid(matrix, 3, 0, 3)
			&& validGrid(matrix, 3, 3, 3)
			&& validGrid(matrix, 3, 6, 3)
			&& validGrid(matrix, 6, 0, 3)
			&& validGrid(matrix, 6, 3, 3)
			&& validGrid(matrix, 6, 6, 3);
	}
	else {
		// size=4
		res = checkRowsCols(matrix)
			&& validGrid(matrix, 0, 0, 2)
			&& validGrid(matrix, 0, 2, 2)
			&& validGrid(matrix, 2, 0, 2)
			&& validGrid(matrix, 2, 2, 2);
	}

	process.stdout.write((res ? 'True' : 'False') + '\n');
});

function checkRowsCols(matrix) {
	// one full pass through the matrix to validate both row and column integrity

	var x, y, cols_res = [];

	// preparing cols
	for(x=matrix.length; x--;) {
		cols_res.push([]);
	}

	for(x=matrix.length; x--;) {
		var row = matrix[x];
		var row_res = [];

		for (y=row.length; y--;) {
			cols_res[y][ row[y] ] = row_res[ row[y] ] = 1;
		}

		// validate row
		for (y=row.length; y > 0; y--) {
			if (!row_res[y]) return false;
		}
	}

	// validate columns
	for(y=cols_res.length; y--;) {
		var col = cols_res[y];
		for (x=col.length-1; x > 0; x--) {
			if (!col[x]) return false;
		}
	}

	return true;
}

function validGrid(matrix, x0, y0, size) {
	var entries = [], xsize=x0+size, ysize=y0+size;

	for (var x=x0; x<xsize; x++) {
		for (var y=y0; y<ysize; y++) {
			entries[matrix[x][y]] = 1;
		}
	}

	for (var i=size*size; i > 0; i--) {
		if (!entries[i]) return false;
	}

	return true;
}


