var fs  = require("fs");
var util = require("util");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var args = line.split(';');
	var res = [args[0]];
	var repl_seqs = args[1].split(',');

	while(repl_seqs.length)
	{
		var origin = repl_seqs.shift();
		var target = repl_seqs.shift();
		var re = new RegExp(origin, 'g');
		var m;

		for (var idx=res.length; idx--;) 
		{
			var fragment = res[idx];
			if (fragment.charAt(0) === '_') continue;
			var arr = [];
			var last_index = 0;
			while(m = re.exec(fragment))
			{
				if (m.index > last_index) arr.push(fragment.substring(last_index, m.index))
				arr.push('_' + target);
				last_index = m.index + origin.length;
			}
			if (last_index <= fragment.length - 1) arr.push(fragment.substr(last_index));
			if (arr.length === 1 && arr[0].charAt(0) !== '_') continue; // there was no replacement
			res.splice.apply(res, [idx, 1].concat(arr));
		}
	}

	process.stdout.write(res.join('').replace(/_/g, '') + '\n');
});


