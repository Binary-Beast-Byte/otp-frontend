import { useEffect, useState } from 'react'
import './App.css'
import VerificatoinInput from './components/VerificatoinInput'
import { Routes, Route, Navigate } from 'react-router-dom'
import VerificationInput from './components/VerificatoinInput';
import Success from './pages/Success';


function App() {

  return (
    <Routes>
      <Route>

          <Route path="/" element={<VerificatoinInput />} />
            <Route path="/success" element={<Success />} />
          </Route>
  
  </Routes>
  )
}

export default App
