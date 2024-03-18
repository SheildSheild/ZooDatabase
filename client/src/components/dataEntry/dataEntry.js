import React, { useState } from 'react';
import './dataEntry.css';

function DataEntryBanner() {
    return(
        <div class = "banner">
            <h1>Admin Data Entry</h1>
        </div>
    );
}

function AnimalDataEntry() {
  const [animalData, setAnimalData] = useState({
    animalName: '',
    habitat: '',
    weight: '',
    height: '',
    species: '',
    animalId: '',
    birthDate: '',
  });

  const handleChange = (e) => {
    setAnimalData({ ...animalData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(animalData);
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <h2><strong>Enter Animal Data</strong></h2>
        <label>
            Animal Name:
            <input type="text" name="animalName" value={animalData.animalName} onChange={handleChange} />
        </label>
        <br />
        <br />
        <label>
            Habitat:
            <input type="text" name="habitat" value={animalData.habitat} onChange={handleChange} />
        </label>
        <br />
        <br />
        <label>
            Weight:
            <input type="text" name="weight" value={animalData.weight} onChange={handleChange} />
        </label>
        <br />
        <br />
        <label>
            Height:
            <input type="text" name="height" value={animalData.height} onChange={handleChange} />
        </label>
        <br />
        <br />
        <label>
            Species:
            <input type="text" name="species" value={animalData.species} onChange={handleChange} />
        </label>
        <br />
        <br />
        <label>
            Animal ID:
            <input type="text" name="animalId" value={animalData.animalId} onChange={handleChange} />
        </label>
        <br />
        <br />
        <label>
            Birth Date:
            <input type="date" name="birthDate" value={animalData.birthDate} onChange={handleChange} />
        </label>
        <br />
        <br />
        <button type="submit">Submit</button>
        </form>
    </div>
  );
}

function EmployeeDataEntry() {
    const [employeeData, setEmployeeData] = useState({
      Fname: '',
      Lname: '',
      id: '',
      gender: '',
      email: '',
      address: '',
      birthDate: '',
      startDate: '',
      ssn: '',
    });
  
    const handleChange = (e) => {
        setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(employeeData);
      };
  
    return (
        <form onSubmit={handleSubmit}>
        <h2><strong>Enter Employee Data</strong></h2>
        <label>
            Employee id:
            <input type="number" name="employeeID" value={employeeData.id} required onChange={handleChange} />
        </label>
        <br />
        <br />
        <label>
            Employee First Name:
            <input type="text" name="employeeFName" value={employeeData.FName} required onChange={handleChange} />
        </label>
        <br />
        <br />
        <label>
            Employee Last Name:
            <input type="text" name="employeeLName" value={employeeData.LName} required onChange={handleChange} />
        </label>
        <br />
        <br />
        <label>
            Employee SSN:
            <input type="number" name="employeeSSN" value={employeeData.ssn} required onChange={handleChange} />
        </label>
        <br />
        <br />
        <label>
            Employee Email:
            <input type="email" name="employeeEmail" value={employeeData.email} required onChange={handleChange} />
        </label>
        <br />
        <br />
        <label>
            Employee Birth Date:
            <input type="date" name="employeeBirthDate" value={employeeData.birthDate} onChange={handleChange} />
        </label>
        <br />
        <br />
        <label>
            Employee Gender:
            <select name="gender" value={employeeData.gender} required onChange={handleChange}>
              <option value="">--Please choose an option--</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
              <option value="3">Other</option>
              <option value="4">Prefer Not To Answer</option>
            </select>
        </label>
        <br />
        <br />
      </form>
    );
  }

  function MedicalRecordEntry() {
    const [medicalRecord, setMedicalRecord] = useState({
      primaryDoctor: '',
      id: '',
      dateOfExamination: '',
      description: '',
    });

    const handleChange = (e) => {
      setMedicalRecord({ ...medicalRecord, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(medicalRecord);
    };
  
  
    return (
      <form onSubmit={handleSubmit}>
        <h2><strong>Enter Medical Record</strong></h2>
        <label>
          Medical Record ID:
          <input type="number" name="medicalRecordId" value={medicalRecord.id} required onChange={handleChange} />
        </label>
        <br />
        <br />
        <label>
          Primary Doctor:
          <input type="text" name="primaryDoctor" value={medicalRecord.primaryDoctor} required onChange={handleChange} />
        </label>
        <br />
        <br />
        <label>
          Date of Examination:
          <input type="date" name="examinationDate" value={medicalRecord.dateOfExamination} required onChange={handleChange} />
        </label>
        <br />
        <br />
        <lable>
          Description:
          <input type="text" name="description" value={medicalRecord.description} onChange={handleChange} />
        </lable>
        <br />
        <br />
      </form>
    );
  }


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
            </select>
          </label>
        </div>
  
        {selectedDataType === 'animals' && <AnimalDataEntry />}
        {selectedDataType === 'employees' && <EmployeeDataEntry />}
        {selectedDataType === 'medicalRecords' && <MedicalRecordEntry />}
      </div>
    );
  }
  
  
export default DataEntryPage;
  