var fs  = require("fs");

function is_self_describing(num_as_str)
{
	var d, idx, map = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	for (idx=num_as_str.length; idx--;)
	{
		d = parseInt(num_as_str.charAt(idx), 10);
		map[d]++;
	}

	for (idx=num_as_str.length; idx--;)
	{
		d = parseInt(num_as_str.charAt(idx), 10);
		if (d !== map[idx]) return false;
	}

	return true;
}

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	process.stdout.write(
		(is_self_describing(line)?1:0) + "\n"
	);
});
