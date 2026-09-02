function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">Independent developer · Bengaluru / India</p>
        <h1>I make useful things for the <em>web.</em></h1>
        <p className="hero-intro">I’m Alex, a full-stack developer who turns complex ideas into clear, human-friendly digital products.</p>
        <div className="hero-actions"><a className="button button-primary" href="#projects">See my work <span aria-hidden="true">↓</span></a><a className="text-link" href="#contact">Start a conversation <span aria-hidden="true">↗</span></a></div>
      </div>
      <div className="hero-art" aria-label="Abstract illustration of a developer at work">
        <div className="art-note note-top">Currently available<br />for select projects</div><div className="art-circle"><span>&lt;/&gt;</span></div><div className="art-card"><span className="status-dot" /> shipping thoughtful code</div><div className="art-line" /><p className="art-caption">01 / Build with intent</p>
      </div>
      <div className="scroll-cue"><span /> Scroll to explore</div>
    </section>
  );
}

export default Hero;