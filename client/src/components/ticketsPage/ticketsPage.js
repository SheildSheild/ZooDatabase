import { postData } from '../../communication';
import './ticketsPage.css';
import React, { useState, useEffect } from 'react';

const getID=()=>localStorage.getItem('userId'); 


export default function TicketsPage(){
    const [formVisible, setFormVisible] = useState(false);

    const handleClick = () => {
        setFormVisible(!formVisible);
    };

    const HandleSubmit = (ev) => {
        const [errorMessage,setErrorMessage]=useState('');
        ev.preventDefault();
        const form = ev.target;
        const data = {};
        data['elderCount'] = form['elderCount'].value;
        data['adultCount'] = form['adultCount'].value;
        data['childrenCount'] = form['childrenCount'].value;
        data['customerID'] = getID();
        data['Date_Issued'] = Date();
        useEffect(()=> {
            postData('/tickets',data)
            .then(data=>{
                if(!data) {
                    setErrorMessage('Failed to post data');
                }
                else {
                    alert('Success');
                }
                console.log(data);
            })
            .catch(err=>setErrorMessage('Error: '+err))
        },[]);
        form.reset();
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
                        <input type="number" name="elderCount" id="elderCount"></input>
                        <br/>
                        <br/>
                        <label><b>How Many Adults? </b></label>
                        <input type="number" name="adultCount" id="adultCount"></input>
                        <br/>
                        <br/>
                        <label><b>How Many Children? </b></label>
                        <input type="number" name="childrenCount" id="childrenCount"></input>
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
                    </form>
                )}
                <p><b>All purchases are non-refundable!</b></p>
            </div>
        </div>
    </>);
}