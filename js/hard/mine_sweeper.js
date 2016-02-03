var re = /^(\d+),(\d+);(.+)$/

require("fs")
	.readFileSync(process.argv[2])
	.toString()
	.split('\n')
	.forEach(function(line)
	{
		if (!line) return;
			 
		var m = line.match(re);
		var rows = parseInt(m[1], 10);
		var cols = parseInt(m[2], 10);
		var content = m[3];
		var matrix = new Array(rows);
		var idx = 0
		
		// create the matrix
		for (var rdx=0; rdx<rows; rdx++)
		{
			matrix[rdx] = new Array(cols);
			for (var cdx=0; cdx<cols; cdx++)
			{
				matrix[rdx][cdx] = content.charAt(idx++);
			}
		}
		
		// fill the cells
		for (var rdx=rows; rdx--; )
		{
			for (var cdx=cols; cdx--; )
			{
				if (matrix[rdx][cdx] === '*') continue;
			 
				// check adjacent cells
				var num_mines = 0;
				if (matrix[rdx-1])
				{
					if (matrix[rdx-1][cdx-1] == '*') num_mines++;
					if (matrix[rdx-1][cdx  ] == '*') num_mines++;
					if (matrix[rdx-1][cdx+1] == '*') num_mines++;
				}
				
				if (matrix[rdx  ][cdx-1] == '*') num_mines++;
				if (matrix[rdx  ][cdx+1] == '*') num_mines++;
			 
				if (matrix[rdx+1])
				{
					if (matrix[rdx+1][cdx-1] == '*') num_mines++;
					if (matrix[rdx+1][cdx  ] == '*') num_mines++;
					if (matrix[rdx+1][cdx+1] == '*') num_mines++;
				}
				
				matrix[rdx][cdx] = num_mines;
			}
		}
		
		process.stdout.write(matrix.map(rowJoin).join('') + '\n');
	});
	
function rowJoin(row) {
	return row.join('');
}