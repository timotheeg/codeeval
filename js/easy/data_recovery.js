var fs  = require("fs");
function parseInt10(n){ return parseInt(n, 10); }

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;
	var args = line.split(';');
	var words = args[0].split(/\s+/);
	var res = new Array(words.length);
	var indexes = args[1].split(/\s+/).map(parseInt10);

	// dodgy assumption that only one char can have no target index...
	if (indexes.length < words.length) {
		var last = words.pop();
		for (var i=words.length+1; i--;) res[i] = last;
	}

	for (var idx=0, len=indexes.length; idx<len; idx++) {
		res[indexes[idx]-1] = words[idx];
	}

	process.stdout.write(res.join(' ') + "\n");
});
