const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';
const {routes}=require('./routes');

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

const parseName=(name)=>{
  const Name=[];
  let up=true;
  for(let i=0;i<name.length;i++){
    if(up){
      up=false;
      Name.push(name[i].toUpperCase());
    }
    else
      Name.push(name[i]);
    if(name[i]=='_')
      up=true;
  }
  return Name.join('');
};

const getID=(Name)=>{
  if(Name[Name.length-1]=='s')
    return Name.substring(0,Name.length-1)+'_ID';
  return Name+'_ID';
};

const parseQuery=(Name,query)=>{
  let ID;
  const IDString=getID(Name);
  const values=[];
  for(let q in query){
    if(q==IDString)
      ID=query[q];
    else
      values.push(`${q} = ${query[q]}`)
  }
  return {ID,IDString,values};
};

function onError(res,str,err){
  console.log(err);
  res.statusCode = 500;
  res.end(JSON.stringify({ message: str, error: err.toString() }));
};
function onNotFound(res,Name){
  res.statusCode = 404;
  res.end(JSON.stringify({ message: Name+' not found' }));
};
function onBadRequest(res,message){
  res.statusCode = 400;
  res.end(JSON.stringify({ message }));
};
function onForbidden(res){
  res.statusCode = 403;
  res.end('Forbidden');
}
function onUnauthorized(res){
  res.statusCode = 401; 
  res.end('Unauthorized');
}
function onSuccess(res,val,code){
  res.statusCode = code||200;
  res.end(JSON.stringify(val));
};

async function handleRegister(data, db, res) {
  const { username, email, password, role, Address = "",Birth_Date = "",Start_Date = "",SSN = null, Gender = "",isMedic = false, isManager = false } = data; // Defaulting isMedic and isManager to false if not provided
  const hashedPassword = await bcrypt.hash(password, 10);

  const userInsertSql = `INSERT INTO USERS (Username, Email, Hashed_Password) VALUES (?, ?, ?)`;
  
  db.query(userInsertSql, [username, email, hashedPassword], async (err, userResult) => {
    if (err) 
      return onError(res,'Error Registering User',err);
    
    if (role === 'employee') {
      const employeeInsertSql = `INSERT INTO EMPLOYEES (Fname, Lname, SSN, Gender,Email, Address, Birth_Date, Start_Date, User_id, isManager, isMedic) VALUES (?, ?, ?,?, ?, ?, ?, ?, ?, ?,?)`;
      db.query(employeeInsertSql, [username, username, SSN,Gender,email, Address, Birth_Date, Start_Date, userResult.insertId, isManager, isMedic], (err, employeeResult) => {
        if (err) 
          return onError(res,'User registered but error creating Employee',err);
        onSuccess(res,{ message: 'Employee registered successfully', userId: userResult.insertId, employeeId: employeeResult.insertId },201);
      });
    } else 
      onSuccess(res,{ message: 'User registered successfully', userId: userResult.insertId },201);
  });
}

async function handleLogin(data, db, res) {
  const { email, password } = data;
  console.log(email, password)
  const sql = `
    SELECT USERS.User_ID, USERS.Email, USERS.Hashed_Password, USERS.Role, 
           EMPLOYEES.isMedic, EMPLOYEES.isManager
    FROM USERS 
    LEFT JOIN EMPLOYEES ON USERS.User_ID = EMPLOYEES.User_ID
    WHERE USERS.Email = ?
  `;
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) 
      return onUnauthorized(res);
    const user = results[0];
    
    console.log(email,password,user);
    const passwordMatch = await bcrypt.compare(password, user.Hashed_Password);
    console.log(passwordMatch)
    
    if (passwordMatch) {
      user.Role=user.Role||'customer';
      const token = jwt.sign(
        { userId: user.User_ID, role: user.Role },
        SECRET_KEY, { expiresIn: '1h' }
      );
      onSuccess(res,{
        message: 'Login successful',
        userId: user.User_ID,
        role: user.Role,
        isEmployee: user.Role === 'employee',
        isMedic: user.isMedic,
        isManager: user.isManager,
        token,
      });
    } 
    else 
      onUnauthorized(res);
  });
}

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Expecting "Bearer TOKEN"

  if (token == null) 
    return onUnauthorized(res);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err || !user)
      return onForbidden(res);
    req.user = user;
    next();
  });
}

