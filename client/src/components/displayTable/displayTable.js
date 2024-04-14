import './table.css'
import { getData } from '../../communication';
import { useState, useEffect } from 'react';
import { Add,Modify,Delete,getID,parseName, fetchNames } from '../../utils';
import { Button, Dialog, DialogActions, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { convertDataForDB,convertDataForDisplay,IDToName,renderCell,handleDialogOpen } from './utils';
import schema from '../../schema';

let i=0;
function DisplayTable({route, hasDataEntry, defaultValues}){
  defaultValues=defaultValues||{};
  console.log({hasDataEntry})
  const [data, setData] = useState([]);
  const [dataColumns,setDataColumns] = useState([]);
  const [foreignKeyMap,setForeignKeyMap] =useState({});
  const [dataEntry,setDataEntry]=useState(false);
  const [dialog, setDialog] = useState(<></>);
  const [renderCnt,render]=useState(1);
  const reRender=()=>render(renderCnt+1);

  let cleanRoute=route;
  const qidx=route.indexOf('?');
  if(qidx>0)
    cleanRoute=route.substring(0,qidx);
  const Name=parseName(cleanRoute.substring(1));
  const ID=getID(Name);

  useEffect(() => {
    (async ()=>{
      const newData=await getData(route);
      if(newData.status){
        setDataEntry('Error: '+newData.message);
        return;
      }
      let columns=[];
      if(newData.columns)
        columns=newData.columns;
      else
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
      setForeignKeyMap(newMap);
      if(newData.map)
        setData(newData.map(val=>convertDataForDisplay(val,newMap)));
    })().catch(err => setDataEntry(<div>Error: {err.message}</div>))
  },[]);

  const MToN=schema.Many_To_Many[Name];
  const relationshipTitles=[];
  const relationships=[];
  for(let otherTable in MToN){
    relationshipTitles.push(<TableCell key={otherTable}>{MToN[otherTable][1]}</TableCell>);
    relationships.push((val)=>
      <TableCell><Button variant="contained" color="error" disableElevation disabled={false} onClick={() => handleDialogOpen(val,MToN[otherTable],Name,ID,setDialog)}>{MToN[otherTable][1]}</Button></TableCell>);
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
              <TableCell><Button onClick={()=>Modify(cleanRoute,data[idx],setDataEntry,reRender,data,idx,val=>convertDataForDisplay(val,foreignKeyMap),val=>convertDataForDB(val,foreignKeyMap),foreignKeyMap)}>Modify</Button></TableCell>
              <TableCell><Button onClick={()=>Delete(cleanRoute,data[idx],setDataEntry,reRender,data,idx)}>Delete</Button></TableCell>
              {relationships.map(rel=>rel(val))}
            </>}
            </TableRow>
          </>)
        }</TableBody>
      </Table>
    </TableContainer>
  </section>}
  {hasDataEntry&&<>
    <button className='add-Button' onClick={()=>Add(cleanRoute,setDataEntry,reRender,data,val=>convertDataForDisplay(val,foreignKeyMap),val=>convertDataForDB(val,foreignKeyMap),foreignKeyMap,defaultValues)}>Add</button>
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