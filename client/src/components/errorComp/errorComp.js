import React from 'react';
import Navbar from './Navbar';

function ErrorComponent({ errorMessage, isLoggedIn }) {
  let links = [
    ["homepage", "Home"],
    ["customerSignUp", "Sign Up"],
    ["login", "Customer Login"],
    ["employeeLogin", "Employee Login"],
    ["animalPage", "Our Animals"],
    ["aboutUsPage", "About Us"]
  ];

  if (isLoggedIn) {
    links = [
      ["homepage", "Home"],
      ["animalPage", "Our Animals"],
      ["portal", "User Portal"],
      ["aboutUsPage", "About Us"]
    ];
  }

  return (
    <div>
      <Navbar links={links} />
      <div className="error-message">
        <h2>Error</h2>
        <p>{errorMessage}</p> 
      </div>
    </div>
  );
}

export default ErrorComponent;