import React, { useState } from 'react';
import './dataEntry.css';
// import DisplayTable from '.'
import { postData,getData,updateData,deleteData } from '../../communication';

function DataEntryBanner() {
    return(
        <div class = "banner">
            <h1>Admin Data Entry</h1>
        </div>
    );
}

// DisplayTable();

// function Table({ data }) {
//   if (!data || data.length === 0) {
//       return <div>No data available</div>;
//   }

//   const headers = Object.keys(data[0]);

//   return (
//       <table>
//           <thead>
//               <tr>
//                   {headers.map(header => <th key={header}>{header}</th>)}
//               </tr>
//           </thead>
//           <tbody>
//               {data.map((row, index) => (
//                   <tr key={index}>
//                       {headers.map(header => <td key={header}>{row[header]}</td>)}
//                   </tr>
//               ))}
//           </tbody>
//       </table>
//   );
// }

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

function EmployeeDataEntry() {
    return <Entry link="/employees" title="Enter Employee Data" name="employee"/>
}

function MedicalRecordEntry() {
  return <Entry link="/animal_health" title="Enter Medical Record" name="medical"/>
}

function ZoneEntry() {
  return <Entry link="/zones" title="Enter Zone Data" name="zone"/>
}
function HabitatEntry() {
  return <Entry link="/habitats" title="Enter Habitat Data" name="habitat"/>
}
function CustomerEntry() {
  return <Entry link="/customers" title="Enter Customer Data" name="customer"/>
}
function AttendsToEntry() {
  return <Entry link="/attends_to" title="Enter Attends-To Data" name="attends_to"/>
}
function HasOffspring() {
  return <Entry link="/has_offstring" title="Enter Has-Offstring Data" name="has_offspring"/>
}
// function MedicalRecordEntry() {
//   return <Entry link="/animal_health" title="Enter Medical Record" name="medical"/>
// }
// function MedicalRecordEntry() {
//   return <Entry link="/animal_health" title="Enter Medical Record" name="medical"/>
// }

/*
add function here like:
function NewEntry() {
  return <Entry link="/link" title="title" name="name"/>
}
*/

function DataEntryPage() {
  const [selectedDataType, setSelectedDataType] = useState('');

  const handleSelectionChange = (e) => {
    setSelectedDataType(e.target.value);
  };

  return (
    <div>
      <DataEntryBanner />
      <div className="data-selection">
        <label>
          Select Data Type:
          <select value={selectedDataType} onChange={handleSelectionChange}>
            <option value="">--Please choose an option--</option>
            <option value="animals">Animals</option>
            <option value="employees">Employees</option>
            <option value="medicalRecords">Medical Records</option>
            {/* add option here */}
          </select>
        </label>
      </div>

      {selectedDataType === 'animals' && <AnimalDataEntry />}
      {selectedDataType === 'employees' && <EmployeeDataEntry />}
      {selectedDataType === 'medicalRecords' && <MedicalRecordEntry />}
      {/* {selectedDataType === 'medicalRecords' && <MedicalRecordEntry />}
      {selectedDataType === 'medicalRecords' && <MedicalRecordEntry />}
      {selectedDataType === 'medicalRecords' && <MedicalRecordEntry />}
      {selectedDataType === 'medicalRecords' && <MedicalRecordEntry />}
      {selectedDataType === 'medicalRecords' && <MedicalRecordEntry />}
      {selectedDataType === 'medicalRecords' && <MedicalRecordEntry />} */}
      {/* add componet here */}
    </div>
  );
}
  
  
export default DataEntryPage;