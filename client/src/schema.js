const schema={
  Animals:{
    Name: {type:"text",text:"Animal Name:"},
    Habitat_ID: {type:"number",text:"Habitat ID:"},
    Weight: {type:"number",text:"Weight:"},
    Height: {type:"number",text:"Height:"},
    Father_ID: {type:"number",text:"Father:"}, 
    Mother_ID: {type:"number",text:"Mother:"}, 
    Species: {type:"text",text:"Species:"},
    Birth_Date: {type:"date",text:"Birth Date:"},
  },
  Employees:{
    Role: {type:"enum",text:"Role", enum:['Employee','Manager','Medic']},
    Name: {type:"text",text:"Employee Name:"},
    Email: {type:"email",text:"Employee Email:"},
    Address: {type:"text",text: "Employee Address:"},
    Start_Date: {type:"date",text:"Employee Start Date:"},
    Birth_Date: {type:"date",text:"Employee Birth Date:"},
    SSN: {type:"number",text:"Employee SSN:"},
    Gender: {type:"enum", text:"Select Gender:", enum:['Male','Female','Other']},
    Password: {type:"text",text:"Employee Password"}
  },
  Animal_Health:{
    Animal_ID: {type:"number", text:"Animal ID"},
    Primary_Doctor_ID: {type:"number",text:"Primary Doctor:"},
    Date_Of_Examination: {type:"date",text:"Date of Examination:"},
    Description: {type:"text",text:"Description:"},
  },
  Zones:{
    Name: {type:"text", text:"Name:"},
    Status: {type:"text", text:"Status:"},
    Size: {type:"number", text:"Size:"},
  },
  Habitats:{
    Zone_ID: {type:"number",text:"Zone ID:"},
    Status: {type:"text",text:"Status:"},
    Date_Opened: {type:"date",text:"Date Opened:"},
    Capacity: {type:"number",text:"Capacity:"},
  },
  Customers:{
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
    Shop_ID: {type:"number",text:"Shop ID:"},
    Quantity: {type:"number",text:"Quantity:"},
  },
  Lost_Items:{
    Customer_ID: {type: "number", text:"Customer ID:"},
    Description: {type: "text",text:"Description:"},
    Status: {type: "text",text:"Status:"},
  },
  Restaurants:{
    Zone_ID: {type: "number", text:"Zone ID:"},
    Name: {type: "text",text:"Name:"},
    Status: {type: "text",text:"Status:"},
  },
  Shops:{
    Zone_ID: {type: "number", text:"Zone ID:"},
    Name: {type: "text",text:"Name:"},
    Status: {type: "text",text:"Status:"},
  },
  Purchases:{
    Item_ID:{type:"number",text:"Item ID:"},
    Shop_ID:{type:"number",text:"Shop ID:"},
    Customer_ID:{type:"number",text:"Customer ID:"},
    Quantity:{type:"number",text:"Quantity:"},
    Date:{type:"date",text:"Date:"}
  },
  Timesheets:{
    Employee_ID: {type: "number",text:"Employee ID:"},
    Start_Time: {type:"datetime-local",text: "Start Time:"},
    End_Time: {type:"datetime-local",text:"End Time:"},
  },
  Employee_Schedules:{
    Description: {type: "text", text:"Description:"},
    Employee_ID: {type: "number",text:"Employee ID:"},
    Start_Time: {type:"datetime-local",text: "Start Time:"},
    End_Time: {type:"datetime-local",text:"End Time:"},
  },
  Animal_Schedules:{
    Description: {type: "text", text:"Description:"},
    Animal_ID: {type: "number",text:"Animal ID:"},
    Start_Time: {type:"datetime-local",text: "Start Time:"},
    End_Time: {type:"datetime-local",text:"End Time:"},
  },
  Shop_Schedules:{
    Description: {type: "text", text:"Description:"},
    Shop_ID: {type: "number",text:"Shop ID:"},
    Start_Time: {type:"datetime-local",text: "Start Time:"},
    End_Time: {type:"datetime-local",text:"End Time:"},
  },
  Habitat_Schedules:{
    Description: {type: "text", text:"Description:"},
    Habitat_ID: {type: "number",text:"Habitat ID:"},
    Start_Time: {type:"datetime-local",text: "Start Time:"},
    End_Time: {type:"datetime-local",text:"End Time:"},
  },
  Foreign_Keys:{
    Father_ID:{from:"Animals",to:"Animals"},
    Mother_ID:{from:"Animals",to:"Animals"},
    Primary_Doctor_ID:{from:"Animal_Health",to:"Employees"},
    Supervisor_ID:{from:"Employees",to:"Employees"}
  },
  Many_To_Many:{
    Animals:{Employees:['Attends_To','Attended By']},
    Employees:{Animals:['Attends_To','Attends To']},
  }
}

export default schema;