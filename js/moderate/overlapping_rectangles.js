require("fs")
	.readFileSync(process.argv[2])
	.toString()
	.split('\n')
	.forEach(function (line)
	{
		if (!line) return;

		var
			nums = line.split(',').map(myParseInt)
			idx = 0;

		var B = {
			left:   nums[idx++],
			top:    nums[idx++],
			right:  nums[idx++],
			bottom: nums[idx++],
		};

		var A = {
			left:   nums[idx++],
			top:    nums[idx++],
			right:  nums[idx++],
			bottom: nums[idx++],
		};

		var res = (
			   A.top >= B.bottom
			&& A.bottom <= B.top
			&& A.left <= B.right
			&& A.right >= B.left
		);

		process.stdout.write((res ? 'True' : 'False') + '\n');
	});

function myParseInt(n) { return parseInt(n, 10); }