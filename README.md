# Myat Phone Swe Han | Portfolio

A single-page React portfolio built with JavaScript, CSS, HTML, and Vite.

## Run locally

```sh
npm ci
npm run dev
```

Open the Local URL printed by Vite. Use `npm run build` to produce the production site in `dist/` and `npm run preview` to check that build locally.

## Project structure

- `src/content.js` contains the profile, five projects, credentials, and links to live sites, demos, and source repositories.
- `src/main.jsx` renders the homepage and project detail pages at `/projects/<id>`.
- `src/styles.css` defines the responsive layouts, horizontal galleries, light and dark themes, and reduced-motion styles.
- `public/` contains the project images, technology icons, and credentials served by Vite.

## Deploy to Vercel

Push this folder to a Git repository and import it into Vercel. Use the **Vite** framework preset, `npm run build` for the build command, and `dist` for the output directory. The site uses static assets and needs no environment variables.
