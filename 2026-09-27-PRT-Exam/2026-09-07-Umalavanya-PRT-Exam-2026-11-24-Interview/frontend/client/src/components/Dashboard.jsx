function Dashboard({ stats }) {
  const cards = [
    { 
        label: 'Total Books', 
        value: stats.total 
    },
    { 
        label: 'Programming', 
        value: stats.programming 
    },
    { 
        label: 'Data Science', 
        value: stats.dataScience 
    },
    { 
        label: 'Database', 
        value: stats.database 
    },
    { 
        label: 'Web Development', 
        value: stats.webDev 
    },
    { 
        label: 'Available', 
        value: stats.available },
  ];

  return (
    <div className="dashboard">
      {  
        cards.map((card) => (

        <div className="card" key={card.label}>
          <h3>{card.label}</h3>
          <p>{card.value}</p>

          </div>

      ))
      
      }
    </div>
  );
} ;

export default Dashboard ;