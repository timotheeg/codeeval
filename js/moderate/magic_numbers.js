require("fs")
	.readFileSync(process.argv[2])
	.toString()
	.split('\n')
	.forEach(function (line)
	{
		if (!line) return;

		var
			tokens = line.split(' ');
			start = parseInt(tokens[0], 10),
			end = parseInt(tokens[1], 10),
			magic = [];
			
		for (var num=start; num<=end; num++)
		{
			if (isMagic(num)) magic.push(num);
		}

		process.stdout.write( (magic.length ? magic.join(' ') : -1) + "\n" );
	});
	
function isMagic(n)
{
	var digits = (n + '').split('').map(myParseInt);
	var len = digits.length;
	var uniq_digits = new Array(10);
	var visits = new Array(len);
	
	for (var idx=len; idx--; ) {
		if (uniq_digits[digits[idx]]) return false;
		uniq_digits[digits[idx]] = 1;
	}
	
	var idx = 0;
	visits[0] = 1;
	
	do
	{
		idx += digits[idx];
		if (idx >= len) idx %= len;
		if (visits[idx]) break;
		visits[idx] = 1;
	}
	while(idx != 0);
	
	if (idx !== 0) return false;
	
	for (idx=len; idx--;)
	{
		if (!visits[idx]) return false;
	}
	
	return true;
}

function myParseInt(n)
{
	return parseInt(n, 10);
}


