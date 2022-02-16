var http = require('http');
var fs = require('fs');
var url = require('url');//url 모듈 요청

var app = http.createServer(function(request,response){
    var _url = request.url;//   /?id=HTML
    var queryData = url.parse(_url, true).query;// 객체 { id: 'HTML'}
    var title = queryData.id;
    console.log(queryData.id);
    if(_url == '/'){// Web을 클릭한 경우
      title = 'Welcome';// title을 Welcome으로 바꾸기.
    }
    if(_url == '/favicon.ico'){
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200);
    fs.readFile(`data/${title}`, 'utf8', function(err, description){//파일 읽기
      var template = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ol>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ol>
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
      `
      response.end(template);//화면에 template 띄우기.
    })


});
app.listen(3000);
