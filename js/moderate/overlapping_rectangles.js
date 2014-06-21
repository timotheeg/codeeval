var fs  = require("fs");

function myParseInt(n) { return parseInt(n, 10); }
function rectContains(r, x, y) {
	var res = (
		   x >= r.tlx && x <= r.brx
		&& y <= r.tly && y >= r.bry
	);
	return res;
}

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var nums = line.split(',').map(myParseInt);

	if (nums.length != 8) throw "invalid definition: " + line;

	var B = {
		bry: nums.pop(),
		brx: nums.pop(),
		tly: nums.pop(),
		tlx: nums.pop()
	};
	var A = {
		bry: nums.pop(),
		brx: nums.pop(),
		tly: nums.pop(),
		tlx: nums.pop()
	};

	var res = rectContains(A, B.tlx, B.tly)
		|| rectContains(A, B.tlx, B.bry)
		|| rectContains(A, B.brx, B.tly)
		|| rectContains(A, B.brx, B.bry)
		|| (B.tlx >= A.tlx && B.tlx <= A.brx && B.tly >= A.tly && B.bry <= A.bry)
		|| (B.brx >= A.tlx && B.brx <= A.brx && B.tly >= A.tly && B.bry <= A.bry)
		|| (B.tly <= A.tly && B.tly >= A.bry && B.tlx <= A.tlx && B.brx >= A.brx)
		|| (B.bry <= A.tly && B.bry >= A.bry && B.tlx <= A.tlx && B.brx >= A.brx)
		|| (B.tlx <= A.tlx && B.tly >= A.tly && B.brx >= A.brx && B.bry <= A.bry) // case where A is fully included in B

	process.stdout.write((res?'True':'False') + '\n');
});