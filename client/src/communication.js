const apiUrl='http://158.101.102.104:3301/api'

function getData(url){
  return fetch(apiUrl+url).then(res=>res.json());
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

function deleteData(url,id) {
  return fetch(apiUrl+url+'?id={id}', {
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

function updateData(url,id,data) {
  const auth=localStorage.getItem('auth');
  if(auth)
    data['auth']=auth;

  return fetch(apiUrl+url+'?id=${id}', {
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
