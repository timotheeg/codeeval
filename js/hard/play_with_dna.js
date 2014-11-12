var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var args = line.split(/\s+/);
	args[1] = parseInt(args[1], 10);

	var matches = find_matches.apply(null, args);

	process.stdout.write(
		(matches.length
			? order_matches(matches).join(' ') 
			: 'No match'
		)
		+ '\n'
	);
});

function mySort(a, b) {
	if (a[1] === b[1]) return a[0] > b[0];
	else return a[1] > b[1];
}

function order_matches(matches)
{
	matches.sort(mySort);
	return matches.map(function(p){ return p[0]; });
}

function find_matches(needle, max_mismatch, haystack)
{
	// brute force through the haystack :(

	var res_arr = [];
	var needle_len = needle.length;

	if(haystack.length < needle_len) return [];

	outer:
	for (var from_idx=haystack.length - needle_len + 1; from_idx--; )
	{
		var mis_count = 0;
		for (var idx=0; idx<needle_len; idx++)
		{
			if (needle.charAt(idx) === haystack.charAt(from_idx + idx)) continue;
			if (++mis_count > max_mismatch) continue outer;
		}
		var match = haystack.substr(from_idx, needle_len);
		res_arr.push([match, mis_count]);
	}

	return res_arr;
}
