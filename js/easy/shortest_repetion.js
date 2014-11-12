var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (line === "") return;

	// very inneficient approach, but I'm being lazy :/
	// assumes the incoming line HAS a repeating pattern 

	for (var idx=1, len=line.length; idx<=len; idx++) {
		var str = line.substr(0, idx);
		var re = new RegExp('^(' + str + ')+$');
		if (re.test(line)) {
			process.stdout.write(idx + "\n");
			return;
		}
	}
});