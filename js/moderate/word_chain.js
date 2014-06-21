var fs  = require("fs");
var white_re = /\s+/;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var num = getNumChains(line.split(','));

	process.stdout.write(
		(num > 1 ? num : 'None')
		+ '\n'
	);
});

function getNumChains(words, first_char)
{
	var num_chains = 0, max_num_chains = 0;

	// exit condition
	if (words.length <= 1) {
		return (first_char && words[0].charAt(0) === first_char) ? 1 : 0;
	}

	for (var word_idx = words.length; word_idx--; ) {
		var cur_word = words[word_idx];
		if (first_char && cur_word.charAt(0) !== first_char) continue;
		var left_over_words = words.concat();
		left_over_words.splice(word_idx, 1);
		num_chains = 1 + getNumChains(left_over_words, cur_word.charAt(cur_word.length-1));
		if (num_chains > max_num_chains) max_num_chains = num_chains;
	}
	
	return max_num_chains;
}
