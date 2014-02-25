var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line === "") return;

    var chars = line.split('').sort();

	process.stdout.write(
		get_permutations(chars).join(',')
		+ "\n"
	);
});

function get_permutations(chars) {
	if (chars.length === 1) return chars;

	var res = [];
	for (var idx=0; idx<chars.length; idx++) {
		var c = chars[idx];
		var left_over_chars = chars.concat();
		left_over_chars.splice(idx, 1);

		var permutations = get_permutations(left_over_chars);
		for (var jdx=0; jdx<permutations.length; jdx++) {
			res.push(c + permutations[jdx]);
		}
	}
	return res;
}