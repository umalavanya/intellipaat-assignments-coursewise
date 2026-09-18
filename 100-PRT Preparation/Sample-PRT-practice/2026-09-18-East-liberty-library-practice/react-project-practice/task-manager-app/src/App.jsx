import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom' ;
import Login from './pages/Login' ;
import Register from './pages/Register' ;
import Dashboard from './pages/Dashboard' ;
import Home from './pages/Home' ;

function App() {
  return (
    <>
    <div className="conatiner">

      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </Router>

      
    </div>
    </>
  )
}

export default App
