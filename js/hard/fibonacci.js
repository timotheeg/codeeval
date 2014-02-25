var fs  = require("fs");

// first 5 fibos, just because :p
var fibos = [0, 1, 1, 2, 3, 5];

// get fibos with memoization
function get_fibo_at(n) {
	if (n === 0) return 0;
	if (fibos[n]) return fibos[n];

	for (var idx=fibos.length; idx<=n; idx++)
	{
		fibos[idx] = fibos[idx-1] + fibos[idx-2];
	}

	return fibos[n];
}

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
    if (line === "") return;

    process.stdout.write(get_fibo_at(parseInt(line, 10)) + '\n');
});


