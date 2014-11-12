var fs  = require("fs");

Group.groups = {};

function User(name) {
	this.name = name;
	this.num_friends = 0;
	this.friends = {};
	this.num_groups = 0;
	this.groups = {};
	this.suggestions = [];
}
User.users_map  = {};
User.users_list = [];
User.getUser = function(name) {
	return User.users_map[name] || (User.users_list.push(name), User.users_map[name] = new User(name));
};
User.prototype.setFriendNames = function(friend_names) {
	for (var idx = friend_names.length; idx--;) {
		var name = friend_names[idx];
		if (!name) continue;
		this.friends[name] = User.getUser(name);
		this.num_friends++;
	}
};
User.prototype.setGroupNames = function(group_names) {
	for (var idx = group_names.length; idx--;) {
		var name = group_names[idx];
		if (!name) continue;
		this.groups[name] = Group.getGroup(name);
		Group.getGroup(name).addMember(this.name);
	}
};

function Group(name) {
	this.name = name;
	this.members = {};
}
Group.groups = {};
Group.getGroup = function(name) {
	return Group.groups[name] || (Group.groups[name] = new Group(name));
};
Group.prototype.addMember = function(name) {
	this.members[name] = User.getUser(name);
};

// data collection first
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (line === "") return;
	var parts = line.split(':');
	var user = User.getUser(parts[0]);
	user.setFriendNames(parts[1].split(','));
	user.setGroupNames (parts[2].split(','));
});

// console.log(User.users_map);

// start processing stuff here
User.users_list.sort();
for (var idx=0; idx < User.users_list.length; idx++)
{
	var user = User.getUser( User.users_list[idx] );

	var potential_groups = {};

	for (var friend_name in user.friends)
	{
		var friend = User.getUser(friend_name);
		for (var group_name in friend.groups)
		{
			if (group_name in user.groups) continue;
			potential_groups[group_name] ? potential_groups[group_name]++ : potential_groups[group_name] = 1;
		}
	}

	for (var group_name in potential_groups)
	{
		if (potential_groups[group_name] / user.num_friends >= 0.5 )
		{
			user.suggestions.push(group_name);
		}
	}

	if (user.suggestions.length <= 0) continue;

	user.suggestions.sort();

	process.stdout.write(
		  user.name
		+ ':'
		+ user.suggestions.join(',')
		+ '\n'
	);
}
