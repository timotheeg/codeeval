var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
    if (line === "") return;

    var args = line.split(",");
    var len = parseInt(args[0], 10);
    var chars = args[1].split('').sort();

    // removes duplicate chars
    for (var idx=chars.length; idx-->1; ) if (chars[idx] === chars[idx-1]) chars.splice(idx, 1);

    var res = get_lists(len, chars);

    process.stdout.write(res.join(',') + '\n');
});

function get_lists(len, chars)
{
	if (len === 1) return chars.concat();

	var
		res = [],
		char_len = chars.length,
		suffixes = get_lists(len-1, chars),
		suffix_len = suffixes.length;

	for (var idx=0; idx<char_len; idx++) {
		var current = chars[idx];
		for (var jdx=0; jdx<suffix_len; jdx++) {
			res.push(current + suffixes[jdx]);
		}
	}

	return res;
}
