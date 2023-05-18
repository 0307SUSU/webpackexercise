const route = (handle,pathname,response,request)=>{
  console.log("About to route a request for " + pathname);
  if(typeof handle[pathname] === 'function'){
    return handle[pathname](response,request);
  }else{
    console.log("No request handler found for"+pathname);
    response.writeHead(
      404, // 状态码
      {"Content-Type": "text/plain"} //头类型
    );
    response.write("404 Not found"); // 发送主体文本
    response.end(); // 完成响应
    // return "404 Not found"
  }

}

exports.route = route;