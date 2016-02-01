var fs  = require("fs");
var start_code = 'A'.charCodeAt(0);

// 0 -> not valid
// 1 -> A
// 2 -> B
// ...
// 26 -> Z
// 27 -> AA
// ...
// 52 -> AZ


fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (!line) return;

	var name = '';
	var num = parseInt(line, 10);

	while(num) {
		num -= 1;
		name = String.fromCharCode(start_code + (num % 26)) + name;
		num = Math.floor(num / 26);
	}

	process.stdout.write(
		name
		+ '\n'
	);
});
