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
  },[])

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


const parseName=(name)=>{
  const Name=[];
  let up=true;
  for(let i=0;i<name.length;i++){
    if(up){
      up=false;
      Name.push(name[i].toUpperCase());
    }
    else
      Name.push(name[i]);
    if(name[i]=='_')
      up=true;
  }
  return Name.join('');
};

const getID=(Name,data)=>{
  let ID;
  if(Name[Name.length-1]=='s')
    ID=Name.substring(0,Name.length-1)+'_ID';
  else
    ID=Name+'_ID';
  return [ID,data[ID]];
};

function Modify(link,val,setDataEntry,reRender,table,idx) {
  const Name=parseName(link.substring(1));
  setDataEntry(<DataEntry title="Modify Data" name={Name} onSubmit={data=>{
    updateData(link,...getID(Name,data),data).then(val=>{
      if(!val){
        setDataEntry(<>Failed to Modify</>);
        reRender();
        return;
      }
      setDataEntry(<>Successfully Modified</>);
      table[idx]=data
      reRender();
    });
    setDataEntry(<>Modifying...</>);
  }} preFilled={val}/>);
  reRender();
}

function Delete(link,val,setDataEntry,reRender,table,idx) {
  const Name=parseName(link.substring(1));
  deleteData(link,...getID(Name,val)).then(val=>{
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
  const Name=parseName(link.substring(1));
  setDataEntry(<DataEntry title="Enter Data" name={Name} onSubmit={data=>{
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