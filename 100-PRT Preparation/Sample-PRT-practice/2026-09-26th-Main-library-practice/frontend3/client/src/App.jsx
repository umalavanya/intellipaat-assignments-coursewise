import React from 'react'
import {BrowserRouter, Routes,Route, Navigate } from 'react-router-dom' ;
import {ErrorBoundary} from 'react-error-boundary'
import Login from './pages/Login' ;
import Register from './pages/Register'; 
import Dashboard from './pages/Dashboard';

function ErrorFallback (error, resetErrorBoundary){
  return(
    <div>
      <p>Something went wrong!!</p>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>       
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="*" element={<Navigate to="/login" replace/>}/>
        </Routes>     
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
