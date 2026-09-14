import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom' ;
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import './App.css'
function App(){
  return(
    <>
    <div className='app-container'>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/register' replace/> } />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/> }/>
          <Route path='/chat' element={<Chat/>} />

        </Routes>
      </Router>
      
    </div>
    </>
  )
} ;
export default App ;
