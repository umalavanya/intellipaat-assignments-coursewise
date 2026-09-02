import { useState } from 'react'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const projects = [
    { number: '01', type: 'Fintech / Product design', title: 'Kite — a calmer way to invest', description: 'A considered investing experience for people who want clarity, not noise.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85', tags: ['Research', 'UX/UI', 'React'] },
    { number: '02', type: 'Culture / Digital experience', title: 'The New Shape of Home', description: 'A digital exhibition exploring how the spaces around us shape our lives.', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85', tags: ['Art direction', 'Webflow', 'Motion'] },
    { number: '03', type: 'Climate / Editorial platform', title: 'Field Notes for Tomorrow', description: 'Making climate research feel immediate, human and worth sharing.', image: 'https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?auto=format&fit=crop&w=1200&q=85', tags: ['Strategy', 'Design system', 'Next.js'] },
  ]

  return (
    <div className="site-shell">
      <header className="nav wrap"><a className="wordmark" href="#top">N<span>/</span>O</a><button className="menu-button" type="button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'} <span>↗</span></button><nav className={menuOpen ? 'nav-links open' : 'nav-links'}><a href="#work" onClick={() => setMenuOpen(false)}>Selected work</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></nav><a className="availability" href="#contact"><i /> Available for select projects</a></header>
      <main id="top">
        <section className="hero wrap"><p className="eyebrow">Independent designer & developer <span>Based in Toronto / Working worldwide</span></p><h1>Digital work<br /><em>with a point of view.</em></h1><div className="hero-bottom"><p>I help ambitious people and brands turn good ideas into clear, memorable digital experiences.</p><a className="circle-arrow" href="#work" aria-label="See selected work">↓</a></div></section>
        <section className="work wrap" id="work"><div className="section-heading"><p className="eyebrow">01 / Selected work</p><p className="muted">A few things I've helped bring to life.</p></div><div className="project-list">{projects.map((project) => <article className="project" key={project.number}><div className="project-image"><img src={project.image} alt={project.title} loading="lazy" /><span className="project-number">{project.number}</span></div><div className="project-info"><p className="project-type">{project.type}</p><h2>{project.title}</h2><p className="description">{project.description}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="text-link" href="#contact">View case study <span>↗</span></a></div></article>)}</div></section>
        <section className="about wrap" id="about"><p className="eyebrow">02 / A little about me</p><div className="about-content"><h2>Good design makes<br /><em>the complex feel simple.</em></h2><div><p>I'm Noor, a multidisciplinary designer and developer with a soft spot for thoughtful details and the space between an idea and its execution.</p><p>For the last 8 years, I've worked with founders, teams and curious humans to make digital things that are useful, beautiful and distinctly theirs.</p><a className="text-link" href="#contact">More about me <span>↗</span></a></div></div></section>
        <section className="contact wrap" id="contact"><div><p className="eyebrow">03 / Let's make something</p><h2>Have a good idea?<br /><em>Let's talk about it.</em></h2></div><form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}><label>Your email<input required type="email" placeholder="you@company.com" /></label><label>Tell me a little about it<textarea required rows="3" placeholder="A sentence or two is perfect." /></label><button type="submit">{submitted ? 'Message sent ✓' : 'Send enquiry ↗'}</button></form></section>
      </main><footer className="footer wrap"><span>© 2024 Noor O.</span><span>Designed & built with care</span><a href="mailto:hello@nooro.studio">hello@nooro.studio ↗</a></footer>
    </div>
  )
}

export default App
