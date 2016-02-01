var fs = require('fs');

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (!line) return;

	var
		words = line.split(' '),
		longest_word = '';

	// find longest word
	for (var idx=words.length; idx--; ) {
		if (words[idx].length >= longest_word.length) {
			longest_word = words[idx];
		}
	}

	// print it
	var steps = [];
	for (idx=0, len=longest_word.length; idx<len; idx++) {
		var cur = '';
		// print stars
		for (var jdx=idx; jdx--;) cur += '*';
		steps.push(cur + longest_word[idx]);
	}

	process.stdout.write(
		steps.join(' ')
		+ '\n'
	);
});