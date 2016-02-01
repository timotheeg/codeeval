var fs  = require("fs");

var nums = [
	parseInt('11111100', 2),
	parseInt('01100000', 2),
	parseInt('11011010', 2),
	parseInt('11110010', 2),
	parseInt('01100110', 2),
	parseInt('10110110', 2),
	parseInt('10111110', 2),
	parseInt('11100000', 2),
	parseInt('11111110', 2),
	parseInt('11110110', 2)
];

function binaryParse(n) {
	return parseInt(n, 2);
}

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var
		tokens   = line.split(';'),
		leds     = tokens[0].split(' ').map(binaryParse),
		leds_len = leds.length,
		num      = tokens[1],
		digits   = [],
		can_fit  = false,
		digi_len
	;

	for (var idx=0; idx<num.length; idx++) {
		var c = num.charAt(idx);
		if (c === '.') digits[digits.length-1] |= 1;
		else digits.push(nums[parseInt(c, 10)]);
	}

	digi_len = digits.length;

	// now we verify if we can fit the number
	outer:
	for (var led_idx=0; led_idx<leds_len; led_idx++) {
		var
			run_led_idx = led_idx,
			run_digi_idx = 0
		;

		do {
			var shown = leds[run_led_idx] & digits[run_digi_idx];
			if (shown != digits[run_digi_idx]) {
				continue outer;
			}
			// digit can be displayed on leds. Check if number is fully displayed
			if (++run_digi_idx >= digi_len) {
				// console.log("can fit");
				can_fit = true;
				break outer;
			}
			if (++run_led_idx >= leds_len) {
				break outer;
			}
		} while(true);
	}

	process.stdout.write((can_fit ? 1 : 0) + '\n');
});
