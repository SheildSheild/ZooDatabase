import React, { useState } from 'react';
import './dataEntry.css';
import { formatDate } from '../../utils';

const schema={
  Animals:{
    Name: {type:"text",text:"Animal Name:"},
    Habitat_ID: {type:"number",text:"Habitat ID:"},
    Weight: {type:"number",text:"Weight:"},
    Height: {type:"number",text:"Height:"},
    Species: {type:"text",text:"Species:"},
    Animal_ID: {type:"number",text:"Animal ID:"},
    Birth_Date: {type:"date",text:"Birth Date:"},
  },
  Employees:{
    Fname: {type:"number",text:"Employee Name:"},
    Lname: {type:"number",text:"Employee Name:"},
    Employee_ID: {type:"number",text:"Employee ID:"},
    Email: {type:"email",text:"Employee Email:"},
    Start_Date: {type:"date",text:"Employee Start Date:"},
    Birth_Date: {type:"date",text:"Employee Birth Date:"},
    SSN: {type:"number",text:"Employee SSN:"},
    Gender: {type:"enum", text:"Select Gender:", enum:['Male','Female','Other']}
  },
  Animal_Health:{
    Primary_Doctor_ID: {type:"number",text:"Primary Doctor:"},
    Animal_Health_ID: {type:"number",text:"Medical Record ID:"},
    Date_Of_Examination: {type:"date",text:"Date of Examination:"},
    Description: {type:"text",text:"Description:"},
  },
  Zones:{
    Zone_ID: {type:"number",text:"Zone ID:"},
    Name: {type:"text", text:"Name:"},
    Status: {type:"text", text:"Status:"},
    Size: {type:"number", text:"Size:"},
  },
  Habitats:{
    Habitat_ID: {type:"number",text:"Habitat ID:"},
    Zone_ID: {type:"number",text:"Zone ID:"},
    Status: {type:"text",text:"Status:"},
    Date_Opened: {type:"date",text:"Date Opened:"},
    Capacity: {type:"number",text:"Capacity:"},
  },
  Customers:{
    Customer_ID: {type:"number",text:"Customer ID:"},
    Name: {type:"text",text:"Name:"},
    Address: {type:"text",text:"Address:"},
    Phone: {type:"text",text:"Phone:"},
    Email: {type:"text",text:"Email:"},
    user_id: {type:"number",text:"User ID:"},
  },
  Attends_To: {
    Employee_ID: {type:"number",text:"Employee ID:"},
    Animal_ID: {type:"number", text:"Animal ID:"},
    Responsibility: {type:"text", text:"Responsibility:"},
  },
  Items:{
    Item_ID: {type:"number",text:"Item ID:"},
    Shop_ID: {type:"number",text:"Shop ID:"},
    Quantity: {type:"number",text:"Quantity:"},
  },
  Lost_Items:{
    Lost_Item_ID: {type:"number",text:"Lost Item ID:"},
    Customer_ID: {type: "number", text:"Customer ID:"},
    Description: {type: "text",text:"Description:"},
    Status: {type: "text",text:"Status:"},
  },
  Restaurants:{
    Restraunt_ID: {type:"number",text:"Restaurant ID:"},
    Zone_ID: {type: "number", text:"Zone ID:"},
    Name: {type: "text",text:"Name:"},
    Status: {type: "text",text:"Status:"},
  },
  Purchases:{
    Purchase_ID:{type:"number",text:"Purchase ID:"},
    Item_ID:{type:"number",text:"Item ID:"},
    Shop_ID:{type:"number",text:"Shop ID:"},
    Customer_ID:{type:"number",text:"Customer ID:"},
    Quantity:{type:"number",text:"Quantity:"},
    Date:{type:"date",text:"Date:"}
  },
  Timesheets:{
    Employee_Schedule_ID: {type:"number",text:"Schedule ID:"},
    Description: {type: "text", text:"Description:"},
    Employee_ID: {type: "number",text:"Employee ID:"},
    Start_Time: {type:"datetime-local",text: "Start Time:"},
    End_Time: {type:"datetime-local",text:"End Time:"},
  },
  Employee_Schedules:{
    Employee_Schedule_ID: {type:"number",text:"Schedule ID:"},
    Description: {type: "text", text:"Description:"},
    Employee_ID: {type: "number",text:"Employee ID:"},
    Start_Time: {type:"datetime-local",text: "Start Time:"},
    End_Time: {type:"datetime-local",text:"End Time:"},
  },
  Animal_Schedules:{
    Animal_Schedule_ID: {type:"number",text:"Schedule ID:"},
    Description: {type: "text", text:"Description:"},
    Animal_ID: {type: "number",text:"Animal ID:"},
    Start_Time: {type:"datetime-local",text: "Start Time:"},
    End_Time: {type:"datetime-local",text:"End Time:"},
  },
  Shop_Schedules:{
    WaveShaperNode_Schedule_ID: {type:"number",text:"Schedule ID:"},
    Description: {type: "text", text:"Description:"},
    Shop_ID: {type: "number",text:"Shop ID:"},
    Start_Time: {type:"datetime-local",text: "Start Time:"},
    End_Time: {type:"datetime-local",text:"End Time:"},
  },
  Habitat_Schedules:{
    Habitat_Schedule_ID: {type:"number",text:"Schedule ID:"},
    Description: {type: "text", text:"Description:"},
    Habitat_ID: {type: "number",text:"Habitat ID:"},
    Start_Time: {type:"datetime-local",text: "Start Time:"},
    End_Time: {type:"datetime-local",text:"End Time:"},
  },
};

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
  