function authorizeRoles(req, res, allowedRoles, next) {
  const userRole = req.user.role;
  if (allowedRoles.includes(userRole)) 
    next(); 
  else 
    onForbidden(res);
}

const getUsers=(req,res,db)=>{
  const userId = req.user.userId;
  const sqlQuery = `
    SELECT 
      USERS.User_ID AS userId, USERS.Username, USERS.Email, 
      EMPLOYEES.Employee_ID, EMPLOYEES.Fname, 
      EMPLOYEES.Lname, EMPLOYEES.SSN, 
      EMPLOYEES.Email AS EmployeeEmail, 
      EMPLOYEES.Address, EMPLOYEES.Birth_Date, 
      EMPLOYEES.Start_Date, EMPLOYEES.isManager, 
      EMPLOYEES.isMedic
    FROM USERS
    LEFT JOIN EMPLOYEES ON USERS.User_ID = EMPLOYEES.User_ID
    WHERE USERS.User_ID = ?
  `;

  db.query(sqlQuery, [userId], (err, results) => {
    if (err) 
      return onError(res,`Error fetching user and employee data`,err);

    const user = results[0];
    if (!user) 
      return onNotFound(res,'User');

    onSuccess(res,{
      userId: user.userId,
      username: user.Username,
      email: user.Email,
      employeeDetails: user.Employee_ID ? {
        employeeId: user.Employee_ID,firstName: user.Fname,
        lastName: user.Lname,ssn: user.SSN,
        email: user.EmployeeEmail,address: user.Address,
        birthDate: user.Birth_Date,startDate: user.Start_Date,
        isManager: !!user.isManager,isMedic: !!user.isMedic,
      } : null
    });
  });
};

function api(req,res,query,body,name,db) {
  const NAME=name.toUpperCase();
  const Name=parseName(name);

  if (req.method === 'GET') {
    let next=()=>{
      const {values,..._}=parseQuery(Name,query);
      let sql=`SELECT * FROM ${NAME}`;
      if(values.length>0)
        sql+=` WHERE ${values.join()}`;
      db.query(sql,(err, results) => {
        if (err) onError(res,'Error fetching '+Name,err);
        else onSuccess(res,results);
      });
    };
    switch(name){
      case 'users':
        next=()=>getUsers(req,res,db);
        return;
      
    }

    if(routes[name].view=='all')
      next();
    else
      authenticateToken(req,res,()=>
        authorizeRoles(req,res,routes[name].view,next)
      );
  } 
  else {
    let next=()=>
      req.on('end', () => {
        const [sql,values]=parseSQL(NAME,body);
        db.query(sql, values, (err, result) => {
          if (err) onError(res,'Error adding '+Name,err);
          else onSuccess(res,{ message: `${Name} added successfully`, Id: result.insertId },201);
        });
      });
    if (req.method === 'POST') {
      switch(name){
        case 'register':
        case 'login':
          next=()=>req.on('end', () => {
            let data = {}; 
            if (body.length > 0) 
              data = JSON.parse(body.join('')); 
            
            if (name === 'login')
              handleLogin(data, db, res);
            else
              handleRegister(data, db, res);
          });
          break;
      }
    }
    else { 
      const {ID,IDString,values}=parseQuery(Name,query);
  
      if (ID===undefined) return onBadRequest(res,"ID required");
      else if (req.method === 'DELETE') 
        next=()=>{
          const sql = `DELETE FROM ${NAME} WHERE ${IDString} = ${ID}`;
          db.query(sql, (err, result) => {
            if (err) onError(res,'Error deleting '+Name,err);
            else if (result.affectedRows === 0) onNotFound(res,Name);
            else onSuccess(res,{ message: `${Name} deleted successfully` });
          });
        } 
      else
        next=()=>{
          const sql = `UPDATE ${NAME} SET ${values.join()} WHERE ${IDString} = ${ID}`;
          db.query(sql, (err, result) => {
            if (err) onError(res,'Error updating '+Name,err)
            else if (result.affectedRows === 0) onNotFound(res,Name);
            else onSuccess(res,{ message: `${Name} updated successfully` });
          });
        }
    }

    if(routes[name].modify=='all')
      next();
    else
      authenticateToken(req,res,()=>
        authorizeRoles(req,res,routes[name].modify,next)
      );
  }
}

module.exports={api};

/*
  Idea: for every get i check role to see if can view
  same for post

*/