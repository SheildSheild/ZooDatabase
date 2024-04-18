import { postData } from '../../communication';
import './ticketsPage.css';
import React, { useState, useEffect } from 'react';

const getID=()=>localStorage.getItem('userId'); 


export default function TicketsPage(){
    const [formVisible, setFormVisible] = useState(false);
    const [errorMessage,setErrorMessage]=useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleClick = () => {
        setFormVisible(!formVisible);
    };

    const handleMessagesTimeout = () => {
        setTimeout(() => {
            setErrorMessage('');
            setSuccessMessage('');
        }, 4000);
    };

    const HandleSubmit = (ev) => {
        ev.preventDefault();
        const form = ev.target;
        const data = {};
        data['Elder_Count'] = form['Elder_Count'].value;
        data['Adult_Count'] = form['Adult_Count'].value;
        data['Child_Count'] = form['Child_Count'].value;
        data['Customer_ID'] = getID();
        data['Date_Issued'] = new Date().toISOString().slice(0, 19).replace('T', ' ');
        postData('/tickets', data).then(val=>{
            if (val['message'] === 'Error adding Tickets') {
                console.log(val);
                console.error('Unable to add purchase ticket');
                setErrorMessage('Unable to purchase ticket: Please try again!');
            }
            else {
                console.log("Successfully added lost item!");
                console.log(val);
                setErrorMessage(null);
                setSuccessMessage('Tickets purchased successfully!');
                form.reset();
            }
        }).catch((error) => {
            setErrorMessage('An error occurred during submission. Please try again.'); // Set error message in case of promise rejection
        })
        .finally(() => {
            handleMessagesTimeout();
        });
    }

    return(<>
        <br/>
        <br/>
        <div className = "banner">
            <h1>Welcome to the Cougar Zoo!</h1>
        </div>
        
        <div className = "options container">
            <div className = "option daypass">
                <h2>Daypass Admission Tickets</h2>
                <p>Buy your tickets to visit our Zoo during the day</p>
                <h4>There is something for everyone at Cougar Zoo. Check out the elephant 
                    herd—including babies Sebastion and Sheild—splashing in their pool, feed a 
                    giraffe, experience the thrill of a jaguar walking overhead in South America's Pantanal, and much much more!</h4>
                <button onClick={handleClick}>Purchase Tickets</button>
                <br/>
                <br/>
                {formVisible && (
                    <form id="form1" onSubmit={HandleSubmit}>
                        <label><b>How Many Elders? </b></label>
                        <input type="number" name="Elder_Count" id="Elder_Count"></input>
                        <br/>
                        <br/>
                        <label><b>How Many Adults? </b></label>
                        <input type="number" name="Adult_Count" id="Adult_Count"></input>
                        <br/>
                        <br/>
                        <label><b>How Many Children? </b></label>
                        <input type="number" name="Child_Count" id="Child_Count"></input>
                        <br/>
                        <br/>
                        <label><b>Card Number: </b></label>
                        <input type="number" />
                        <br/>
                        <br/>
                        <label><b>Expiration Date: </b></label>
                        <select name="expireMonth" id="expireMonth">
                            <option value="">Month</option>
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                        <select name="expireYear" id="expireYear">
                            <option value="">Year</option>
                            <option value="20">2024</option>
                            <option value="21">2025</option>
                            <option value="22">2026</option>
                            <option value="23">2027</option>
                            <option value="24">2028</option>
                        </select>
                        <input type="hidden" name="expiryDetails" id="expiryDetails" maxLength="4"/>
                        <br/>
                        <br/>
                        <button type='submit'><b>Pay Now!</b></button>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                    </form>
                )}
                <p><b>All purchases are non-refundable!</b></p>
            </div>
        </div>
    </>);
}