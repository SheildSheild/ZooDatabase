import './table.css'
import { postData,getData,updateData,deleteData } from '../../communication';
import React, { useState, useEffect } from 'react';
import DataEntry from '../dataEntry';



function DisplayTable({link}){
  const [data, setData] = useState([]);
  const [dataEntry,setDataEntry]=useState(<></>);
  const [renderCnt,render]=useState(1);
  const reRender=()=>render(renderCnt+1);
  useEffect(() => {
    getData(link)
    .then(res => setData(res))
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
  <section id="outer-table-container">
    <div id="inner-table-container">
      <table id='quote-table'>
        <thead className='qthead'><tr className='qtr' key={-1}>{
          dataColumns.map((prop,idx)=><th className='qth' key={idx+'+'}>{prop+' '}</th>)
        }<th className='qth' key={-1+'+'}>Modify</th>
        <th className='qth' key={-2+'+'}>Delete</th>
        </tr></thead>
        <tbody className='qtbody'>{
          data.map((val,idx) => <>
            <tr className='qtr' key={idx}>{
              
              dataColumns.map((prop,i)=>
                <td key={idx+'-'+i}>
                  {val[prop]}
                  
                </td>)
            }
            <td key='-1'><button onClick={()=>Modify(link,val,setDataEntry,reRender,data,idx)}>Modify</button></td>
            <td key='-2'><button onClick={()=>Delete(link,val,setDataEntry,reRender,data,idx)}>Delete</button></td>
            </tr>
          </>)
        }</tbody>
      </table>
    </div>
  </section>
  <button className='add-button' onClick={()=>Add(link,setDataEntry,reRender,data)}>Add</button>
  <br/><br/>
  {dataEntry}
  </center>
}

function getId(val){
  let id='ID'
  let idVal=null
  for(let prop in val)
    if(prop.substring(prop.length-2).toLowerCase()=='id'){
      id=prop;
      break;
    }
  return [id,idVal]
}

function Modify(link,val,setDataEntry,reRender,table,idx) {
  setDataEntry(<DataEntry title="Modify Data" name={link.substring(1)} onSubmit={data=>{
    updateData(link,...getId(val),data).then(val=>{
      if(!val){
        setDataEntry(<>Failed to Modify</>);
        reRender();
        return;
      }
      setDataEntry(<>Successfully Modified</>);
      table[idx]=data
      reRender();
    });
  }} preFilled={val}/>);
  setDataEntry(<>Modifying...</>);
  reRender();
}

function Delete(link,val,setDataEntry,reRender,table,idx) {
  deleteData(link,...getId(val)).then(val=>{
    console.log(val)
    if(!val){
      setDataEntry(<>Failed to Delete</>);
      reRender();
      return;
    }
    setDataEntry(<>Successfully Deleted</>);
    table.splice(idx,1);
    reRender();
  });
  setDataEntry(<>Deleting...</>);
  reRender();
}

function Add(link,setDataEntry,reRender,table){
  setDataEntry(<DataEntry title="Enter Data" name={link.substring(1)} onSubmit={data=>{
    postData(link,data).then(val=>{
      if(!val){
        setDataEntry(<>Failed to Add</>);
        reRender();
        return;
      }
      setDataEntry(<>Successfully Added</>);
      table.push(data);
      reRender();
    });
    setDataEntry(<>Adding...</>);
    reRender();
  }}/>);
  reRender();
}

export default DisplayTable;