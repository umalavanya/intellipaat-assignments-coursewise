// src/App.jsx
import React, { useState } from 'react';
import './App.css';

// ----- employee data (exactly as provided) -----
const employees = [
  { id: 1, name: 'Alice Johnson', department: 'Tech', position: 'Software Engineer' },
  { id: 2, name: 'Bob Smith', department: 'HR', position: 'HR Manager' },
  { id: 3, name: 'Charlie Brown', department: 'Tech', position: 'DevOps Engineer' },
  { id: 4, name: 'Diana Prince', department: 'Finance', position: 'Accountant' },
  { id: 5, name: 'Ethan Hunt', department: 'Tech', position: 'Frontend Developer' },
  { id: 6, name: 'Sam Krith', department: 'Finance', position: 'Sr Accountant' },
];

function App() {
  // filter state: 'all' | 'Tech' | 'HR' | 'Finance'
  const [filterDept, setFilterDept] = useState('all');

  // compute filtered list based on selection
  const filteredEmployees = filterDept === 'all'
    ? employees
    : employees.filter(emp => emp.department === filterDept);

  // extract unique departments for filter buttons (plus 'all')
  const departments = ['all', ...new Set(employees.map(emp => emp.department))];

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>👥 Employee Directory</h1>
        <p className="subtitle">View and filter employees by department</p>
      </header>

      {/* filter bar */}
      <div className="filter-bar">
        <span className="filter-label">Filter by department:</span>
        <div className="filter-group">
          {departments.map(dept => (
            <button
              key={dept}
              className={`filter-btn ${filterDept === dept ? 'active' : ''}`}
              onClick={() => setFilterDept(dept)}
            >
              {dept === 'all' ? 'All Departments' : dept}
            </button>
          ))}
        </div>
      </div>

      {/* employee count summary */}
      <div className="summary">
        {filterDept === 'all' ? (
          <span>Showing all <strong>{employees.length}</strong> employees</span>
        ) : (
          <span>Showing <strong>{filteredEmployees.length}</strong> employee{filteredEmployees.length !== 1 ? 's' : ''} in <strong>{filterDept}</strong></span>
        )}
      </div>

      {/* employee grid */}
      <div className="employee-grid">
        {filteredEmployees.map(emp => (
          <div className="employee-card" key={emp.id}>
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
      {filteredEmployees.length === 0 && (
        <div className="empty-state">
          <p>No employees found in this department.</p>
        </div>
      )}
    </div>
  );
}

export default App;