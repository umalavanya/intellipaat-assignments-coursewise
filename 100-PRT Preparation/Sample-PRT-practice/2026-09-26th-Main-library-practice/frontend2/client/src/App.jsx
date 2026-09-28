import React from 'react'
import {ErrorBoundary} from 'react-error-boundary' ;
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='*' element={<Navigate to="/login" replace />} />
      </Routes>
      </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
