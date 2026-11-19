# Portfolio

A single-page React portfolio built with JavaScript, CSS, HTML, and Vite.

## Run locally

```sh
npm ci
npm run dev
```

Open the Local URL printed by Vite. Use `npm run build` to produce the production site in `dist/` and `npm run preview` to check that build locally.

## Add your content

Edit `src/content.js` for your name, headline, bio, email, social links, and projects.

- Put your photo and project images in `public/images/`. Use paths such as `/images/portrait.webp` for `photo` or `image`. Add alt text that describes each meaningful image.
- Replace the sample projects and give each project a unique `id`. Set `sample: false` or omit it for real projects.
- Put your live and repository URLs in each project's `demo` and `source` fields. Empty links are hidden.
- Each project has a shareable page at `/projects/<id>`. Use `details` for the overview and optional `features` entries with `title` and `text` for highlights.
- Add social links as `{ label: 'LinkedIn', url: 'https://www.linkedin.com/in/your-profile/' }` entries in `profile.links`.

## Deploy to Vercel

Push this folder to a Git repository and import it into Vercel. Use the **Vite** framework preset, `npm run build` for the build command, and `dist` for the output directory. The site uses static assets and needs no environment variables.
