import { BrowserRouter, Routes, Route } from "react-router-dom" ;
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Insights from "./pages/Insights"; 
import About from "./pages/About";
import './App.css' ;

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar/>
        <main className="content">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/insights" element={<Insights/>}/>
            <Route path="/about" element={<About/>}/>
          </Routes>
        </main>

      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
