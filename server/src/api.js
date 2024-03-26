const {
  parseSQL,parseQuery,parseName,
  onError,onBadRequest,onNotFound,onSuccess,
  handleLogin,authenticateToken,authorizeRoles
} = require('./api_helper');
const {routes}=require('./routes');

function api(req,res,query,body,name,db) {
  let isLogin=false;
  if(name.startsWith('login_')){
    isLogin=true;
    name=name.substring(6);
  }
  const NAME=name.toUpperCase();
  const Name=parseName(name);

  let next=()=>{};

  switch(req.method){
  case 'GET':
    next=()=>{
      const {values,ID,IDString}=parseQuery(Name,query);
      let sql=`SELECT * FROM ${NAME}`;
      if(ID)
        values.push(`${IDString} = ${ID}`);
      if(values.length>0)
        sql+=` WHERE ${values.join(' AND ')}`;
      console.log(sql,query,values)
      db.query(sql,(err, results) => {
        if (err) onError(res,'Error fetching '+Name,err);
        else if(isLogin) handleLogin(res,results,Name);
        else onSuccess(res,results);
      });
    };
    break;
  case 'POST':
    next=()=>
    req.on('end', () => {
      const [sql,values]=parseSQL(NAME,body);
      db.query(sql, values, (err, result) => {
        if (err) onError(res,'Error adding '+Name,err);
        else onSuccess(res,{ message: `${Name} added successfully`, Id: result.insertId },201);
      });
    });
    break;
  default:
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

  if(isLogin||routes[name].rolesWithAccess(req.method)=='All')
    next();
  else
    authenticateToken(req,res,()=>
      authorizeRoles(req,res,routes[name].rolesWithAccess(req.method),next)
    );
}

module.exports={api};

/*
remove users
employees and customers have password
who actually cares about hashing passwords? no one is hacking the DB
login will be through get instead with query params
*/