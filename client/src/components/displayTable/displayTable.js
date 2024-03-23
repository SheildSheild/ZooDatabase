import './table.css'
import { postData,getData,updateData,deleteData } from '../../communication';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataEntryPage from '../dataEntry/dataEntry';




function DisplayTable({link}){
  
  const [data, setData] = useState([]);
  useEffect(() => {
    getData(link,data)
    .then(res => setData(res.data))
    .catch(err => console.log(err))
  })

  // Function to handle modification of data
  const handleModify = (data, id) => {
    // Your modification logic goes here
    updateData("/animals", id, data) 
      .then(res => {
        // Handle success if needed
        console.log('Data updated successfully:', res);
      })
      .catch(err => {
        // Handle error if needed
        console.error('Error updating data:', err);
      });
    console.log('Modify', id);
  };

  // Function to handle deletion of data
  const handleDelete = (id) => {
    // Delete data from the backend
    deleteData('/animals', id)
      .then(() => {
        // Update state to reflect the deletion
        setData(prevData => prevData.filter(item => item.Animal_ID !== id));
      })
      .catch(err => console.log(err));
  };

  const dataColumns=[];
  for(let prop in data[0])
    dataColumns.push(prop);

  //data.sort((a,b)=>a.date-b.date)
  return <center>
  <h1>Animal Data</h1>
  {/* <Link class="Create" to="/dataEntry">Create +</Link> */}
  <a href="#/dataEntry"><button>Create +</button></a>
  <section id="outer-table-container">
    <div id="inner-table-container">
      <table id='quote-table'>
        <thead className='qthead'><tr className='qtr' key={-1}>{
          dataColumns.map((prop,idx)=><th className='qth' key={idx+'+'}>{prop+' '}</th>)
        }</tr></thead>
        <tbody className='qtbody'>{
          data.map((val,idx) => <>
            <tr className='qtr' key={idx}>{
              
              dataColumns.map((prop,i)=>
                <td key={idx+'-'+i}>
                  {val[prop]}
                  
                </td>)
            }
            <button onClick={handleModify(data[idx], data[idx].Animal_ID)}>Modify</button>
            <button onClick={handleDelete(data[idx].Animal_ID)}>Delete</button>
            </tr>
          </>)
        }</tbody>
      </table>
    </div>
  </section>
  </center>
}


export default DisplayTable;