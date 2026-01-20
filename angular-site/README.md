# Angular Site (scaffold)

This folder contains a scaffolded Angular 16 project with Angular Material, routing, and three pages: Home, Hobbies, Contact.

Quick start:

1. Install dependencies:

```bash
cd angular-site
npm install
```

2. Run the dev server:

```bash
npx ng serve --open
```

Notes:
- The contact form is wired for client validation and includes instructions to integrate Formspree or another serverless endpoint.
- This scaffold assumes you will run `npm install` locally; it does not run package managers from this agent.

Form submission (quick setup)
- To receive form submissions without a server, sign up at Formspree (https://formspree.io/) and create a form endpoint.
- Add the Formspree action URL or use a serverless function (Netlify Functions / Vercel Serverless) and update the form's POST logic in `src/app/contact/contact.component.ts`.

Styling & theme
- The project uses an Angular Material prebuilt theme (imported in `src/styles.css`). Tweak colors and fonts there for a personalized CV look.

Next steps
- Replace `assets/avatar.svg` with your actual `praneeth.jpg` in `src/assets/` and update `Home` to reference it.
- Fill in detailed experience bullets and add a downloadable `resume.pdf` to `src/assets/` and link the Download CV button.
 - Replace `assets/avatar.svg` with your actual `praneeth.jpg` in `src/assets/` (save the attached photo as `src/assets/praneeth.jpg`).
 - Add your `resume.pdf` to `src/assets/resume.pdf` to enable the Download CV button.

Quick file placement (Windows):
1. Save the attached photo from the chat as `praneeth.jpg`.
2. Copy it into the project assets folder:

```powershell
cd "c:\Users\prane\cv\angular-site"
mkdir -Force src\assets
copy C:\path\to\Downloads\praneeth.jpg src\assets\praneeth.jpg
```

3. Place your resume as `src\assets\resume.pdf`.

After that, run the app (`npm install` then `npx ng serve --open`) and the Home page will show your photo and the resume download link.

Server contact configuration
- To enable emailing of messages submitted from the Contact form, set the following environment variables for the server process before running `npm start` in `angular-site/server`:

```powershell
$env:SMTP_HOST = 'smtp.example.com'
$env:SMTP_PORT = '587'
$env:SMTP_USER = 'your-smtp-user@example.com'
$env:SMTP_PASS = 'your-smtp-password'
$env:CONTACT_RECEIVER = 'you@yourdomain.com'
npm start
```

If SMTP variables are not set, submitted messages will be appended to `angular-site/server/messages.log` for manual review.

Running parser tests

```powershell
cd angular-site/server
npm install
npm test
```

Serverless deployments

- Netlify: the `netlify/functions` folder contains `resume.js` and `contact.js`. Deploy the `angular-site` folder to Netlify and set env vars (`SMTP_HOST`, `SMTP_USER`, etc.) in Netlify UI to enable emailing. The Netlify functions will use `src/assets/resume.pdf` as the default resume if `RESUME_PATH` is not set.

- Vercel: the `api` folder contains `resume.js` and `contact.js` for Vercel serverless functions. Set environment variables in Vercel for SMTP and `CONTACT_RECEIVER`.

CI (GitHub Actions)

- A workflow is included at `.github/workflows/ci.yml`. It runs server parser tests and builds the Angular app on pushes and PRs to `main`/`master`.


