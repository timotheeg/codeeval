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
		func = hsl_to_rgb
	}
	else if (m = line.match(/^HSV\((\d+),(\d+),(\d+)\)$/i))
	{
		func = hsv_to_rgb
	}

	process.stdout.write('RGB(' + func(m) + ')\n');
});

// imlpementation of hsl/hsv conversion functions "stolen" from https://github.com/bgrins/TinyColor

function hue2rgb(p, q, t) {
	if(t < 0) t += 1;
	if(t > 1) t -= 1;
	if(t < 1/6) return p + (q - p) * 6 * t;
	if(t < 1/2) return q;
	if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	return p;
}

function hsl_to_rgb(m)
{
	var
		h = parseInt(m[1], 10) / 360,
		s = parseInt(m[2], 10) / 100,
		l = parseInt(m[3], 10) / 100,
		r, g, b;

	if(s === 0) {
		r = g = b = l; // achromatic
	}
	else {
		var
			q = l < 0.5 ? l * (1 + s) : l + s - l * s,
			p = 2 * l - q;

		r = 255 * hue2rgb(p, q, h + 1/3),
		g = 255 * hue2rgb(p, q, h),
		b = 255 * hue2rgb(p, q, h - 1/3);
	}

	return [Math.round(r), Math.round(g), Math.round(b)];
}

function hsv_to_rgb(m)
{
	var
		h = 6 * parseInt(m[1], 10) / 360,
		s = parseInt(m[2], 10) / 100,
		v = parseInt(m[3], 10) / 100;

	var
		i = Math.floor(h),
		f = h - i,
		p = v * (1 - s),
		q = v * (1 - f * s),
		t = v * (1 - (1 - f) * s),
		mod = i % 6,
		r = 255 * [v, q, p, p, t, v][mod],
		g = 255 * [t, v, v, q, p, p][mod],
		b = 255 * [p, p, t, v, v, q][mod];

	return [Math.round(r), Math.round(g), Math.round(b)];
}

// formulas in http://www.rapidtables.com/convert/color/cmyk-to-rgb.htm
function cmyk_to_rgb(t)
{
	var
		c = parseFloat(t[1]),
		m = parseFloat(t[2]),
		y = parseFloat(t[3]),
		k = parseFloat(t[4]),

		r =  255 * (1-c) * (1-k),
		g =  255 * (1-m) * (1-k),
		b =  255 * (1-y) * (1-k);

	return [Math.round(r), Math.round(g), Math.round(b)];
}

function hex_to_rgb(m)
{
	return [
		parseInt(m[1], 16),
		parseInt(m[2], 16),
		parseInt(m[3], 16)
	];
}
