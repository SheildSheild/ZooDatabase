import './dataEntry.css';
import { formatDate } from '../../utils';
import schema from '../../schema'

const renderEnum=(options)=><>
  <select name="gender" required>
    <option value="">--Please choose an option--</option>
    {options.map((option,i)=><option value={i}>{option}</option>)}
  </select>
</>;

const renderCell = (value, prop) => {
  if (prop.includes("Date")||prop.includes("Time")) 
    return formatDate(value);
  return value;
};

let i=0;
const renderInput=(type,key,startingVal)=><>
  <input key={i++} type={type} name={key} defaultValue={renderCell(startingVal,key)} required/>
</>;

const mapEach=(name,preFilled)=>{
  const out=[];
  const func=(key,data)=>{
    const startingVal=(preFilled&&preFilled[key])||null;
    return <>
      <label>
        {data.text}
        {
          data.type=='enum'?
            renderEnum(data.enum,startingVal):
            renderInput(data.type,key,startingVal)
        }
      </label>
      <br/>
      <br/>
    </>;
  };
  for(let key in schema[name]){
    const data=schema[name][key];
    out.push(func(key,data));
  }
  return out;
}

function DataEntry({title,name,onSubmit,preFilled}){
  const link='/'+name;
  // if(name.charAt(name.length-1)=='s')
  //   name=name.substring(0,name.length-1)
  console.log(name,preFilled)
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
      {mapEach(name,preFilled)}
      <button type="submit">Submit</button>
    </form>
  );
}
  
export default DataEntry;
  