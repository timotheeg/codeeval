var fs  = require("fs");
var lab = fs.readFileSync(process.argv[2]).toString()
	.split('\n')
	.map(function(line, y) {
		return line.split('').map(function(ascii, x) {
			return new Cell(ascii, x, y);
		});
	});

var cur_y = 0;
var cur_x = lab[0].indexOf(' ');
var path = lab[0][cur_x];

function walk() {
	
}

print(lab);

function print(lab) {
	console.log(
		lab
			.map(function(arr){return arr.join('')})
			.join('\n')
	);
}

function get_cell(ascii, y) {
	return new Cell(ascii);
}

function Cell(ascii, x, y) {
	this.x = x;
	this.y = y;
	this._next = null;
	this._prev = null;
	this.visited = false;
	this.distance = 0;
	this.walkable = (ascii === ' ');
	this.branches = [];
}

function 