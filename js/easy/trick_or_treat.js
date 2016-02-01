var
	fs = require("fs"),
	re = /^Vampires: (\d+), Zombies: (\d+), Witches: (\d+), Houses: (\d+)$/;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	var m = line.match(re);

	if (!m) return;

	var
		num_vampires = parseInt(m[1], 10),
		num_zombies  = parseInt(m[2], 10),
		num_witches  = parseInt(m[3], 10),
		num_houses   = parseInt(m[4], 10);

	var tot_candies = num_houses * (
		  num_vampires * 3
		+ num_zombies  * 4
		+ num_witches  * 5
	);

	process.stdout.write(
		Math.floor(tot_candies / (num_vampires + num_zombies + num_witches))
		+ "\n"
	);
});