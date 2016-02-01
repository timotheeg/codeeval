var fs  = require("fs");

var types = [
	"sine",
	"triangle",
	"sawtooth",
	"square"
];

var dt = 1/20000;
var allowance = 0.1;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var tokens = line.split(/\s+/).map(myParseInt);
	var len = tokens.length;
	var dxs = [];

	// look for 2 successives maximas
	var last_dir = tokens[1] - tokens[0] > 0 ? 'up' : 'down';
	var last_dir_change_idx = null;
	for (var idx=2; idx<len; idx++) {

		dxs.push();

	}







	process.stdout.write(decoded + "\n");
});

function myParseInt(n) {
	return parseInt(n, 10);
}
