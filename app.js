const http = require("http");
const fs = require("fs");

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

function rqListener(req, res) {
  const url = req.url;
  const method = req.method;
  const adventOfCodeInput = readFile(
    "/Users/SBC/Desktop/NodeSharpener/CreatingServer/message.txt"
  );
  console.log(adventOfCodeInput);
  res.setHeader("Content-Type", "text/html");
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      `<body><p>${adventOfCodeInput}</p><form action='/message' method='POST'><input type='text' name='message' /><button type='submit'>Send</button></form></body>`
    );
    res.write("</html>");
    return res.end();
  } else if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
      // console.log(parseBody);
    });
  } else {
    res.write("<html>");
    res.write("<head><title>My first page</title></head>");
    res.write("<body><h1>Welcome to About us page</h1></body>");
    res.write("</html>");
    res.end();
  }
}

const server = http.createServer(rqListener);
server.listen(4000);
