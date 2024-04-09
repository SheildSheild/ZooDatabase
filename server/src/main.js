const http = require('http');
const url = require('url');
const mysql = require('mysql');
const {api}=require('./api');
const {routes}=require('./routes');

const hostname = '0.0.0.0';
const port = 3301;

const db = mysql.createPool({
    connectionLimit: 96,
    host: "localhost",
    user: "root",
    password: "rasjeN-hibdix-1puzka", 
    database: "Cougar_Zoo"
});

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    const path = reqUrl.pathname;
    const query = reqUrl.query;
    console.log(req.method,path);
    
    res.appendHeader("Access-Control-Allow-Methods", "*");
    res.appendHeader("Access-Control-Allow-Origin", "*");
    res.appendHeader("Access-Control-Allow-Headers", "*");

    const body = [];
    req.on('data', chunk => 
        body.push(chunk.toString())
    );

    let name=null;
    if(path.substring(0,5)==='/api/'){
        const _name=path.substring(5);
        if(_name in routes)
            name=_name;
    }

    switch(req.method){
    case 'POST': case 'GET': case 'DELETE': case 'PUT':
        if(name){
            res.setHeader('Content-Type', 'application/json');
            api(req,res,query,body,name,db);
            return;
        }
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Route not found' }));
        break;
    case 'OPTIONS':
        res.statusCode=200;
        res.end();
        break;
    case 'HEAD':
        if(name) res.setHeader('Content-Type', 'application/json');
        else res.statusCode=404;
        res.end();
        break;
    default:
        res.statusCode=404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'METHOD not supported' }));
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = { server, db };