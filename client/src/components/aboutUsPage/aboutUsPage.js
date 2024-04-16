import './aboutUsPage.css';
import Navbar from '../navBar/navBar';

export default function AboutUsPage() {
    const token = localStorage.getItem('token');
    const isLoggedIn = token != null;
    // check if logged in!

    // var links = ["homepage", "customerSignUp", "login", "animalPage", "aboutUsPage"];
    var links = [["homepage", "Home"], ["customerSignUp", "Login"], ["animalPage", "Our Animals"], ["aboutUsPage", "About Us"], ["makeAComplaint", "Any Complaints?"], ["lostAndFoundReport", "Lost somthing?"]];
    if (isLoggedIn) {
        links = [["homepage", "Home"], ["animalPage", "Our Animals"],["portal","User Portal"],["aboutUsPage", "About Us"], ["makeAComplaint", "Any Complaints?"], ["lostAndFoundReport", "Lost somthing?"]];
    }
    return ( <>
        <Navbar links={links} />
        <br/>
        <br/>
        <div className = "banner">
            <center><h1>About Us</h1></center>
        </div>
        <div className='option container'>
            <center>
                <h3>Mission Statement:</h3>
                <h4>At the Cougar Zoo Database, we're dedicated to connecting people 
                    with the natural world, fostering a deeper appreciation for 
                    wildlife, and promoting the conservation of endangered species 
                    through accessible, accurate, and engaging information.</h4>
                <br/>
                <h3>Our Story:</h3>
                <h4>Founded in 2020 by a group of wildlife enthusiasts and data scientists, 
                    The Cougar Zoo Database began as a small project aimed at cataloging the diverse 
                    species housed in our local zoo. Today, it has grown into a comprehensive resource, 
                    offering detailed information on thousands of animals from zoos around the world, 
                    serving as an educational tool for schools, researchers, and animal lovers alike.</h4>
                <br/>
                <h3>Meet the Team:</h3>
                <h4>Behind The Cougar Zoo Database Database is a team of dedicated professionals ranging from zoologists
                    to software engineers, all united by a shared passion for wildlife conservation. 
                    Meet Jane Doe, our lead zoologist, who has spent over a decade studying African 
                    elephants in the wild, and John Smith, our chief technology officer, who ensures 
                    our database runs smoothly and securely.</h4>
                <br/>
                <h3>Our Animals:</h3>
                <h4>Discover the majestic Amur leopard, one of the world's most endangered big cats, through our database. Learn about their habitat, diet, and the conservation efforts that are helping to save them from the brink of extinction.</h4>
                <br/>
                <h3>Contact Information:</h3>
                <h4>Have questions or want to get involved? Contact us at https://github.com/SheildSheild/ZooDatabase or follow us on social media to stay updated on our latest projects and events.</h4>
            </center>
        </div>
        </>
        )};