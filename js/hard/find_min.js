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
		
		// create a Buffer to accomodate the size of the data, one bit per index
		var num_int32 = Math.ceil(r / 32);
		var buffer = new ArrayBuffer(num_int32 * 4);
		var store = new DataView(buffer);
		
		// store the first k elements
		do
		{
			setBit(store, a);
			a = (a * b + c) % r;
		}
		while(--k)

			
		// fill the rest of the array
		var curInt32 = 0;
		var curBitIdx = 0;
		var toFind = n - k;
		var res;

		// iterate through all the non-1 element until the desired one is found
		main:
		while(curInt32 < store.byteLength)
		{
			var int32 = store.getUint32(curInt32);
			console.log(curInt32, ':', int32);

			for (curBitIdx=0; curBitIdx<32; curBitIdx++)
			{
				if (int32 & (1 << curBitIdx) === 0)
				{
					if (--toFind <= 0)
					{
						console.log('found!');
						break main;
					}
				}
			}

			curInt32 += 4; // advance by 32 bits
		}
		
		console.log('res', curInt32, curBitIdx, toFind);
		
		if (curInt32 >= store.byteLength) {
			// we've exhausted all number lower than r
			res = store.byteLength * 8 + toFind;
		}
		else {
			res = curInt32 * 32 + curBitIdx + 1;
		}
		
		process.stdout.write(res + '\n');
	});
	
function p(n) {
	return parseInt(n, 10);
}

function setBit(store, index) {
	var int32Idx = Math.floor(index / 32);
	var bitIdx = index % 32;

	console.log('setBit', index, int32Idx, bitIdx, store.byteLength);

	var int32 = store.getUint32(int32Idx * 4);

	int32 |= (1 << bitIdx);
	
	store.setUint32(int32Idx * 4, int32);
}