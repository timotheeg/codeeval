var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line === "") return;

	var bin = parseInt(line, 10).toString(2);
	var count = 0;
	for(var idx=bin.length; idx--;) {
		if (bin[idx] === '1') count++;
	}
	process.stdout.write(count + '\n');
});