/*
function a(){
  console.log('A');
}
*/

var a = function(){//JS에서 함수는 값이다.
  console.log('A');
}

function slowfunc(callback) {//오랜시간이 걸리는 함수
  callback();
}

slowfunc(a);//callback함수로 a를 넣어줌
