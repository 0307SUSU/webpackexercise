// var exec = require("child_process").exec;
let querystring = require("querystring"),fs=require('fs');
var formidable = require("formidable");
const start = (response,postData)=> {
  console.log("Request handler 'start' was called.");
  let body = `
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    </head>
    <body>
      <form action="/upload" enctype="multipart/form-data" method="post">
        <input type="file" name="upload">
        <input type="submit" value="Upload file" />
      </form>
    </body>
  </html>
  `

response.writeHead(200, {"Content-Type": "text/html"});
response.write(body);
response.end();
  // exec("find /",
  // { timeout: 10000, maxBuffer: 20000*1024 },
  //  function (error, stdout, stderr) {
  //   response.writeHead(200, {"Content-Type": "text/plain"});
  //   response.write(stdout);
  //   response.end();
  //   });
  // return "hellow start"
  }
const upload= (response,request)=> {
  console.log("Request handler 'upload' was called.");
  let form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request,function(error,fields,files){
    console.log("parsing done",files.upload._writeStream.path);
    fs.renameSync(files.upload._writeStream.path,"/tmp/test.png");
response.writeHead(200, {"Content-Type": "text/html"});
response.write("received image:<br/>");
response.write("<img src='/show' />");
response.end();
  })
//   response.writeHead(200, {"Content-Type": "text/plain;charset=UTF-8"});
// response.write(querystring.parse(postData).text);
// response.end();
  // return "hellow upload"
  }
  function show(response) {
    console.log("Request handler 'show' was called.");
    fs.readFile("/tmp/test.png", "binary", function(error, file) {
    if(error) {
    response.writeHead(500, {"Content-Type": "text/plain"});
    response.write(error + "\n");
    response.end();
    } else {
    response.writeHead(200, {"Content-Type": "image/png"});
    response.write(file, "binary");
    response.end();
    }
    });
    }
  exports.start = start;
  exports.upload = upload;
  exports.show = show;
  