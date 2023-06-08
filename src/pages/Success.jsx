import React from 'react'
import { useNavigate } from 'react-router-dom'

const Success = () => {
    const navigate = useNavigate()
  return (
    <>
        <h1>
        You Successfully Created OTP !!
    </h1>

    <button onClick={() => navigate('/')}>
        Go Back
    </button>
    </>



  )
}

export default Success