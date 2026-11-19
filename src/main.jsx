import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { profile, projects, certificates, achievements } from './content';
import '@fontsource/cormorant-garamond/latin-600.css';
import './styles.css';

function Icon({ name }) {
  if (name === 'github') {
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .75a11.25 11.25 0 0 0-3.558 21.923c.563.104.768-.244.768-.542 0-.267-.01-.974-.015-1.912-3.13.68-3.791-1.508-3.791-1.508-.512-1.3-1.25-1.646-1.25-1.646-1.022-.699.078-.685.078-.685 1.13.08 1.725 1.16 1.725 1.16 1.004 1.72 2.633 1.223 3.274.935.102-.727.393-1.223.715-1.504-2.499-.284-5.126-1.25-5.126-5.563 0-1.229.439-2.234 1.16-3.02-.116-.284-.503-1.428.11-2.977 0 0 .945-.303 3.094 1.153A10.78 10.78 0 0 1 12 6.185c.956.004 1.919.129 2.818.379 2.148-1.456 3.092-1.153 3.092-1.153.615 1.549.228 2.693.112 2.977.722.786 1.158 1.791 1.158 3.02 0 4.324-2.631 5.275-5.138 5.554.404.349.765 1.034.765 2.084 0 1.504-.014 2.718-.014 3.087 0 .3.203.65.774.54A11.251 11.251 0 0 0 12 .75Z" /></svg>;
  }
  const paths = {
    diagonal: 'M5 15 15 5M5 5h10v10',
    down: 'M10 4v12m-5-5 5 5 5-5',
    up: 'M10 16V4m-5 5 5-5 5 5',
    back: 'M16 10H4m5-5-5 5 5 5',
    forward: 'M4 10h12m-5-5 5 5-5 5',
    certificate: 'M10 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM7 11l-1 7 4-2 4 2-1-7',
    trophy: 'M6 3h8v5a4 4 0 0 1-8 0V3Zm0 2H3v2a4 4 0 0 0 4 4m7-6h3v2a4 4 0 0 1-4 4m-3 1v5m-4 0h8',
    code: 'm6 5-4 5 4 5m8-10 4 5-4 5m-3-12-2 14',
    chip: 'M5 5h10v10H5V5Zm3-3v3m4-3v3M8 15v3m4-3v3M2 8h3m-3 4h3m10-4h3m-3 4h3',
    email: 'M3 4h14v12H3V4Zm0 1 7 6 7-6',
    github: 'M7 17c-4 1-4-2-5-2m10 3v-3c0-1 .3-1.5 .7-2-2.5-.3-5.2-1.2-5.2-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.5.1-3 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C19.9 1.2 21 1.5 21 1.5c.6 1.5.2 2.7.1 3 .7.8 1.1 1.8 1.1 3 0 4.3-2.7 5.2-5.2 5.5.5.5.8 1.2.8 2V18',
    theme: 'M10 2v2m0 12v2M2 10h2m12 0h2M4.3 4.3l1.4 1.4m8.6 8.6 1.4 1.4m0-11.4-1.4 1.4m-8.6 8.6-1.4 1.4M14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  };

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d={paths[name]} stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProjectArt({ project, loading = 'lazy' }) {
  if (project.image) {
    return <img className="project-art" src={project.image} alt={project.imageAlt} loading={loading} />;
  }

  return (
    <div className={`project-art art-${project.id}`} aria-hidden="true">
      {project.id === 'field-notes' && (
        <div className="trail-print">
          <span>THE OUTDOOR INDEX</span>
          <strong>Field<br />Notes</strong>
          <span>TRAIL GUIDE / VOL. 01</span>
          <svg viewBox="0 0 180 180" className="contours">
            {Array.from({ length: 9 }, (_, index) => (
              <path key={index} d="M93 22C117 8 155 24 157 58S139 104 154 131 126 168 99 155 39 170 25 142 45 100 27 78 42 32 68 35Z"
                transform={`translate(90 90) scale(${1 - index * 0.09}) translate(-90 -90)`} />
            ))}
          </svg>
        </div>
      )}
      {project.id === 'daymark' && (
        <div className="planner">
          <span>Daymark / Weekly view</span>
          <strong>A week in view.</strong>
          <div className="planner-grid">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
              <div key={day}><span>{day}</span><i /><i /><i /></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectGallery() {
  const [view, setView] = useState('projects');
  const gallery = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const items = gallery.current.querySelectorAll('.project-track:not([hidden]) > *, .credential-grid > *, .stack-grid > *, .credential-empty');
    items.forEach((item) => item.classList.remove('reveal-pending'));
    const animations = [...items].map((item, index) => item.animate(
      [{ opacity: 0, transform: 'translateY(20px) scale(.98)' }, { opacity: 1, transform: 'none' }],
      { duration: 450, delay: Math.min(index, 5) * 55, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards' },
    ));
    return () => animations.forEach((animation) => animation.cancel());
  }, [view]);
  const tabs = [
    { id: 'projects', label: 'Projects', icon: 'code' },
    { id: 'certificates', label: 'Certificates', icon: 'certificate' },
    { id: 'achievements', label: 'Achievements', icon: 'trophy' },
    { id: 'stack', label: 'Tech Stack', icon: 'chip' },
  ];
  const credentials = view === 'certificates' ? certificates : achievements;
  return (
    <section className="section work" id="work" aria-labelledby="work-title" ref={gallery}>
      <div className="section-heading" data-reveal>
        <h2 id="work-title">Portfolio<span>.</span></h2>
        <p>Explore the projects and the ideas behind them.</p>
      </div>
      <div className="portfolio-tabs" role="group" aria-label="Portfolio view" style={{
        '--active-tab': tabs.findIndex(({ id }) => id === view),
        '--active-column': tabs.findIndex(({ id }) => id === view) % 2,
        '--active-row': Math.floor(tabs.findIndex(({ id }) => id === view) / 2),
      }}>
        <span className="liquid-tab-highlight" aria-hidden="true" />
        {tabs.map(({ id, label, icon }) => (
          <button key={id} aria-pressed={view === id} onClick={() => setView(id)}><Icon name={icon} />{label}</button>
        ))}
      </div>
      {(view === 'certificates' || view === 'achievements') && (
        credentials.length > 0 ? <div className="credential-grid">
          {credentials.map((item) => (
            <a className="credential-card" key={item.url} href={item.url} aria-label={`View ${item.title}`}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <span>View {view === 'certificates' ? 'certificate' : 'achievement'} <Icon name="diagonal" /></span>
            </a>
          ))}
        </div> : <div className="credential-empty" role="status">
          <Icon name={view === 'certificates' ? 'certificate' : 'trophy'} />
          <h3>{view === 'certificates' ? 'Certificates' : 'Achievements'} coming soon</h3>
          <p>{view === 'certificates' ? 'Certificates will be added here.' : 'Awards and achievements will be added here.'}</p>
        </div>
      )}
      <div className="project-track" id="project-track" hidden={view !== 'projects'}>
        {projects.map((project, index) => (
          <article className="project" key={project.id}>
            <div className="project-visual"><ProjectArt project={project} /></div>
            <div className="project-meta">
              <span className="label">{String(index + 1).padStart(2, '0')} / {project.category}</span>
              {project.sample && <span className="sample-label">Sample</span>}
            </div>
            <h3 className="project-title">
              <a href={`/projects/${project.id}`} className="project-button">
                {project.title}<span className="project-arrow"><Icon name="diagonal" /></span>
              </a>
            </h3>
            <p>{project.description}</p>
          </article>
        ))}
      </div>
      {view === 'stack' && <div className="stack-grid">
        {['HTML', 'CSS', 'JavaScript', 'Bootstrap 5', 'Java'].map((technology) => (
          <div key={technology}><span aria-hidden="true">&lt;/&gt;</span><h3>{technology}</h3><p>Bliss & Beyond</p></div>
        ))}
      </div>}
    </section>
  );
}

function TypedIntroduction() {
  const container = useRef(null);
  const [characters, setCharacters] = useState(0);
  const greeting = "Hi, I'm";
  const text = greeting + profile.name;
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    let observer;
    function showText() {
      clearInterval(timer);
      setCharacters(text.length);
    }
    if (preference.matches || !('IntersectionObserver' in window)) {
      showText();
    } else {
      observer = new IntersectionObserver((entries) => {
        clearInterval(timer);
        if (!entries.some((entry) => entry.isIntersecting)) {
          setCharacters(0);
          return;
        }
        setCharacters(0);
        let count = 0;
        timer = setInterval(() => {
          count += 1;
          setCharacters(count);
          if (count >= text.length) clearInterval(timer);
        }, 75);
      }, { threshold: .25 });
      observer.observe(container.current);
    }
    preference.addEventListener('change', showText);
    return () => {
      clearInterval(timer);
      observer?.disconnect();
      preference.removeEventListener('change', showText);
    };
  }, [text]);
  return (
    <div ref={container} className="typed-introduction" aria-label={`${greeting} ${profile.name}`}>
      <p className="about-greeting typed-line" aria-hidden="true">
        <span className="type-reserve">{greeting}</span>
        <span className="type-output">{greeting.slice(0, characters)}</span>
      </p>
      <p className="about-name typed-line" aria-hidden="true">
        <span className="type-reserve">{profile.name}</span>
        <span className="type-output">{profile.name.slice(0, Math.max(0, characters - greeting.length))}<span className="typing-cursor" hidden={characters >= text.length}>|</span></span>
      </p>
    </div>
  );
}

function ProfileCard() {
  const card = useRef(null);
  function tilt(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    card.current.style.setProperty('--tilt-x', `${(event.clientY - bounds.top - bounds.height / 2) / -30}deg`);
    card.current.style.setProperty('--tilt-y', `${(event.clientX - bounds.left - bounds.width / 2) / 30}deg`);
  }
  return (
    <figure className="profile-scene" onPointerMove={tilt} onPointerLeave={() => {
      card.current.style.setProperty('--tilt-x', '0deg');
      card.current.style.setProperty('--tilt-y', '0deg');
    }}>
      <div className="lanyard" aria-hidden="true">BUILD · LEARN · CREATE</div>
      <div className="profile-pass" ref={card}>
        <div className="pass-slot" aria-hidden="true" />
        <div className="pass-top"><span>PERSONAL PORTFOLIO</span><span>01</span></div>
        <strong>{profile.name}</strong>
        <img src={profile.photo || '/images/abstract-study.jpg'} alt={profile.photo ? profile.photoAlt || profile.name : 'Abstract silver sculpture'} fetchPriority="high" />
        <div className="pass-bottom"><span>CODE &amp; CURIOSITY</span><span aria-hidden="true">✳</span></div>
      </div>
      <figcaption>Move your pointer to explore</figcaption>
    </figure>
  );
}

function usePageAnimations() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
    const animations = new Set();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          if (!preference.matches && entry.boundingClientRect.top >= window.innerHeight) entry.target.classList.add('reveal-pending');
          continue;
        }
        if (!entry.target.classList.contains('reveal-pending')) continue;
        entry.target.classList.remove('reveal-pending');
        if (preference.matches) continue;
        const animation = entry.target.animate(
          [{ opacity: 0, transform: 'translateY(48px) scale(.98)' }, { opacity: 1, transform: 'none' }],
          { duration: 1000, easing: 'cubic-bezier(.22, 1, .36, 1)' },
        );
        animations.add(animation);
        animation.finished.then(() => animations.delete(animation)).catch(() => {});
        const textElements = entry.target.querySelectorAll('p, h3, .background-status');
        textElements.forEach((element, index) => {
          const textAnimation = element.animate(
            [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }],
            { duration: 850, delay: 120 + Math.min(index, 4) * 90, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards' },
          );
          animations.add(textAnimation);
          textAnimation.finished.then(() => animations.delete(textAnimation)).catch(() => {});
        });
      }
    }, { threshold: .05, rootMargin: '0px 0px -40px 0px' });
    const elements = document.querySelectorAll('[data-reveal]:not(.case-features), .project, .portfolio-tabs, .background-card, .background-stat, .case-features li, .case-breadcrumbs, .footer');
    elements.forEach((element) => {
      if (!preference.matches && element.getBoundingClientRect().top > window.innerHeight) element.classList.add('reveal-pending');
      observer.observe(element);
    });
    function stopMotion() {
      if (preference.matches) animations.forEach((animation) => animation.cancel());
      if (preference.matches) elements.forEach((element) => element.classList.remove('reveal-pending'));
    }
    preference.addEventListener('change', stopMotion);
    return () => {
      observer.disconnect();
      elements.forEach((element) => element.classList.remove('reveal-pending'));
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener('change', stopMotion);
    };
  }, []);
}

