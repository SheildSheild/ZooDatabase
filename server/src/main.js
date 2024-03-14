const http = require('http');
const url = require('url');
const mysql = require('mysql');
const { parse } = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;

// Set up MySQL connection
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
    const method = req.method;

    if (path === '/api/animals' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            const data = parse(body);
            const { Habitat_ID, Name, Weight, Height, Birth_Date, Species } = data;
            const sql = 'INSERT INTO ANIMALS (Habitat_ID, Name, Weight, Height, Birth_Date, Species) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [Habitat_ID, Name, Weight, Height, Birth_Date, Species];

            db.query(sql, values, (err, result) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Error adding animal', error: err.toString() }));
                    return;
                }
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Animal added successfully', animalId: result.insertId }));
            });
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
