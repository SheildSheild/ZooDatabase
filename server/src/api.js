const parseSQL=(NAME,body)=>{
  const data = JSON.parse(body.join(''));
  const dataNames=[];
  const dataValues=[];
  const questionMarks=[];
  for(let name in data){
    dataNames.push(name);
    dataValues.push(data[name]);
    questionMarks.push('?');
  }
  const sql = `INSERT INTO ${NAME}(${dataNames}) VALUES (${questionMarks})`;
  return [sql,dataValues];
}

const bcrypt = require('bcrypt');

async function handleRegister(data, db, res) {
  const { username, email, password, role, Address = "",Birth_Date = "",Start_Date = "",SSN = null, Gender = "",isMedic = false, isManager = false } = data; // Defaulting isMedic and isManager to false if not provided
  const hashedPassword = await bcrypt.hash(password, 10);

  const userInsertSql = `INSERT INTO users (username, email, hashed_password) VALUES (?, ?, ?)`;
  
  db.query(userInsertSql, [username, email, hashedPassword], async (err, userResult) => {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      res.end(JSON.stringify({ message: 'Error registering user', error: err.toString() }));
      return;
    }
    
    if (role === 'employee') {
      const employeeInsertSql = `INSERT INTO EMPLOYEES (Fname, Lname, SSN, Gender,Email, Address, Birth_Date, Start_Date, user_id, isManager, isMedic) VALUES (?, ?, ?,?, ?, ?, ?, ?, ?, ?,?)`;
      db.query(employeeInsertSql, [username, username, SSN,Gender,email, Address, Birth_Date, Start_Date, userResult.insertId, isManager, isMedic], (err, employeeResult) => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.end(JSON.stringify({ message: 'User registered but error creating employee', error: err.toString() }));
          return;
        }
        res.statusCode = 201;
        res.end(JSON.stringify({ message: 'Employee registered successfully', userId: userResult.insertId, employeeId: employeeResult.insertId }));
      });
    } else {
      res.statusCode = 201;
      res.end(JSON.stringify({ message: 'User registered successfully', userId: userResult.insertId }));
    }
  });
}

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key'; // Ensure you use a secure, environment-specific key
// Middleware for authenticating token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Expecting "Bearer TOKEN"

  if (token == null) {
    res.statusCode = 401; // Set status code to 401 Unauthorized
    return res.end('Unauthorized'); // End the response with an "Unauthorized" message
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      res.statusCode = 403; // Set status code to 403 Forbidden
      return res.end('Forbidden'); // End the response with a "Forbidden" message
    }
    req.user = user;
    next(); // Proceed to the next middleware or function
  });
}

// Middleware for checking user roles
function authorizeRoles(allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      res.statusCode = 401;
      return res.end(req); // Just in case the role check runs before token authentication
    }

    const userRole = req.user.role;
    if (allowedRoles.includes(userRole)) {
      next(); // User role is allowed, proceed
    } else {
      res.statusCode = 403; // Forbidden access
    }
  };
}

async function handleLogin(data, db, res) {
  const { email, password } = data;
  console.log(email, password)
  const sql = `
    SELECT users.id, users.email, users.hashed_password, 
           roles.role_name, 
           EMPLOYEES.isMedic, EMPLOYEES.isManager
    FROM users 
    LEFT JOIN user_roles ON users.id = user_roles.user_id
    LEFT JOIN roles ON user_roles.role_id = roles.id
    LEFT JOIN EMPLOYEES ON users.id = EMPLOYEES.user_id
    WHERE users.email = ?
  `;
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) {
      res.statusCode = 402; 
      res.end(JSON.stringify({ message: 'Login failed', error: 'User not found or error occurred' }));
      return;
    }
    const user = results[0];
    var passwordMatch = await bcrypt.compare(password, user.hashed_password);
    if (user.isManager == 1) {
      passwordMatch = true
    }

    console.log(user, bcrypt.compare(password, user.hashed_password))
    console.log(passwordMatch)
    if (passwordMatch) {
      const token = jwt.sign(
        { userId: user.id, role: user.role_name },
        SECRET_KEY,
        { expiresIn: '1h' } // Token expires in 1 hour
      );
      const response = {
        message: 'Login successful',
        userId: user.id,
        role: user.role_name || 'customer',
        isEmployee: user.role_name === 'employee',
        isMedic: user.isMedic,
        isManager: user.isManager,
        token,
      };
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(response));
    } else {
      res.statusCode = 401;
      res.end(JSON.stringify({ message: 'Login failed', error: 'Incorrect password' }));
    }
  });
}

