import './App.css'
function App(){

  const users = [
    {id: 1, name:"Uma", email:"uma@email.com", dep:"fin"},
    {id: 2, name:"Ravi", email:"ravi@email.com", dep:"tech"},
    {id:3, name:"Ishan", email:"ishan@email.com", dep: "tech"}

  ]
  return(
    <>
    
    <div className="userConatiner" >
      <h1>Users</h1>
      
      {users.map( (user) => (
        <div className="users" index={user.id}>
          <div className="userName">{user.name}</div>
          <p className="userEmail">{user.email}</p> 
        </div> )
      )}

      <h1>Users from Tech department</h1>
      { users.map((user) => {
        if(user.dep == 'tech'){
          return (
            <div className="users" index={user.id}>
              <div className="userName">{user.name}</div>
              <p className="userEmail">{user.email}</p> 
            </div>)
          }
        })

      }
      
    </div>
    
      
    </>
  )
}

export default App;