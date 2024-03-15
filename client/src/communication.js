import DisplayTable from './DisplayTable';

function requestData(){
  fetch('url')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(err=>{
      console.error('Error fetching data:', err);
    })
    .then(data=>{
      renderTable(data);
    });

}

function postData(){

}

function renderTable(data) {
  // Assuming you have a root element with id 'root' to render the DisplayTable component
  const rootElement = document.getElementById('root');
  ReactDOM.render(<DisplayTable data={data} />, rootElement);
}