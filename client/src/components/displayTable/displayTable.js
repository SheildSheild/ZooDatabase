import './table.css'
import { postData,getData,updateData,deleteData } from '../../communication';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataEntryPage from '../dataEntry/dataEntry';

const map={
  animal:{
    Name: {type:"text",text:"Animal Name:"},
    Habitat_ID: {type:"number",text:"Habitat ID:"},
    Weight: {type:"number",text:"Weight:"},
    Height: {type:"number",text:"Height:"},
    Species: {type:"text",text:"Species:"},
    Animal_ID: {type:"number",text:"Animal ID:"},
    Birth_Date: {type:"date",text:"Birth Date:"},
  },
  employee:{
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
  medical:{
    Primary_Doctor_ID: {type:"number",text:"Primary Doctor:"},
    Animal_Health_ID: {type:"number",text:"Medical Record ID:"},
    Date_Of_Examination: {type:"date",text:"Date of Examination:"},
    Description: {type:"text",text:"Description:"},
  },
  zone:{
    Zone_ID: {type:"number",text:"Zone ID:"},
    Name: {type:"text", text:"Name:"},
    Status: {type:"text", text:"Status:"},
    Size: {type:"number", text:"Size:"},
  },
  habitat:{
    Habitat_ID: {type:"number",text:"Habitat ID:"},
    Zone_ID: {type:"number",text:"Zone ID:"},
    Status: {type:"text",text:"Status:"},
    Date_Opened: {type:"date",text:"Date Opened:"},
    Capacity: {type:"number",text:"Capacity:"},
  },
  customer:{
    Customer_ID: {type:"number",text:"Customer ID:"},
    Name: {type:"text",text:"Name:"},
    Address: {type:"text",text:"Address:"},
    Phone: {type:"text",text:"Phone:"},
    Email: {type:"text",text:"Email:"},
    user_id: {type:"number",text:"User ID:"},
  },
  attendsto: {
    Employee_ID: {type:"number",text:"Employee ID:"},
    Animal_ID: {type:"number", text:"Animal ID:"},
    Responsibility: {type:"text", text:"Responsibility:"},
  },
  hasoffstring:{
    Parent_ID: {type:"number",text:"Parent ID:"},
    Child_ID: {type:"number",text:"Child ID:"},
    Date_Created: {type:"date",text:"Date Created:"},
  },
  item:{
    Item_ID: {type:"number",text:"Item ID:"},
    Shop_ID: {type:"number",text:"Shop ID:"},
    Quantity: {type:"number",text:"Quantity:"},
  },
  lostitem:{
    Lost_Item_ID: {type:"number",text:"Lost Item ID:"},
    Customer_ID: {type: "number", text:"Customer ID:"},
    Description: {type: "text",text:"Description:"},
    Status: {type: "text",text:"Status:"},
  },
  restraunt:{
    Restraunt_ID: {type:"number",text:"Restaurant ID:"},
    Zone_ID: {type: "number", text:"Zone ID:"},
    Name: {type: "text",text:"Name:"},
    Status: {type: "text",text:"Status:"},
  },
  schedule:{
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
  scheduletype:{
    Type_ID: {type:"number",text:"Type ID:"},
    Name: {type:"number",text:"Name:"},
  },
  role:{
    id: {type: "number", text:"ID:"},
    role_name: {type: "text", text:"Role Name:"},
  },
  userrole:{
    user_id: {type:"number",text:"User ID:"},
    role_id: {type:"number",text:"Role ID:"},
  },
  user:{
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

function Entry({link,title,name}){
  const handleSubmit = (ev)=>{
    ev.preventDefault();
    const form=ev.target;
    const data={};
    for(let prop in map[name])
      data[prop]=form[prop].value;
    
    postData(link,data).then(val=>{
      if(val)//success
        form.reset();
    })
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2><strong>{title}</strong></h2>
      {mapEach(name,(val,text,type)=>{
        return <>
          <label>
            {text}
            <input type={type} name={val} required/>
          </label>
          <br />
          <br />
        </>
      })}
      <button type="submit">Submit</button>
    </form>
  );
}

function AnimalDataEntry() {
  return <Entry link="/animals" title="Enter Animal Data" name="animal"/>
}


function DisplayTable({link}){
  
  const [data, setData] = useState([]);
  useEffect(() => {
    getData(link,data)
    .then(res => setData(res.data))
    .catch(err => console.log(err))
  })
  
  // Handles empty data tables
  if(!data)
  {
    return <div>No Data Avaliable</div>;
  }

  // Function to handle modification of data
  const handleModify = (data, id) => {
    // Your modification logic goes here
    
    
    updateData("/animals", id, data) 
      .then(res => {
        // Handle success if needed
        console.log('Data updated successfully:', res);
      })
      .catch(err => {
        // Handle error if needed
        console.error('Error updating data:', err);
      });
    console.log('Modify', id);
  };

  // Function to handle deletion of data
  const handleDelete = (id) => {
    // Delete data from the backend
    deleteData('/animals', id)
      .then(() => {
        // Update state to reflect the deletion
        setData(prevData => prevData.filter(item => item.Animal_ID !== id));
      })
      .catch(err => console.log(err));
  };

  const dataColumns=[];
  for(let prop in data[0])
    dataColumns.push(prop);

  //data.sort((a,b)=>a.date-b.date)
  return <center>
  <h1>Animal Table</h1>
  {link === '/animals' && <AnimalDataEntry />}
  <a href="#/dataEntry"><button>Create +</button></a>
  <section id="outer-table-container">
    <div id="inner-table-container">
      <table id='quote-table'>
        <thead className='qthead'><tr className='qtr' key={-1}>{
          dataColumns.map((prop,idx)=><th className='qth' key={idx+'+'}>{prop+' '}</th>)
        }</tr></thead>
        <tbody className='qtbody'>{
          data.map((val,idx) => <>
            <tr className='qtr' key={idx}>{
              
              dataColumns.map((prop,i)=>
                <td key={idx+'-'+i}>
                  {val[prop]}
                  
                </td>)
            }
            <button onClick={handleModify(data[idx], data[idx].Animal_ID)}>Modify</button>
            <button onClick={handleDelete(data[idx].Animal_ID)}>Delete</button>
            </tr>
          </>)
        }</tbody>
      </table>
    </div>
  </section>
  </center>
}


export default DisplayTable;