var http = require("http");
var url = require("url");

// 创建服务器
const start = (route,handle)=> {
  const onRequest = (request,response)=>{
    // let postData = "";
    let pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    // request.setEncoding("utf8");
    // request.addListener("data", function(postDataChunk) {
    //   postData += postDataChunk;
    //   console.log("Received POST data chunk '" + postDataChunk + "'.");
    // }); 
    // request.addListener("end", function() {
      route(handle, pathname, response, request);
      // });     
    // route(handle,pathname,response);
    // response.writeHead(
    //   200, // 状态码
    //   {"Content-Type": "text/plain"} //头类型
    // );
    // response.write(route(handle,pathname)); // 发送主体文本
    // response.end(); // 完成响应
  };
  http.createServer(onRequest).listen(8899);
  console.log("Server has started.");
}

exports.start = start;