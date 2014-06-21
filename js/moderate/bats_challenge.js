var WALL_SPACE = 6;
function parseInt10(n){ return parseInt(n, 10); }
function num_sort(a, b) { return a > b; }
function translate(n) { return n-WALL_SPACE; }

require("fs").readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var args = line.split(' ').map(parseInt10);
	var wire_len = args.shift() - (WALL_SPACE * 2);
	var bat_space = args.shift();
	args.shift(); // discards number of bat positions
	var bat_pos = args.map(translate);
	bat_pos.sort(num_sort);

	var extra_bats = 0, len = bat_pos.length, l;

	if (bat_pos.length === 0) {
		extra_bats = (wire_len<0 ? 0 : (1 + Math.floor(wire_len / bat_space)));
	}
	else {
		for (var idx=0; idx<=len; idx++) {
			if (idx === 0)
				l = bat_pos[idx] - bat_space;
				
			else if (idx === len)
				l = wire_len - (bat_pos[idx-1] + bat_space);

			else
				l = (bat_pos[idx] - bat_space) - (bat_pos[idx-1] + bat_space);

			extra_bats += (l<0 ? 0 : (1 + Math.floor(l / bat_space)));
		}
	}

	process.stdout.write(extra_bats + '\n');
});
