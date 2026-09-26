import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom' ;
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route to="/login" element={<Login/>}/>
      <Route to="/*" element={<Navigate to="/login" replace/>}/>
    </Routes>
    </BrowserRouter>
    
  )
}

export default App
