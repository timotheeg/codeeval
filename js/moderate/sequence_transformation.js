var fs  = require("fs");
var white_re = /\s+/;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var args = line.split(white_re);
	var source = compress(args[0]);
	var target = compress(args[1]);
	var fits = true;

	// return console.log(source, target);

	// assumes both input are valid per problem specs
	// tries several passes at consuming the target
	main: for (var s_idx=0, t_idx=0; s_idx<source.length; s_idx++)
	{
		if (source[s_idx][0] === '0')
		{
			do
			{
				if (target[t_idx][0] !== 'A') {
					if (s_idx===0) break;
					if (++t_idx >= target.length) {
						fits = false;
						break main;
					}
					if (target[t_idx][0] !== 'A') break;
				}
				target[t_idx][1] -= source[s_idx][1];
				if (target[t_idx][1] < 0) break;
				if (target[t_idx][1] === 0) t_idx++;
				continue main;
			}
			while(false);
			fits = false;
			break;
		}
		else
		{
			while (source[s_idx][1])
			{
				if (target[t_idx][1] <= source[s_idx][1]) {
					if (++t_idx >= target.length) {
						fits = false;
						break main;
					}
					source[s_idx][1] -= target[t_idx++][1];
				}
				else {
					source[s_idx][1] = 0;
					target[t_idx][1] -= source[s_idx][1];
					break;
				}
			}
		}
	}

	process.stdout.write(
		(fits ? 'Yes' : 'No')
		+ '\n'
	);
});


function compress(str) {
	if (str.length <= 0) return '';

	var last_char = str.charAt(0);
	var c, count = 1;

	var res = [];

	for (var idx=1; idx<str.length; idx++)
	{
		c = str.charAt(idx);
		if (c === last_char) count++;
		else if (c != last_char)
		{
			res.push([last_char, count]);
			last_char = c;
			count = 1;
		}
	}
	res.push([last_char, count]);

	return res;
}



/* Using a Regular Expression Builder... Works but too slow to pass :()

var patterns = ['A+', '(?:A+|B+)'];

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var args = line.split(white_re);
	var source = args[0];
	var target = args[1];

	var pattern = '';
	for (var idx=0; idx<source.length; idx++) {
		pattern += patterns[source.charAt(idx)];
	}
	var re = new RegExp('^' + pattern + '$');

	process.stdout.write(
		(re.test(target) ? 'Yes' : 'No')
		+ '\n'
	);
});
/**/