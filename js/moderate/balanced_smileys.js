var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	process.stdout.write((isBraceBalanced(line) ? 'YES' : 'NO') + '\n');
});


// recursive strategy
function isBraceBalanced(str, from_idx, stack) {
	if (!from_idx) from_idx = 0;
	if (!stack)    stack    = [];

	for (var idx=from_idx, len=str.length; idx<len; idx++)
	{
		var c = str.charAt(idx);
		if (c === '(')
		{
			stack.push(c);
		}
		else if (c === ')') {
			if (stack.length <= 0) return false;
			stack.pop();
		}
		else if (c === ':') {
			if (idx+1 < len) {
				var c2 = str.charAt(idx + 1); // look ahead
				if (c2 === ')') {
					if (stack.length) {
						// possible collision
						return (
							isBraceBalanced(str, idx + 2, stack.concat()) // smiley consumed
							||
							isBraceBalanced(str, idx + 2, stack.slice(0, -1)) // brace closes old block, pop stack
						);
					}
					idx++; // brace is consumed by smiley
				}
				else if (c2 === '(') {
					// possible branch
					return (
						isBraceBalanced(str, idx + 2, stack.concat()) // smiley consumed
						||
						isBraceBalanced(str, idx + 2, stack.concat(['('])) // brace opens new block, push to stack
					);
				}
			}
		}
	}

	return stack.length === 0;
}

/* Invalid solution!! Consumes braces which *could* come from blocks instead of smileys!!
function isBraceBalanced2(original_str) {

	str = original_str.replace(/:[\(\)]/g, '');
	console.log(original_str);
	console.log(str);

	var stack = [];

	for (var idx=0, len=str.length; idx<len; idx++) {
		var c = str.charAt(idx);

		if (c === '(')
		{
			stack.push(c);
		}
		else if (c === ')') {
			if (stack.length <= 0) return false;
			stack.pop();
		}
	}

	return stack.length === 0;
}
/**/