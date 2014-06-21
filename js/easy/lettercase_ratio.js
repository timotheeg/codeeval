var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var lower_count = 0;

	for (var idx = line.length; idx--; )
	{
		if (isLower(line.charCodeAt(idx)))
		{
			lower_count++;
		}
	}

	// working with ints to deals with annoying rounding errors
	var lower_ratio = Math.round(10000 * lower_count / line.length);
	var upper_ratio = 10000 - lower_ratio;

	process.stdout.write(
		"lowercase: " + 
		format(lower_ratio) + 
		" uppercase: " + 
		format(upper_ratio) + 
		"\n"
	);
});

function isLower(c) {
	return (c >= 97 && c <= 122);
}

function format(n) {
	return ((n<10?"00":n<100?"0":"") + n).replace(/(\d{2})$/, '.$1');
}
