var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;
	var args = line.split(',');
	var str = trim(args[0]);

	// assuming input is regexp compatible!!
	// should do escaping to be sure
	var chars_re = new RegExp('[' + trim(args[1]) + ']', 'g');

	process.stdout.write(trim(str.replace(chars_re, '')) + '\n');
});

function trim(s)
{
	return s.replace(/^\s+|\s+$/g, '');
}
