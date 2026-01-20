# Advanced CV — Angular Site

This repository contains a modern Angular-based personal CV/portfolio site and a small resume parsing + contact backend. It is built to be interviewer-friendly, with a polished UI, resume parsing, contact handling, and deployable serverless functions.

Repository layout
- `angular-site/` — the complete Angular application (client) and a small `server/` folder for the resume parser and contact API. This is the main project folder.
  - `angular-site/src/` — Angular app source (components, styles, assets).
  - `angular-site/server/` — Express-based resume parser API and contact endpoint (also usable locally).
  - `angular-site/netlify/functions/` — Netlify serverless functions (resume/contact)
  - `angular-site/api/` — Vercel-compatible serverless functions (resume/contact)

What this project provides
- A responsive, accessible Angular CV site with three main pages: Home, Hobbies, Contact, plus a Resume page that shows parsed resume content.
- A resume-parsing API that extracts contact info, sections, and structured experience items from a PDF resume using `pdf-parse` and heuristic parsing.
- A contact endpoint that attempts to send email via SMTP (when env vars are configured) or logs messages to a local file as fallback.
- Unit tests for the parser and basic Angular component smoke tests.
- CI workflow (GitHub Actions) that runs parser tests and builds the Angular app.
- Deployment helpers for Netlify and Vercel serverless functions.

Quick start (local)
1. Copy your profile photo and resume into the Angular assets folder:

```powershell
cd "C:\Users\prane\cv\angular-site"
mkdir -Force src\assets
copy "C:\path\to\LinkedIn Professional Photo.jpeg" src\assets\praneeth.jpg
copy "C:\path\to\Resume_Praneeth_Rekapalli.pdf" src\assets\resume.pdf
```

2. Start the resume parser server (API):

```powershell
cd angular-site\server
npm install
npm start
```

The server listens on port `4201` by default and exposes `GET /api/resume` and `POST /api/contact`.

3. Run the Angular app:

```powershell
cd ..\
npm install
npx ng serve --open
```

The Angular app (default port 4200) calls the local resume API to display parsed resume data.

Testing
- Server parser tests (node):

```powershell
cd angular-site/server
npm install
npm test
```

- Angular unit tests (browser headless via Karma):

```powershell
cd angular-site
npm install
npm test
```

Deployment
- See `DEPLOYMENT.md` for step-by-step instructions for Netlify and Vercel deployments. The project includes example serverless functions for both platforms.

Environment variables
- For email sending, set the following for the server or serverless functions:
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — SMTP server and credentials
  - `CONTACT_RECEIVER` — email address receiving messages
  - `RESUME_PATH` — (optional) absolute path to resume PDF used by serverless functions

Notes & next steps
- The resume parser uses heuristics and `pdf-parse`. For higher accuracy consider integrating an NLP pipeline or a commercial resume parser.
- The UI uses Angular Material and includes print styles for saving the Resume page as PDF.
- If you want, I can help deploy to Netlify or Vercel, configure secrets, or improve parsing accuracy further.
