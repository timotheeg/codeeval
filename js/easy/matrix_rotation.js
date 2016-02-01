var fs  = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (line === "") return;

	var
		cells = line.split(/\s+/),
		size = Math.sqrt(cells.length),
		rotated = new Array(cells.length);

	for (var idx=cells.length; idx--;) {
		var
			src_row_idx = Math.floor(idx / size),
			src_col_idx = idx % size,
			target_row_idx = src_col_idx,
			target_col_idx = size - src_row_idx - 1,
			target_flattened_idx = target_row_idx * size + target_col_idx;

		rotated[target_flattened_idx] = cells[idx];
	}

	process.stdout.write(
		rotated.join(' ')
		+ "\n"
	);
});