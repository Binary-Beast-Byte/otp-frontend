import React from 'react';
import VerificationInputLogic from '../helpers/verificationLogic';
import './Input.css'; // Import the CSS file

function VerificationInput() {
  const {
    inputs,
    errorMessage,
    handleInputChange,
    handlePaste,
    handleSubmit,
    inputRefs,
  } = VerificationInputLogic();

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        {inputs.map((value, index) => (
          <input
            key={index}
            id={`input-${index}`}
            type="text"
            value={value}
            maxLength={1} // Restrict input to one character
            onChange={(event) => handleInputChange(event, index)}
            onPaste={handlePaste} // Handle paste event
            ref={(el) => (inputRefs.current[index] = el)} // Store reference to input field
            className="input-field" // Add the input field class
          />
        ))}
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default VerificationInput;
