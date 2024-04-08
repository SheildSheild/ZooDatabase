import React from 'react';

function ErrorComponent({ errorMessage }) {
  return (
    <div>
      <div className="error-message">
        <h2>Error</h2>
        <p>{errorMessage}</p> 
      </div>
    </div>
  );
}

export default ErrorComponent;