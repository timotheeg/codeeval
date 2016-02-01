var fs = require('fs');

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (!line) return;

	var
		res = '',
		cordinates = line.split(' ').map(parseInt10),
		here_x  = cordinates[0],
		here_y  = cordinates[1],
		there_x = cordinates[2],
		there_y = cordinates[3];

	if (there_y < here_y) {
		res = 'S';
	}
	else if (there_y > here_y) {
		res = 'N';
	}

	if (there_x < here_x) {
		res += 'W';
	}
	else if (there_x > here_x) {
		res += 'E';
	}

	process.stdout.write(
		(res || 'here')
		+ '\n'
	);
});

function parseInt10(n) {
	return parseInt(n, 10);
}