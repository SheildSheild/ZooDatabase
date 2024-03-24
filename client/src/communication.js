const apiUrl='http://158.101.102.104:3301/api'

function getData(url, data){
  return fetch(apiUrl+url,{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data}`
    },
  }).then(
      res=>res.json(),
      err=>console.log(err)
  );
}

function postData(url,data){
  return fetch(apiUrl+url,{
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(
    res=>res.json(),
    err=>console.log(err)
  );
}

function deleteData(url,idString,id) {
  return fetch(apiUrl+url+`?${idString}=${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(
    res=>res.json(),
    err=>console.log(err)
  );
}

function updateData(url,idString,id,data) {
  const auth=localStorage.getItem('auth');
  if(auth)
    data['auth']=auth;

  return fetch(apiUrl+url+`?${idString}=${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(
    res=>res.json(),
    err=>console.log(err)
  );
}

export {getData,postData,deleteData,updateData}
