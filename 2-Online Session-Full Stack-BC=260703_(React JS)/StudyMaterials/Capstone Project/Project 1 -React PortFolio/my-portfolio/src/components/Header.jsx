function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#hero" aria-label="Alex Morgan home">
        <span className="brand-mark">AM</span><span>Alex Morgan</span>
      </a>
      <nav className="site-nav" aria-label="Main navigation">
        <a href="#about">About</a><a href="#projects">Selected work</a>
        <a href="#contact" className="nav-cta">Let's talk <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}

export default Header;