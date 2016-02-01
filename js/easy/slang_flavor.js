var fs  = require("fs");

var ends = [
	', yeah!',
	', this is crazy, I tell ya.',
	', can U believe this?',
	', eh?',
	', aw yea.',
	', yo.',
	'? No way!',
	'. Awesome!'
];

var
	source = fs.readFileSync(process.argv[2]).toString(),
	replace_counter = 0,
	ends_walker = 0,
	ends_len = ends.length,
	slangified = source.replace(/[.!?]/g, function(m) {
		if (replace_counter++ % 2 === 0) return m[0];
		return ends[ends_walker++ % ends_len];
	});

process.stdout.write(slangified);
