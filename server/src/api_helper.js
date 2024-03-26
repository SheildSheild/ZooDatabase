const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

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
      values.push(`${q} = '${query[q]}'`)
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

function handleLogin(res,results,Name){
  if(results.length==0)
    return onNotFound(res,'Wrong Password or Username');

  const user=results[0];
  const userId=user[getID(Name)];
  user.Role=user.Role||'Customer';
  const token = jwt.sign(
    { userId, role: user.Role },
    SECRET_KEY, { expiresIn: '1h' }
  );
  onSuccess(res,{user,token,userId});
}

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Expecting "Bearer TOKEN"

  if (token == null) 
    return onUnauthorized(res);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err || !user)
      return console.log(err,onForbidden(res));
    req.user = user;
    next();
  });
}

function authorizeRoles(req, res, allowedRoles, next) {
  const userRole = req.user.role;
  console.log(allowedRoles,userRole)
  if (allowedRoles.includes(userRole)) 
    next(); 
  else 
    onForbidden(res);
}

module.exports={
  parseSQL,parseQuery,parseName,getID,
  onError,onBadRequest,onForbidden,onNotFound,onSuccess,onUnauthorized,
  handleLogin,authenticateToken,authorizeRoles
};