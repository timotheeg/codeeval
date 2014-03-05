var fs  = require("fs");

var map = get_map();

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	for (var idx=0; idx<line.length; idx++)
	{
		process.stdout.write(map[line.charAt(idx)]);
	}

	process.stdout.write('\n');
});

function get_map()
{
	var input = "rbc vjnmkf kd yxyqci na rbc zjkfoscdd ew rbc ujllmcp tc rbkso rbyr ejp mysljylc kd kxveddknmc re jsicpdrysi de kr kd eoya kw aej icfkici re zjkr";
	var output = "the public is amazed by the quickness of the juggler we think that our language is impossible to understand so it is okay if you decided to quit";
	var map = {};

	for (var idx=output.length; idx--;)
	{
		map[input.charAt(idx)] = output.charAt(idx);
	}

    // manual inputs
    map['g'] = 'v';
    map['h'] = 'x';

	return map;
}