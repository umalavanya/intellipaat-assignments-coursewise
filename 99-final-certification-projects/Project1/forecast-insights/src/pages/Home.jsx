import { useTheme } from "../context/ThemeContext" ;



const Home = () => {
    const {theme} = useTheme() ;


  return (
    <div className='page'>
        <h1>Welcome to Forecast Insights</h1>
        <p>You are currently viewing the <strong>{theme}</strong> theme.</p>
        <p>This application delivers real-time information and actionable insights to help you make informed decisions.</p>
        <div className="card-grid">
            
            <div className="card">
                <h3>Real-time Data</h3>
                <p>Get live updates on the metrics that matter most.</p>
            </div>

            <div className="card">
                <h3>Actionable Insights</h3>
                <p>Turn raw data into meaningful business decisions.</p>
            </div>

            <div className="card">
                <h3>Custom Reports</h3>
                <p>Generate reports tailored to your unique needs.</p>
            </div>

        </div>
    </div>
  )
}

export default Home
