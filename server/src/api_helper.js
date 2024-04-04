const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

const parseBody=(body)=>{
  const data = JSON.parse(body.join(''));
  const dataNames=[];
  const dataValues=[];
  for(let name in data){
    dataNames.push(name);
    dataValues.push("'"+data[name]+"'");
  }
  return {dataNames,dataValues};
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

const parseQuery=(query,skip)=>{
  const values=[];
  for(let q in query){
    if(skip&&skip.has(q))continue;
    values.push(`${q} = '${query[q]}'`)
  }
  return values;
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
}
function onUnauthorized(res,message='Unauthorized'){
  res.statusCode = 401; 
  res.end(JSON.stringify({message}));
}
function onSuccess(res,val,code=200){
  res.statusCode = code;
  res.end(JSON.stringify(val));
};

async function handleLogin(res,results,Name,query){
  if(results.length==0)
    return onNotFound(res,'Username');

  const user=results[0];
  if(!(await bcrypt.compare(query.Password,user.Password)))
        return onUnauthorized(res,'Wrong Password');

  const userId=user[getID(Name)];
  user.Role=user.Role||'Customer';
  const token = jwt.sign(
    { userId, role: user.Role },
    SECRET_KEY, { expiresIn: '1h' }
  );
  onSuccess(res,{user,token,userId});
}

async function encryptPassword(dataNames,dataValues){
  const idx=dataNames.findIndex(v=>v=='Password');
  if(idx==-1)return;
  const val=dataValues[idx];
  const parsed=val.substring(1,val.length-1);
  dataValues[idx]="'"+await bcrypt.hash(parsed,10)+"'";
}

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Expecting "Bearer TOKEN"

  if (token == null) 
    return onUnauthorized(res,'No JWT');

  jwt.verify(token, SECRET_KEY, async (err, user) => {
    if (err || !user)
      return console.log(err,onUnauthorized(res,'JWT Expired'));
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
    onUnauthorized(res,'Role not Authorized');
}

module.exports={
  parseBody,parseQuery,parseName,getID,
  onError,onBadRequest,onNotFound,onSuccess,onUnauthorized,
  handleLogin,encryptPassword,
  authenticateToken,authorizeRoles
};