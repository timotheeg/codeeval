require("fs")
	.readFileSync(process.argv[2])
	.toString()
	.split('\n')
	.forEach(function (line)
	{
		if (!line) return;

		var
			nums = line.split(' | '),
			last_count,
			size
			m_len = nums.length;
			
		// iterate through all possible matrixes, started from 1x1
		next_size:
		for (size=1; size<m_len+1; size++)
		{
			last_count = -1;

			// iterate through all nmatrixes of that size
			for (var idx=0; idx<m_len-size+1; idx++)
			{
				for (var jdx=0; jdx<m_len-size+1; jdx++)
				{
					
					// count the blacks cells of current matrix
					var count_blacks = 0;
					
					for (var kdx=idx; kdx<idx+size; kdx++)
					{
						for (var ldx=jdx; ldx<jdx+size; ldx++)
						{
							if (nums[kdx].charAt(ldx) === '1') count_blacks++;
						}
					}
					
					if (last_count < 0)
					{
						last_count = count_blacks;
					}
					else {
						if (last_count != count_blacks)
						{
							continue next_size;
						}
					}
				}
			}
			
			break;
		}

		process.stdout.write(size + 'x' + size + ', ' + last_count +  '\n');
	});

function myParseInt(n) { return parseInt(n, 10); }