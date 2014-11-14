var fs  = require("fs");

var abs = Math.abs;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
  if (line === "") return;

  var
    tokens = line.split(/\s+/),
    lower = 0,
    upper = parseInt(tokens[0], 10),
    idx = 1,
    cur;
    
  do {
    cur = Math.ceil((lower + upper) / 2);
    switch(tokens[idx++]) {
      case 'Lower':
	upper = cur-1; break;
      case 'Higher':
	lower = cur+1; break;
      case 'Yay!':
	return process.stdout.write(cur + '\n');
    }
  }
  while(1); // assume sane inputs!
});