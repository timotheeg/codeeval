var fs  = require("fs");
var max_axis = 8;
var ascii_before_a = 'a'.charCodeAt(0) - 1;
var moves = [ // ordered to produce a alphabetical final result
	{dx: -2, dy: -1},
	{dx: -2, dy:  1},
	{dx: -1, dy: -2},
	{dx: -1, dy:  2},
	{dx:  1, dy: -2},
	{dx:  1, dy:  2},
	{dx:  2, dy: -1},
	{dx:  2, dy:  1}
];

function Cell(x, y) {
	this.x = x;
	this.y = y;
}

Cell.prototype.toString = function() {
	return String.fromCharCode(this.x + ascii_before_a) + (this.y);
};

Cell.prototype.moveTo = function(dx, dy) {
	return new Cell(this.x + dx, this.y + dy);
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (line === "") return;

	var initial_cell = new Cell(
		line.charCodeAt(0) - ascii_before_a,
		parseInt(line.charAt(1), 10)
	);

	var targets = [];
	moves.forEach(function(move) {
		var target = initial_cell.moveTo(move.dx, move.dy);

		if (target.x <= 0 || target.x > max_axis) return;
		if (target.y <= 0 || target.y > max_axis) return;

		targets.push(target);
	});

	process.stdout.write(targets.join(" ") + "\n");
});

