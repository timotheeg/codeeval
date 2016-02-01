var
	fs   = require("fs"),
	map,
	root;

function byName(a, b) {
	return a.name < b.name ? -1 : 1;
}

function Employee(name)
{
	this.name = name;
	this.subordinates_map = {};
	this.subordinates_arr = [];
	this.manager = null;
}

Employee.get = function(name)
{
	return map[name] || (map[name] = new Employee(name));
};

Employee.prototype.hasSubordinates = function()
{
	return this.subordinates_arr.length > 0;
};

Employee.prototype.setSubordinate = function(name)
{
	if (this.subordinates_map[name]) return;

	var subdordinate = Employee.get(name);
	subdordinate.manager = this;
	this.subordinates_map[name] = subdordinate;
	this.subordinates_arr.push(subdordinate);

	if (!root) root = this;
	if (!this.manager) root = this;
};

Employee.prototype.toString = function()
{
	if (this.hasSubordinates()) {
		this.subordinates_arr.sort(byName);
		return this.name + ' [' + this.subordinates_arr.join(', ') + ']';
	}
	else {
		return this.name;
	}
};

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (!line) return;

	map  = {};
	root = null;

	line.split(' | ').forEach(function(pair)
	{
		Employee.get(pair.charAt(0)).setSubordinate(pair.charAt(1));
	});

	process.stdout.write(
		root
		+ "\n"
	);
});