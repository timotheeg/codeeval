var fs  = require("fs");

var abs = Math.abs, floor = Math.floor;
var input_re = /^(\d{2}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
var m;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (m = line.match(input_re))
	{
		var t1 = parseInt(m[1], 10) * 3600 + parseInt(m[2], 10) * 60 + parseInt(m[3], 10);
		var t2 = parseInt(m[4], 10) * 3600 + parseInt(m[5], 10) * 60 + parseInt(m[6], 10);
		var t_diff = abs(t2-t1);

		var hours = floor(t_diff / 3600);
		t_diff %= 3600;
		var mins = floor(t_diff / 60);
		var secs = t_diff % 60;

		process.stdout.write(
			  ((hours < 10) ? '0' : '') + hours
			+ ':'
			+ ((mins  < 10) ? '0' : '') + mins
			+ ':'
			+ ((secs  < 10) ? '0' : '') + secs
			+ '\n'
		);
	}
});