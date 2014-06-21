var fs  = require("fs");

var matrix, cursor;
var size = 10;

var modes = {
	INSR: 'INSR',
	OVRW: 'OVRW'
};

var actions =
{
	c: function()
	{
		matrix = new Array(size);
		var row;
		for (var i=size; i--; )
		{
			matrix[i] = row = new Array(size);
			for(var j=size; j--; )
				row[j] = ' ';
		}
	},

	h: function()
	{
		this.setPos(0, 0);
	},

	b: function()
	{
		cursor.x = 0;
	},

	d: function()
	{
		if (cursor.y < size-1) cursor.y++;
	},

	u: function()
	{
		if (cursor.y > 0) cursor.y--;
	},

	l: function()
	{
		if (cursor.x > 0) cursor.x--;
	},

	r: function()
	{
		if (cursor.x < size-1) cursor.x++;
	},

	e: function()
	{
		for (var i=cursor.x; i<size; i++) 
			matrix[cursor.y][i] = ' ';
	},

	i: function()
	{
		mode = modes.INSR;
	},

	o: function()
	{
		mode = modes.OVRW;
	},

	'^': function()
	{
		this.put('^');
	},

	setPos: function(y, x)
	{
		cursor = {x:x, y:y};
	},

	INSR: function(c)
	{
		matrix[cursor.y].splice(cursor.x, 0, c);
		matrix[cursor.y].pop();
		this.r();
	},

	OVRW: function(c)
	{
		matrix[cursor.y][cursor.x] = c;
		this.r();
	},

	put: function(c)
	{
		this[mode](c);
	}
};

// initial state
actions.c(); // clear matrix
actions.h(); // position top-left
actions.o(); // overwrite mode

var num_re = /\d/;

var input = fs.readFileSync(process.argv[2]).toString();
var idx = 0;
while(idx<input.length)
{
	var c = input.charAt(idx++);
	switch(c)
	{
		case '^':
			var next_char = input.charAt(idx++);
			if (num_re.test(next_char))
			{
				actions.setPos(
					parseInt(next_char, 10),
					parseInt(input.charAt(idx++), 10)
				);
			}
			else
			{
				actions[next_char]();
			}
			break;

		case '\n':
		case '\r': break;

		default:
			actions.put(c);
	}
}

matrix.forEach(function(row) {
	process.stdout.write(
		row.join('') + '\n'
	);
});
