var fs  = require("fs");

var keys = get_keys(7);

function get_header_map(headers)
{
	var map = {};

	for (var idx=0; idx<headers.length; idx++) 
	{
		map[keys[idx]] = headers.charAt(idx);
	}

	return map;
}

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var msg_re = /^(.+?)([01]+)$/;
	var m = line.match(msg_re);
	if (!m) process.stdout.write(line + "\n");

	var map = get_header_map(m[1]);
	var msg = m[2];

	var idx = 0;
	var decoded = "";

	while(idx < msg.length)
	{
		// read length
		var code, field_size = parseInt(msg.substr(idx, 3), 2);
		idx += 3;

		if (field_size <= 0) break;

		while (true)
		{
			code = msg.substr(idx, field_size);
			idx += field_size;

			if (code.indexOf('0') <= -1) break;
			else decoded += map[code];
		}
	}

	process.stdout.write(decoded + "\n");
});

function get_keys(max_length) {
	var keys = [];

	for (var len=1; len<=max_length; len++)
	{
		var max = Math.pow(2, len);
		// max-1 to omit the full 1s instances
		for (var idx=0; idx<max-1; idx++)
		{
			keys.push(pad_right(idx.toString(2), len));
		}
	}

	return keys;
}

function pad_right(str, desired_len) {
	while (str.length < desired_len) {
		str = '0' + str;
	}
	return str;
}