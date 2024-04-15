import ManyToManyDialog from "../ManyToManyDialog";
import { formatDate } from "../../utils";

const NameToID=(name,map)=>
  name.substring(0,name.length-2)+'ID';
const IDToName=(Id)=>
  Id.substring(0,Id.length-2)+'Name';

const convertDataForDB = (row,map) =>{
  const newRow={};
  for(let val in row){
    if(map[val])
      newRow[val]=map[val].NameToID[row[val]];
    else
      newRow[val]=row[val];
  }
  return newRow;
};
const convertDataForDisplay = (row,map) =>{
  const newRow={};
  for(let val in row){
    if(map[val]){
      if (map[val].IDToName[row[val]]) 
        newRow[IDToName(val)]=map[val].IDToName[row[val]].replace("undefined","");
    }else
      newRow[val]=row[val];
  }
  return newRow;
};

const renderCell = (value, prop) => {
  if (prop.includes("Date")) 
    return formatDate(value);
  return value;
};

const handleDialogOpen = (rowData,destination,Name,ID,setDialog) => 
  setDialog(<ManyToManyDialog
    originTableName={Name}
    originRowID={rowData[ID]} 
    originRowName={rowData.Name+' ID: '+rowData[ID]}
    destinationTableName={destination[0]} 
    onClose={()=>setDialog(<></>)}
  />);

export {renderCell,handleDialogOpen,convertDataForDB,convertDataForDisplay,IDToName}