function ProjectPage({ project }) {
  if (!project) {
    return (
      <section className="case-overview">
        <h1>Project not found</h1>
        <a className="back-link" href="/#work"><Icon name="back" /> Back to work</a>
      </section>
    );
  }
  return (
    <article className="case-study case-study--showcase">
      <nav className="case-breadcrumbs" aria-label="Breadcrumb">
        <a className="back-link" href="/#work"><Icon name="back" /> Back</a>
        <a href="/#work">Projects</a>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{project.title}</span>
      </nav>
      <div className="case-hero">
        <header className="case-heading">
          <p className="label">{project.category}{project.sample && ' / Sample'}</p>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          {project.technologies?.length > 0 && (
            <div className="tech-stack">
              <h2 id="tech-stack-title"><span className="tech-heading-mark" aria-hidden="true">&lt;/&gt;</span> Technologies used</h2>
              <ul className="tags" aria-labelledby="tech-stack-title">
                {project.technologies.map((technology) => <li key={technology}><span className="technology-mark" aria-hidden="true">{technology === 'JavaScript' ? 'JS' : technology.slice(0, 1)}</span>{technology}</li>)}
              </ul>
            </div>
          )}
          <div className="project-links">
            {project.demo && <a className="primary-button" href={project.demo}>Visit live site <Icon name="diagonal" /></a>}
            {project.source && <a className="back-link" href={project.source}>Source code <Icon name="diagonal" /></a>}
          </div>
        </header>
        <figure className="case-cover">
          <ProjectArt project={project} loading="eager" />
          {project.image && <figcaption><span>{project.title}</span><span>Project cover</span></figcaption>}
        </figure>
      </div>
      <section className="section case-overview" aria-labelledby="overview-title" data-reveal>
        <h2 id="overview-title">About the project<span>.</span></h2>
        <div>
          <p>{project.details || project.description}</p>
          <ul className="tags" aria-label="Project topics">
            {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        </div>
      </section>
      {project.features && (
        <section className="section case-features" aria-labelledby="features-title" data-reveal>
          <h2 id="features-title">What you can explore<span>.</span></h2>
          <ol>
            {project.features.map(({ title, text }) => (
              <li key={title}><h3>{title}</h3><p>{text}</p></li>
            ))}
          </ol>
        </section>
      )}
      {project.context && (
        <section className="section case-overview" aria-labelledby="context-title" data-reveal>
          <h2 id="context-title">Why we built it<span>.</span></h2>
          <p>{project.context}</p>
        </section>
      )}
    </article>
  );
}

function App() {
  usePageAnimations();
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
      <header className="shell header" id="top">
        <nav aria-label="Main navigation">
          <a aria-current={activeSection === 'top' ? 'location' : undefined} href={projectPage ? '/#top' : '#top'}>Home</a>
          <a aria-current={activeSection === 'about' ? 'location' : undefined} href={projectPage ? '/#about' : '#about'}>About</a>
          <a aria-current={activeSection === 'work' ? 'location' : undefined} href={projectPage ? '/#work' : '#work'}>Portfolio</a>
          <a aria-current={activeSection === 'contact' ? 'location' : undefined} href={projectPage ? '/#contact' : '#contact'}>Contact</a>
          <button className="icon-button" type="button" aria-label="Dark theme" aria-pressed={dark} onClick={() => setDark(!dark)}>
            <Icon name="theme" />
          </button>
        </nav>
      </header>
      <main className="shell" id="main">
        {projectPage ? <ProjectPage project={selectedProject} /> : <>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="label hero-label"><span /> Personal portfolio</p>
            <h1 id="hero-title">Building ideas.<br /><em>Creating experiences.</em></h1>
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
          <ProfileCard />
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
                <div><h3>University of Information Technology</h3><p>Third-year student</p><span className="background-status">Currently studying</span></div>
              </article>
            </div>
          </div>
          <div className="background-stats">
            <a href="/projects/bliss-beyond" className="background-stat">
              <div><span className="stat-symbol" aria-hidden="true">&lt;/&gt;</span><strong>{projects.filter((project) => !project.sample).length}</strong></div>
              <h3>Projects</h3><p>Web applications and team projects</p>
            </a>
            <div className="background-stat">
              <div><span className="stat-symbol" aria-hidden="true"><Icon name="certificate" /></span><strong>{certificates.length}</strong></div>
              <h3>Certificates</h3><p>Professional certification and event participation</p>
            </div>
            <div className="background-stat">
              <div><span className="stat-symbol" aria-hidden="true"><Icon name="trophy" /></span><strong>{achievements.length}</strong></div>
              <h3>Awards</h3><p>AI Ocean Award Winner and Best Pitch</p>
            </div>
          </div>
        </section>

        <ProjectGallery />

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
        <a href="#top">Back to top <Icon name="up" /></a>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);


