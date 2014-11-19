var circuits_by_id = {};

var circuit_re = /^C (C\d+) H:(\d+) E:(\d+) P:(\d+)$/i;
var juggler_re = /^J (J\d+) H:(\d+) E:(\d+) P:(\d+) (C\d+(?:,C\d+)*)$/i;

var JUGGLERS_PER_CIRCUIT = 12000/2000;
var TARGET_CIRCUIT = 1970;

// var JUGGLERS_PER_CIRCUIT = 12/3;
// var TARGET_CIRCUIT = 2;

require("fs").readFileSync(process.argv[2]).toString().split('\n').forEach(function(line)
{
	if (!line) return;

	if (line.charAt(0) === 'C') {
		var m = line.match(circuit_re);
		var circuit = {
			id: m[1],
			h: parseInt(m[2], 10),
			e: parseInt(m[3], 10),
			p: parseInt(m[4], 10),
			jugglers: []
		};
		circuits_by_id[circuit.id] = circuit;
	}
	else {
		// let's assume all circuits are done
		var
			m = line.match(juggler_re),
			h = parseInt(m[2], 10),
			e = parseInt(m[3], 10),
			p = parseInt(m[4], 10),
			preferred_circuits_ids = m[5].split(',');

		var juggler = {
			id: m[1],
			h: h,
			e: e,
			p: p,
			preferred_circuits_ids: preferred_circuits_ids,
			circuit_idx: 0,
			score: 0
		};

		do {
			var circuit_id;
			
			if (juggler.circuit_idx >= juggler.preferred_circuits_ids.length) {
				// juggler preferences are exhausted, now we try to place him in arbitrary groups... in order... *sucks*
				circuit_id = 'C' + (juggler.circuit_idx - juggler.preferred_circuits_ids.length + 1);
			}
			else {
				circuit_id = juggler.preferred_circuits_ids[juggler.circuit_idx];
			}

			var circuit = circuits_by_id[circuit_id];

			juggler.score =
				  juggler.h * circuit.h
				+ juggler.e * circuit.e
				+ juggler.p * circuit.p;

			insert(circuit.jugglers, juggler);

			if (circuit.jugglers.length <= JUGGLERS_PER_CIRCUIT) {
				break;
			}

			juggler = circuit.jugglers.pop(); // pops the one which has been ejected
			juggler.circuit_idx++;
		}
		while(true);
	}
});

// OK, data is parsed! Let's get to work

// now sum up the juggler ids for circuit 1970
var circuit = circuits_by_id['C' + TARGET_CIRCUIT];
var sum = 0;
for (var idx=circuit.jugglers.length; idx--;) {
	sum += parseInt(circuit.jugglers[idx].id.substr(1), 10);
}

process.stdout.write(sum + '\n');

// ordered insert from https://github.com/javascript/sorted-array/blob/master/sorted-array.js
// doesn't look like it's the most efficient, versus finding spot and splicing...
// keeping for now to assess algo's validity
function insert(array, element, id)
{
	var index = array.length;
	array.push(element);

	while (index) {
		var i = index, j = --index;

		if (array[i].score > array[j].score) {
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}
};
