var fs  = require("fs");
var input_re = /(\S+@\S+)\s+(\S+@\S+)/
var users = {};
var users_arr = [];
var clusters = {};

function User(email) {
	this.email = email;
	this.sent_to = {};
	this.cross_x = {};
	this.cross_x_arr = [];
}

User.getUser = function(email) {
	if (users[email]) return users[email];
	var new_user = new User(email);
	users[email] = new_user;
	users_arr.push(new_user);
};

User.prototype.sendTo = function(email) {
	if (this.cross_x[email]) return;
	if (this.sent_to[email]) return;

	var target_user = User.getUser(email);
	if (target_user.sent_to[this.email]) {
		this.cross_x[email] = 1;
		target_user.cross_x[this.email] = 1;
		delete target_user.sent_to[this.email];

		// cross register the users as having cross talked...
		this.cross_x_arr.push(target_user);
		target_user.cross_x_arr.push(this);
	}
	else {
		this.sent_to[email] = 1;
	}
};

// finding first level cross talks
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	var m = line.match(input_re);
	if (m) User.getUser(m[1]).sendTo(m[2]);
});

users_arr.sort(byEmail);

// finding clusters
// for each pair of users, find any other users they both interracted with both ways
for (var idx=0; idx<users_arr.length; idx++) {
	var cur_user = users_arr[idx];
	cur_user.cross_x_arr.sort(byEmail);
	for (var jdx=0; jdx<cur_user.cross_x_arr.length; jdx++) {
		var other_user = cur_user.cross_x_arr[jdx];
	}
}

function byEmail(user_a, user_b) {
	return user_a.email < user_b.email ? -1 : 1;
}


console.log(users);