function getData(url,data){
  return sendMessage(url,data,'GET')
}

function postData(url,data){
  return sendMessage(url,data,'POST')
}

function sendMessage(url,data,method){
  return fetch(url,{
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res=>res.json())
}

export {getData,postData}
