var fs  = require("fs");

var
	vocabulary  = ' !"#$%&\'()*+,-./0123456789:<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	idx_to_char = vocabulary.split(''),
	char_to_idx = {};

idx_to_char.forEach(function(char, idx){ char_to_idx[char] = idx });

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var tokens = line.split(';');
	var key = tokens[0].split('').map(parseInt10);
	var encoded = tokens[1];
	var decoded = new Array(encoded.length);
	var len = encoded.length;

	for (var idx=0; idx<len; idx++) {
		var key_idx = idx % key.length;
		var encoded_char = encoded.charAt(idx);
		var encoded_char_idx = char_to_idx[encoded_char];
		var decoded_char_idx = encoded_char_idx - key[key_idx];
		if (decoded_char_idx < 0) decoded_char_idx += vocabulary.length
		decoded[idx] = idx_to_char[decoded_char_idx];
	}

	process.stdout.write(decoded.join('') + '\n');
});

function parseInt10(n) {
	return parseInt(n, 10);
}