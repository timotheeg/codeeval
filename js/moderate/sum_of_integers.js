var fs  = require("fs");
function parseInt10(n) { return parseInt(n, 10); }
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var nums = line.split(/,\s*/).map(parseInt10);
	var len = nums.length, max = -Infinity;

	function get_contiguous(arr) {
		if (arr.length <= 0) throw "Invalid input";
		var n = arr[0];
		if (n > max) max = n;
		if (arr.length == 1) return arr;
		var suites = get_contiguous(arr.slice(1));
		for (var idx=suites.length; idx--; ) {
			var m = suites[idx] + n;
			if (m > max) max = m;
			suites[idx] = m;
		}
		suites.push(n);
		return suites;
	}

	get_contiguous(nums);
	process.stdout.write(max + '\n');
});

