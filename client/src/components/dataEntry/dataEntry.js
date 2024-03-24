import React, { useState } from 'react';
import './dataEntry.css';
import { postData,getData,updateData,deleteData } from '../../communication';

const map={
  animals:{
    Name: {type:"text",text:"Animal Name:"},
    Habitat_ID: {type:"number",text:"Habitat ID:"},
    Weight: {type:"number",text:"Weight:"},
    Height: {type:"number",text:"Height:"},
    Species: {type:"text",text:"Species:"},
    Animal_ID: {type:"number",text:"Animal ID:"},
    Birth_Date: {type:"date",text:"Birth Date:"},
  },
  employees:{
    Fname: {type:"number",text:"Employee Name:"},
    Lname: {type:"number",text:"Employee Name:"},
    Employee_ID: {type:"number",text:"Employee ID:"},
    Email: {type:"email",text:"Employee Email:"},
    Start_Date: {type:"date",text:"Employee Start Date:"},
    Birth_Date: {type:"date",text:"Employee Birth Date:"},
    SSN: {type:"number",text:"Employee SSN:"},
    Gender: {code:<>
      <label>
        Employee Gender:
        <select name="gender" required>
          <option value="">--Please choose an option--</option>
          <option value="1">Male</option>
          <option value="2">Female</option>
          <option value="3">Other</option>
          <option value="4">Prefer Not To Answer</option>
        </select>
      </label>
      <br />
      <br />
    </>}
  },
  animal_health:{
    Primary_Doctor_ID: {type:"number",text:"Primary Doctor:"},
    Animal_Health_ID: {type:"number",text:"Medical Record ID:"},
    Date_Of_Examination: {type:"date",text:"Date of Examination:"},
    Description: {type:"text",text:"Description:"},
  },
  zones:{
    Zone_ID: {type:"number",text:"Zone ID:"},
    Name: {type:"text", text:"Name:"},
    Status: {type:"text", text:"Status:"},
    Size: {type:"number", text:"Size:"},
  },
  habitats:{
    Habitat_ID: {type:"number",text:"Habitat ID:"},
    Zone_ID: {type:"number",text:"Zone ID:"},
    Status: {type:"text",text:"Status:"},
    Date_Opened: {type:"date",text:"Date Opened:"},
    Capacity: {type:"number",text:"Capacity:"},
  },
  customers:{
    Customer_ID: {type:"number",text:"Customer ID:"},
    Name: {type:"text",text:"Name:"},
    Address: {type:"text",text:"Address:"},
    Phone: {type:"text",text:"Phone:"},
    Email: {type:"text",text:"Email:"},
    user_id: {type:"number",text:"User ID:"},
  },
  attends_to: {
    Employee_ID: {type:"number",text:"Employee ID:"},
    Animal_ID: {type:"number", text:"Animal ID:"},
    Responsibility: {type:"text", text:"Responsibility:"},
  },
  has_offstring:{
    Parent_ID: {type:"number",text:"Parent ID:"},
    Child_ID: {type:"number",text:"Child ID:"},
    Date_Created: {type:"date",text:"Date Created:"},
  },
  items:{
    Item_ID: {type:"number",text:"Item ID:"},
    Shop_ID: {type:"number",text:"Shop ID:"},
    Quantity: {type:"number",text:"Quantity:"},
  },
  lost_items:{
    Lost_Item_ID: {type:"number",text:"Lost Item ID:"},
    Customer_ID: {type: "number", text:"Customer ID:"},
    Description: {type: "text",text:"Description:"},
    Status: {type: "text",text:"Status:"},
  },
  restaurants:{
    Restraunt_ID: {type:"number",text:"Restaurant ID:"},
    Zone_ID: {type: "number", text:"Zone ID:"},
    Name: {type: "text",text:"Name:"},
    Status: {type: "text",text:"Status:"},
  },
  schedules:{
    Schedule_ID: {type:"number",text:"Schedule ID:"},
    Type_ID: {type: "number", text:"Type ID:"},
    Zone_ID: {type: "number",text:"Zone ID:"},
    Employee_ID: {type: "number",text:"Employee ID:"},
    Restraunt_ID: {type:"number",text:"Restraunt ID:"},
    Habitat_ID: {type: "number",text:"Habitat ID:"},
    Shop_ID: {type: "number",text:"Shop ID:"},
    Start_Time: {type:"date",text: "Start Time:"},
    End_Time: {type:"date",text:"End Time:"},
    Date: {type:"date",text:"Date:"},
  },
  schedule_types:{
    Type_ID: {type:"number",text:"Type ID:"},
    Name: {type:"number",text:"Name:"},
  },
  roles:{
    id: {type: "number", text:"ID:"},
    role_name: {type: "text", text:"Role Name:"},
  },
  user_roles:{
    user_id: {type:"number",text:"User ID:"},
    role_id: {type:"number",text:"Role ID:"},
  },
  users:{
    id: {type:"number",text:"ID:"},
    username: {type:"text",text:"Username:"},
    email: {type:"text",text:"Email:"},
    hashed_password: {type: "text", text:"Password"},
    created_at: {type:"date",text:"Created At:"},
  },


  /*
  add entry data like:
  entry:{
    Prop_1: {type:"",text:""},
    Prop_2: {code:<>specia jsx</>}
  }
  */
};

const mapEach=(name,func)=>{
  const out=[];
  for(let key in map[name]){
    const data=map[name][key];
    if(data.code)
      out.push(data.code);
    out.push(func(key,data.text,data.type));
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
    for(let prop in map[name])
      data[prop]=form[prop].value;
    
    onSubmit&&onSubmit(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2><strong>{title}</strong></h2>
      {mapEach(name,(val,text,type)=>{
        const startingVal=(preFilled&&preFilled[val])||null;
        return <>
          <label>
            {text}
            <input type={type} name={val} defaultValue={startingVal} required/>
          </label>
          <br />
          <br />
        </>
      },preFilled)}
      <button type="submit">Submit</button>
    </form>
  );
}
  
export default DataEntry;
  