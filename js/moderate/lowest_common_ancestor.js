var fs  = require("fs");

// hardocding the tree
var root = {v:30};
root.r =   {v:52};
root.l =   {v:8};
root.l.l = {v:3};
root.l.r = {v:20};
root.l.r.l = {v:10};
root.l.r.r = {v:29};

function parseInt10(n){ return parseInt(n, 10); }

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;
	var args = line.split(/\s+/).map(parseInt10);
	var low = args[0], high = args[1];

	var r = root;

	do
	{
		if (r.l >= low && r.r <= high) break;
		
	}
	while(true);

	process.stdout.write(triangle.map(function(a){return a.join(' ')}).join(' ') + '\n');
});
