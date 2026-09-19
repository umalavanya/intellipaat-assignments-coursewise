import React from 'react' 
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard' ;
import { AuthProvider, useAuth } from './context/AuthContext';

function App() {
  return (
    <div>

      <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="*" element={<Navigate to='/login' replace/>}/>
      </Routes>
      </BrowserRouter>
      </AuthProvider>
      
    </div>
  )
}

export default App
