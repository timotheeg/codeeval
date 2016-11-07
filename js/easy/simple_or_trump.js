require('fs')
	.readFileSync(process.argv[2])
	.toString()
	.split('\n')
	.forEach(function (line) {
		if (!line) return;

		var card1, v1, card2, v2, val, trump;

		var tokens = line.split(' ');
		card1 = tokens[0];
		card2 = tokens[1];
		trump = tokens[3];

		val = card1.slice(0, -1);
		v1 = parseInt(val, 10);
		if (!v1) { // NaN card is a face
			switch(val) {
				case 'A' : v1 = 14; break;
				case 'K' : v1 = 13; break;
				case 'Q' : v1 = 12; break;
				case 'J' : v1 = 11; break;
			}
		}
		if (card1.slice(-1) === trump) v1 <<= 4;

		val = card2.slice(0, -1);
		v2 = parseInt(val, 10);
		if (!v2) { // NaN card is a face
			switch(val) {
				case 'A' : v2 = 14; break;
				case 'K' : v2 = 13; break;
				case 'Q' : v2 = 12; break;
				case 'J' : v2 = 11; break;
			}
		}
		if (card2.slice(-1) === trump) v2 <<= 4;

		process.stdout.write(
			(v1 === v2 ? card1 + ' ' + card2 : v1 > v2 ? card1 : card2)
			+ '\n'
		);
	});