var fs = require('fs');

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	var
		tokens = line.split(' '),
		res = '',
		original = tokens[0],
		mask = tokens[1],
		len = original.length;

	for (var idx=0; idx<len; idx++) {
		res += (mask.charAt(idx) == '1') ? original.charAt(idx).toUpperCase() : original.charAt(idx);
	}

	process.stdout.write(
		res
		+ '\n'
	);
});