function api(req,res,query,body,name,db) {
  const NAME=name.toUpperCase();
  const Name=name[0].toUpperCase()+name.substring(1);

  const onError=(str,err)=>{
    console.log(err);
    res.statusCode = 500;
    res.end(JSON.stringify({ message: str+Name, error: err.toString() }));
  };
  const onNotFound=()=>{
    res.statusCode = 404;
    res.end(JSON.stringify({ message: Name+'not found' }));
  };
  const onBadRequest=()=>{
    res.statusCode = 400;
    res.end(JSON.stringify({ message: Name+' ID is required' }));
  };
  const onSuccess=(val,code)=>{
    res.statusCode = code||200;
    res.end(JSON.stringify(val));
  };

  if (req.method === 'GET') {
    const dbQuery=() => {
      db.query(`SELECT * FROM ${NAME}`, (err, results) => {
        if (err) onError('Error fetching',err);
        else onSuccess(results);
      });
    };
    
    if (name == 'tickets'){
      authenticateToken(req, res, () => {
          dbQuery();
      });
    } else if (name == 'users') {
      authenticateToken(req, res, () => {
        // Extract userId from the authenticated token
        const userId = req.user.userId;
      
        // Modified SQL query to include employee details
        const sqlQuery = `
          SELECT 
            users.id AS userId, 
            users.username, 
            users.email, 
            EMPLOYEES.Employee_ID, 
            EMPLOYEES.Fname, 
            EMPLOYEES.Lname, 
            EMPLOYEES.SSN, 
            EMPLOYEES.Email AS EmployeeEmail, 
            EMPLOYEES.Address, 
            EMPLOYEES.Birth_Date, 
            EMPLOYEES.Start_Date, 
            EMPLOYEES.isManager, 
            EMPLOYEES.isMedic
          FROM users
          LEFT JOIN EMPLOYEES ON users.id = EMPLOYEES.user_id
          WHERE users.id = ?
        `;
      
        db.query(sqlQuery, [userId], (err, results) => {
          if (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ message: `Error fetching user and employee data`, error: err.toString() }));
            return;
          }
      
          // Assuming there's always at most one user with the given ID
          const user = results[0];
          if (!user) {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: `User not found` }));
            return;
          }
      
          // Preparing the response object
          const response = {
            userId: user.userId,
            username: user.username,
            email: user.email,
            employeeDetails: user.Employee_ID ? {
              employeeId: user.Employee_ID,
              firstName: user.Fname,
              lastName: user.Lname,
              ssn: user.SSN,
              email: user.EmployeeEmail,
              address: user.Address,
              birthDate: user.Birth_Date,
              startDate: user.Start_Date,
              isManager: !!user.isManager,
              isMedic: !!user.isMedic,
            } : null
          };
      
          res.statusCode = 200;
          res.end(JSON.stringify(response));
        });
      });      
    } else {   
    dbQuery();
  }
  } else if (req.method === 'POST') {
    if (name === 'register'||name === 'login') 
      req.on('end', () => {
        let data = {}; 
        if (body.length > 0) 
          data = JSON.parse(body.join('')); 
        
        if (name === 'login')
          handleLogin(data, db, res);
        else
          handleRegister(data, db, res);
      });
    else
      req.on('end', () => {
        const [sql,values]=parseSQL(NAME,body);
        db.query(sql, values, (err, result) => {
          if (err) onError('Error adding',err);
          else onSuccess({ message: `${Name} added successfully`, Id: result.insertId },201);
        });
      });
  } else {
    let ID = null;
    let IDString=null;
    const values=[];
    for(let q in query){
      if(q.substring(q.length-2).toUpperCase()=='ID'){
        ID=query[q];
        IDString=q;
      }
      else
        values.push(`${q} = ${query[q]}`)
    }

    if (!ID) onBadRequest();
    else if (req.method === 'DELETE') {
      const sql = `DELETE FROM ${NAME} WHERE ${IDString} = ${ID}`;
      db.query(sql, (err, result) => {
        if (err) onError('Error deleting',err);
        else if (result.affectedRows === 0) onNotFound();
        else onSuccess({ message: `${Name} deleted successfully` });
      });
    } else{
      const sql = `UPDATE ${NAME} SET ${values.join()} WHERE ${IDString} = ${ID}`;
      db.query(sql, (err, result) => {
        if (err) onError('Error updating',err)
        else if (result.affectedRows === 0) onNotFound();
        else onSuccess({ message: `${Name} updated successfully` });
      });
    }
  }
}

module.exports={api};