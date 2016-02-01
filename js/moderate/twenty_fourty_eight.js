var fs  = require("fs");


fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (!line) return;

	var
		tokens = line.split('; '),
		dir = tokens.shift(),
		size = parseInt10(tokens.shift()),
		rows = tokens[0].split('|').map(rowToCells);

	// console.log(line);

	// very ineffient way of computing, also looses index movement, but don't care in this
	// exercise since there's no animation
	if (dir == 'RIGHT')
	{
		for (var row_idx=size; row_idx--; )
		{
			// remove empty cells
			for (var col_idx=0; col_idx<size; col_idx++)
			{
				if (!rows[row_idx][col_idx]) moveRight(rows, size, col_idx, row_idx);
			}

			// merge cells
			for (var col_idx=size; col_idx-->1; )
			{
				if (rows[row_idx][col_idx] == rows[row_idx][col_idx-1]) {
					rows[row_idx][col_idx] *= 2;
					moveRight(rows, size, col_idx-1, row_idx);
				}
			}
		}
	}
	else if (dir == 'LEFT')
	{
		for (var row_idx=size; row_idx--; )
		{
			// remove empty cells
			for (var col_idx=size; col_idx--; )
			{
				if (!rows[row_idx][col_idx]) moveLeft(rows, size, col_idx, row_idx);
			}

			// merge cells
			for (var col_idx=0; col_idx<size-1; col_idx++)
			{
				if (rows[row_idx][col_idx] == rows[row_idx][col_idx+1]) {
					rows[row_idx][col_idx] *= 2;
					moveLeft(rows, size, col_idx+1, row_idx);
				}
			}
		}	}
	else if (dir == 'UP')
	{
		for (var col_idx=size; col_idx--; )
		{
			// remove empty cells
			for (var row_idx=size; row_idx--; )
			{
				if (!rows[row_idx][col_idx]) moveUp(rows, size, col_idx, row_idx);
			}

			// merge cells
			for (var row_idx=0; row_idx<size-1; row_idx++)
			{
				if (rows[row_idx][col_idx] == rows[row_idx+1][col_idx]) {
					rows[row_idx][col_idx] *= 2;
					moveUp(rows, size, col_idx, row_idx+1);
				}
			}
		}
	}
	else // DOWN
	{
		for (var col_idx=size; col_idx--; )
		{
			// remove empty cells
			for (var row_idx=0; row_idx<size; row_idx++)
			{
				if (!rows[row_idx][col_idx]) moveDown(rows, size, col_idx, row_idx);
			}

			// merge cells
			for (var row_idx=size; row_idx-->1; )
			{
				if (rows[row_idx][col_idx] == rows[row_idx-1][col_idx]) {
					rows[row_idx][col_idx] *= 2;
					moveDown(rows, size, col_idx, row_idx-1);
				}
			}
		}
	}

	process.stdout.write(
		rows.map(function(row){ return row.join(' '); }).join('|')
		+ '\n'
	);
});

function parseInt10(n) {
	return parseInt(n, 10);
}

function rowToCells(row) {
	return row.split(' ').map(parseInt10);
}

function moveLeft(table, size, col_idx, row_idx) {
	for (var idx=col_idx; idx<size-1; idx++) {
		table[row_idx][idx] = table[row_idx][idx+1];
	}
	table[row_idx][size-1] = 0;
}

function moveRight(table, size, col_idx, row_idx) {
	for (var idx=col_idx+1; idx-->1; ) {
		table[row_idx][idx] = table[row_idx][idx-1];
	}
	table[row_idx][0] = 0;
}

function moveUp(table, size, col_idx, row_idx) {
	for (var idx=row_idx; idx<size-1; idx++) {
		table[idx][col_idx] = table[idx+1][col_idx];
	}
	table[size-1][col_idx] = 0;
}

function moveDown(table, size, col_idx, row_idx) {
	for (var idx=row_idx+1; idx-->1; ) {
		table[idx][col_idx] = table[idx-1][col_idx];
	}
	table[0][col_idx] = 0;
}

