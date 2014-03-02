var fs  = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line === "") return;

    var json = JSON.parse(line);
    if (!json || !json.menu || !json.menu.items) return;
    var items = json.menu.items;

    var sum = 0;

    for (var idx=items.length; idx-->0; )
    {
        var item = items[idx];
        
        if (!item) continue;

        if (item.hasOwnProperty("label"))
        {
            if (item.hasOwnProperty("id")) {
                sum += item.id;
            }
        }
    }

	process.stdout.write(
		sum
		+ "\n"
	);
});