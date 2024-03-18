function getData(url){
  return fetch(url).then(res=>res.json());
}

function postData(url,data){
  return fetch(url,{
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res=>res.json());
}

export {getData,postData}
