import React from 'react';
import { Icon, ProjectArt, TechnologyLogo } from './ProjectVisuals';
import { TypedProjectTitle } from './TypedText';

export function ProjectPage({ project }) {
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
          <p className="label">{project.category}</p>
          {project.overview ? <TypedProjectTitle title={project.title} /> : <h1>{project.title}</h1>}
          <p>{project.description}</p>
          {project.roleLabel && (project.contribution || project.contributions) && (
            <a className="case-role-link" href="#contribution-title">My role · {project.roleLabel}</a>
          )}
          <div className="project-links">
            {project.demo && <a className="case-action live-action" href={project.demo}>Visit live site <Icon name="diagonal" /></a>}
            {project.video && <a className="case-action video-action" href={project.video} target="_blank" rel="noopener noreferrer"><span className="play-disc" aria-hidden="true">▶</span> Watch demo</a>}
            {project.source && <a className="case-action" href={project.source}><Icon name="github" /> Source code</a>}
          </div>
          {project.technologies?.length > 0 && (
            <div className="tech-stack">
              <h2 id="tech-stack-title"><span className="tech-heading-mark" aria-hidden="true">&lt;/&gt;</span> Technologies used</h2>
              <ul className="tags" aria-labelledby="tech-stack-title">
                {project.technologies.map((technology) => <li key={technology}><TechnologyLogo technology={technology} />{technology}</li>)}
              </ul>
            </div>
          )}
        </header>
        <figure className="case-cover">
          <ProjectArt project={project} loading="eager" />
          {project.image && <figcaption><span>{project.title}</span><span>Project cover</span></figcaption>}
          {project.story?.awards && (
            <div className="project-award-title" aria-label="Awards">
              <Icon name="trophy" />
              <p>{project.story.awards.join(' · ')}</p>
            </div>
          )}
        </figure>
      </div>
      {project.screenshots?.length > 0 && (
        <section className="section" aria-labelledby="screenshots-title" data-reveal>
          <h2 id="screenshots-title">Screenshots<span>.</span></h2>
          <div className="project-track screenshot-track" tabIndex={0} role="region" aria-label="Project screenshots">
            {project.screenshots.map(({ src, caption }) => (
              <figure key={src}>
                <a href={src} target="_blank" rel="noopener noreferrer"><img src={src} alt={caption} loading="lazy" /></a>
                <figcaption>{caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
      <section className={project.overview ? 'section project-overview' : 'section case-overview'} aria-labelledby="overview-title" data-reveal>
        <h2 id="overview-title">About the project<span>.</span></h2>
        <div>
          <div className={project.logo ? 'overview-intro overview-intro--with-logo' : 'overview-intro'}>
            <p>{project.details || project.description}{project.recognition && ` ${project.recognition}`}</p>
            {project.logo && <img className="overview-logo" src={project.logo} alt={`${project.title} logo`} loading="lazy" />}
          </div>
          {project.overview && (
            <div className="overview-pillars">
              {project.overview.map(({ title, text }) => (
                <article key={title}><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
          )}
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
      {project.id !== 'shay-sett' && (project.story ? (
        <section className="section project-story" aria-labelledby="context-title">
          <div className="story-heading" data-reveal>
            <h2 id="context-title">Why we built it<span>.</span></h2>
            <p>{project.story.introduction}</p>
          </div>
          <blockquote className="story-question" data-reveal>{project.story.question}</blockquote>
          <div className="story-chapters">
            {project.story.sections.map(({ title, text }, index) => (
              <article key={title} data-reveal>
                <span className="story-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
          <div className="story-recognition" data-reveal>
            <Icon name="trophy" />
            <div><span className="label">Team CoralCode · 2026 recognition</span>
              <ul>{project.story.awards.map((award) => <li key={award}>{award}</li>)}</ul>
            </div>
          </div>
        </section>
      ) : project.context && (
        <section className="section case-overview" aria-labelledby="context-title" data-reveal>
          <h2 id="context-title">Why we built it<span>.</span></h2>
          <p>{project.context}</p>
        </section>
      ))}
      {project.contributions ? (
        <section className="section contribution-section" aria-labelledby="contribution-title">
          <div className="contribution-heading" data-reveal>
            <h2 id="contribution-title">My contribution<span>.</span></h2>
            <p>From understanding the business problem to building and testing the solution.</p>
          </div>
          <div className="contribution-grid">
            {project.contributions.map(({ title, icon, text }, index) => (
              <article className="contribution-card" key={title} data-reveal>
                <div className="contribution-card-top"><span className="contribution-icon"><Icon name={icon} /></span><span className="label">{String(index + 1).padStart(2, '0')}</span></div>
                <h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </section>
      ) : project.contribution && (
        <section className="section contribution-text" aria-labelledby="contribution-title" data-reveal>
          <h2 id="contribution-title">My contribution<span>.</span></h2>
          <p>{project.contribution}</p>
        </section>
      )}
    </article>
  );
}
