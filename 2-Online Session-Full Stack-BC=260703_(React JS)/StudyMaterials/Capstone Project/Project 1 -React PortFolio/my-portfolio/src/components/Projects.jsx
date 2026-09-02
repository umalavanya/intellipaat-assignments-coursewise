function Projects() {
  const projects = [
    { number: '01', title: 'Field Notes', description: 'A calmer way for distributed teams to share what they’re learning.', tech: 'Product design · React · Node', tone: 'project-sage' },
    { number: '02', title: 'Northstar', description: 'Making financial clarity feel less like a spreadsheet and more like a plan.', tech: 'UX direction · MERN stack', tone: 'project-coral' },
    { number: '03', title: 'Common Ground', description: 'A local marketplace designed around trust, not transactions.', tech: 'Research · React · MongoDB', tone: 'project-blue' },
  ];

  return (
    <section id="projects" className="projects-section section-wrap"><div className="section-heading"><div className="section-label">03 <span>Selected work</span></div><a className="text-link" href="#contact">Have a project in mind? <span aria-hidden="true">↗</span></a></div><div className="projects-grid">
        {projects.map((project, index) => (
          <article className="project-card" key={project.title}><div className={`project-visual ${project.tone}`}><span className="project-number">{project.number}</span><div className="visual-window"><span /><span /><span /><strong>{index === 0 ? 'notes / 24' : index === 1 ? '$ 12,480' : 'nearby / today'}</strong></div></div><div className="project-info"><h3>{project.title}</h3><p>{project.description}</p><span>{project.tech}</span><a href="#contact" aria-label={`Ask about ${project.title}`}>View case study <span aria-hidden="true">↗</span></a></div></article>
        ))}
      </div>
    </section>
  );
}

export default Projects;