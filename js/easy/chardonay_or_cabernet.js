var fs  = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;
	
	var tokens = line.split(/\s*\|\s*/);
	var letters = tokens[1];
	var words = tokens[0].split(' ').map(to_data).filter(function(w) { return has_all_letters(w, letters); });
	
	process.stdout.write(
		(words.length ? words.map(get_word).join(' ') : 'False')
		+ "\n"
	);
});

function to_data(word)
{
	var
		map = {},
		w = word.toLowerCase(),
		c;

	for (var idx=w.length; idx--; )
	{
		c = w.charAt(idx);
		if (map[c])
			map[c]++;
		else
			map[c] = 1;
	}
	
	return {
		word: word,
		map: map
	};
}

function has_all_letters(w, letters)
{
	var map = w.map;
	letters = letters.toLowerCase();
	
	for (var idx=letters.length; idx--; )
	{
		var c = letters.charAt(idx);
		if (!map[c]) return false;
		map[c]--;
	}
	
	return true;
}

function get_word(item)
{
	return item.word;
}
