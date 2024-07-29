const http = require("http");

const hostname = "127.0.0.1";
const port = 5000;

const server = http.createServer((req, res) => {
  console.log("server here");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});