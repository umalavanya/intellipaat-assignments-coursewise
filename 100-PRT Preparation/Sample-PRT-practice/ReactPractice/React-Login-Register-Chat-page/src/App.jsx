import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Register from "./components/Register";

function App(){
  return(
    <>
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/chat" element={<Chat/>}/>
        </Routes>
      </div>  
    </Router>
    </>
  )
}

export default App ;