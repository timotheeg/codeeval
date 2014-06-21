var fs  = require("fs");

// javascript
// first few primes stated, just because :)
// getPrimes with memoization
var primes = [2, 3, 5, 7];
function getPrimes(n)
{
	if (n <= 2) return [];

	var cur_p, found_idx=0;

	// check if answer is already memoized
	// we could use a binary search here, since the primes array is sorted :)
	for (found_idx=0; found_idx<primes.length; found_idx++)
	{
		cur_p = primes[found_idx];
		if (cur_p > n) return primes.slice(0, found_idx);
		else if (cur_p == n) return primes.slice(0, found_idx+1);
	}

	// our memoized array is not enough, we need to find the next primes from here!
	var next_potential = cur_p + 2;

	for (; next_potential<=n; next_potential+=2) // iterates only over odd numbers
	{
		var max_possible = Math.ceil(Math.sqrt(next_potential));
		for (found_idx=1; found_idx<primes.length; found_idx++)
		{
			cur_p = primes[found_idx];
			if (cur_p > max_possible)
			{
				// we've got a prime!
				primes.push(next_potential);
				break;
			}
			else if (next_potential % cur_p === 0)
			{
				break; // not a prime
			}
		}
	}

	return primes; // should make a copy for safety
}


fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var nums = line.split(',');
	var min = parseInt(nums[0], 10);
	var max = parseInt(nums[1], 10);

	var primes = getPrimes(max), idx, len;

	for (idx=0, len=primes.length; idx<len; idx++) {
		if (primes[idx] >= min) break;
	}

	process.stdout.write((primes.length-idx) + '\n');
});