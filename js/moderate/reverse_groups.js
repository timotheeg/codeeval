var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var args = line.split(';');
	var list = args[0].split(',');
	var group_size = parseInt(args[1], 10);

	var cur_idx = 0;
	while(cur_idx<list.length)
	{
		if (cur_idx+group_size > list.length) break;
		var src_idx = cur_idx;
		var dst_idx = cur_idx + group_size - 1;
		while(src_idx < dst_idx)
		{
			var tmp = list[src_idx];
			list[src_idx] = list[dst_idx];
			list[dst_idx] = tmp;
			src_idx++;
			dst_idx--;
		}
		cur_idx += group_size;
	}

	process.stdout.write(list.join(',') + '\n');
});

