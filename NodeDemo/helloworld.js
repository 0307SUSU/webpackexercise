const http = require('http');

http.createServer((req,res)=>{
  res.writeHead(200,{'Content-Type':'text/html'});
  res.end('<h1>hellow world!</h1>');
}).listen(9988);

console.log('创建了一个端口号为：9988的服务器');