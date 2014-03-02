var fs  = require("fs");

var match_re = /[a-j0-9]/g;
var a_code = 'a'.charCodeAt(0);

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line === "") return;

    var str = "";
    var m = null;

    while (m = match_re.exec(line)) {
    	var code = m[0].charCodeAt(0);
    	if (code < a_code) str += m[0]; // digit
    	else str += (code - a_code);
    }

	process.stdout.write(
		(str || 'NONE')
		+ "\n"
	);
});