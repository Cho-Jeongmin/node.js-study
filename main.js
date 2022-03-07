var http = require('http');
var fs = require('fs');
var url = require('url');//url 모듈 요청
var qs = require('querystring');

function templateHTML(title, list, body, control){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB2</a></h1>
    ${list}
    ${control}
    ${body}
  </body>
  </html>
  `
}

function templateList(filelist){
  var list = '<ul>';
  var i = 0;
  while(i < filelist.length){
    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i++;
  }
  list += '</ul>';
  return list;
}

var app = http.createServer(function(request,response){
  //request는 요청할 때 웹브라우저가 보낸 정보를,
  //response는 응답할 때 우리가 웹브라우저한테 전송할 정보를 담음
  var _url = request.url;//   /?id=HTML
  var queryData = url.parse(_url, true).query;// 객체 { id: 'HTML'}
  var pathname = url.parse(_url, true).pathname;// queryString을 제외한 pathname.

  if(pathname === '/'){//유효한 주소인 경우.
    if(queryData.id === undefined){//홈페이지인 경우.
      fs.readdir('./data', function(error, filelist){//data디렉토리의 파일
        var title = 'Welcome';
        var description = 'Hello, Node.js';
        var list = templateList(filelist);
        var template = templateHTML(title, list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`);
        response.writeHead(200);
        response.end(template);
      });
    } else {//홈페이지가 아닌 경우(id 있는 경우)
      fs.readdir('./data', function(error, filelist){//data디렉토리의 파일 리스트 가져오기.
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){//파일 읽기
          var title = queryData.id;
          var list = templateList(filelist);
          var template = templateHTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else if(pathname === "/create"){//글쓰기 창인 경우
    fs.readdir('./data', function(error, filelist){//data디렉토리의 파일
      var title = 'create';
      var list = templateList(filelist);
      var template = templateHTML(title, list, `
        <form action="http://localhost:3000/create_process" method="post">
          <p><input type="text" name="title" place holder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
      `, '');
      response.writeHead(200);
      response.end(template);
    });
  } else if(pathname === "/create_process"){
    var body = '';
    request.on('data', function(data){
      body = body + data;
    });
    request.on('end', function(){
      var post = qs.parse(body);
      console.log(post);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        response.writeHead(302, {Location: `/?id=${title}`});//리다이렉션
        response.end('success');
      });
    });
  } else {//pathname이 '/'가 아닌 다른 경로로 접속할 경우(유효하지 않은 주소)
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(3000);
