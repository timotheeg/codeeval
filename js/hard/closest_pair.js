var fs  = require("fs");
var lines = fs.readFileSync(process.argv[2]).toString().split('\n');
var num_points = parseInt(lines.shift(), 10);
function conv(n) {return parseInt(n, 10);}
var points = lines.slice(0, num_points).map(function(l){ return l.split(/\s+/).map(conv); });

var min_distance = Infinity;
for (var idx=points.length; idx--;) {
    
}