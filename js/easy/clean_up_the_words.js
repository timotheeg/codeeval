var
	fs = require('fs'),
	word_re = /[a-z]{2,}/gi;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	var words = [], match;

	while (match = word_re.exec(line)) words.push(match[0]);

	process.stdout.write(
		words.join(' ')
		+ '\n'
	);
});