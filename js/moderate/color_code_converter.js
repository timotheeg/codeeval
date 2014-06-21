var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var m, func;
	if (m = line.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i))
	{
		func = hex_to_rgb
	}
	else if (m = line.match(/^\(([0-9.]+),([0-9.]+),([0-9.]+),([0-9.]+)\)$/i))
	{
		func = cmyk_to_rgb;
	}
	else if (m = line.match(/^HSL\((\d+),(\d+),(\d+)\)$/i))
	{
		func = cmyk_to_rgb
	}
	else if (m = line.match(/^HSV\((\d+),(\d+),(\d+)\)$/i))
	{
		func = cmyk_to_rgb
	}

	process.stdout.write('RGB(' + func(m) + ')\n');
});

function hsl_to_rgb(args)
{
	// TODO
	return [0,0,0];
}

function hsv_to_rgb(args)
{
	// TODO
	return [0,0,0];
}

function cmyk_to_rgb(m)
{
	// TODO
	return [0,0,0];
}

function hex_to_rgb(m)
{
	return [
		parseInt(m[1], 16),
		parseInt(m[2], 16),
		parseInt(m[3], 16)
	];
}
