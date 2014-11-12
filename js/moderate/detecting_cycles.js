var fs  = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var nums = line.split(/\s+/);

	// brute force
	var outer_idx, len;
	outer:
	for (outer_idx=0; outer_idx<nums.length; outer_idx++) {
		inner:
		for (len=1; len<(nums.length-outer_idx); len++) {
			var inner_idx = -1;
			while (++inner_idx<len) {
				if (nums[outer_idx + inner_idx] != nums[outer_idx + len + inner_idx]) {
					continue inner;
				}
			}
			break outer;
		}
	}

	process.stdout.write(nums.slice(outer_idx, outer_idx+len).join(' ') + '\n');
});
