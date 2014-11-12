var fs  = require("fs");

var Months = {
	Jan: 0,
	Feb: 1,
	Mar: 2,
	Apr: 3,
	May: 4,
	Jun: 5,
	Jul: 6,
	Aug: 7,
	Sep: 8,
	Oct: 9,
	Nov: 10,
	Dec: 11
};

var months_per_year = 12;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	// assumes format is strict!
	var slots = line.trim().split(/;\s+/).map(date_range_to_monthstamp_array);

	// ok so now we have an array of monthstamp tuples
	// we must join all tuples which overlap
	var merged_slots = [slots.shift()];
	while(slots.length) {
		var candidate_slot = slots.pop();
		for (var idx=merged_slots.length; idx--;) {
			var cur_slot = merged_slots[idx];
			if (
				   (candidate_slot[0] >= cur_slot[0] && candidate_slot[0] <= cur_slot[1]) // start date of candidate slot is in within current slot
				|| (candidate_slot[1] >= cur_slot[0] && candidate_slot[1] <= cur_slot[1]) // end date of candidate slot is in within current slot
				|| (cur_slot[0] >= candidate_slot[0] && cur_slot[0] <= candidate_slot[1]) // cur_slot is contained within candidate slot
			)
			{
				merged_slots.splice(idx, 1);
				candidate_slot[0] = Math.min(cur_slot[0], candidate_slot[0]);
				candidate_slot[1] = Math.max(cur_slot[1], candidate_slot[1]);
			}
		}

		merged_slots.push( candidate_slot );
	}

	// ok, so now we have the remainding non-overlapping slots, time to compute actual running time in months
	var work_months = 0;
	merged_slots.forEach(function(slot) {
		work_months += slot[1] - slot[0];
	});

	// and finally, convert to year and report. Phew!
	process.stdout.write( Math.floor(work_months / months_per_year) + '\n' );
});

function date_range_to_monthstamp_array(slot) {
	var range = slot.split(/\s*-\s*/).map(date_str_to_monthstamp);
	range[1]++; // the end month is inclusive, so the actual monthstamp is one month later
	return range;
}

function date_str_to_monthstamp(date) {
	var tokens = date.split(/\s+/);
	return parseInt(tokens[1], 10) * 12 + Months[tokens[0]];
}