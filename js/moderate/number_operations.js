var
	operators = ['+', '-', '*'],
	operations = getOperations(4);

require("fs")
	.readFileSync(process.argv[2])
	.toString().split('\n')
	.forEach(function (line)
	{
		if (!line) return;

		var
			tokens = line.split(' ').map(parseInt10),
			operands = getOperands(tokens);

		process.stdout.write( (check42(operands, operations) ? 'YES' : 'NO') + "\n" );
	});

function parseInt10(n)
{
	return parseInt(n, 10);
}

function toArr(n) {
	return [n];
}

function getOperations(n)
{
	var operations = [];

	for (var idx = operators.length; idx--; ) {
		var current = [operators[idx]];

		if (n > 1) {
			remainder_ops = getOperations(n-1);

			for (var jdx=remainder_ops.length; jdx--; ) {
				operations.push(
					current.concat(remainder_ops[jdx])
				);
			}
		}
		else {
			operations.push(current);
		}
	}

	return operations;
}

function getOperands(nums)
{
	var len = nums.length;

	if (len <= 1) return nums.map(toArr);

	var combinations = [];

	for (var idx = len; idx--; ) {
		var current = [nums[idx]];

		var remainder_operands = getOperands( nums.slice(0, idx).concat(nums.slice(idx+1)) );

		for (var jdx=remainder_operands.length; jdx--; ) {
			combinations.push(
				current.concat(remainder_operands[jdx])
			);
		}
	}

	return combinations;
}

function check42(operands_list, operators_list)
{
	for (var idx=operands_list.length; idx--; )
	{
		var operands = operands_list[idx];

		for (var jdx=operators_list.length; jdx--; )
		{
			var
				cur = operands[0],
				operators = operators_list[jdx];

			for (var kdx=0; kdx<operators.length; kdx++)
			{
				switch( operators[kdx] ) {
					case '+':
						cur += operands[kdx+1];
						break;
					case '-':
						cur -= operands[kdx+1];
						break;
					case '*':
						cur *= operands[kdx+1];
						break;
				}
			}

			if (cur == 42) return true;
		}
	}

	return false;
}