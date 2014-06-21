var fs  = require("fs");
var lines = fs.readFileSync(process.argv[2]).toString().split('\n');
var count = parseInt(lines.shift(), 10);

lines.sort(function(a, b){ return b.length - a.length });

process.stdout.write(lines.slice(0, count).join('\n') + '\n');