var fs  = require("fs");

var bands = [
	[2,   'Home'],
	[4,   'Preschool'],
	[11,  'Elementary school'],
	[14,  'Middle school'],
	[18,  'High school'],
	[22,  'College'],
	[65,  'Work'],
	[100, 'Retirement']
];

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (line === "") return;

	var age = parseInt(line, 10);
	var band = 'This program is for humans';

	if (age >= 0) {
		for (var idx=0; idx<bands.length; idx++) {
			if (age <= bands[idx][0]) {
				band = bands[idx][1];
				break;
			}
		}
	}

	process.stdout.write(
		band
		+ "\n"
	);
});