import './table.css'
import { postData,getData,updateData,deleteData } from '../../communication';
import React, { useState, useEffect } from 'react';




function DisplayTable({link}){
  
  const [data, setData] = useState([]);
  useEffect(() => {
    getData(link,data)
    .then(res => setData(res.data))
    .catch(err => console.log(err))
  })

  const dataColumns=[];
  for(let prop in data[0])
    dataColumns.push(prop);

  //data.sort((a,b)=>a.date-b.date)
  return <center>
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
            <button onClick={Modify}>Modify</button>
            <button onClick={Delete}>Delete</button>
            </tr>
          </>)
        }</tbody>
      </table>
    </div>
  </section>
  </center>
}

function Modify() {
  
}

function Delete() {
  console.log("Hello World");
}

export default DisplayTable;