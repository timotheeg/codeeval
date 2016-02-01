var fs  = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (!line) return;

	encoded = line.slice(0, -1); // remove the trailing '|'

	process.stdout.write(
		de_bwt(encoded.split(''), '$')
		+ '\n'
	);
});

function de_bwt(last_column, last_char) {
	var res = last_column.concat();

	while(res[0].length < last_column.length) {
		res.sort();
		for (var idx = last_column.length; idx--; ) res[idx] = last_column[idx] + res[idx];
	}

	for (var idx=last_column.length; idx--; ) {
		if (last_column[idx] == last_char) return res[idx].slice(1) + last_char;
	}

	throw "bad input";
}
