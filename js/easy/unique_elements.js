var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line === "") return;

	var nums = line.split(',');
	var res = [];

	var prev = null;
	for (var idx=0; idx<nums.length; idx++) {
		var cur = nums[idx];
		if (cur != prev) {
			res.push(cur);
			prev = cur;
		}
	}

	process.stdout.write(
		res.join(',')
		+ "\n"
	);
});