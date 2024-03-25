import React from 'react';
import './lostAndFoundReport.css';
import { postData } from '../../communication';




function LostAndFoundReport() {
    const handleSubmit = (ev) => {
        ev.preventDefault();
        const form = ev.target;
        const data = {};
        data["Description"] = form["Description"].value;
        // onSubmit(data);
        postData('/lost_items', data).then(val=>{
            if (!val) {
                console.error('Unable to add lost item');
            }
            console.log("Successfully added lost item!")
        })
        // console.log(data);
    };
    return (
        <>
        <h1>Report Lost Item</h1>
        <center>
        <form onSubmit={handleSubmit}>
        <label htmlFor="Description"></label>
        <input type="text" name="Description"></input>
        <br/>
        <br/>
        <button type="submit">Submit</button>
        </form>
        </center>
        </>
    )
}

export default LostAndFoundReport;