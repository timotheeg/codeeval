var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	line = line.toLowerCase();
	var map = get_chars_map();
	for (var idx=line.length; idx--;)
		delete map[line.charAt(idx)];

	var missing = [];
	for (var c in map)
		missing.push(c);

	process.stdout.write(
		(missing.length ? missing.sort().join('') : 'NULL')
		+ '\n'
	);
});

function get_chars_map() {
	var map = {};
	var code = 'a'.charCodeAt(0);
	var left = 26;
	while(left--) map[String.fromCharCode(code++)] = 1;
	return map;
}
