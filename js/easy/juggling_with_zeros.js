var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var stream = line.split(/\s+/);
	var res = "";
	var idx = 0, len = stream.length;

	// assumes input stream is sane
	while(idx < len)
	{
		var cmd = stream[idx++];
		var arg = stream[idx++];

		if (cmd == "00") arg = arg.replace(/0/g, "1");

		res += arg;
	}

	process.stdout.write(
		parseInt(res, 2) + "\n"
	);
});