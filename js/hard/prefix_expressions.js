var fs  = require("fs");
var util = require("util");

function make_tree(exp)
{
	var root = {};
	var node = root;
	var stack = [];
	for (var idx=0; idx<exp.length; idx++)
	{
		var v = exp[idx];
		switch(v) {
			case '*':
			case '/':
			case '+':
				node.op = v;
				node.l = {};
				node.r = {};
				stack.push(node.r);
				node = node.l;
				break;

			default:
				v = parseInt(v, 10);
				node.v = v;
				node = stack.pop();
		}
	}

	return root;
}

function process_tree(tree)
{
	if ('v' in tree) return tree.v;

	var v_l = process_tree(tree.l);
	var v_r = process_tree(tree.r);
	switch(tree.op) {
		case '*': return v_l * v_r;
		case '+': return v_l + v_r;
		case '/': return v_l / v_r;
	}
	throw "meh!";
}

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
    if (line === "") return;

    var exp = line.split(/\s+/);
    process.stdout.write(process_tree(make_tree(exp)) + '\n');
});


