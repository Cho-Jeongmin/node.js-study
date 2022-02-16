var http = require('http');
var fs = require('fs');
var url = require('url');//url 모듈 요청

var app = http.createServer(function(request,response){
    var _url = request.url;//   /?id=HTML
    var queryData = url.parse(_url, true).query;// 객체 { id: 'HTML'}
    var pathname = url.parse(_url, true).pathname;// queryString을 제외한 pathname.
    var title = queryData.id;
    console.log(pathname);

    if(pathname === '/'){
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
        `;
        response.writeHead(200);//서버가 브라우저에게 200을 주면, 파일 전송에 성공했다는 뜻.
        response.end(template);//화면에 template 띄우기.
      });
    } else {//pathname이 '/'가 아닌 다른 경로로 접속할 경우
      response.writeHead(404);// 서버가 브라우저에게 404를 주면, 해당 파일 찾을 수 없다는 뜻. 예를 들어 주소창에 localhost:3000/favicon.ico를 입력하면, pathname이 /favicon.ico가 되므로 현재 이 라인이 위치한 else가 실행됨.
      response.end('Not found');
    }



});
app.listen(3000);
