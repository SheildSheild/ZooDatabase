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

const parseID=(ID)=>{
  const name=ID.substring(0,ID.length-3);
  if(schema[name])
    return schema[name];
  name+='s';
  if(schema[name])
    return schema[name];
  throw Error('can\'t parse ID');
};

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

function Modify(link,val,setDataEntry,reRender,table,idx,convertData=x=>x) {
  const Name=parseName(link.substring(1));
  setDataEntry(<DataEntry title="Modify Data" name={Name} onSubmit={data=>{
    updateData(link,...getID(Name,data),data).then(val=>{
      if(!val){
        setDataEntry(<>Failed to Modify</>);
        reRender();
        return;
      }
      setDataEntry(<>Successfully Modified</>);
      table[idx]=convertData(data);
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

function Add(link,setDataEntry,reRender,table,convertData=x=>x){
  const Name=parseName(link.substring(1));
  setDataEntry(<DataEntry title="Enter Data" name={Name} onSubmit={data=>{
    postData(link,data).then(val=>{
      if(!val){
        setDataEntry(<>Failed to Add</>);
        reRender();
        return;
      }
      setDataEntry(<>Successfully Added</>);
      table.push(convertData(data));
      reRender();
    });
    setDataEntry(<>Adding...</>);
    reRender();
  }}/>);
  reRender();
}

const getForeignKeys=(props,ID)=>
  props.filter(val=> val.substring(val.length-3)=='_ID' && val!=ID );

/**
 * call as so: fetchNames(props,ID).then(map=>{
 *  map[foreignKeyName].IDToName[foreignID]
 *  //for example: map['Animal_ID'].IDToName[2] === 'Tam'
 * })
 * @param {Array<string>} props list of properties of a table 
 * @param {string} ID the ID of a table //use getID() if needed
 * @returns promise which resolves into an object
 */
async function fetchNames(props,ID){
  const NameID=(Name,Id)=>Name+' ID: '+Id;
  const results=await Promise.all(getForeignKeys(props,ID).map(foreignKey=>{
    const Name=parseID(foreignKey);
    const route='/'+Name;
    return getData(route).then(data=>{
      const out={IDToName:{},NameToID:{},ID:foreignKey};
      for(let tuple in data){
        const name=NameID(tuple.Name,tuple[foreignKey]);
        out.IDToName[tuple[foreignKey]]=name;
        out.IDToName[name]=tuple[foreignKey];
      }
      return out;
    });
  }));
  const out={};
  for(let result of results)
    out[result.ID]=result;
  return out;
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

export {formatDate,getID,parseName,downloadPDF,fetchNames,Add,Delete,Modify}