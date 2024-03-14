const { parse } = require('querystring');

const parseSQL=body=>{
  const data = parse(body.join(''));
  const dataNames=[];
  const dataValues=[];
  const questionMarks=[];
  for(let name in data){
    dataNames.push(name);
    dataValues.push(data[name]);
    questionMarks.push('?');
  }
  const sql = `INSERT INTO {} ${dataNames} VALUES (${questionMarks})`;
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
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: `Error fetching ${Name}`, error: err.toString() }));
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results));
      }
    });
  } else if (method === 'POST') {
    req.on('end', () => {
      const [sql,values]=parseSQL(body);

      db.query(sql, values, (err, result) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: `Error adding ${Name}`, error: err.toString() }));
        } else {
          res.statusCode = 201;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: `${Name} added successfully`, Id: result.insertId }));
        }
      });
    });
  } else if (method === 'DELETE') {
    const ID = query[Name+'_ID'];

    if (!ID) {
      res.statusCode = 400; // Bad Request
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: Name+' ID is required' }));
    } else {
      const sql = `DELETE FROM ${NAME} WHERE ${Name}_ID = `;
      const values = [ID];

      db.query(sql, values, (err, result) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: `Error deleting ${Name}`, error: err.toString() }));
        } else if (result.affectedRows === 0) {
          // No rows affected means no zone was found with that ID
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: `${Name} not found` }));
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: `${Name} deleted successfully` }));
        }
      });
    }
  }
}

module.exports={api};