import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register' ;
import { AuthProvider } from './context/AuthContext';
import {ErrorBoundary} from 'react-error-boundary'


function App() {
  return (
    <ErrorBoundary>
    
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;