import React, { useState} from 'react' ;
import './App.css' ;

const employees = [
  {"id":1 , "name": "Alice Johnson" ,"department":"Tech" , "position":"Developer"  } ,
  {"id":2, "name":"Bob smith" ,"department":"HR" , "position":  "HR Manager"},
  {"id":3 , "name": "Charlie Brown","department": "Finance", "position": "Accountant" },
  {"id":4 , "name": "Diana Prince" ,"department": "Tech", "position":  "Frontend Developer"}

]


function App(){


  const departments = [ "all", ...new Set(employees.map(emp => emp.department))] ;
  return(
  
    <div className="app-container">

      <header classname="app-header">
        <h1>Employee Directory</h1>
        <p classname="subtitle">View and filter employees</p>
      </header>

      {/* Filter bar */}
      <div className="filter-bar">
        <span className="filter-label">Filter by department: </span>
        <div className="filter-group">
          {
            departments.map(dept => (
              <button>
                {dept === 'all' ? 'All departments': dept}
              </button>
            ))
          }



        </div>

      </div>
    </div>
  ) ;
} 

export default App ;