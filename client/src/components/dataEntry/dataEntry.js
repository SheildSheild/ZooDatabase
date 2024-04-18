import schema from '../../schema'
import { formatDate } from '../../utils';

const renderEnum=(key,options,startingVal)=><>
  <select name={key} required>
    <option value="" disabled hidden selected={startingVal==undefined}>--Please choose an option--</option>
    {options.map((option,i)=><option value={option} selected={startingVal==option}>{option}</option>)}
  </select>
</>;

const renderCell = (value, prop) => {
  if (prop.includes("Date")) 
    return formatDate(value);
  return value;
};

let i=0;
const renderInput=(type,key,startingVal)=><>
  <input key={i++} type={type} name={key} defaultValue={renderCell(startingVal,key)} required/>
</>;

const mapEach=(name,preFilled,enums)=>{
  console.log(preFilled)
  const out=[];
  const func=(key,data,_enum,nameKey)=>{
    const startingVal=(preFilled&&(preFilled[key]||preFilled[nameKey]))||null;
    return <>
      <label>
        {data.text}
        {
          data.enum||_enum?
            renderEnum(key,_enum||data.enum,startingVal):
            renderInput(data.type,key,startingVal)
        }
      </label>
      <br/>
      <br/>
    </>;
  };
  for(let key in schema[name]){
    const data=schema[name][key];
    let _enum;
    let nameKey;
    if(enums&&enums[key]){
      _enum=[]
      for(let option in enums[key].IDToName)
        _enum.push(enums[key].IDToName[option])
      nameKey=key.substring(0,key.length-2)+'Name';
    }
    out.push(func(key,data,_enum,nameKey));
  }
  return out;
}

function DataEntry({title,name,onSubmit,preFilled,enums}){
  const handleSubmit = (ev)=>{
    ev.preventDefault();
    const form=ev.target;
    const data={};
    for(let prop in schema[name])
      data[prop]=form[prop].value;
    
    onSubmit&&onSubmit(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2><strong>{title}</strong></h2>
      {mapEach(name,preFilled,enums)}
      <button type="submit">Submit</button>
    </form>
  );
}
  
export default DataEntry;
  