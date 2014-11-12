var fs  = require("fs");

var tuple_re = /\((\d+),(\d+)\)/g;

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;

	var m, points = [];
	while(m = tuple_re.exec(line)) points.push({x:parseInt(m[1], 10), y:parseInt(m[2], 10)});

	process.stdout.write(line + ' : ' + is_square(points) + '\n');
});


function is_square(p)
{
	var
		v01 = getVector(p[0], p[1]),
		v02 = getVector(p[0], p[2]);

	if (areUniformlyPerpendicular(v01, v02)) {
		return pointEqual(
			p[3],
			getPoint(p[2], v01)
		);
	}

	var
		v10 = getVector(p[1], p[0]),
		v12 = getVector(p[1], p[2]);

	if (areUniformlyPerpendicular(v10, v12)) {
		return pointEqual(
			p[3],
			getPoint(p[2], v10)
		);
	}

	var
		v20 = getVector(p[2], p[0]),
		v21 = getVector(p[2], p[1]);

	if (areUniformlyPerpendicular(v20, v21)) {
		return pointEqual(
			p[3],
			getPoint(p[1], v20)
		);
	}

	return false;
}

function getVector(p1, p2) {
	return {dx: p2.x - p1.x, dy: p2.y - p1.y};
}

function areUniformlyPerpendicular(v1, v2) {
	return !(v1.dx === 0 && v1.dy === 0) && (
		vectorEqual({dx:v2.dy, dy:-v2.dx}, v1)
		||
		vectorEqual({dx:-v2.dy, dy:v2.dx}, v1)
	);
}

function vectorEqual(v1, v2) {
	return v1.dx === v2.dx && v1.dy === v2.dy;
}

function pointEqual(p1, p2) {
	return p1.x === p2.x && p1.y === p2.y;
}

function getPoint(p, v) {
	return {x: p.x + v.dx, y: p.y + v.dy};
}