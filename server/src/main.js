const http = require('http');
const url = require('url');
const mysql = require('mysql');
const {api}=require('./api');
const {routes}=require('./routes');

const hostname = '0.0.0.0';
const port = 3301;

// MySQL connection setup
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rasjeN-hibdix-1puzka", 
    database: "Cougar_Zoo"
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    const path = reqUrl.pathname;
    const query = reqUrl.query;
    console.log(req.method,path);
    //cors
    res.appendHeader("Access-Control-Allow-Methods", "*");
    res.appendHeader("Access-Control-Allow-Origin", "*");
    res.appendHeader("Access-Control-Allow-Headers", "*");

    // Parsing body data
    const body = [];
    req.on('data', chunk => {
        body.push(chunk.toString());
    });

    let name=null;
    if(path.substring(0,5)==='/api/'){
        const _name=path.substring(5);
        if(routes.has(_name))
            name=_name;
    }

    if(req.method=='POST'||req.method=='GET'||req.method=='DELETE'){
        // Login
        if(name){
            res.setHeader('Content-Type', 'application/json');
            api(req,res,query,body,name,db);
            return;
        }
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
    else if(req.method=='OPTIONS'){
        res.statusCode=200;
        res.end();
    }
    else if(req.method=='HEAD'){
        if(name)
            res.setHeader('Content-Type', 'application/json');
        else
            res.statusCode=404;
        res.end();
    }
    else{
        res.statusCode=404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'METHOD not supported' }));
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = { server, db };