function fmt(n)
{
	return ('    ' + n).slice(-4);
}

for (var row=1; row<=12; row++)
{
	for (var col=1; col<=12; col++)
	{
		process.stdout.write(fmt(row*col));
	}
	process.stdout.write("\n");
}
