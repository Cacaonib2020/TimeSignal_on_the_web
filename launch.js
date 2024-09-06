const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

let fs = require('fs');
let server = http.createServer((req, res) => {
  fs.readFile('index.html', 'UTF-8', (error, data) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});