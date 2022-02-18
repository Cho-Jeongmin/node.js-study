var fs = require('fs');

/*
//readFileSync(동기적)
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');
//A,B,C순으로 출력됨.
*/

//readFile(비동기적)
console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
  console.log(result);
});
console.log('C');
//A,C,B순으로 출력됨.
