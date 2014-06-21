var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
    if (line === "") return;

    var args = line.split(",");
    var len = parseInt(args[0], 10);
    var chars = args[1].split('').sort();

    // removes duplicate chars
    for (var i=chars.length; i-->1; ) if (chars[i] === chars[i-1]) chars.splice(i, 1);

    process.stdout.write(res + '\n');
});

function get_lists(chars)
{
	
}
