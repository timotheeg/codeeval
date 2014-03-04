var fs  = require("fs");

var email_re = /^[a-z0-9_][a-z0-9_+-]+(\.[a-z0-9_+-]+)*@([a-z0-9_]+\.)*[a-z]{2,4}$/i;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	process.stdout.write(
		email_re.test(line.replace(/^\s+|\s+$/, ''))
		+ '\n'
	);
});
