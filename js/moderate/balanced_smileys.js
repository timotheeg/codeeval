require("fs")
	.readFileSync(process.argv[2])
	.toString()
	.split('\n')
	.forEach(function (line)
	{
		if (!line) return;

		process.stdout.write((isBraceBalanced(line) ? 'YES' : 'NO') + '\n');
	});

// recursive strategy
function isBraceBalanced(str, from_idx, opened) {
	if (!from_idx) from_idx = 0;
	if (opened === undefined) opened = 0;

	for (var idx=from_idx, len=str.length; idx<len; idx++)
	{
		switch( str.charAt(idx) ) {
			case '(':
				opened++;
				break;
			case ')':
				if (--opened < 0) return false;
				break;
			case ':':
				switch ( str.charAt(idx + 1) ) { // look ahead (js doesn't throw out-of-bounds)
					case ')':
					case '(':
						// possible collision
						if (isBraceBalanced(str, idx + 2, opened)) // smiley consumed
						{
							return true;
						}
				}
		}
	}

	return opened === 0;
}