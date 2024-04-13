import './table.css'
import { postData,getData,updateData,deleteData } from '../../communication';
import React, { useState, useEffect } from 'react';
import { formatDate,Add,Modify,Delete,getID,parseName, fetchNames, fetchEmployeeDetailsForAnimal } from '../../utils';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ManyToManyDialog from '../ManyToManyDialog';
import schema from '../../schema';

let i=0;
function DisplayTable({route, hasDataEntry, defaultValues}){
  defaultValues=defaultValues||{};
  hasDataEntry=true;

  const [data, setData] = useState([]);
  const [dataColumns,setDataColumns] = useState([]);
  const [map,setMap] =useState({});
  const [dataEntry,setDataEntry]=useState(false);
  const [dialog, setDialog] = useState(<></>);
  //console.log("DisplayTable props:", { route, hasDataEntry });
  const [renderCnt,render]=useState(1);
  const reRender=()=>render(renderCnt+1);

  const Name=parseName(route.substring(1));
  const ID=getID(Name);
  
  const NameToID=(name)=>
    name.substring(0,name.length-2)+'ID';
  const IDToName=(Id)=>
    Id.substring(0,Id.length-2)+'Name';
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
  const convertDataForDisplay = (row,transform) =>{
    const newRow={};
    for(let val in row){
      if(transform[val])
        newRow[IDToName(val)]=transform[val].IDToName[row[val]];
      else
        newRow[val]=row[val];
    }
    return newRow;
  };

  useEffect(() => {
    (async ()=>{
      const newData=await getData(route);
      if(newData.status){
        setDataEntry('Error: '+newData.message);
        return;
      }
      let columns=[];
      for(let prop in newData[0])
        columns.push(prop);

      const newMap=await fetchNames(columns,ID);
      columns=columns.filter(col=>
        defaultValues[col]==undefined);
      columns.forEach((col,i,arr)=>{
        if(col.substring(col.length-2)=='ID' && col!=ID)
          arr[i]=IDToName(col);
      });
      setDataColumns(columns);
      console.log(columns)
      setMap(newMap);
      setData(newData.map(val=>convertDataForDisplay(val,newMap)));
    })().catch(err => setDataEntry(<div>Error: {err.message}</div>))
  },[]);

  const renderCell = (value, prop) => {
    if (prop.includes("Date")) 
      return formatDate(value);
    return value;
  };

  const handleDialogOpen = (rowData,[destinationTableName,destinationName]) => {
  console.log(map,ID,map[ID],rowData,rowData[ID])
    setDialog(<ManyToManyDialog
      originTableName={Name}
      originRowID={rowData[ID]} 
      originRowName={rowData.Name+' ID: '+rowData[ID]}
      destinationTableName={destinationTableName} 
      onClose={()=>setDialog(<></>)}
    />);
    }

  const MToN=schema.Many_To_Many[Name];
  const relationshipTitles=[];
  const relationships=[];
  for(let otherTable in MToN){
    relationshipTitles.push(<TableCell key={otherTable}>{MToN[otherTable][1]}</TableCell>);
    relationships.push((val)=>
      <TableCell><Button variant="contained" color="error" disableElevation disabled={false} onClick={() => handleDialogOpen(val,MToN[otherTable])}>{MToN[otherTable][1]}</Button></TableCell>);
  }
  
  return <center>
  <h2>{Name}</h2>
  {(dataColumns.length>0)&&<section id="outer-table-container">
    <TableContainer component={Paper}>
      <Table>
        <TableHead><TableRow>{
          dataColumns.map(prop=><TableCell key={prop}>{prop+' '}</TableCell>)
        }
        {hasDataEntry&&<>
          <TableCell key={'~'+i}>Modify</TableCell>
          <TableCell key={'-'+i}>Delete</TableCell>
          {relationshipTitles}
        </>}
        </TableRow></TableHead>
        <TableBody>{
          data &&data.map((val,idx) => <>
            <TableRow key={data[ID]}>{  
              dataColumns.map((prop)=>
                <TableCell>{renderCell(val[prop], prop)}</TableCell>)
            }
            {hasDataEntry&&<>
              <TableCell><Button onClick={()=>Modify(route,data[idx],setDataEntry,reRender,data,idx,val=>convertDataForDisplay(val,map),convertDataForDB,map)}>Modify</Button></TableCell>
              <TableCell><Button onClick={()=>Delete(route,data[idx],setDataEntry,reRender,data,idx)}>Delete</Button></TableCell>
              {relationships.map(rel=>rel(val))}
            </>}
            </TableRow>
          </>)
        }</TableBody>
      </Table>
    </TableContainer>
  </section>}
  {hasDataEntry&&<>
    <button className='add-Button' onClick={()=>Add(route,setDataEntry,reRender,data,val=>convertDataForDisplay(val,map),convertDataForDB,map,defaultValues)}>Add</button>
  </>}
  <br/><br/>
  {<Dialog open={dataEntry} onClose={()=>setDataEntry(false)} maxWidth="md" fullWidth>
      <DialogContent>
        {dataEntry}
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setDataEntry(false)}>Close</Button>
      </DialogActions>
    </Dialog>}
  {MToN&&dialog}
  </center>
}

export default DisplayTable;