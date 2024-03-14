const http = require('http');
const url = require('url');
const mysql = require('mysql');
const { parse } = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;

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
    const method = req.method;

    // Parsing body data
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    // Route for GET and POST requests to /api/animals
    if (path === '/api/animals') {
        if (method === 'GET') {
            // Fetch all animals
            db.query('SELECT * FROM ANIMALS', (err, results) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Error fetching animals', error: err.toString() }));
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                }
            });
        } else if (method === 'POST') {
            req.on('end', () => {
                const { Animal_ID, Habitat_ID, Name, Weight, Height, Birth_Date, Species } = parse(body);
                const sql = 'INSERT INTO ANIMALS (Animal_ID, Habitat_ID, Name, Weight, Height, Birth_Date, Species) VALUES (?, ?, ?, ?, ?, ?, ?)';
                const values = [Animal_ID, Habitat_ID, Name, Weight, Height, Birth_Date, Species];

                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error adding animal', error: err.toString() }));
                    } else {
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Animal added successfully', animalId: result.insertId }));
                    }
                });
            });
        }else if (method === 'DELETE') {
            const queryObject = url.parse(req.url, true).query;
            const Animal_ID = queryObject.Animal_ID;
        
            if (!Animal_ID) {
                res.statusCode = 400; // Bad Request
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Animal_ID is required' }));
            } else {
                const sql = 'DELETE FROM ANIMALS WHERE Animal_ID = ?';
                const values = [Animal_ID];
        
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error deleting Animal', error: err.toString() }));
                    } else if (result.affectedRows === 0) {
                        // No rows affected means no zone was found with that ID
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Animal not found' }));
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Animal deleted successfully' }));
                    }
                });
            }
        }
    }
    if (path === '/api/customers') {
        if (method === 'GET') {
            // Fetch all animals
            db.query('SELECT * FROM CUSTOMERS', (err, results) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Error fetching customers', error: err.toString() }));
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                }
            });
        } else if (method === 'POST') {
            req.on('end', () => {
                const { Customer_ID, Name, Address, Phone, Email } = parse(body);
                const sql = 'INSERT INTO CUSTOMERS (Customer_ID, Name, Address, Phone, Email) VALUES (?, ?, ?, ?, ?)';
                const values = [Customer_ID, Name, Address, Phone, Email];

                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error adding customer', error: err.toString() }));
                    } else {
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Customer added successfully', customerId: result.insertId }));
                    }
                });
            });
        }else if (method === 'DELETE') {
            const queryObject = url.parse(req.url, true).query;
            const Customer_ID = queryObject.Customer_ID;
        
            if (!Customer_ID) {
                res.statusCode = 400; // Bad Request
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Customer_ID is required' }));
            } else {
                const sql = 'DELETE FROM CUSTOMERS WHERE Customer_ID = ?';
                const values = [Customer_ID];
        
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error deleting Customer', error: err.toString() }));
                    } else if (result.affectedRows === 0) {
                        // No rows affected means no zone was found with that ID
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Customer not found' }));
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Customer deleted successfully' }));
                    }
                });
            }
        }
    }
    if (path === '/api/animal_health') {
        if (method === 'GET') {
            // Fetch all animals
            db.query('SELECT * FROM ANIMAL_HEALTH', (err, results) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Error fetching animal health', error: err.toString() }));
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                }
            });
        } else if (method === 'POST') {
            req.on('end', () => {
                const { Animal_ID, Health_ID, Primary_Doctor, Description, Date_Of_Examination } = parse(body);
                const sql = 'INSERT INTO ANIMAL_HEALTH (Animal_ID, Health_ID, Primary_Doctor, Description, Date_Of_Examination) VALUES (?, ?, ?, ?, ?)';
                const values = [Animal_ID, Health_ID, Primary_Doctor, Description, Date_Of_Examination];

                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error adding animal health', error: err.toString() }));
                    } else {
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Animal health added successfully', healthId: result.insertId }));
                    }
                });
            });
        }else if (method === 'DELETE') {
            const queryObject = url.parse(req.url, true).query;
            const Animal_ID = queryObject.Animal_ID;
        
            if (!Animal_ID) {
                res.statusCode = 400; // Bad Request
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Animal_ID is required' }));
            } else {
                const sql = 'DELETE FROM ANIMAL_HEALTH WHERE Animal_ID = ?';
                const values = [Animal_ID];
        
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error deleting Animal Health', error: err.toString() }));
                    } else if (result.affectedRows === 0) {
                        // No rows affected means no zone was found with that ID
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Animal Health not found' }));
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Animal Health deleted successfully' }));
                    }
                });
            }
        }
    }
    if (path === '/api/attends_to') {
        if (method === 'GET') {
            // Fetch all animals
            db.query('SELECT * FROM ATTENDS_TO', (err, results) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Error fetching attends to', error: err.toString() }));
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                }
            });
        } else if (method === 'POST') {
            req.on('end', () => {
                const { Employee_ID, Animal_ID, Responsibility } = parse(body);
                const sql = 'INSERT INTO ATTENDS_TO (Employee_ID, Animal_ID, Responsibility) VALUES (?, ?, ?)';
                const values = [Employee_ID, Animal_ID, Responsibility];

                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error adding Attends To', error: err.toString() }));
                    } else {
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Attends To added successfully', attendsId: result.insertId }));
                    }
                });
            });
        }else if (method === 'DELETE') {
            const queryObject = url.parse(req.url, true).query;
            const Animal_ID = queryObject.Animal_ID;
        
            if (!Animal_ID) {
                res.statusCode = 400; // Bad Request
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Animal_ID is required' }));
            } else {
                const sql = 'DELETE FROM ATTENDS_TO WHERE Animal_ID = ?';
                const values = [Animal_ID];
        
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error deleting attends to', error: err.toString() }));
                    } else if (result.affectedRows === 0) {
                        // No rows affected means no zone was found with that ID
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'attends to not found' }));
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'attends to deleted successfully' }));
                    }
                });
            }
        }
    }
    if (path === '/api/complaints') {
        if (method === 'GET') {
            db.query('SELECT * FROM COMPLAINTS', (err, results) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Error fetching complaints', error: err.toString() }));
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                }
            });
        } else if (method === 'POST') {
            req.on('end', () => {
                const { Complaint_ID, Customer_ID, Description, Date_Created } = parse(body);
                const sql = 'INSERT INTO COMPLAINTS (Complaint_ID, Customer_ID, Description, Date_Created) VALUES (?, ?, ?, ?)';
                const values = [Complaint_ID, Customer_ID, Description, Date_Created];

                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error adding complaint', error: err.toString() }));
                    } else {
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Complaint added successfully', complaintID: result.insertId }));
                    }
                });
            });
        }else if (method === 'DELETE') {
            const queryObject = url.parse(req.url, true).query;
            const Complaint_ID = queryObject.Complaint_ID;
        
            if (!Complaint_ID) {
                res.statusCode = 400; // Bad Request
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Complaint_ID is required' }));
            } else {
                const sql = 'DELETE FROM COMPLAINTS WHERE Complaint_ID = ?';
                const values = [Complaint_ID];
        
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error deleting Complaint', error: err.toString() }));
                    } else if (result.affectedRows === 0) {
                        // No rows affected means no zone was found with that ID
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Complaint not found' }));
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Complaint deleted successfully' }));
                    }
                });
            }
        }
    }
    if (path === '/api/habitats') {
        if (method === 'GET') {
            // Fetch all habitats
            db.query('SELECT * FROM HABITATS', (err, results) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Error fetching habitats', error: err.toString() }));
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                }
            });
        } else if (method === 'POST') {
            req.on('end', () => {
                const { Zone_ID, Status, Date_Opened, Habitat_ID } = parse(body);
                const sql = 'INSERT INTO HABITATS (Habitat_ID, Zone_ID, Status, Date_Opened) VALUES (?, ?, ?, ?)';
                const values = [Zone_ID, Status, Date_Opened, Habitat_ID];

                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error adding habitat', error: err.toString() }));
                    } else {
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Habitat added successfully', habitatId: result.insertId }));
                    }
                });
            });
        }else if (method === 'DELETE') {
            const queryObject = url.parse(req.url, true).query;
            const Habitat_ID = queryObject.Habitat_ID;
        
            if (!Habitat_ID) {
                res.statusCode = 400; // Bad Request
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Zone_ID is required' }));
            } else {
                const sql = 'DELETE FROM HABITATS WHERE Habitat_ID = ?';
                const values = [Habitat_ID];
        
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error deleting Habitat', error: err.toString() }));
                    } else if (result.affectedRows === 0) {
                        // No rows affected means no zone was found with that ID
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Habitat not found' }));
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Habitat deleted successfully' }));
                    }
                });
            }
        }
    }
    if (path === '/api/zones') {
            if (method === 'GET') {
                // Fetch all zones
                db.query('SELECT * FROM ZONES', (err, results) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error fetching zones', error: err.toString() }));
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify(results));
                    }
                });
            } else if (method === 'POST') {
                req.on('end', () => {
                    const { Zone_ID, Name, Status, Size } = parse(body);  
                    const sql = 'INSERT INTO ZONES (Zone_ID, Name, Status, Size) VALUES (?, ?, ?, ?)';  
                    const values = [Zone_ID, Name, Status, Size];
        
                    db.query(sql, values, (err, result) => {
                        if (err) {
                            res.statusCode = 500;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ message: 'Error adding zone', error: err.toString() }));
                        } else {
                            res.statusCode = 201;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ message: 'Zone added successfully', zoneId: result.insertId }));
                        }
                    });
                });
            }else if (path.startsWith('/api/zones') && method === 'DELETE') {
                const queryObject = url.parse(req.url, true).query;
                const Zone_ID = queryObject.Zone_ID;
            
                if (!Zone_ID) {
                    res.statusCode = 400; // Bad Request
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Zone_ID is required' }));
                } else {
                    const sql = 'DELETE FROM ZONES WHERE Zone_ID = ?';
                    const values = [Zone_ID];
            
                    db.query(sql, values, (err, result) => {
                        if (err) {
                            res.statusCode = 500;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ message: 'Error deleting zone', error: err.toString() }));
                        } else if (result.affectedRows === 0) {
                            // No rows affected means no zone was found with that ID
                            res.statusCode = 404;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ message: 'Zone not found' }));
                        } else {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.end(JSON.stringify({ message: 'Zone deleted successfully' }));
                        }
                    });
                }
            }
            
    }
    if (path === '/api/employees') { // Has not been finished yet V.
        if (method == 'GET') {
            // Fetch all employees
            db.query('SELECT * FROM EMPLOYEES', (err, results) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Error fetching employees', error: err.toString() }));
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                }
            });
        }
        else if (method === 'POST') {
            req.on('end', () => {
                const { Employee_ID, Supervisor_ID, Job_ID, Shop_ID, Habitat_ID, Restaurant_ID, Fname, Lname, SSN, Gender, Email, Address, Birth_Date, Start_Date } = parse(body);  
                const sql = 'INSERT INTO EMPLOYEES (Employee_ID, Supervisor_ID, Job_ID, Shop_ID, Habitat_ID, Restaurant_ID, Fname, Lname, SSN, Gender, Email, Address, Birth_Date, Start_Date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';  
                const values = [Employee_ID, Supervisor_ID, Job_ID, Shop_ID, Habitat_ID, Restaurant_ID, Fname, Lname, SSN, Gender, Email, Address, Birth_Date, Start_Date];
    
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error adding employee', error: err.toString() }));
                    } else {
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Employee added successfully', employeeId: result.insertId }));
                    }
                });
            });
        }
        else if (path.startsWith('/api/employees') && method === 'DELETE') {
            const queryObject = url.parse(req.url, true).query;
            const Employee_ID = queryObject.Employee_ID;
        
            if (!Employee_ID) {
                res.statusCode = 400; // Bad Request
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Employee_ID is required' }));
            } else {
                const sql = 'DELETE FROM EMPLOYEES WHERE Employee_ID = ?';
                const values = [Employee_ID];
        
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error deleting employee', error: err.toString() }));
                    } else if (result.affectedRows === 0) {
                        // No rows affected means no employee was found with that ID
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Employee not found' }));
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Employee deleted successfully' }));
                    }
                });
            }
        }
    }
    if (path === '/api/schedules') {
        if (method === 'GET') {
            // Fetch all schedules
            db.query('SELECT * FROM SCHEDULES', (err, results) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Error fetching schedules', error: err.toString() }));
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                }
            });
        }
        else if (method === 'POST') {
            req.on('end', () => {
                const { Schedule_ID, Type_ID, Zone_ID, Employee_ID, Restaurant_ID, Habitat_ID, Shop_ID, Start_Time, End_Time, Date } = parse(body);  
                const sql = 'INSERT INTO SCHEDULES (Schedule_ID, Type_ID, Zone_ID, Employee_ID, Restaurant_ID, Habitat_ID, Shop_ID, Start_Time, End_Time, Date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';  
                const values = [Schedule_ID, Type_ID, Zone_ID, Employee_ID, Restaurant_ID, Habitat_ID, Shop_ID, Start_Time, End_Time, Date];
    
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error adding schedule', error: err.toString() }));
                    } else {
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Schedule added successfully', scheduleID: result.insertId }));
                    }
                });
            });
        }
        else if (path.startsWith('/api/schedules') && method === 'DELETE') {
            const queryObject = url.parse(req.url, true).query;
            const Schedule_ID = queryObject.Schedule_ID;
        
            if (!Schedule_ID) {
                res.statusCode = 400; // Bad Request
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Schedule_ID is required' }));
            } else {
                const sql = 'DELETE FROM SCHEDULES WHERE Schedule_ID = ?';
                const values = [Schedule_ID];
        
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error deleting schedule', error: err.toString() }));
                    } else if (result.affectedRows === 0) {
                        // No rows affected means no employee was found with that ID
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Schedule not found' }));
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Schedule deleted successfully' }));
                    }
                });
            }
        }
    }
    else if (path === '/api/schedule_types') {
        if (method === 'GET') {
            // Fetch all schedule_types
            db.query('SELECT * FROM SCHEDULE_TYPES', (err, results) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Error fetching schedule_type', error: err.toString() }));
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                }
            });
        }
        else if (method === 'POST') {
            req.on('end', () => {
                const { Type_ID, Name } = parse(body);  
                const sql = 'INSERT INTO SCHEDULE_TYPES (Type_ID, Name) VALUES (?, ?)';  
                const values = [Type_ID, Name];
    
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error adding schedule_types', error: err.toString() }));
                    } else {
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Schedule_type added successfully', schedule_typeID: result.insertId }));
                    }
                });
            });
        }
        else if (path.startsWith('/api/schedule_types') && method === 'DELETE') {
            const queryObject = url.parse(req.url, true).query;
            const Type_ID = queryObject.Type_ID;
        
            if (!Type_ID) {
                res.statusCode = 400; // Bad Request
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Type_ID is required' }));
            } else {
                const sql = 'DELETE FROM SCHEDULE_TYPES WHERE Type_ID = ?';
                const values = [Type_ID];
        
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error deleting schedule_type', error: err.toString() }));
                    } else if (result.affectedRows === 0) {
                        // No rows affected means no schedule_type was found with that ID
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Schedule_type not found' }));
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Schedule_type deleted successfully' }));
                    }
                });
            }
        }
    }
     if (path === '/api/hasoffsprings') {
        if (method === 'GET') {
            // Fetch all schedules
            db.query('SELECT * FROM Has_Offsprings', (err, results) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Error fetching offsprings', error: err.toString() }));
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                }
            });
        }
        else if (method === 'POST') {
            req.on('end', () => {
                const { Parent_ID, Child_ID, Date_Created } = parse(body);  
                const sql = 'INSERT INTO Has_Offsprings (Parent_ID, Child_ID, Date_Created) VALUES (?, ?, ?)';  
                const values = [Parent_ID, Child_ID, Date_Created];
    
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error adding has offsprings', error: err.toString() }));
                    } else {
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Has offsprings added successfully', hasoffspringsID: result.insertId }));
                    }
                });
            });
        }
        else if (path.startsWith('/api/hasoffsprings') && method === 'DELETE') {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'has offsprings delete not found' }));
        }
    }
     if (path === '/api/items') {
        if (method === 'GET') {
            // Fetch all schedules
            db.query('SELECT * FROM ITEMS', (err, results) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Error fetching items', error: err.toString() }));
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                }
            });
        }
        else if (method === 'POST') {
            req.on('end', () => {
                const { Item_ID, Name, Stock, Price } = parse(body);  
                const sql = 'INSERT INTO ITEMS (Item_ID, Name, Stock, Price) VALUES (?, ?, ?, ?)';  
                const values = [Item_ID, Name, Stock, Price];
    
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error adding item', error: err.toString() }));
                    } else {
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Item added successfully', itemID: result.insertId }));
                    }
                });
            });
        }
        else if (path.startsWith('/api/items') && method === 'DELETE') {
            const queryObject = url.parse(req.url, true).query;
            const Item_ID = queryObject.Item_ID;
        
            if (!Item_ID) {
                res.statusCode = 400; // Bad Request
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Item_ID is required' }));
            } else {
                const sql = 'DELETE FROM ITEMS WHERE Item_ID = ?';
                const values = [Item_ID];
        
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error deleting item', error: err.toString() }));
                    } else if (result.affectedRows === 0) {
                        // No rows affected means no employee was found with that ID
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'item not found' }));
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'item deleted successfully' }));
                    }
                });
            }
        }
    }
     if (path === '/api/jobs') {
        if (method === 'GET') {
            // Fetch all schedules
            db.query('SELECT * FROM JOBS', (err, results) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Error fetching jobs', error: err.toString() }));
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                }
            });
        }
        else if (method === 'POST') {
            req.on('end', () => {
                const { Job_ID, Name, Base_Pay, Description } = parse(body);  
                const sql = 'INSERT INTO JOBS (Job_ID, Name, Base_Pay, Description) VALUES (?, ?, ?, ?)';  
                const values = [Job_ID, Name, Base_Pay, Description];
    
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error adding item', error: err.toString() }));
                    } else {
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Item added successfully', jobID: result.insertId }));
                    }
                });
            });
        }
        else if (path.startsWith('/api/jobs') && method === 'DELETE') {
            const queryObject = url.parse(req.url, true).query;
            const Job_ID = queryObject.Job_ID;
        
            if (!Job_ID) {
                res.statusCode = 400; // Bad Request
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'JobID is required' }));
            } else {
                const sql = 'DELETE FROM JOBS WHERE Job_ID = ?';
                const values = [Job_ID];
        
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error deleting job', error: err.toString() }));
                    } else if (result.affectedRows === 0) {
                        // No rows affected means no employee was found with that ID
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'job not found' }));
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'job deleted successfully' }));
                    }
                });
            }
        }
    }     else if (path === '/api/lostitems') {
        if (method === 'GET') {
            // Fetch all schedules
            db.query('SELECT * FROM LOST_ITEMS', (err, results) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Error fetching lost items', error: err.toString() }));
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                }
            });
        }
        else if (method === 'POST') {
            req.on('end', () => {
                const { Lost_Item_ID, Customer_ID, Description, Status } = parse(body);  
                const sql = 'INSERT INTO LOST_ITEMS (Lost_Item_ID, Customer_ID, Description, Status) VALUES (?, ?, ?, ?)';  
                const values = [Lost_Item_ID, Customer_ID, Description, Status];
    
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error adding lost item', error: err.toString() }));
                    } else {
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Lost item added successfully', lostitemID: result.insertId }));
                    }
                });
            });
        }
        else if (path.startsWith('/api/lostitems') && method === 'DELETE') {
            const queryObject = url.parse(req.url, true).query;
            const Lost_Item_ID = queryObject.Lost_Item_ID;
        
            if (!Lost_Item_ID) {
                res.statusCode = 400; // Bad Request
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'lostitemid is required' }));
            } else {
                const sql = 'DELETE FROM LOST_ITEMS WHERE Lost_Item_ID = ?';
                const values = [Lost_Item_ID];
        
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error deleting lost item', error: err.toString() }));
                    } else if (result.affectedRows === 0) {
                        // No rows affected means no employee was found with that ID
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'lost item not found' }));
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'lost item deleted successfully' }));
                    }
                });
            }
        }
    }     else if (path === '/api/menus') {
        if (method === 'GET') {
            // Fetch all schedules
            db.query('SELECT * FROM Menus', (err, results) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Error fetching menus', error: err.toString() }));
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                }
            });
        }
        else if (method === 'POST') {
            req.on('end', () => {
                const { Menu_ID, Name, Price, Restaurant_ID } = parse(body);  
                const sql = 'INSERT INTO Menus (Menu_ID, Name, Price, Restaurant_ID) VALUES (?, ?, ?, ?)';  
                const values = [Menu_ID, Name, Price, Restaurant_ID];
    
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error adding menu', error: err.toString() }));
                    } else {
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Menu added successfully', menuID: result.insertId }));
                    }
                });
            });
        }
        else if (path.startsWith('/api/menus') && method === 'DELETE') {
            const queryObject = url.parse(req.url, true).query;
            const Menu_ID = queryObject.Menu_ID;
        
            if (!Menu_ID) {
                res.statusCode = 400; // Bad Request
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'menu is required' }));
            } else {
                const sql = 'DELETE FROM Menus WHERE Menu_ID = ?';
                const values = [Menu_ID];
        
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error deleting menu', error: err.toString() }));
                    } else if (result.affectedRows === 0) {
                        // No rows affected means no employee was found with that ID
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'menu not found' }));
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'menu deleted successfully' }));
                    }
                });
            }
        }
    } 
     if (path === '/api/purchases') {
        if (method === 'GET') {
            // Fetch all schedules
            db.query('SELECT * FROM Purchases', (err, results) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Error fetching Purchases', error: err.toString() }));
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                }
            });
        }
        else if (method === 'POST') {
            req.on('end', () => {
                const { Item_ID, Shop_ID, Customer_ID, Quantity, Date } = parse(body);  
                const sql = 'INSERT INTO Purchases (Item_ID, Shop_ID, Customer_ID, Quantity, Date) VALUES (?, ?, ?, ?, ?)';  
                const values = [Item_ID, Shop_ID, Customer_ID, Quantity, Date];
    
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error adding purchase', error: err.toString() }));
                    } else {
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Purchase added successfully', purchasesID: result.insertId }));
                    }
                });
            });
        }
        else if (path.startsWith('/api/purchases') && method === 'DELETE') {
            const queryObject = url.parse(req.url, true).query;
            const Item_ID = queryObject.Item_ID;
        
            if (!Item_ID) {
                res.statusCode = 400; // Bad Request
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Item for purchase is required' }));
            } else {
                const sql = 'DELETE FROM Purchases WHERE Item_ID = ?';
                const values = [Item_ID];
        
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error deleting purchase', error: err.toString() }));
                    } else if (result.affectedRows === 0) {
                        // No rows affected means no employee was found with that ID
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'purchase not found' }));
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'purchase deleted successfully' }));
                    }
                });
            }
        }
    }
     if (path === '/api/restaurants') {
        if (method === 'GET') {
            // Fetch all schedules
            db.query('SELECT * FROM RESTAURANTS', (err, results) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Error fetching restaurants', error: err.toString() }));
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                }
            });
        }
        else if (method === 'POST') {
            req.on('end', () => {
                const { Restaurant_ID, Zone_ID, Name, Status } = parse(body);  
                const sql = 'INSERT INTO RESTAURANTS (Restaurant_ID, Zone_ID, Name, Status) VALUES (?, ?, ?, ?)';  
                const values = [Restaurant_ID, Zone_ID, Name, Status];
    
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error adding Restaurant', error: err.toString() }));
                    } else {
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Restaurants added successfully', restaurantID: result.insertId }));
                    }
                });
            });
        }
        else if (path.startsWith('/api/restaurants') && method === 'DELETE') {
            const queryObject = url.parse(req.url, true).query;
            const Restaurant_ID = queryObject.Restaurant_ID;
        
            if (!Restaurant_ID) {
                res.statusCode = 400; // Bad Request
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Restaurant is required' }));
            } else {
                const sql = 'DELETE FROM RESTAURANTS WHERE Restaurant_ID = ?';
                const values = [Restaurant_ID];
        
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error deleting restaurant', error: err.toString() }));
                    } else if (result.affectedRows === 0) {
                        // No rows affected means no employee was found with that ID
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'restaurant not found' }));
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'restaurant deleted successfully' }));
                    }
                });
            }
        }
    } else if (path === '/api/restaurantorders') {
        if (method === 'GET') {
            // Fetch all schedules
            db.query('SELECT * FROM Restaurant_Orders', (err, results) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Error fetching restaurants orders', error: err.toString() }));
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                }
            });
        }
        else if (method === 'POST') {
            req.on('end', () => {
                const { Customer_ID, Menu_ID, Quantity, Order_date } = parse(body);  
                const sql = 'INSERT INTO Restaurant_Orders (Customer_ID, Menu_ID, Quantity, Order_date) VALUES (?, ?, ?, ?)';  
                const values = [Customer_ID, Menu_ID, Quantity, Order_date];
    
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error adding restaurant order', error: err.toString() }));
                    } else {
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Restaurants order added successfully', restaurantOrderID: result.insertId }));
                    }
                });
            });
        }
        else if (path.startsWith('/api/restaurantorders') && method === 'DELETE') {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Error with restaurant orders', error: err.toString() }));
        }
    }else if (path === '/api/shops') {
        if (method === 'GET') {
            // Fetch all schedules
            db.query('SELECT * FROM SHOPS', (err, results) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Error fetching shops', error: err.toString() }));
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                }
            });
        }
        else if (method === 'POST') {
            req.on('end', () => {
                const { Shop_ID, Status, Name } = parse(body);  
                const sql = 'INSERT INTO SHOPS (Shop_ID, Status, Name) VALUES (?, ?, ?)';  
                const values = [Shop_ID, Status, Name];
    
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error adding shop', error: err.toString() }));
                    } else {
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Shop added successfully', restaurantID: result.insertId }));
                    }
                });
            });
        }
        else if (path.startsWith('/api/shops') && method === 'DELETE') {
            const queryObject = url.parse(req.url, true).query;
            const Shop_ID = queryObject.Shop_ID;
        
            if (!Shop_ID) {
                res.statusCode = 400; // Bad Request
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Shop is required' }));
            } else {
                const sql = 'DELETE FROM SHOPS WHERE Shop_ID = ?';
                const values = [Shop_ID];
        
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error deleting shop', error: err.toString() }));
                    } else if (result.affectedRows === 0) {
                        // No rows affected means no employee was found with that ID
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'shop not found' }));
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'shop deleted successfully' }));
                    }
                });
            }
        }
    }else if (path === '/api/tickets') {
        if (method === 'GET') {
            // Fetch all schedules
            db.query('SELECT * FROM TICKETS', (err, results) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Error fetching tickets', error: err.toString() }));
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(results));
                }
            });
        }
        else if (method === 'POST') {
            req.on('end', () => {
                const { Ticket_ID, Date_Issued, Price, Customer_ID } = parse(body);  
                const sql = 'INSERT INTO TICKETS (Ticket_ID, Date_Issued, Price, Customer_ID) VALUES (?, ?, ?, ?)';  
                const values = [Ticket_ID, Date_Issued, Price, Customer_ID];
    
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error adding ticket', error: err.toString() }));
                    } else {
                        res.statusCode = 201;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Ticket added successfully', ticketID: result.insertId }));
                    }
                });
            });
        }
        else if (path.startsWith('/api/tickets') && method === 'DELETE') {
            const queryObject = url.parse(req.url, true).query;
            const Ticket_ID = queryObject.Ticket_ID;
        
            if (!Ticket_ID) {
                res.statusCode = 400; // Bad Request
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Ticket is required' }));
            } else {
                const sql = 'DELETE FROM TICKETS WHERE Ticket_ID = ?';
                const values = [Ticket_ID];
        
                db.query(sql, values, (err, result) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'Error deleting ticket', error: err.toString() }));
                    } else if (result.affectedRows === 0) {
                        // No rows affected means no employee was found with that ID
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'ticket not found' }));
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ message: 'ticket deleted successfully' }));
                    }
                });
            }
        }
    }
    
     
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
