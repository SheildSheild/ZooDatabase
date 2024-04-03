const {
  parseBody,parseQuery,parseName,
  onError,onBadRequest,onNotFound,onSuccess,
  handleLogin,encryptPassword,
  authenticateToken,authorizeRoles, getID
} = require('./api_helper');
const {routes}=require('./routes');

function api(req,res,query,body,name,db) {
  let isLogin=false;
  let isSignUp=false;
  if(name.startsWith('login_')){
    isLogin=true;
    name=name.substring(6);
  }
  if(name.startsWith('customers')){
    isSignUp=true;
  }
  const NAME=name.toUpperCase();
  const Name=parseName(name);

  let next=()=>{};

  switch(req.method){
  case 'GET':
    next=()=>{
      const values=parseQuery(
        query,
        isLogin?new Set(['Password']):undefined
      );
      let sql=`SELECT * FROM ${NAME}`;
      if(values.length>0)
        sql+=` WHERE ${values.join(' AND ')}`;
      console.log(sql,query,values)
      db.query(sql,async (err, results) => {
        if (err) onError(res,'Error fetching '+Name,err);
        else if(isLogin) await handleLogin(res,results,Name,query);
        else onSuccess(res,results);
      });
    };
    break;
  case 'POST':
    next=()=>{
      req.on('end', async () => {
        const {dataNames,dataValues}=parseBody(body);
        //if(name=='customers'||name=='employees') await encryptPassword(dataNames,dataValues);
        const sql = `INSERT INTO ${NAME}(${dataNames}) VALUES (${dataValues})`;
        db.query(sql, (err, result) => {
          if (err) onError(res,'Error adding '+Name,err);
          else onSuccess(res,{ message: `${Name} added successfully`, Id: result.insertId },201);
        });
      });
    };
    break;
  case 'DELETE':
  case 'PUT':
    const ID=getID(Name);
    if (query[ID]===undefined) 
      return onBadRequest(res,"ID required");   
    if (req.method=='DELETE')
      next=()=>{
        const sql = `DELETE FROM ${NAME} WHERE ${ID} = ${query[ID]}`;
        db.query(sql, (err, result) => {
          if (err) onError(res,'Error deleting '+Name,err);
          else if (result.affectedRows === 0) onNotFound(res,Name);
          else onSuccess(res,{ message: `${Name} deleted successfully` });
        });
      };
    else
      next=()=>{
        req.on('end', () => {
          const values=parseQuery(JSON.parse(body.join('')));
          const sql = `UPDATE ${NAME} SET ${values} WHERE ${ID} = ${query[ID]}`;
          db.query(sql, (err, result) => {
            if (err) onError(res,'Error updating '+Name,err)
            else if (result.affectedRows === 0) onNotFound(res,Name);
            else onSuccess(res,{ message: `${Name} updated successfully` });
          });
        });
      };
    break;
  default:
      break;
  }
  if(isLogin||isSignUp||routes[name].rolesWithAccess(req.method)=='All')
    next();
  else
    authenticateToken(req,res,()=>
      authorizeRoles(req,res,routes[name].rolesWithAccess(req.method),next)
    );
}

module.exports={api};