var word_boundaries = {
	32: 1, // space
	46: 1, // dot
	44: 1, // coma
	58: 1, // colon
	59: 1  // semi-colon
};

require("fs").readFileSync(process.argv[2]).toString().split('\n').forEach(function(line)
{
	if (!line) return;

	var tokens = line.split(/\s+\|\s+/);
	var repeat_word_length = parseInt(tokens[0], 10);
	var last_word_char_code = tokens[1].charCodeAt(0);
	var codes = tokens[2].split(/\s+/).map(myParseInt);
	var max_possible_idx = codes.length - repeat_word_length;
	var idx, jdx, shift_constant;

	// find repeated word, assumes only one repeated word, returns first match
	var indexes = [];
	outer:
	for (idx=0; idx<max_possible_idx-repeat_word_length; idx++) {
		for (jdx=idx+repeat_word_length; jdx<max_possible_idx; jdx++) {
			if (arr_equal(codes, idx, jdx, repeat_word_length)) {
				shift_constant = codes[idx + repeat_word_length - 1] - last_word_char_code;
				if (word_boundaries[codes[idx + repeat_word_length] - shift_constant]) {
					break outer;
				}
			}
		}
	}

	codes = codes.map(function(n){
		return String.fromCharCode(n - shift_constant);
	});

	process.stdout.write(
		codes.join('')
		+ '\n'
	);
});

function myParseInt(n) {
	return parseInt(n, 10);
}

function arr_equal(arr, offset1, offset2, len) {
	for (var idx=len; idx--;) {
		if (arr[offset1 + idx] !== arr[offset2 + idx]) {
			return false;
		}
	}
	return true;
}