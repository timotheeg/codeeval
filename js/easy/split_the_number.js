var fs  = require("fs");

var white_re = /\s+/;
var operator_re = /[+-]/;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var args = line.split(white_re);
	var match = args[1].match(operator_re);
	var operand1 = parseInt(args[0].substr(0, match.index), 10);
	var operand2 = parseInt(args[0].substr(match.index), 10);

	var res = match[0] === '+'
			? operand1 + operand2
			: operand1 - operand2;

	process.stdout.write(res + "\n");
});