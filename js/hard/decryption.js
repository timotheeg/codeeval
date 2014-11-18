var msg = "012222 1114142503 0313012513 03141418192102 0113 2419182119021713 06131715070119";
var key = "BHISOECRTMGWYVALUZDNFJKPQX";
var alp = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var decrypted = msg.split(/\s+/).map(function(word) {
	var l = word.length, idx=0, target = '';
	while(idx<l) {
		var token = word.substr(idx, 2);
		var char_idx = parseInt(token, 10);
		var char = alp.charAt(char_idx);

		char_idx = key.indexOf(char);
		char = alp.charAt(char_idx);

		target += char;
		idx += 2;
	}
	return target;
});

console.log(decrypted.join(' '));