var fs  = require("fs");
function parseInt10(n) { return parseInt(n, 10); }
var lines = fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line)
{
	if (line === "") return;
	var args = line.split(';');
	var n = parseInt(args[0], 10);
	var m = parseInt(args[1], 10);
	var ts = args[2].split(' ');
	var matrix = [];

	for (var i=0; i<ts.length; i++) {
		if (0 === i%m) {
			var row = [];
			matrix.push(row);
		}
		row.push(ts[i]);
	}

	var res = [];

	while(matrix.length) {
		printFirstRow    (matrix, res);
		printLastColumn  (matrix, res);
		printLastRow     (matrix, res);
		printFirstColumn (matrix, res);
	}

	process.stdout.write(res.join(' ') + '\n');
});

function printFirstRow(matrix, res) {
	if (matrix.length <= 0) return;
	res.push.apply(res, matrix.shift());
}

function printLastRow(matrix, res) {
	if (matrix.length <= 0) return;
	res.push.apply(res, matrix.pop().reverse());
}

function printLastColumn(matrix, res) {
	if (matrix.length <= 0) return;
	var n = matrix.length;
	for (var i=0; i<n; i++) {
		var row = matrix[i];
		res.push(row.pop());
	}
}

function printFirstColumn(matrix, res) {
	if (matrix.length <= 0) return;
	var n = matrix.length;
	for (var i=n; i--; ) {
		var row = matrix[i];
		res.push(row.shift());
	}
}
