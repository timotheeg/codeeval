var isLittle = ((new Uint32Array((new Uint8Array([1,2,3,4])).buffer))[0] === 0x04030201);
process.stdout.write((isLittle ? 'LittleEndian' : 'BigEndian') + '\n');
