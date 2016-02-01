var fs = require("fs");
var eighty_spaces = '                                                                                ';
var max_line_len = 80;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === '') return;

	if (line.length <= max_line_len) {
		process.stdout.write(line + '\n');
		return;
	}

	// not most efficient, but whatever...
	var tokens = line.split(/\s+/);
	var token_idx = 0;
	var to_justify_lines = [];

	do
	{
		var cur_line = [];
		var cur_words_len = 0;

		while (token_idx < tokens.length) {
			var cur_token = tokens[token_idx];

			if (cur_words_len + cur_token.length + cur_line.length <= max_line_len)
			{
				cur_line.push(cur_token);
				cur_words_len += cur_token.length;
				token_idx++;
			}
			else if (cur_line.length <= 0)
			{
				cur_line.push(cur_token);
				cur_words_len = cur_token.length;
				token_idx++;
				break;
			}
			else
			{
				break;
			}
		}

		to_justify_lines.push({tokens: cur_line, words_len: cur_words_len});
	}
	while (token_idx < tokens.length);

	// justify each line, except the last
	to_justify_lines.slice(0, -1).forEach(justify);

	// add last line with no extra spaces
	process.stdout.write(to_justify_lines.pop().tokens.join(' ') + '\n');
});

function justify(to_justify)
{
	var slots = to_justify.tokens.length - 1;

	if (slots > 0)
	{
		var needed = max_line_len - to_justify.words_len;
		var min_space = eighty_spaces.slice(0, Math.floor(needed / slots));
		var left_over = needed % slots;

		// add each word with padding in the sentence
		to_justify.tokens.slice(0, -1).forEach(function(token){
			process.stdout.write(token);
			process.stdout.write(min_space);
			if (left_over-- > 0) process.stdout.write(' ');
		});

		// last word is added with no right space padding
		process.stdout.write(to_justify.tokens.pop());
	}
	else
	{
		process.stdout.write(to_justify.tokens[0]);
	}

	process.stdout.write('\n');
}