import { useTheme } from "../context/ThemeContext";

function About() {
    const {theme} = useTheme() ;

  return (
    <div className="page">
        <h1>About us</h1>
        <p>ForecastInsights is a next-generation analytics platform. This page is rendered with the 
            <strong>{theme}</strong> theme, demonstrates that the Context API maintains state across routes.
        </p>
        <p>We combine cutting-edge machine learning with real-time data pipelines to delivers insights you can trust.</p>

    </div>
  ) ;
} ;
export default About ;
