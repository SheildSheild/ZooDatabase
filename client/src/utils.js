import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { getData } from "./communication";

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

const getID=(Name,data)=>{
  let ID;
  if(Name[Name.length-1]=='s')
    ID=Name.substring(0,Name.length-1)+'_ID';
  else
    ID=Name+'_ID';
  return [ID,data[ID]];
};

function fetchNames(IDList,route){
  const NameID=(Name,ID)=>Name+' ID: '+ID;
  return getData(route).then(data=>{
    const out={IDToName:{},NameToID:{}};
    const [ID,_]=getID(parseName(route.substring(1)))
    for(let tuple in data){
      const name=NameID(tuple.Name,tuple[ID]);
      out.IDToName[tuple[ID]]=name;
      out.IDToName[name]=tuple[ID];
    }
    return out;
  })
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

export {formatDate,getID,parseName,downloadPDF}