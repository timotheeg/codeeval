var fs  = require("fs");
var multi_char_re = /(.)\1+/g;
function shrink_multi(m) { return m[1]; }
var content = fs.readFileSync(process.argv[2]).toString();
process.stdout.write(content.replace(multi_char_re, shrink_multi));
