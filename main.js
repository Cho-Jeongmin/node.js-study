var http = require('http');
var fs = require('fs');
var url = require('url');//url 모듈 요청

var app = http.createServer(function(request,response){
    var _url = request.url;//   /?id=HTML
    var queryData = url.parse(_url, true).query;// 객체 { id: 'HTML'}
    console.log(queryData.id);
    if(_url == '/'){
      _url = '/index.html';
    }
    if(_url == '/favicon.ico'){
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200);
    response.end(queryData.id);//화면에 HTML이 출력됨.

});
app.listen(3000);
