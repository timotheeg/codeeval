require('fs')
	.readFileSync(process.argv[2])
	.toString()
	.split('\n')
	.forEach(function (line) {
		if (!line) return;

		var
			parts = line.split(' | '),
			sumHex = parts[0].split(' ').reduce(hex_reducer, 0),
			sumBin = parts[1].split(' ').reduce(bin_reducer, 0);

		process.stdout.write(
			(sumBin >= sumHex ? 'True' : 'False')
			+ '\n'
		);
	});

function hex_reducer(prev, cur) {
	return prev + parseInt(cur, 16);
}

function bin_reducer(prev, cur) {
	return prev + parseInt(cur, 2);
}