var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line === "") return;

	var num = parseFloat(line);
	var deg = Math.floor(num);

	var minutes_float = (num - deg) * 60;
	var minutes = Math.floor(minutes_float);

	var seconds_float = (minutes_float - minutes) * 60;
	var seconds = Math.floor(seconds_float);

	process.stdout.write(
		  deg
		+ '.'
		+ (minutes < 10 ? '0' : '') + minutes + '\''
		+ (seconds < 10 ? '0' : '') + seconds + '"'
		+ "\n"
	);
});