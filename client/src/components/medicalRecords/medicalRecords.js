import React, { useState } from 'react';
import './medicalRecords.css';
import DisplayTable from './../displayTable';
import DataEntry from './../dataEntry';
import DummyRecords from './dummyRecords.json';


export default function MedicalRecords() {
    const [showForm, setShowForm] = useState(false); // State to control the visibility of the data entry form

    return (
        <div className="medical-records-page">
            <h1>Animal Medical Records</h1>
            <button className="add-record-btn" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add New Record'}
            </button>
            {showForm && <DataEntry />}
            <div className="records-display-section">
                <DisplayTable data={'./dummyRecords.json'}/>
            </div>
        </div>
    );
}
