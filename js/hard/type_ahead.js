var fs  = require("fs");

var words = ['Mary','had','a','little','lamb','its','fleece','was','white','as','snow','And','everywhere','that','Mary','went','the','lamb','was','sure','to','go','It','followed','her','to','school','one','day','which','was','against','the','rule','It','made','the','children','laugh','and','play','to','see','a','lamb','at','school','And','so','the','teacher','turned','it','out','but','still','it','lingered','near','And','waited','patiently','about','till','Mary','did','appear','Why','does','the','lamb','love','Mary','so','the','eager','children','cry','Why','Mary','loves','the','lamb','you','know','the','teacher','did','reply'];
var memory = {};
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function(line)
{
	if (!line) return;
	if (memory[line]) {
		return process.stdout.write(memory[line] + '\n');
	}

	var args = line.split(',');
	var ngram_len = parseInt(args[0], 10) - 1;
	var word_seq = args[1].split(/\s+/); // words should be an array of ngram_len-1 length

	var map = {};
	var occurences = 0;
	for (var idx = words.length-ngram_len-1; idx--;)
	{
		var match_idx = 0;
		while(match_idx<ngram_len && words[idx + match_idx] === word_seq[match_idx]) match_idx++;
		if (match_idx >= ngram_len)
		{
			var w = words[idx + ngram_len];
			map[w] = 1 + (map[w] || 0);
			occurences++;
		}
	}

	// map to array for sorting
	var predictions = [];
	for (var k in map)
	{
		predictions.push([k, map[k] / occurences]);
	}

	predictions.sort(prediction_sort);
	process.stdout.write((memory[line] = predictions.map(item_to_str).join(';')) + '\n');
});

function prediction_sort(a, b)
{
	if (b[1] === a[1]) return a[0] < b[0] ? -1 : 1;
	return b[1] - a[1];
}

function item_to_str(item)
{
	return item[0] + ',' + item[1].toFixed(3);
}
