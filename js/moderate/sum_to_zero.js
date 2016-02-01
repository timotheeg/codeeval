var fs  = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (!line) return;

	console.log(line);

	var nums = line.split(',').map(parseInt10);

	var sum0 = 0;
	getAllCombinations(nums, 4).forEach(function(comb) {
		console.log(comb);
		if (comb.reduce(sum, 0) === 0) sum0++
	});

	process.stdout.write(
		sum0
		+ '\n'
	);
});

function getAllCombinations(nums, n) {
	var res = [];
	var initial = nums.splice(0, n);
	res.push(initial);

	for (var idx=nums.length; idx--; ) {
		
		var local_copy = nums.concat();
		var elem = local_copy.splice(idx, 1);
		if (n <= 1) {
			res.push(elem);
		}
		else {
			var combs = getAllCombinations(local_copy, n-1);
			for (var jdx=combs.length; jdx--; ) {
				res.push(elem.concat(combs[jdx]));
			}
		}
	}

	return res;
}

function sum(prev, cur) {
	return prev + cur;
}

function parseInt10(n) {
	return parseInt(n, 10);
}
