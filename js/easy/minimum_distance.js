var fs = require('fs');

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
	if (!line) return;

	var
		friends = line.split(' ').map(parseInt10),
		num_friends = friends.shift();

	// find average
	var
		avg = Math.round(friends.reduce(sum, 0) / friends.length),
		dist = get_metric(friends, avg);

	// go left and right till we hit minima
	while (true) {
		var new_dist = get_metric(friends, avg+1);

		if (new_dist < dist) {
			dist = new_dist;
			avg++;
			continue;
		}

		var new_dist = get_metric(friends, avg-1);

		if (new_dist < dist) {
			dist = new_dist;
			avg--;
			continue;
		}

		break;
	}

	process.stdout.write(
		dist
		+ '\n'
	);
});

function parseInt10(n) {
	return parseInt(n, 10);
}

function sum(aggregate, current) {
	return aggregate + current;
}

function get_metric(friends, position) {
	return friends.reduce(function(aggregate, current) {
		return aggregate + Math.abs(current - position);
	}, 0);
}