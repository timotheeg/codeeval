// n is a half-x number if exactly half of the number [1-n] (both inclusive) contain the digit x in them eactly once
// Problem: find the first number who is both half-2 and half-3

var counted = [];
/*
var cur = 2;
do {
	if (isHalfX(cur, 2) && isHalfX(cur, 3)) break;
	cur += 2; // otherwise there's no exact half, ah!
}
while(true);

console.log(cur);
/**/

console.log(countDigits(2002));

// very innefficient search
function isHalfX(n, x) {
	console.log('isHalfX', n, x);
	var count = 0;
	for (var idx=n+1; idx-- > 1;) {
		var digits = countDigits(idx);
		// console.log(idx);
		// console.log(digits);
		if (digits[x] === 1) count++;
	}
	// console.log('count === x / 2:: ', count, n, n/2, count === n / 2);

	return (count === n / 2);
}

function countDigits(n) {
	if (counted[n]) return counted[n];
	// console.log('countDigits', n);
	var res = new Array(10);
	var s = n + '';
	// console.log('s', s);
	for (var idx=s.length; idx--;)
	{
		var c = s.charAt(idx);
		// console.log('s.charAt(idx)', s, idx, c)
		res[c] = 1 + (res[c] || 0);
	}
	return counted[n] = res;
}

