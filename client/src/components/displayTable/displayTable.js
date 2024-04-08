import './table.css'
import { postData,getData,updateData,deleteData } from '../../communication';
import React, { useState, useEffect } from 'react';
import { formatDate,Add,Modify,Delete,getID,parseName, fetchNames } from '../../utils';

let i=0;
function DisplayTable({link, hasDataEntry}){
  hasDataEntry=true;
  const [data, setData] = useState([]);
  const [dataColumns,_] = useState([]);
  const [map,setMap] =useState({});
  const [dataEntry,setDataEntry]=useState(<></>);
  const [renderCnt,render]=useState(1);
  const reRender=()=>render(renderCnt+1);


  const Name=parseName(link.substring(1));
  const ID=getID(Name);

  const NameToID=(name)=>
    name.substring(0,name.length-2)+'ID';

  const convertDataForDB = row =>{
    const newRow={};
    for(let val in row){
      if(map[val])
        newRow[val]=map[val].NameToID[row[val]];
      else
        newRow[val]=row[val];
    }
    return newRow;
  };

  const IDToName=(Id)=>
    Id.substring(0,Id.length-2)+'Name';

  const convertDataForDisplay = (row,transform) =>{
    const newRow={};
    for(let val in row){
      if(transform[val])
        newRow[IDToName(val)]=transform[val].IDToName[row[val]];
      else
        newRow[val]=row[val];
    }
    //console.log('new row:',newRow)
    return newRow;
  };

  useEffect(() => {
    (async ()=>{
      const newData=await getData(link);
      console.log(newData);
      dataColumns.length=0;
      for(let prop in newData[0])
        dataColumns.push(prop);

      const newMap=await fetchNames(dataColumns,ID);
      dataColumns.forEach((col,i,arr)=>{
        if(col.substring(col.length-2)=='ID' && col!=ID)
          arr[i]=IDToName(col);
      });
      setMap(newMap);
      setData(newData.map(val=>convertDataForDisplay(val,newMap)));
    })().catch(err => setDataEntry(<div>Error: {err.message}</div>))
  },[]);

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
        }
        {hasDataEntry&&<>
          <th className='qth' key={'~'+i}>Modify</th>
          <th className='qth' key={'-'+i}>Delete</th>
        </>}
        </tr></thead>
        <tbody className='qtbody'>{
          data &&data.map((val,idx) => <>
            <tr className='qtr' key={data[ID]}>{  
              dataColumns.map((prop)=>
                <td>{renderCell(val[prop], prop)}</td>)
            }
            {hasDataEntry&&<>
              <td><button onClick={()=>Modify(link,data[idx],setDataEntry,reRender,data,idx,val=>convertDataForDisplay(val,map),convertDataForDB,map)}>Modify</button></td>
              <td><button onClick={()=>Delete(link,data[idx],setDataEntry,reRender,data,idx)}>Delete</button></td>
            </>}
            </tr>
          </>)
        }</tbody>
      </table>
    </div>
  </section>
  {hasDataEntry&&<>
    <button className='add-button' onClick={()=>Add(link,setDataEntry,reRender,data,val=>convertDataForDisplay(val,map),convertDataForDB,map)}>Add</button>
  </>}
  <br/><br/>
  {dataEntry}
  </center>
}

export default DisplayTable;