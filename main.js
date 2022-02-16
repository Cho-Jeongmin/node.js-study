var http = require('http');
var fs = require('fs');
var url = require('url');//url 모듈 요청

var app = http.createServer(function(request,response){
    var _url = request.url;//   /?id=HTML
    var queryData = url.parse(_url, true).query;// 객체 { id: 'HTML'}
    var pathname = url.parse(_url, true).pathname;// queryString을 제외한 pathname.

    if(pathname === '/'){//유효한 주소인 경우.
      if(queryData.id === undefined){//홈페이지인 경우.
        fs.readdir('./data', function(error, filelist){//data디렉토리의 파일 리스트 가져오기.
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = '<ul>';
          var i = 0;
          while(i < filelist.length){
            list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i++;
          }
          list += '</ul>';
          var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
          response.writeHead(200);
          response.end(template);
        });
      } else {//홈페이지가 아닌 경우
        fs.readdir('./data', function(error, filelist){//data디렉토리의 파일 리스트 가져오기.
          var list = '<ul>';
          var i = 0;
          while(i<filelist.length){
            list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i++;
          }
          list += '</ul>';
          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){//파일 읽기
            var title = queryData.id;
            var template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
            `;
            response.writeHead(200);
            response.end(template);
          });
        });
      }
    } else {//pathname이 '/'가 아닌 다른 경로로 접속할 경우(유효하지 않은 주소)
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
