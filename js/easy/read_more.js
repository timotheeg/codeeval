var fs = require("fs");
var space_trim_re = / +$/;
var word_trim_re = / +[^ ]+$/;
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	if (line.length > 55) {
		var c1 = line.charAt(39);
		var c2 = line.charAt(40);
		line = line.substr(0, 40)
			.replace(
				((c1 != ' ' && c2 != ' ')
					? word_trim_re
					: space_trim_re
				)
				, ''
			);
		line += '... <Read More>';
	}

	process.stdout.write(
		line + "\n"
	);
});