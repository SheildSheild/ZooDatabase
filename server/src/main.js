const http = require('http');
const url = require('url');
const mysql = require('mysql');
const {api}=require('./api');
const {routes}=require('./routes');

const hostname = '127.0.0.1';
const port = 3300;

// MySQL connection setup
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rasjeN-hibdix-1puzka", // Replace with your actual password
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

    // Parsing body data
    const body = [];
    req.on('data', chunk => {
        body.push(chunk.toString());
    });

    const failure=()=>{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Route not found' }));
    };

    if(path.substring(0,5)==='/api/'){
        const name=path.substring(5)
        if(routes.has(name))
            api(req,res,query,body,name,db);
        else
            failure();
    }
    else
        failure();
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = { server, db };