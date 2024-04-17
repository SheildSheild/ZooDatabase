import './table.css'
import { getData } from '../../communication';
import { useState, useEffect } from 'react';
import { Add,Modify,Delete,getID,parseName, fetchNames } from '../../utils';
import { Button, Dialog, DialogActions, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { convertDataForDB,convertDataForDisplay,IDToName,renderCell,handleDialogOpen } from './utils';
import schema from '../../schema';

let i=0;
function DisplayTable({route, hasDataEntry, defaultValues={}, columnFilter=()=>true, preloadedData}){
  const [data, setData] = useState([]);
  const [dataColumns,setDataColumns] = useState([]);
  const [foreignKeyMap,setForeignKeyMap] =useState({});
  const [dataEntry,setDataEntry]=useState(false);
  const [dialog, setDialog] = useState(<></>);
  const [renderCnt,render]=useState(1);
  const reRender=()=>render(renderCnt+1);

  let cleanRoute=route?route:'';
  const qidx=cleanRoute.indexOf('?');
  if(qidx>0)
    cleanRoute=route.substring(0,qidx);
  const Name=parseName(cleanRoute.substring(1));
  const ID=getID(Name);


  useEffect(() => {
    (async ()=>{
      let newData;
      
      if(preloadedData)
        newData=preloadedData;
      else if(route)
        newData=await getData(route);
      else
        return;

      if(newData.status){
        setDataEntry('Error: '+newData.message);
        return;
      }
      let columns=[];
      if(newData.columns)
        columns=newData.columns;
      else
        for(let prop in newData[0])
          if(columnFilter(prop))
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
    })().catch(err => console.log(err,setDataEntry(<div>Error: {err.message}</div>)))
  },[]);

  const MToN=schema.Many_To_Many[Name];
  const relationshipTitles=[];
  const relationships=[];
  for(let otherTable in MToN){
    relationshipTitles.push(<TableCell sx={{ bgcolor: '#fffafa' }}key={otherTable}>{MToN[otherTable][1]}</TableCell>);
    relationships.push((val)=>
      <TableCell><Button variant="contained" color="error" disableElevation disabled={false} onClick={() => 
        handleDialogOpen(DisplayTable,val,MToN[otherTable],Name,ID,setDialog)}>{MToN[otherTable][1]
      }</Button></TableCell>);
  }
  
  return <>
  <br/>
  <br/>
  <div className='banner'>
    <h2>{Name}</h2>
  </div>
  <div>
    <center>
      {(dataColumns.length>0)&&<section>
        <TableContainer component={Paper} sx={{ maxHeight: '60vh', overflowY: 'auto', bgcolor: '#fffafa' }} elevation={2}>
          <Table stickyHeader sx={{marginTop: "0px"}}>
            <TableHead sx={{ bgcolor: '#fffafa' }}><TableRow>{
              dataColumns.map(prop=><TableCell sx={{ bgcolor: '#fffafa' }} key={prop}>{prop+' '}</TableCell>)
            }
            {hasDataEntry&&<>
              <TableCell sx={{ bgcolor: '#fffafa' }} key={'~'+i}>Modify</TableCell>
              <TableCell sx={{ bgcolor: '#fffafa' }} key={'-'+i}>Delete</TableCell>
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
      {hasDataEntry && <>
          <Button variant="contained" color="error" sx={{ mt: 2, mb: 1 }} onClick={() => Add(cleanRoute, setDataEntry, reRender, data, val => convertDataForDisplay(val, foreignKeyMap), val => convertDataForDB(val, foreignKeyMap), foreignKeyMap, defaultValues)}>
            Add
          </Button>
        </>}
      <br/><br/>
      <Dialog open={dataEntry} onClose={()=>setDataEntry(false)} maxWidth="md" fullWidth>
        <DialogContent>
          {dataEntry}
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setDataEntry(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      {MToN&&dialog}
    </center>
  </div>
  </>
}

export default DisplayTable;