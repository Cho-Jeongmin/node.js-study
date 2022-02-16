var args = process.argv;
console.log(args);

console.log('A');
console.log('B');
if(args[2] === '1'){
  console.log('C1');
} else {
  console.log('C2');
}
console.log('D');

/*콘솔에서 node syntax/conditional.js 1 Jamie라고 입력하면
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\jojm0\\OneDrive\\바탕 화면\\web2-nodejs\\syntax\\conditional.js',
  '1',
  'Jamie'
]
A
B
C1
D
라고 출력됨.
*/
