var fs  = require("fs");

var map = [1, 2, 0];
var log_2 = Math.log(2);

// sample broken down long line:
// 0 1 12 1220 12202001 1220200120010112 12202001200101122001011201121220
// notice that the first half of each additional block is a repeat of the previous entire block

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;
	var index = parseInt(line, 10);
	process.stdout.write(get_digit_at(index) + '\n');
});

function get_digit_at(index)
{
	var val = 0;

	var iterations_left = get_num_iterations(index)-1;
	var block_size = Math.pow(2, iterations_left);
	var rel_index = index - block_size;

	while (iterations_left >= 0)
	{
		block_size = block_size >>> 1;
		if (rel_index >= block_size) {
			val = map[val];
			rel_index -= block_size;
		}
		iterations_left--;
	}

	return val;
}

function get_num_iterations(idx) {
	if (idx===0) return 0;
	return Math.ceil(Math.log(idx+1)/log_2);
}

/* 
// Test cases for up to 6 iterations
var iter6 = '0112122012202001122020012001011212202001200101122001011201121220';
for (var idx=0; idx<iter6.length; idx++) {
	var val = get_digit_at(idx);
	console.log(idx, iter6.charAt(idx), val, val === parseInt(iter6.charAt(idx), 10) ? 'ok' : 'false')
}
/**/
