var fs  = require("fs");

var morse_map = {
".-": "A",
"-...": "B",
"-.-.": "C",
"-..": "D",
".": "E",
"..-.": "F",
"--.": "G",
"....": "H",
"..": "I",
".---": "J",
"-.-": "K",
".-..": "L",
"--": "M",
"-.": "N",
"---": "O",
".--.": "P",
"--.-": "Q",
".-.": "R",
"...": "S",
"-": "T",
"..-": "U",
"...-": "V",
".--": "W",
"-..-": "X",
"-.--": "Y",
"--..": "Z",
"-----": "0",
".----": "1",
"..---": "2",
"...--": "3",
"....-": "4",
".....": "5",
"-....": "6",
"--...": "7",
"---..": "8",
"----.": "9",
"": " "
};

function map_morse(c) { return morse_map[c]; }

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	process.stdout.write(
		line.split(' ').map(map_morse).join(''	)
		+ '\n'
	);
});