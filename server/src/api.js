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
    db.query(`SELECT * FROM ${NAME}`, (err, results) => {
      if (err) onError('Error fetching',err); 
      else onSuccess(results);
    });
  } 
  else if (req.method === 'POST') {
    req.on('end', () => {
      const [sql,values]=parseSQL(NAME,body);
      db.query(sql, values, (err, result) => {
        if (err) onError('Error adding',err);
        else onSuccess({ message: `${Name} added successfully`, Id: result.insertId },201);
      });
    });
  } 
  else{
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
    }
    else{
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