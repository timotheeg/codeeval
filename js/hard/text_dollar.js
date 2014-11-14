var fs  = require("fs");

var strs = {
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four',
  5: 'Five',
  6: 'Six',
  7: 'Seven',
  8: 'Eight',
  9: 'Nine',
  10: 'Ten',
  11: 'Eleven',
  12: 'Twelve',
  13: 'Thirteen',
  14: 'Fourteen',
  15: 'Fifteen',
  16: 'Sixteen',
  17: 'Seventeen',
  18: 'Eighteen',
  19: 'Nineteen',
  20: 'Twenty',
  30: 'Thirty',
  40: 'Forty',
  50: 'Fifty',
  60: 'Sixty',
  70: 'Seventy',
  80: 'Eighty',
  90: 'Ninety',
  100: 'Hundred',
  1000: 'Thousand',
  1000000: 'Million'
};

var blocks = [
  1000000,
  1000
];


fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line)
{
  if (line === "") return;

  var amount = parseInt(line, 10);
  var postfix = 'Dollars'; //  + (amount > 1 ? 's' : '');
  var res = '';
  
  for (var idx=0; idx<blocks.length; idx++) {
    if (amount >= blocks[idx]) {
      var above = Math.floor(amount / blocks[idx]);
      res += getNum(above) + strs[blocks[idx]];
      amount %= blocks[idx];
    }
  }
  
  res += getNum(amount);
  
  process.stdout.write(res + postfix + '\n');
});

function getNum(n) {
  var res = '';
  if (n >= 100) {
     var above = Math.floor(n / 100);
     res += strs[above] + strs[100];
     n %= 100;
  }
  if (n >= 20) {
     var above = Math.floor(n / 10) * 10;
     res += strs[above];
     n -= above;
  }
  if (n > 0) {
    res += strs[n];
  }
  
  return res;
}