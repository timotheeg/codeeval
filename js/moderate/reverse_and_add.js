var fs  = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var num = parseInt(line, 10);
	var add_cnt = 0;

	while(!isPalindrome(num)) {
		add_cnt++;
		num += parseInt((num+'').split('').reverse().join(''), 10);
	}

	process.stdout.write(add_cnt + ' ' + num + '\n');
});

function isPalindrome(num) {
	var s = num + '';
	var start_idx = 0;
	var end_idx = s.length-1;
	while(s.charAt(start_idx++) === s.charAt(end_idx--)) {
		if (start_idx >= end_idx) return true;
	}
	return false;
}