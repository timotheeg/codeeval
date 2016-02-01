var fs = require("fs");

function byNum(a, b) {
	return a - b;
}

function myParseInt(n) {
	return parseInt(n, 10);
}

function to_arr(teams) {
	return teams.split(' ').map(myParseInt);
}

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
	if (!line) return;

	var
		countries_by_team = {},
		teams = [],
		countries = line.split(' | ').map(to_arr);

	for (var c_idx=countries.length; c_idx--; )
	{
		var
			country_id = c_idx + 1,
			team_ids = countries[c_idx];

		for (var team_idx = team_ids.length; team_idx--;)
		{
			var team_id = team_ids[team_idx];

			if (!countries_by_team[team_id])
			{
				countries_by_team[team_id] = [];
				teams.push(team_id);
			}

			countries_by_team[team_id].push(country_id);
		}
	}

	var res = [];

	teams.sort(byNum).forEach(function (team_id)
	{
		res.push(team_id + ':' + countries_by_team[team_id].sort(byNum).join(','));
	});

	process.stdout.write(
		res.join('; ')
		+ ";\n"
	);
});