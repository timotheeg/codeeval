var fs  = require("fs");

var map = {
	negative: '-',
	zero: '0',
	one: '1',
	two: '2',
	three: '3',
	four: '4',
	five: '5',
	six: '6',
	seven: '7',
	eight: '8',
	nine: '9',
	ten: '10',
	eleven: '11',
	twelve: '12',
	thirteen: '13',
	fourteen: '14',
	fifteen: '15',
	sixteen: '16',
	seventeen: '17',
	eighteen: '18',
	nineteen: '19',
	twenty: '2',
	thirty: '3',
	forty: '4',
	fifty: '5',
	sixty: '6',
	seventy: '7',
	eighty: '8',
	ninety: '9',
	hundred: '1',
	thousand: '1',
	million: '1'
}

var lines = fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line)
{
	if ("" === line) return;
}
