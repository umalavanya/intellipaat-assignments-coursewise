import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="app-shell">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <footer className="site-footer">
        <span>© 2024 Alex Morgan</span>
        <span>Built with curiosity + React</span>
      </footer>
    </div>
  );
}

export default App;