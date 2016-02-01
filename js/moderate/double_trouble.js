var fs = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (!line) return;

	var
		variants = 1,
		half_len = line.length / 2;

	outer:
	for (var idx = half_len; idx--; )
	{
		var
			c1 = line.charAt(idx),
			c2 = line.charAt(half_len + idx);

		switch (c1) {
			case 'A':
				if (c2 === 'B') {
					variants = 0;
					break outer;
				}
				break;

			case 'B':
				if (c2 === 'A') {
					variants = 0;
					break outer;
				}
				break;

			case '*':
				if (c2 === '*') variants *= 2;
				break;
		}
	}

	process.stdout.write(
		variants
		+ "\n"
	);
});
