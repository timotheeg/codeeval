var fs  = require("fs");

var world = [], nextState;
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (!line) return;
	world.push(line.split(''));
});
var max_idx = world.length;

var iterations = 10;
while (iterations--) {
	nextState = getCleanWorld();
	for (var i=world.length; i--; ) {
		for (var j=world[i].length; j--; ) {
			computeNextState(i, j);
		}
	}
	world = nextState;
}

function computeNextState(i, j, undefined) {
	var neighbours = {'.':0, '*':0};
	neighbours[undefined] = 0;
	// inlined check for eight neihbours
	if (world[i-1]) {
		neighbours[world[i-1][j-1]]++;
		neighbours[world[i-1][j]  ]++;
		neighbours[world[i-1][j+1]]++;
	}
	neighbours[world[i]  [j-1]]++;
	neighbours[world[i]  [j+1]]++;
	if (world[i+1]) {
		neighbours[world[i+1][j-1]]++;
		neighbours[world[i+1][j]  ]++;
		neighbours[world[i+1][j+1]]++;
	}

	nextState[i][j] = world[i][j];

	switch(world[i][j]) {
		case '*':
			if (neighbours['*'] < 2 || neighbours['*'] > 3) {
				nextState[i][j] = '.';
			}
			break;

		case '.': 
			if (neighbours['*'] === 3) {
				nextState[i][j] = '*';	
			}
			break;
	}
}

function getCleanWorld() {
	var world = [];
	for (var idx = max_idx; idx--;) {
		world[idx] = new Array(max_idx);
	}
	return world;
}

process.stdout.write(world.map(function(row){return row.join('')}).join('\n') + '\n');