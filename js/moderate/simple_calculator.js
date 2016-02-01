var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;
	process.stdout.write(processExpression(str, 0).toFixed(5) + '\n');
});

function processExpression(str, offsetIdx) {
	var tokens = [];
	var curToken = '';
	var idx;

	function addToken() {
		if (curToken) {
			tokens.push(parseFloat(curToken));
			curToken = '';
		}
	}

	for (idx=offsetIdx; idx<str.length; idx++) {
		var c = str.charCodeAt(idx);
		switch(c) {
			case '(': 
				var sub = processExpression(str, idx+1);
				tokens.push(sub[0]);
				idx = sub[1] + 1;
				break;
			case ')':
				addToken();
				return [processTokens(tokens), idx];
			case '+':
			case '-':
			case '*':
			case '/':
			case '^':
				addToken();
				tokens.push(c);
				break;
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
			case '.':
				curToken += c;
				break;
			case ' ':
				addToken();
				break;
		}
	}

	return [processTokens(tokens), idx];
}

// process a flat expression no nesting!
// returns value index
// assumes valid expression!!
function processTokens(tokens) {
	var cur = 0;
	for (var idx=0; idx<tokens.length; idx++) {
		var token = tokens[idx];
		if (typeof(token) === 'number') {

		}
		else {
			switch(token) {
				case '^':
				case '*':
				case '/':
				case '+':
				case '-':
			}
		}
	}
}

function 
