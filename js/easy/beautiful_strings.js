var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (line === "") return;

	line = line
		.replace(/[^a-z]+/ig, '')
		.toLowerCase();

	var char_map = {};

	// get a map of all characters and their count
	for (var idx=line.length; idx--;) {
		var char = line.charAt(idx);
		if (char in char_map)
			char_map[char]++;
		else
			char_map[char] = 1;
	}

	// create an array of tuples from the map (so it can be sorted)
	var tuples = [];
	for (var char in char_map) {
		tuples.push([char, char_map[char]]);
	}

	// sort it now in ascending order
	tuples.sort(by_occurences);

	// assign the largest score to the most frequently occuring letter, and go down from there
	var score = 0;
	var cur_value = 26;
	for (var idx=tuples.length; idx--;) {
		score += tuples[idx][1] * cur_value--;
	}

	process.stdout.write( score + "\n" );
});

function by_occurences(a, b) {
	return a[1] - b[1];
}