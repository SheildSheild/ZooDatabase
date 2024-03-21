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

async function handleLogin(data, db, res) {
  const { email, password } = data;
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
      res.statusCode = 401; 
      res.end(JSON.stringify({ message: 'Login failed', error: 'User not found or error occurred' }));
      return;
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.hashed_password);

    if (passwordMatch) {
      const response = {
        message: 'Login successful',
        userId: user.id,
        role: user.role_name || 'customer',
        isEmployee: user.role_name === 'employee',
        isMedic: user.isMedic,
        isManager: user.isManager
      };

      res.statusCode = 200;
      res.end(JSON.stringify(response));
    } else {
      res.statusCode = 401;
      res.end(JSON.stringify({ message: 'Login failed', error: 'Incorrect password' }));
    }
  });
}



function api(req,res,query,body,name,db) {
  const method = req.method;
  const NAME=name.toUpperCase();
  const Name=name[0].toUpperCase()+name.substring(1);

  if (name === 'register' && method === 'POST') {
    req.on('end', () => {
      let data = {}; 
      if (body.length > 0) {
        data = JSON.parse(body.join('')); 
      }
      handleRegister(data, db, res);
      return;
    });
  } else if (name === 'login' && method === 'POST') {
    req.on('end', () => {
      let data = {}; 
      if (body.length > 0) {
        data = JSON.parse(body.join('')); 
      }
      handleLogin(data, db, res);
      return;
    });
  } else if (method === 'GET') {
    db.query(`SELECT * FROM ${NAME}`, (err, results) => {
      if (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ message: `Error fetching ${Name}`, error: err.toString() }));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(results));
      }
    });
  } else if (method === 'POST') {
    req.on('end', () => {
      const [sql,values]=parseSQL(NAME,body);

      db.query(sql, values, (err, result) => {
        if (err) {
          console.log(err)
          res.statusCode = 500;
          res.end(JSON.stringify({ message: `Error adding ${Name}`, error: err.toString() }));
        } else {
          res.statusCode = 201;
          res.end(JSON.stringify({ message: `${Name} added successfully`, Id: result.insertId }));
        }
      });
    });
  } else if (method === 'DELETE') {
    let ID = null;
    let IDString=null;
    for(let q in query)
      if(q.substring(q.length-2).toUpperCase()=='ID'){
        ID=query[q];
        IDString=q;
        break;
      }

    if (!ID) {
      res.statusCode = 400; 
      res.end(JSON.stringify({ message: Name+' ID is required' }));
    } else {
      const sql = `DELETE FROM ${NAME} WHERE ${IDString} = ${ID}`;

      db.query(sql, (err, result) => {
        if (err) {
          console.log(err)
          res.statusCode = 500;
          res.end(JSON.stringify({ message: `Error deleting ${Name}`, error: err.toString() }));
        } else if (result.affectedRows === 0) {
          // No rows affected means no zone was found with that ID
          res.statusCode = 404;
          res.end(JSON.stringify({ message: `${Name} not found` }));
        } else {
          res.statusCode = 200;
          res.end(JSON.stringify({ message: `${Name} deleted successfully` }));
        }
      });
    }
  }
}

module.exports={api};
