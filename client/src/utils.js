import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DataEntry from './components/dataEntry';
import schema from './schema';
import { postData,getData,updateData,deleteData } from './communication';

function formatDate(dateString){
  if (!dateString) return '';

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function handleLogout(reRender) {
  localStorage.removeItem('token');
  localStorage.removeItem('role'); 
  localStorage.removeItem('userId'); 
  localStorage.removeItem('expirationDate');
  reRender&&reRender();
}

/**
 * converts route name to schema name, ex.:animal_health-> Animal_Health
 * @param {string} name 
 * @returns schema version of name
 */
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

/**
 * converts a key to the name of the table
 * @param {string} ID 
 * @returns table name
 */
const parseID=(ID)=>{
  if(schema.Foreign_Keys[ID])
    return schema.Foreign_Keys[ID].to.toLowerCase();
  
  let name=ID.substring(0,ID.length-3);
  if(schema[name])
    return name.toLowerCase();
  name +='s'
  if(schema[name])
    return name.toLowerCase();
  
  throw Error('can\'t parse ID:'+ID+' to '+name);
};

/**
 * gets name of table primary key from table name and optionally also get data[ID]
 * @param {string} Name 
 * @param {Array} data (optional)  
 * @returns name of the primary key of table and optionally the value the primary key at a certain row(data)
 */
const getID=(Name,data)=>{
  let ID;
  if(Name[Name.length-1]=='s')
    ID=Name.substring(0,Name.length-1)+'_ID';
  else
    ID=Name+'_ID';
  if(data)
    return [ID,data[ID]];
  return ID;
};

const getForeignKeys=(props,ID)=>
  props.filter(val=> val.substring(val.length-3)=='_ID' && val!=ID);

/**
 * call as so: fetchNames(props).then(map=>{
 *  map[foreignKeyName].IDToName[foreignID]
 *  //for example: map['Animal_ID'].IDToName[2] === 'Tam'
 * })
 * @param {Array<string>} props list of properties of a table 
 * @returns promise which resolves into an object
 */
async function fetchNames(props,ID){
  const NameID=(Name,Id)=>Name+' ID: '+Id;
  const results=await Promise.all(getForeignKeys(props,ID).map(foreignKey=>{
    const name=parseID(foreignKey);
    const route='/'+ name;
    const actualKey=getID(parseName(name));
    return getData(route).then(data=>{
      const out={IDToName:{},NameToID:{},ID:foreignKey};
      out.IDToName[null]=null;
      out.NameToID[null]=null;
      //console.log(foreignKey,actualKey,data)
      for(let tuple of data){
        if(tuple[actualKey]==null)
          continue;
        const name=NameID(tuple.Name,tuple[actualKey]);
        out.IDToName[tuple[actualKey]]=name;
        out.NameToID[name]=tuple[actualKey];
      }
      return out;
    });
  }));
  const out={};
  for(let result of results)
    out[result.ID]=result;
  //console.log(out);
  return out;
}

// receives val converted for data entry, 
// then converts data entry output for DB, 
// then on success converts output to Display updated table
//

function Modify(link,val,setDataEntry,reRender,table,idx,convertDataForDisplay=x=>x,convertDataForDB=x=>x,map) {
  const Name=parseName(link.substring(1));
  const ID=getID(Name,val);

  setDataEntry(<DataEntry title="Modify Data" name={Name} preFilled={val} enums={map} onSubmit={data=>{
    data=convertDataForDB(data);
    updateData(link,...ID,data).then(val=>{
      if(!val||val.status){
        setDataEntry(<>Failed to Modify! Error: {val.message}</>);
        reRender();
        return;
      }
      setDataEntry(<>Successfully Modified</>);
      table[idx]=convertDataForDisplay(data,idx);
      reRender();
    });
    setDataEntry(<>Modifying...</>);
  }}/>);
  reRender();
}

function Delete(link,val,setDataEntry,reRender,table,idx) {
  const Name=parseName(link.substring(1));
  deleteData(link,...getID(Name,val)).then(val=>{
    if(!val||val.status){
      setDataEntry(<>Failed to Delete! Error: {val.message}</>);
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

function Add(link,setDataEntry,reRender,table,convertDataForDisplay=x=>x,convertDataForDB=x=>x,map,defaultValues){
  const Name=parseName(link.substring(1));
  setDataEntry(<DataEntry title="Enter Data" name={Name} enums={map} preFilled={defaultValues} onSubmit={data=>{
    data=convertDataForDB(data);
    postData(link,data).then(val=>{
      if(!val||val.status){
        setDataEntry(<>Failed to Add! Error: {val.message}</>);
        reRender();
        return;
      }
      setDataEntry(<>Successfully Added</>);
      data=convertDataForDisplay(data,table.length);
      data.id=val.Id;
      table.push(data);
      reRender();
    });
    setDataEntry(<>Adding...</>);
    reRender();
  }}/>);
  reRender();
}

const downloadPDF = (pdfRef) =>{
  const input = pdfRef.current;
  html2canvas(input).then((canvas)=>{
    const imgData = canvas.toDataURL('image.png');
    const pdf = new jsPDF('p','mm','a4',true);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth/imgWidth, pdfHeight/imgHeight);
    const imgX = (pdfWidth-imgWidth * ratio)/2;
    const imgY = 30
    pdf.addImage(imgData, 'PNG',imgX,imgY,imgWidth*ratio, imgHeight*ratio );
    pdf.save('report.pdf');
});
}

export {formatDate,getID,parseName,downloadPDF,fetchNames,Add,Delete,Modify,handleLogout}