var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
    if (line === "") return;

    var strs = line.split(";");
    var str1 = strs[0];
    var str2 = strs[1];

    var str1_possibles = get_all_substr(str1);
    var str2_possibles = get_all_substr(str2);

    console.log(str1_possibles);
    console.log(str2_possibles);

    var str2_map = arr_to_map(str2_possibles);
    var res = '';

    for (var idx=str1_possibles.length; idx--;) {
        var str = str1_possibles[idx];
        if (!str2_map[str]) continue;
        if (str.length <= res.length) continue;
        res = str;
    }

    process.stdout.write(res + '\n');
});


function get_all_substr(str) {
	if (str.length == 1) return [str];

	var res = get_all_substr(str.substr(1));
	var c = str.charAt(0);

	for (var idx=res.length; idx--; ) {
		res.push(c + res[idx]);
	}

	res.push(c);

	return res;
}

function arr_to_map(arr) {
	var map = {};
	for (var idx=arr.length; idx--; ) {
		map[arr[idx]] = 1;
	}
	return map;
}
