import './table.css'
import { postData,getData,updateData,deleteData } from '../../communication';
import React, { useState, useEffect } from 'react';
import { formatDate,Add,Modify,Delete,getID,parseName, fetchNames, fetchEmployeeDetailsForAnimal } from '../../utils';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import AttendsToDialog from '../AttendsToDialog';

let i=0;
function DisplayTable({route, hasDataEntry}){
  hasDataEntry=true;
  const [data, setData] = useState([]);
  const [dataColumns,_] = useState([]);
  const [map,setMap] =useState({});
  const [dataEntry,setDataEntry]=useState(<></>);
  const [openDialog, setOpenDialog] = useState(false); // New state for dialog visibility
  const [selectedRow, setSelectedRow] = useState(null); // State to hold the selected row's data
  const [employeeDetails, setEmployeeDetails] = useState([]);
  console.log("DisplayTable props:", { route, hasDataEntry });
  const [renderCnt,render]=useState(1);
  const reRender=()=>render(renderCnt+1);

  const formatRouteToTitle = (routeString) => {
    if(!routeString) return '';
    const withoutBackslash = routeString.startsWith('\\') ? routeString.substring(1) : routeString;
    console.log(withoutBackslash)
    return withoutBackslash.charAt(0).toUpperCase() + withoutBackslash.slice(1);
  };
  const Name=parseName(route.substring(1));
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
      const newData=await getData(route);
      if(newData.status){
        setDataEntry('Error: '+newData.message);
        return;
      }
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

  const handleDialogOpen = (rowData) => {
    setSelectedRow(getID('Animals', rowData)[1]);
    fetchEmployeeDetailsForAnimal(getID('Animals', rowData)[1]).then(details => {
      setEmployeeDetails(details); // Store the fetched details
      setOpenDialog(true);
    }).catch(err => console.error("Failed to fetch employee details:", err));
  };
  
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const tableTitle = formatRouteToTitle(route);

  return <center>
  <section id="outer-table-container">
    <div id="inner-table-container">
    <h2>{tableTitle}</h2>
      <table id='quote-table'>
        <thead className='qthead'><tr className='qtr'>{
          dataColumns.map(prop=><th className='qth' key={prop}>{prop+' '}</th>)
        }
        {hasDataEntry&&<>
          <th className='qth' key={'~'+i}>Modify</th>
          <th className='qth' key={'-'+i}>Delete</th>
          <th className='qth' key={'openDialog' + i}>Actions</th> 
        </>}
        </tr></thead>
        <tbody className='qtbody'>{
          data &&data.map((val,idx) => <>
            <tr className='qtr' key={data[ID]}>{  
              dataColumns.map((prop)=>
                <td>{renderCell(val[prop], prop)}</td>)
            }
            {hasDataEntry&&<>
              <td><button onClick={()=>Modify(route,data[idx],setDataEntry,reRender,data,idx,val=>convertDataForDisplay(val,map),convertDataForDB,map)}>Modify</button></td>
              <td><button onClick={()=>Delete(route,data[idx],setDataEntry,reRender,data,idx)}>Delete</button></td>
              <td><Button variant="contained" color="error" disableElevation disabled={false} onClick={() => handleDialogOpen(val)}>CareTakers</Button></td>
            </>}
            </tr>
          </>)
        }</tbody>
      </table>
    </div>
  </section>
  {hasDataEntry&&<>
    <button className='add-button' onClick={()=>Add(route,setDataEntry,reRender,data,val=>convertDataForDisplay(val,map),convertDataForDB,map)}>Add</button>
  </>}
  <br/><br/>
  {dataEntry}
  <AttendsToDialog open={openDialog} onClose={handleDialogClose} employeeDetails={employeeDetails} selectedRow={selectedRow}/>
  </center>
}

export default DisplayTable;