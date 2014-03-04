var fs  = require("fs");

var uri_re = /^(.+):\/\/([^@]+@)?([^\/:]+)(:\d+)?([^?#]+)?(\?[^#]+)?(#.*)?$/;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var uris = line.split(';');

	process.stdout.write(
		(eq(normalize(uris[0]), normalize(uris[1])) ? 'True' : 'False')
		+ "\n"
	);
});

function normalize(uri) {
	var m = uri.match(uri_re);
	var res = {
		scheme: m[1].toLowerCase(),
		auth: m[2] || '',
		host: m[3].toLowerCase(),
		port: (m[4] && parseInt(m[4].substr(1), 10)) || 80,
		path: normalize_path(m[5] || '/'),
		query: m[6] || '',
		hash: m[7] || ''
	};

	return res;
}

function normalize_path(path) {
	var tokens = path.split('/')
	var res = [];
	for (var idx=tokens.length; idx--; ) {
		var token = tokens[idx];
		if (token == '.') ;
		else if (token == '..') idx--;
		else res.unshift(escape(unescape(token)));
	}

	return res.join('/');
}

function eq(uri1, uri2) {
	return (uri1.scheme == uri2.scheme
		&& uri1.auth == uri2.auth
		&& uri1.host == uri2.host
		&& uri1.port == uri2.port
		&& uri1.path == uri2.path
		&& uri1.query == uri2.query
		&& uri1.hash == uri2.hash
	);
}
