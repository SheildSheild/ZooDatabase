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

function api(req,res,query,body,name,db) {
  const method = req.method;
  const NAME=name.toUpperCase();
  const Name=name[0].toUpperCase()+name.substring(1);

  if (method === 'GET') {
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
      res.statusCode = 400; // Bad Request
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