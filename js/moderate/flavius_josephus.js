var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var args = line.split(',');
	var num = parseInt(args[0], 10);
	var step = parseInt(args[1], 10);
	var res = [];
	var start = null, prev = null, cur = null;

	function drop_node(node)
	{
		res.push(node.v);
		node.next.prev = node.prev;
		node.prev.next = node.next;
	}

	// make the circular linked list
	for (var idx=0; idx<num; idx++)
	{
		cur = {v:idx, prev:prev, next:null};
		if (!start) start = cur;
		if (prev) prev.next = cur;
		prev = cur;
	}
	cur.next = start;
	start.prev = cur;

	// iterate to drop nodes!
	var node = start.prev;
	var remainder = num;
	while(remainder) {
		var steps_left = step;
		while(steps_left--) {
			node = node.next;
		}
		drop_node(node);
		remainder--;
	}

	process.stdout.write(res.join(' ') + '\n');
});

