const http = require("http");

function rqListener(req, res) {
  const url = req.url;
  res.setHeader("Content-Type", "text/html");
  if (url === "/home") {
    res.write("<html>");
    res.write("<head><title>My first page</title></head>");
    res.write("<body><h1>Welcome home</h1></body>");
    res.write("</html>");
    return res.end();
  } else if (url === "/about") {
    res.write("<html>");
    res.write("<head><title>My first page</title></head>");
    res.write("<body><h1>Welcome to About us page</h1></body>");
    res.write("</html>");
    return res.end();
  } else if (url === "/node") {
    res.write("<html>");
    res.write("<head><title>My first page</title></head>");
    res.write("<body><h1>Welcome to my NodeJs project</h1></body>");
    res.write("</html>");
    return res.end();
  }
}

const server = http.createServer(rqListener);
server.listen(4000);
