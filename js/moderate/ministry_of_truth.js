var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var args = line.split(';');
	var original_words = args[0];
	var target = args[1].split(/\s+/);
	var result_delimiters = [[0, 0]];

	// find if match
	for (var word_idx=0, from_idx=0; word_idx<target.length; word_idx++)
	{
		var pos = original_words.indexOf(target[word_idx], from_idx);

		if (pos <= -1) return process.stdout.write('I cannot fix history\n');

		from_idx = pos + target[word_idx].length;
		result_delimiters.push([pos, from_idx]);
		from_idx++; // +1 to account for word spacing
	}

	result_delimiters.push([original_words.length, original_words.length]);

	var res = '', last_match;
	for (var idx=0; idx<result_delimiters.length-1; idx++)
	{
		var match = result_delimiters[idx];
		res += original_words.substring(match[0], match[1]);
		res += original_words.substring(match[1], result_delimiters[idx+1][0]).replace(/\s+/g, ' ').replace(/[^ ]/g, '_');
	}

	process.stdout.write(res + '\n');
});

/* I dun nee that.. bu leaving it since I wrote it
function str_init(char, remainder_length)
{
	var str = '';
	while(remainder_length--) str += char;
	return str;
}
/**/