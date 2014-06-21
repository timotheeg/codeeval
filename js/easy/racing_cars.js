var fs  = require("fs");
function parseInt10(n){ return parseInt(n, 10); }

var tracks = fs.readFileSync(process.argv[2]).toString().split('\n');

// assumes passing through a gate is always possible
var c;
var check_idx = tracks[0].indexOf(c = 'C');
var pass_idx = check_idx > -1 ? check_idx : tracks[0].indexOf(c = '_');
process.stdout.write(tracks[0].replace(c, '|') + '\n');

for (var idx=1; idx<tracks.length; idx++)
{
	var track = tracks[idx];
	check_idx = track.indexOf(c = 'C');
	var next_pass_idx = check_idx > -1 ? check_idx : track.indexOf(c = '_');

	process.stdout.write(
		track.replace(c, 
			next_pass_idx === pass_idx
			? '|'
			: next_pass_idx > pass_idx
			? '\\'
			: '/'
		)
		+
		'\n'
	);

	pass_idx = next_pass_idx;
}


