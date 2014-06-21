var fs  = require("fs");

var roman_map = [
	['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
	['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
	['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
	['', 'M', 'MM', 'MMM']
];

function toRoman(num)
{
	num = (num + "");
	var idx, unit, res = "";
	for (idx=num.length, unit=0; idx--; unit++)
	{
		res = roman_map[unit][num.charAt(idx)] + res;
	}
	return res;
}

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	process.stdout.write(
		toRoman(line) + "\n"
	);
});
