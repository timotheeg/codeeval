var fs  = require("fs");
function myParseInt(n) {
	return parseInt(n, 10);
}

var abs = Math.abs;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var nums = line.split(/\s+/).map(myParseInt);

	var
		diffs = new Array(nums[0] - 1),
		len = nums.length;

	if (len > 2) {
		for (var idx=2; idx<len; idx++) {
			var diff = abs(nums[idx] - nums[idx-1]) - 1;
			diffs[diff] = true; // to make this test 0-based rather 1-based
		}

		for (var idx=diffs.length; idx--;) {
			if (!diffs[idx]) {
				return process.stdout.write('Not jolly\n');
			}
		}
	}

	process.stdout.write('Jolly\n');
});