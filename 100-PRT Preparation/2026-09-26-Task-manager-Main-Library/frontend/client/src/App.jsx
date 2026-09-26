import React from 'react' ;
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom' ;
import Login from './pages/Login' ;
import Register from './pages/Register';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';

function ProtectedRoute({children}){
  const {user} = useAuth() ;
  return user? children : <Navigate to="/login" replace/>
}

function PublicRoute({children}){
  const {user} = useAuth() ;
  return user? <Navigate to="/dashboard" replace/>:children

}

function App() {

  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path="login" element={<PublicRoute><Login/></PublicRoute>}/>
          <Route path="register" element={<PublicRoute><Register/></PublicRoute>}/>
          <Route path="dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" replace/>}/>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App ;
