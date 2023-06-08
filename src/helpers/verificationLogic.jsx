import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VerificationInputLogic() {
  const initialInput = Array(6).fill().map(() => '');
  const [inputs, setInputs] = useState(initialInput);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRefs = useRef([]);

  const navigate = useNavigate();

  const handleInputChange = (event, index) => {
    const value = event.target.value;
    const newInputs = [...inputs];
    newInputs[index] = value.slice(0, 1); // Only allow one character
    setInputs(newInputs);

    // Automatically focus on the next input field
    if (value.length > 0 && index < inputs.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (event) => {
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('text');

    // Validate and update the inputs with pasted data
    const newInputs = [...inputs];
    for (let i = 0; i < pastedData.length && i < inputs.length; i++) {
      if (!isNaN(pastedData[i])) {
        newInputs[i] = pastedData[i];
      }
    }
    setInputs(newInputs);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Client-side validation
    let isValid = true;
    const newInputs = [...inputs];
    newInputs.forEach((value, index) => {
      if (value === '' || isNaN(value)) {
        newInputs[index] = '';
        isValid = false;
      }
    });
    setInputs(newInputs);
  
    // If validation fails, return
    if (!isValid) {
      return;
    }
  
    // Make a POST request to the server with the code
    const otp = newInputs.join('');
  
    try {
      const response = await axios.post('http://localhost:5000/user/create', { otp });
  
      // Handle the response
      alert(response.data); // Log the response data
      navigate('/success')
  
      // Reset the inputs
      setInputs(initialInput);
      setErrorMessage('');
    } catch (error) {
      // Handle error response
      console.log(error);
  
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 400) {
          setErrorMessage('Invalid OTP format');
        } else if (error.response.status === 500) {
          setErrorMessage('Failed to create OTP');
        } else {
          setErrorMessage('Error creating user');
        }
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage('No response received from the server');
      } else {
        // Something else happened in making the request
        setErrorMessage('Error making the request');
      }
    }
  };

  return {
    inputs,
    errorMessage,
    handleInputChange,
    handlePaste,
    handleSubmit,
    inputRefs,
  };
}

export default VerificationInputLogic;
