var testFolder = './data';//콘솔에서 node를 실행하는 위치 기준으로 경로 작성.
var fs = require('fs');

fs.readdir(testFolder, function(error, filelist){
  console.log(filelist);//  [ 'CSS', 'HTML', 'JavaScript' ]
});
