var fs  = require("fs");

var unit_map = {
	zero: '0',
	one: '1',
	two: '2',
	three: '3',
	four: '4',
	five: '5',
	six: '6',
	seven: '7',
	eight: '8',
	nine: '9'
};
var teen_map = {
	ten: '10',
	eleven: '11',
	twelve: '12',
	thirteen: '13',
	fourteen: '14',
	fifteen: '15',
	sixteen: '16',
	seventeen: '17',
	eighteen: '18',
	nineteen: '19'
};
var twenty_and_above_map = {
	twenty: '2',
	thirty: '3',
	forty: '4',
	fifty: '5',
	sixty: '6',
	seventy: '7',
	eighty: '8',
	ninety: '9'
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line)
{
	if ("" === line) return;

	var tokens = line.split(/\s+/);
	var hasMillion = false;
	var hasThousand = false;
	var idx = 0, len = tokens.length;
	var res = '';
	if (tokens[idx] === 'negative') idx++;

	var million_idx = tokens.indexOf('million', idx);
	if (million_idx > -1)
	{
		hasMillion = true;
		res += readUpToThousand(tokens.slice(idx, million_idx));
		idx = million_idx + 1;
	}

	var thousand_idx = tokens.indexOf('thousand', idx);
	if (thousand_idx > -1)
	{
		hasThousand = true;
		res += readUpToThousand(tokens.slice(idx, thousand_idx));
		idx = thousand_idx + 1;
	}
	else if (hasMillion)
	{
		res += '000';
	}

	res += readUpToThousand(tokens.slice(idx));

	res = res.replace(/^0+/, '');
	if (tokens[0] === 'negative')
	{
		res = '-' + res;
	}
	if (!res)
	{
		res = '0';
	}

	process.stdout.write(res + '\n');
});

function readUpToThousand(tokens) {
	var idx = 0;
	var res = '';
	if (tokens[1] === 'hundred') {
		res += unit_map[tokens[idx]];
		idx = 2;
	}
	else {
		res += '0';
	}

	if (idx >= tokens.length) {
		res += '00';
	}
	else {
		if (tokens[idx] in teen_map) {
			res += teen_map[tokens[idx]];
		}
		else {
			if (tokens[idx] in twenty_and_above_map) {
				res += twenty_and_above_map[tokens[idx++]];
			}
			else {
				res += '0';
			}

			if (tokens[idx] in unit_map) {
				res += unit_map[tokens[idx]];
			}
			else {
				res += '0';
			}
		}
	}
	return res;
}
