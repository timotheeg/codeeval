var fs  = require("fs");

function Board(size) {
	this.size = size;
	var m = this.m = [];
	for (var idx=size; idx--;) m[idx] = [];
}

var b = Board.prototype;

b.SetRow = function(i, val) {
	var row = this.m[i];
	for (var idx=this.size; idx--; ) row[idx] = val;
};

b.SetCol = function(j, val) {
	for (var idx=this.size; idx--; ) this.m[idx][j] = val;
};

b.QueryRow = function(i) {
	var sum = 0, row = this.m[i];
	for (var idx=this.size; idx--; ) sum += (row[idx] || 0);
	process.stdout.write(sum + "\n");
};

b.QueryCol = function(j) {
	var sum = 0;
	for (var idx=this.size; idx--; ) sum += (this.m[idx][j] || 0);
	process.stdout.write(sum + "\n");
};

var board = new Board(256);

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;
	var args = line.split(/\s+/);
	board[args[0]](parseInt(args[1], 10), parseInt(args[2], 10));
});

