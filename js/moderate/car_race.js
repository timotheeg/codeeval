var fs  = require("fs");
var lines = fs.readFileSync(process.argv[2]).toString().split('\n');
var track = lines.shift().split(/\s+/).map(getNum);
var cars = [];
for (var idx=lines.length; idx--;)
{
	var line = lines[idx];
	if (!line) continue;
	var tokens = line.split(/\s+/);
	var car = {
		id:            parseInt(tokens[0], 10),
		top_speed:     parseInt(tokens[1], 10) / 3600, // MPH to MPS
		time_0_to_top: parseFloat(tokens[2]),
		time_top_to_0: parseFloat(tokens[3])
	};
	getLapTime(car);
	cars.push(car);
}
cars.sort(byLapTime);

for (var idx=cars.length; idx--;)
{
	var car = cars[idx];
	process.stdout.write(car.id + ' ' + car.lap_time.toFixed(2) + '\n');
}

function getNum(num)
{
	return (num.indexOf('.') > -1) ? parseFloat(num) : parseInt(num, 10);
}

function byLapTime(car1, car2)
{
	return car2.lap_time - car1.lap_time;
}

function getLapTime(car)
{
	var
		acceleration  = car.top_speed / car.time_0_to_top,
		decceleration = -car.top_speed / car.time_top_to_0,
		last_turn_speed = 0;

	car.lap_time = 0;

	for (var idx=0; idx<track.length; idx+=2)
	{
		var segment_length = track[idx];
		if (segment_length <= 0) return;

		var turn_angle = track[idx+1];

		var allowed_turn_speed = car.top_speed * (180-turn_angle) / 180;

		// acceleration distance+time
		var acceleration_time = (car.top_speed - last_turn_speed) / acceleration;
		var acceleration_distance = (last_turn_speed + car.top_speed) * acceleration_time / 2;

		// break distance+time
		var break_time = (allowed_turn_speed - car.top_speed) / decceleration;
		var break_distance = (allowed_turn_speed + car.top_speed) * break_time / 2;

		var top_speed_distance = segment_length - acceleration_distance - break_distance;
		var top_speed_time = top_speed_distance / car.top_speed;

		car.lap_time += acceleration_time + top_speed_time + break_time;
		last_turn_speed = allowed_turn_speed;
	}
}

