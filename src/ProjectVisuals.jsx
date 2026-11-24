import React from 'react';

export function Icon({ name }) {
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
    theme: 'M10 2v2m0 12v2M2 10h2m12 0h2M4.3 4.3l1.4 1.4m8.6 8.6 1.4 1.4m0-11.4-1.4 1.4m-8.6 8.6-1.4 1.4M14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  };

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d={paths[name]} stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProjectArt({ project, loading = 'lazy' }) {
  return <img className="project-art" data-project={project.id} src={project.image} alt={project.imageAlt} loading={loading} />;
}

export function TechnologyLogo({ technology }) {
  const logos = {
    React: 'react', TypeScript: 'typescript', HTML: 'html', CSS: 'css',
    JavaScript: 'javascript', 'Bootstrap 5': 'bootstrap', 'Java 21': 'java', Java: 'java',
    'Spring Boot': 'spring', 'Spring Security': 'spring', 'Spring Data JPA': 'spring',
    MySQL: 'mysql', 'Tailwind CSS': 'tailwind', Python: 'python', FastAPI: 'fastapi',
    SQLAlchemy: 'sqlalchemy', Supabase: 'supabase', PostgreSQL: 'postgresql',
    Vite: 'vite', 'Node.js': 'nodejs', Express: 'express', 'Vercel Functions': 'vercel',
    'TanStack Start': 'tanstack', Zod: 'zod', openpyxl: 'python',
  };
  const logo = logos[technology];
  return logo
    ? <img className={`technology-logo technology-logo--${logo}`} src={`/icons/tech/${logo}.svg`} alt="" width="24" height="24" />
    : <Icon name="code" />;
}
