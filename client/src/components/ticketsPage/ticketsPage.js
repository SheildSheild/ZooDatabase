import './ticketsPage.css';

export default function ticketsPage(){
    return(
        <body>
            <div class = "banner">
                <h1>Welcome to the Cougar Zoo!</h1>
            </div>
            
            <div class = "options container">
                <div class = "option daypass">
                    <h2>Daypass Admission Tickets</h2>
                    <p>Buy your tickets to visit our Zoo during the day</p>
                    <h4>There is something for everyone at Houston Zoo. Check out the elephant 
                        herd—including babies Winnie and Teddy—splashing in their pool, feed a 
                        giraffe, experience the thrill of a jaguar walking overhead in South America's Pantanal, and more!</h4>
                    <button>Purchase Tickets</button>
                    <p><b>All purchases are non-refundable!</b></p>
                </div>
                <div class = "option members">
                    <h2>Cougar Zoo Members</h2>
                    <p>Exclusive access for Cougar Zoo members</p>
                    <button>Member Access</button>
                </div>
            </div>
        </body>
    );
}