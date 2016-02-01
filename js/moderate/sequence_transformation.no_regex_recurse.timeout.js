var fs  = require("fs");
var white_re = /\s+/;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (!line) return;

	var
		args = line.split(white_re),
		source = args[0].split(''),
		target = args[1].split('');

	// brute force with recursion... urgh! >.<
	process.stdout.write(
		(canTransform(source, 0, target, 0) ? 'Yes' : 'No')
		+ '\n'
	);
});

function canTransform(src, s_idx_first, tgt, t_idx_first) {
	var
		src_len = src.length - s_idx_first,
		tgt_len = tgt.length - t_idx_first;

	if (src_len > tgt_len) return false;

	if (src_len === tgt_len) {
		// exact number of chars to match, they must all match individually
		var sidx = src.length, tidx = tgt.length;
		while (sidx-- > s_idx_first) {
			if ('0' === src[sidx] && 'B' === tgt[--tidx]) return false;
		}
		return true;
	}

	// case where tgt_len is bigger than src_len, must account for multiple matches
	if ('0' === src[s_idx_first] && 'B' === tgt[t_idx_first]) return false;

	var can_source_char_consume_more = tgt[t_idx_first] === tgt[t_idx_first+1];

	if (can_source_char_consume_more) {
		return (
			   canTransform(src, s_idx_first,   tgt, t_idx_first+1)
			|| canTransform(src, s_idx_first+1, tgt, t_idx_first+1)
		);
	}
	else {
		return canTransform(src, s_idx_first+1, tgt, t_idx_first+1);
	}
};
