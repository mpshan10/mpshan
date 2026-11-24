import React, { useEffect, useRef } from 'react';
import { projects, certificates, achievements } from './content';
import { Icon, ProjectArt, TechnologyLogo } from './ProjectVisuals';

export function ProjectGallery({ view, setView }) {
  const gallery = useRef(null);
  useEffect(() => {
    if (!Element.prototype.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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
  const activeTab = tabs.findIndex(({ id }) => id === view);
  const credentials = view === 'certificates' ? certificates : achievements;
  return (
    <section className="section work" id="work" aria-labelledby="work-title" ref={gallery}>
      <div className="section-heading" data-reveal>
        <h2 id="work-title">Portfolio<span>.</span></h2>
      </div>
      <div className="portfolio-tabs" role="group" aria-label="Portfolio view" style={{
        '--active-tab': activeTab,
        '--active-column': activeTab % 2,
        '--active-row': Math.floor(activeTab / 2),
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
          <div key={technology}><TechnologyLogo technology={technology} /><h3>{technology}</h3></div>
        ))}
      </div>}
    </section>
  );
}
