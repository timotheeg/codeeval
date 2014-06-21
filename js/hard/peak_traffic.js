var fs  = require("fs");

var map = {};

function GraphNode(value)
{
	this.value = value;
	this.links = {};
}

GraphNode.map = {};
GraphNode.getNodeByValue = function(value)
{
	return this.map[value] || (this.map[value] = new GraphNode(value));
};

var g = GraphNode.prototype;

g.linksTo = function(node)
{
	var link = this.links[node.value];
	if (!link)
	{
		link = this.links[node.value] = {node: node, count: 0};
	}
	link.count++;
};

var input = fs.readFileSync(process.argv[2]).toString().split("\n").forEach(function(line)
{
	if (!line) return;
	var tokens = line.split('\n');

	var sender = GraphNode.getNodeByValue(tokens[1]);
	var receiver = GraphNode.getNodeByValue(tokens[2]);

	sender.linksTo(receiver);
});

// k, so we have a graph now... 

process.stdout.write(
	row.join('') + '\n'
);
