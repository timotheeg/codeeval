// the solution assumes the input is already valid :)

var fs  = require("fs");
function parseInt10(n){ return parseInt(n, 10); }
var inputs = [];

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;
	inputs.push( line.split(/\s+/).map(parseInt10) );
});

for (var row_idx = inputs.length; row_idx-- > 1; ) {
	var row = inputs[row_idx];
	var prev_row = inputs[row_idx-1];
	for (var col_idx = row.length-1; col_idx--; ) {
		prev_row[col_idx] += Math.max(row[col_idx], row[col_idx+1]);
	}
}

process.stdout.write(inputs[0][0] + '\n');