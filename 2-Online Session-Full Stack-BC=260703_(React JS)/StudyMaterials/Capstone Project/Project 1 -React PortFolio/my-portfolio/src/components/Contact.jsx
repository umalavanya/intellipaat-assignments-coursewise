import { useState } from 'react';

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(event) { event.preventDefault(); setSubmitted(true); }

  return <section id="contact" className="contact-section section-wrap"><div className="section-label">04 <span>Get in touch</span></div><div className="contact-grid"><div><h2>Have a good<br /><em>feeling</em> about it?</h2><p className="contact-copy">Tell me a little about what you’re building. I’ll get back to you within a couple of days.</p><a className="email-link" href="mailto:hello@alexmorgan.dev">hello@alexmorgan.dev <span aria-hidden="true">↗</span></a></div><form onSubmit={handleSubmit} className="contact-form"><label>Name<input required name="name" type="text" placeholder="Your name" /></label><label>Email<input required name="email" type="email" placeholder="you@company.com" /></label><label>Message<textarea required name="message" rows="4" placeholder="What are you working on?" /></label><button className="button button-primary" type="submit">{submitted ? 'Message noted ✓' : 'Send message ↗'}</button></form></div></section>;
}

export default Contact;