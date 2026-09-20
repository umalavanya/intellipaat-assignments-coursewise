import {useTheme} from '../context/ThemeContext' ;
const Insights = () => {
    const {theme} = useTheme() ;

    const Insights = [
        {id: 1, title: 'Market Growth', value: '+24.5%'} ,
        {id: 2, title: 'User Engagement', value: '+12.8%'} ,
        {id: 3, title: 'Revenue Forecast', value: '$1.2M'} ,
        {id: 4, title: 'Market Growth', value: '48,290'}  
    ] ;

    return (
        <div className="page">
            <h1>Insights Dashboard</h1>
            <p>Current theme: <strong>{theme}</strong>. The theme selection persists as you navigate across pages.</p>

            <div className="card-grid">
                {Insights.map((item) => (
                    <div className="card" key={item.id}>
                        <h3>{item.id}</h3>
                        <p className="metric">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Insights
