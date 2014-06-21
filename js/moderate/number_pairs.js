var fs  = require("fs");
function parseInt10(n) { return parseInt(n, 10); }

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var args = line.split(';');
	var target_sum  = parseInt10(args[1]);
	var list = args[0].split(',').map(parseInt10);
	var half = target_sum / 2;
	var pairs = [];

	for (var idx=0; idx<list.length; idx++) {
		if (list[idx] > half) break;
		var remainder = target_sum - list[idx];
		if (bin_search(list, remainder, idx+1) > -1) pairs.push([list[idx], remainder]);
	}

	process.stdout.write(
		(pairs.map(function(pair){return pair.join(',')}).join(';') || 'NULL')
		+ '\n'
	);
});

function bin_search(list, n, min_idx)
{
	if (min_idx >= list.length) return -1;

	var max_idx = list.length, cur_idx = get_mid_idx(min_idx, max_idx);
	do
	{
		if (list[cur_idx] === n) return cur_idx;
		if (list[cur_idx] > n) max_idx = cur_idx;
		else min_idx = cur_idx + 1;
		var next_idx = get_mid_idx(min_idx, max_idx);
		if (next_idx === cur_idx) return -1;
		cur_idx = next_idx;
	}
	while(true);
}

function get_mid_idx(min, max) {
	return min + Math.floor((max - min) / 2);
}
