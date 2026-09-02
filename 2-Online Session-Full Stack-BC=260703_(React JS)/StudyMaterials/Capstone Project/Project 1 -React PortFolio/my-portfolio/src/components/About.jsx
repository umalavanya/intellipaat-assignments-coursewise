function About() {
  const skills = ['React', 'JavaScript', 'Node.js', 'MongoDB', 'Express', 'UI systems'];
  return <section id="about" className="about-section section-wrap"><div className="section-label">02 <span>About me</span></div><div className="about-grid"><h2>Good work lives<br />between <em>people</em><br />and technology.</h2><div className="about-content"><p className="lede">I care about the details that make a product feel obvious to use and delightful to return to.</p><p>For the last five years, I’ve partnered with founders and teams to design, build, and launch digital experiences. My sweet spot is the space where thoughtful product thinking meets robust engineering.</p><div className="skills-list" aria-label="Skills">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div></div></section>;
}

export default About;