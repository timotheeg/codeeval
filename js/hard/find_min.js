var re = /^(\d+),(\d+);(.+)$/

require("fs")
	.readFileSync(process.argv[2])
	.toString()
	.split('\n')
	.forEach(function(line)
	{
		if (!line) return;
		
		var tokens = line.split(',')
		var n = p(tokens[0]);
		var k = p(tokens[1]);
		var a = p(tokens[2]);
		var b = p(tokens[3]);
		var c = p(tokens[4]);
		var r = p(tokens[5]);
		
		var m = new Array(k);
		
		m[0] = a;
		
		for (var idx=1; idx<k; idx++)
		{
			m[idx] = a = (a * b + c) % r;
		}
		
		var val;
		var buffer = new ArrayBuffer(Math.ceil(r/8));
		var d = new Uint8Array(buffer);
		
		for (var idx=k; idx<n; idx++)
		{
			// brute force, compute clean every time
			d.fill(0);
			
			for (var jdx=k; jdx--; ) setBit(d, m[jdx]);
			
			val = getFirstZeroIndex(d);
			 
			m.shift();
			m.push(val);
		}
		
		process.stdout.write(m.pop() + '\n');
	});
	
function p(n)
{
	return parseInt(n, 10);
}

function setBit(store, index, val)
{
	var byteIdx = Math.floor(index / 8);
	var bitIdx = index % 8;

	var byte = store[byteIdx];

	byte |= (1 << bitIdx);
	
	store[byteIdx] = byte;
}

function getFirstZeroIndex(store)
{
	for (var byteIdx=0; byteIdx<store.length; byteIdx++)
	{
		var byte = store[byteIdx];
		
		for (var bitIdx=0; bitIdx<8; bitIdx++)
		{
			if ((byte & (1 << bitIdx)) === 0)
			{
				return byteIdx * 8 + bitIdx;
			}
		}
	}

	throw new Error('No zero found');
}
