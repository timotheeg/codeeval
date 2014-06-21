var fs  = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
    if (line === "") return;

    var args = line.split(',');

    process.stdout.write(check_substr(args[0], args[1]) + '\n');
});

// per instruction, there can only be a single '*' character
function check_substr(haystack, needle) {
	var pos = myIndexOf(needle, '*');
	if (pos > -1) {
		if (pos===0) return myIndexOf(haystack, needle.substr(1)) > -1;
		if (pos===needle.length-1) return myIndexOf(haystack, needle.substring(0, needle.length-1)) > -1;

		if (needle.charAt(pos-1) === '\\') needle.replace('\\*', '*');
		else {
			var idx = myIndexOf(haystack, needle.substr(0, pos));
			if (idx <= -1) return false;
			return myIndexOf(haystack, needle.substr(pos+1), idx+pos) > -1;
		}
	}
	return myIndexOf(haystack, needle) > -1;
}

// because not allowed to use native indexOf() *sigh*
function myIndexOf(haystack, needle, start_idx)
{
	if (!start_idx) start_idx = 0;
	for (var hs_idx=start_idx, nd_idx=0, len=haystack.length; hs_idx<len; hs_idx++)
	{
		while(true)
		{
			if (haystack.charAt(hs_idx) === needle.charAt(nd_idx))
			{
				var done;
				if (++nd_idx >= needle.length)
				{
					// match found
					return hs_idx - needle.length + 1;
				}
				else break;
			}
			else if (nd_idx > 0) nd_idx = 0;
			else break;
		}
	}

	return -1;
}
