var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line === "") return;

	var args = line.split(',').map(function(s){ return parseInt(s, 10); });
	var num = args[0];
	var idx1 = args[1]-1;
	var idx2 = args[2]-1;

	var bit_res1 = (num & (Math.pow(2, idx1)));
	var bit_res2 = (num & (Math.pow(2, idx2)));
	var res = false;

	if (bit_res1) {
		if (bit_res2)
		{
			res = true;
		}
	}
	else if(!bit_res2) {
		res = true;
	}

	process.stdout.write(
		res
		+ "\n"
	);
});