var fs  = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var tokens = line.split(/\s+/);
	var re = glob_to_regex(tokens[0]);
	var res = [];

	for (var idx=1, len=tokens.length; idx<len; idx++) {
		if (re.test([tokens[idx]])) {
			res.push(tokens[idx]);
		}
	}

	process.stdout.write(
		  (res.length <= 0 ? '-' : res.join(' '))
		+ '\n'
	);
});

// assumes glob pattern is regex-safe!!!!!
function glob_to_regex(glob_pattern) {
	var re_pattern = glob_pattern
			.replace(/\./g, '\\.')
			.replace(/\?/g, '.')
			.replace(/\*/g, '.*');

	return new RegExp('^' + re_pattern + '$');
}