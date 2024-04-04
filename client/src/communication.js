
const apiUrl='http://158.101.102.104:3301/api'

const then=[
  res=>{
    if(res.ok)
      return res.json();
    return res.json().then(data=>{
      if(data.message=='JWT Expired'){
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        localStorage.removeItem('expirationDate');
        window.location.href='/';
      }
      if(data.message=='No JWT')
        window.location.href='/';
      return {...data,status:res.status,statusText:res.statusText};
    });
  },
  err=>{
    console.log(err);
    throw err;
  }
];

const headers = () => {
  const token = localStorage.getItem('token');
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  if (token) 
    headers['Authorization'] = `Bearer ${token}`;
  
  return headers;
};


function getData(url){
  return fetch(apiUrl+url,{
    headers: headers(),
  }).then(...then);
}

function postData(url,data){
  return fetch(apiUrl+url,{
    method:'POST',
    headers: headers(),
    body: JSON.stringify(data)
  }).then(...then);
}

function deleteData(url,idString,id) {
  return fetch(apiUrl+url+`?${idString}=${id}`, {
    method: 'DELETE',
    headers: headers(),
  }).then(...then);
}

function updateData(url,idString,id,data) {
  return fetch(apiUrl+url+`?${idString}=${id}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(data)
  }).then(...then);
}

export {getData,postData,deleteData,updateData}
