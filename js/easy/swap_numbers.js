var fs = require('fs');

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	process.stdout.write(
		line.split(' ').map(swapPrefixSuffix).join(' ')
		+ '\n'
	);
});

function swapPrefixSuffix(word) {
	return word.charAt(word.length-1) + word.slice(1, -1) + word.charAt(0);
}