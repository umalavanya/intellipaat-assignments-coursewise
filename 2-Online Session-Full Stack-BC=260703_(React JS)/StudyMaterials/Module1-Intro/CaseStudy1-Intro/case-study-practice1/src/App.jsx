import React, { useState} from 'react' ;
import './App.css' ;

const employees = [
  {"id":1 , "name": "Alice Johnson" ,"department":"Tech" , "position":"Developer"  } ,
  {"id":2, "name":"Bob smith" ,"department":"HR" , "position":  "HR Manager"},
  {"id":3 , "name": "Charlie Brown","department": "Finance", "position": "Accountant" },
  {"id":4 , "name": "Diana Prince" ,"department": "Tech", "position":  "Frontend Developer"}

]


function App(){

  const [filterDept, setFilterDept] = useState('all') ;


  const filteredEmployees = filterDept === 'all' 
  ? employees 
  : employees.filter(emp => emp.department === filterDept) ;

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
              <button
                key = {dept}
                className={`filter-btn ${filterDept === dept? 'active': ''}`}
              >
                {dept === 'all' ? 'All departments': dept}
              </button>
            ))}
            
          </div>
        </div>



        {/* Employee count summary */}

        <div className="summary">

          { filterDept === 'all' ? (

            <span>Showing all <strong>{employees.length}</strong> Employees</span>
          ) :( 
              <span>

                Showing All
                <strong>{filteredEmployees.length}</strong>
                employee{filteredEmployees.length === 1 ? 's':''}
                in 
                <strong>{filterDept}</strong>
              </span>
          )}
        </div>


        <div className="employee-grid">

          {
            filteredEmployees.map(emp => (
              <div className="employee-card">

                <div className="card-avatar">
                  <span>{emp.name.charAt(0)}</span>
                </div>
                <div className="card-body">
                  <h3 className="emp-name">{emp.name}</h3>
                  <p className="emp-position">{emp.position}</p>
                  <span className="emp-dept">{emp.department}</span>
                </div>
              </div>
            ))}
        </div>

        {/* if no employees match */}
        {
          filteredEmployees.length === 0 && (
            <div className="empty-state">
              <p>No employees found in this department</p>
            </div>

          )}


    </div>
  ) ;
} 

export default App ;