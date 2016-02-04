var snippet = require("fs").readFileSync(process.argv[2]).toString();

function to_ip_int(a, b, c, d) {
	return (a << 24 | b << 16 | c << 8 | d)>>>0;
}

function int_to_ip(n) {
	return (
		+ ((n>>>24) & 0xff)
		+ '.'
		+ ((n>>>16) & 0xff)
		+ '.'
		+ ((n>>>8) & 0xff)
		+ '.'
		+ (n & 0xff)
	);
}

var searches = [
	{ // binary
		re: "[01]{32}", 
		f: function(n) { return parseInt(n, 2); }
	},
	{ // dotted binary
		re: "[01]{8}(\\.[01]{8}){3}",
		f: function(n) { return parseInt(n.replace(/\./g, ''), 2); }
	},
	{ // dotted_hex
		re: "0x[0-9A-F]{2}(\\.0x[0-9A-F]{2}){3}",
		f: function(n) {
			var t = n.substr(2).split('.0x');
			return to_ip_int(
				parseInt(t[0], 16),
				parseInt(t[1], 16),
				parseInt(t[2], 16),
				parseInt(t[3], 16)
			);
		}
	},
	{ // hex
		re: "0x[0-9A-F]{8}",
		f: function(n) { return to_ip_int(parseInt(n.substr(2), 16)); }
	},
	{ // dotted_octal
		re: "0[0123][0-7]{2}(\\.0[0123][0-7]{2}){3}",
		f: function(n) {
			var t = n.substr(1).split('.0');
			return to_ip_int(
				parseInt(t[0], 8),
				parseInt(t[1], 8),
				parseInt(t[2], 8),
				parseInt(t[3], 8)
			);
		}
	},
	{ // octal
		re: "0[123]?[0-7]{9,10}",
		f: function(n) { return parseInt(n.substr(1), 8); }
	},
	{ // dotted_decimal
		re: "(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}",
		f: function(n) {
			var t = n.split('.');
			return to_ip_int(
				parseInt(t[0], 10),
				parseInt(t[1], 10),
				parseInt(t[2], 10),
				parseInt(t[3], 10)
			);
		}
	}
	/*,
	{ // decimal
		re: "([0-9]{8,10})",
		f: function(n) {
			return parseInt(n, 10);
		}
	}
	/**/
];

var res = searches.map(function(n)
{
	var re = n.re;
	n.re = new RegExp('^' + n.re + '$', 'i');
	return re;
});

var 
	ips = {},
	m,
	re = new RegExp(res.join('|'), 'gi'),
	max_cnt = 0;
;

while(m = re.exec(snippet))
{
	for (var i=0, len=searches.length; i<len; i++)
	{
		if (searches[i].re.test(m[0]))
		{
			var ip = searches[i].f(m[0]).toString(16);
			
			var cnt = (ip in ips ? ++ips[ip] : ips[ip]=1);
			
			if (cnt > max_cnt) max_cnt = cnt;
			
			break;
		}
	}
}

var res = [];
for (var ip in ips) {
	if (ips[ip] === max_cnt) res.push(parseInt(ip, 16));
}

process.stdout.write(res.sort(byNumAsc).map(int_to_ip).join(' ') + '\n');

function byNumAsc(a, b)
{
	return a - b;
}

