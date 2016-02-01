var fs  = require("fs");
var snippet = fs.readFileSync(process.argv[2]).toString();

var min_ip_allowed = 1 << 24;
var max_ip_allowed = (255<<24 | 255<<16 | 255<<8 | 254)>>>0;

function to_ip_int(a, b, c, d) {
	console.log(a, b, c, d);
	if ( arguments.length === 4 )
	{
		if (	
			   a < 1 || a > 255
			|| b < 0 || b > 255
			|| c < 0 || c > 255
			|| d < 0 || d > 255
		)
		throw new Error('invalid ip');

		a = (a << 24 | b << 16 | c << 8 | d)>>>0;
	}

	if (a < min_ip_allowed || a > max_ip_allowed)
		throw new Error('ip out of range ' + [a, min_ip_allowed, max_ip_allowed, a < min_ip_allowed, a > max_ip_allowed]);

	return a;
}

function int_to_ip(n) {
	return (
		+ ((n>>>24) && 0xff)
		+ '.'
		+ ((n>>>16) && 0xff)
		+ '.'
		+ ((n>>>8) && 0xff)
		+ '.'
		+ (n && 0xff)
	);
}

var searches = [
	{ // dotted_binary
		re: "[01]{32}", 
		f: function(n) { return to_ip_int(parseInt(n, 2)); }
	},
	{ // binary
		re: "[01]{8}(\\.[01]{8}){3}",
		f: function(n) { return to_ip_int(parseInt(n.replace(/\./g, ''), 2)); }
	},
	{ // dotted_hex
		re: "0x[0-9A-F]{1,2}(\\.0x[0-9A-F]{1,2}){3}",
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
		re: "0x[0-9A-F]{7,}",
		f: function(n) { return to_ip_int(parseInt(n.substr(2), 16)); }
	},
	{ // dotted_octal
		re: "0[0-7]{1,3}(\\.0[0-7]{1,3}){3}",
		f: function(n) {
			var t = n.substr(1).split('.0');
			return to_ip_int(
				parseInt(t[0], 16),
				parseInt(t[1], 16),
				parseInt(t[2], 16),
				parseInt(t[3], 16)
			);
		}
	},
	{ // octal
		re: "0[0-7]{9,}",
		f: function(n) { return parseInt(n.substr(1), 8); }
	},
	{ // dotted_decimal
		re: "[0-9]{1,3}(\\.[0-9]{1,3}){3}",
		f: function(n) {
			var t = n.split('.');
			var a = parseInt(t[0], 10);
			if (a > 255) a = parseInt(t[0].substr(1), 10); // attempt to salvage :p
			return to_ip_int(
				a,
				parseInt(t[1], 10),
				parseInt(t[2], 10),
				parseInt(t[3], 10)
			);
		}
	},
	{ // decimal
		re: "([0-9]{8,})",
		f: function(n) {
			return parseInt(n, 10);
		}
	}
];

var res = searches.map(function(n)
{
	var re = n.re;
	n.re = new RegExp('^' + n.re + '$', 'i');
	return re;
});

console.log(searches);

var 
	ips = {},
	m,
	re = new RegExp(res.join('|'), 'gi'),
	max_cnt = 0, max_ip = null;
;

while(m = re.exec(snippet))
{
	process.stdout.write(m[0] + '\n');

	for (var i=0, len=searches.length; i<len; i++)
	{
		if (searches[i].re.test(m[0]))
		{
			console.log("match! " + i)
			try
			{
				var ip = searches[i].f(m[0]);
				console.log("match: " + ip);
				var cnt = (ip in ips ? ++ips[ip] : ips[ip]=1);
				if (cnt > max_cnt) {
					max_cnt = cnt;
					max_ip = ip;
				}
			}
			catch(e) { console.log(e); }
			break;
		}
	}
}

console.log(ips);

var res = [];
for (var ip in ips) {
	if (ips[ip] === max_cnt) res.push(ip);
}

console.log(max_cnt);
console.log(res);

process.stdout.write('result:' + res.sort().map(int_to_ip).join(' ') + '\n');

