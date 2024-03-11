const http = require('http');

const staticDir='../../client/public/'
const routes={
  '':'index.html'
};

const server = http.createServer();

server.on('request', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
});

server.on('hi',(req,res)=>{
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello Worlddd!',
  }));
});

server.listen(8000);