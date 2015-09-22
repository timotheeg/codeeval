var fs  = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;
	
	process.stdout.write(
		line.split(' ').map(time_to_ts).sort(by_ts_desc).map(get_time).join(' ')
		+ "\n"
	);
});

function time_to_ts(time)
{
	var 
		tokens = time.split(':');
		ts = parseInt(tokens[0], 10) * 3600 + 
			parseInt(tokens[1], 10) * 60 + 
			parseInt(tokens[2], 10);

	return {
		time: time,
		ts: ts
	};
}

function by_ts_desc(a, b)
{
	return b.ts - a.ts;
}

function get_time(item)
{
	return item.time;
}