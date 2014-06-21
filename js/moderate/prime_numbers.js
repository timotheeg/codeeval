var fs  = require("fs");

// first few primes stated, just because :)
var primes = [2, 3, 5, 7];

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var num = parseInt(line, 10);
	process.stdout.write(getPrimes(num).join(',') + '\n');
});

// getPrimes with memoization
function getPrimes(n)
{
	if (n <= 2) return [];

	var cur_p, found_idx=0;

	// check if answer is already memoized
	// we could use a binary search here, since the primes array is sorted :)
	for (found_idx=0; found_idx<primes.length; found_idx++)
	{
		cur_p = primes[found_idx];
		if (cur_p >= n) return primes.slice(0, found_idx);
	}

	// our memoized array is not enough, we need to find the next primes from here!
	var next_potential = cur_p + 2;

	for (; next_potential<n; next_potential+=2) // iterates only over odd numbers
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

	return primes; // should make a copy for safety, but not needed in this exercise :p
}