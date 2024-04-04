import './table.css'
import { postData,getData,updateData,deleteData } from '../../communication';
import React, { useState, useEffect } from 'react';
import { formatDate,Add,Modify,Delete,getID,parseName } from '../../utils';

let i=0;
function DisplayTable({link}){
  const [data, setData] = useState([]);
  const [dataEntry,setDataEntry]=useState(<></>);
  const [renderCnt,render]=useState(1);
  const reRender=()=>render(renderCnt+1);
  useEffect(() => {
    getData(link)
    .then(res => setData(res))
    .catch(err => console.log(err))
  },[])

  const dataColumns=[];
  for(let prop in data[0])
    dataColumns.push(prop);
  const Name=parseName(link.substring(1));
  const ID=getID(Name);

  const renderCell = (value, prop) => {
    if (prop.includes("Date")) 
      return formatDate(value);
    return value;
  };
  return <center>
  <section id="outer-table-container">
    <div id="inner-table-container">
      <table id='quote-table'>
        <thead className='qthead'><tr className='qtr'>{
          dataColumns.map(prop=><th className='qth' key={prop}>{prop+' '}</th>)
        }<th className='qth' key={'~'+i}>Modify</th>
        <th className='qth' key={'-'+i}>Delete</th>
        </tr></thead>
        <tbody className='qtbody'>{
          data.map((val,idx) => <>
            <tr className='qtr' key={val[ID]}>{  
              dataColumns.map((prop)=>
                <td>{renderCell(val[prop], prop)}</td>)
            }
            <td><button onClick={()=>Modify(link,val,setDataEntry,reRender,data,idx)}>Modify</button></td>
            <td><button onClick={()=>Delete(link,val,setDataEntry,reRender,data,idx)}>Delete</button></td>
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

export default DisplayTable;