var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var digits = line.split('').map(myParseInt);
	var done = false;

	for (var idx = digits.length; idx-->1;) {
		if (digits[idx] > digits[idx-1]) {
			var suffix = digits.slice(idx-1);
			var cur_lead = suffix[0];
			suffix.sort(num_sort);
			var new_lead_idx = find_next_biggest_number_index(suffix, cur_lead);
			var new_lead = suffix.splice(new_lead_idx, 1)[0];
			suffix.unshift(new_lead);
			digits = digits.slice(0, idx-1).concat(suffix);
			done = true;
			break;
		}
	}

	if (!done) {
		digits.sort(num_sort);
		var new_lead_idx = find_next_biggest_number_index(digits, 0);
		var new_lead = digits.splice(new_lead_idx, 1)[0];
		digits.unshift(new_lead, 0);
	}

	process.stdout.write(digits.join('') + "\n");
});

function myParseInt(n) {
	return parseInt(n, 10);
}

function num_sort(a, b) {
	return a - b;
}

function find_next_biggest_number_index(sorted_digits, reference_num) {
	for (var idx=0, len=sorted_digits.length; idx<len; idx++) {
		if (sorted_digits[idx] > reference_num) return idx;
	}
}