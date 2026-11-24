import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { profile, projects, certificates, achievements } from './content';
import { ProjectGallery } from './ProjectGallery';
import { ProjectPage } from './ProjectPage';
import { Icon } from './ProjectVisuals';
import { TypedIntroduction } from './TypedText';
import { usePageAnimations } from './usePageAnimations';
import './styles.css';

function App() {
  usePageAnimations();
  const [portfolioView, setPortfolioView] = useState('projects');
  const projectPage = window.location.pathname.startsWith('/projects/');
  const projectId = window.location.pathname.replace(/\/$/, '').split('/').pop();
  const selectedProject = projectPage && projects.find(({ id }) => id === projectId);
  const [activeSection, setActiveSection] = useState(projectPage ? 'work' : 'top');
  useEffect(() => {
    if (projectPage) return;
    let frame = 0;
    const sections = ['about', 'work', 'contact'].map((id) => document.getElementById(id));
    function updateSection() {
      frame = 0;
      let current = 'top';
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= window.innerHeight * .3) current = section.id;
      }
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = 'contact';
      setActiveSection(current);
    }
    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(updateSection);
    }
    updateSection();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [projectPage]);
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('portfolio-theme') !== 'light'; }
    catch { return true; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]').content = dark ? '#101d2b' : '#edf7fd';
    try { localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light'); }
    catch { /* The theme still works without storage. */ }
  }, [dark]);

  useEffect(() => {
    document.title = projectPage
      ? `${selectedProject?.title || 'Project not found'} / Portfolio`
      : `${profile.name} / Portfolio`;
    // The browser may resolve the fragment before React mounts the section.
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
  }, [projectPage, selectedProject]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      {!projectPage && <header className="shell header" id="top">
        <nav aria-label="Main navigation">
          <a aria-current={activeSection === 'top' ? 'location' : undefined} href="#top">Home</a>
          <a aria-current={activeSection === 'about' ? 'location' : undefined} href="#about">About</a>
          <a aria-current={activeSection === 'work' ? 'location' : undefined} href="#work">Portfolio</a>
          <a aria-current={activeSection === 'contact' ? 'location' : undefined} href="#contact">Contact</a>
          <button className="icon-button" type="button" aria-label="Dark theme" aria-pressed={dark} onClick={() => setDark(!dark)}>
            <Icon name="theme" />
          </button>
        </nav>
      </header>}
      <main className="shell" id="main">
        {projectPage ? <ProjectPage project={selectedProject} /> : <>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="label hero-label"><span /> Personal portfolio</p>
            <h1 id="hero-title">I make complex<br /><em>things click.</em></h1>
            <p className="intro">{profile.intro}</p>
            <a className="primary-button" href="#work">Explore work <Icon name="down" /></a>
            <div className="hero-socials" aria-label="Find me">
              <span className="label">Find me</span>
              {profile.links.map(({ label, url }) => (
                <a key={url} className="contact-link contact-icon" href={url} aria-label={label} title={label}><Icon name="github" /></a>
              ))}
              {profile.email && <a className="contact-link contact-icon" href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`} title={profile.email}><Icon name="email" /></a>}
            </div>
          </div>
          <div className="click-ripple" aria-hidden="true">
            <span />
          </div>
        </section>

        <section className="section about" id="about" aria-labelledby="about-title">
          <h2 id="about-title" data-reveal>About me<span>.</span></h2>
          <div className="about-introduction" data-reveal>
            <TypedIntroduction />
            <a className="primary-button" href="#contact">Get in touch <Icon name="diagonal" /></a>
          </div>
          <div className="about-story" data-reveal><p>{profile.bio}</p>
            <a className="about-work-link" href="#work">Explore work <Icon name="diagonal" /></a>
          </div>
        </section>

        <section className="section background-section" aria-label="Education and achievements">
          <div className="background-columns">
            <div>
              <h2>Education</h2>
              <article className="background-card">
                <img className="background-symbol university-logo" src="/images/uit.jpg" alt="University of Information Technology logo" loading="lazy" />
                <div><h3><a href="https://www.uit.edu.mm/" target="_blank" rel="noopener noreferrer">University of Information Technology ↗</a></h3><p>Third-year student</p><span className="background-status">Currently studying</span></div>
              </article>
            </div>
          </div>
          <div className="background-stats">
            <a href="#work" className="background-stat" onClick={() => setPortfolioView('projects')}>
              <div><span className="stat-symbol" aria-hidden="true">&lt;/&gt;</span><strong>{projects.length}</strong></div>
              <h3>Projects</h3><p>Web applications and team projects</p>
            </a>
            <a href="#work" className="background-stat" onClick={() => setPortfolioView('certificates')}>
              <div><span className="stat-symbol" aria-hidden="true"><Icon name="certificate" /></span><strong>{certificates.length}</strong></div>
              <h3>Certificates</h3><p>Professional certification and event participation</p>
            </a>
            <a href="#work" className="background-stat" onClick={() => setPortfolioView('achievements')}>
              <div><span className="stat-symbol" aria-hidden="true"><Icon name="trophy" /></span><strong>{achievements.length}</strong></div>
              <h3>Awards</h3><p>AI Ocean Award Winner and Best Pitch</p>
            </a>
          </div>
        </section>

        <ProjectGallery view={portfolioView} setView={setPortfolioView} />

        <section className="section contact" id="contact" aria-labelledby="contact-title">
          <h2 id="contact-title" data-reveal>Get in touch<span>.</span></h2>
          <div data-reveal>
            {profile.email && <a className="contact-link contact-icon" href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`} title={profile.email}><Icon name="email" /></a>}
            {profile.links.map(({ label, url }) => <a key={url} className="contact-link contact-icon" href={url} aria-label={label} title={label}><Icon name="github" /></a>)}
            {!profile.email && profile.links.length === 0 && <p>Contact details coming soon.</p>}
          </div>
        </section>
        </>}
      </main>
      <footer className="shell footer">
        <span>{profile.name} / Portfolio</span>
        <a href={projectPage ? '#main' : '#top'}>Back to top <Icon name="up" /></a>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
