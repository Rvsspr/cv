Deployment checklist

This file describes steps to deploy serverless functions (Netlify/Vercel) and GitHub Actions secrets setup.

Netlify (recommended quick deploy)

1. Push your repository to GitHub.
2. In Netlify, create a new site -> "Import from Git" and choose this repo.
3. Set build command: `npm run build --prefix angular-site` and publish directory: `angular-site/dist/angular-site`.
4. Under "Functions" ensure the functions directory is `angular-site/netlify/functions`.
5. Add environment variables in Site settings -> Build & deploy -> Environment:
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (optional for email)
   - `CONTACT_RECEIVER` (email to receive contact form messages)
   - `RESUME_PATH` (optional; absolute path in function environment)
6. Deploy the site. Netlify will serve the Angular app and expose functions at `/.netlify/functions/resume` and `/.netlify/functions/contact`.

Vercel (alternative)

1. Push repository to GitHub.
2. In Vercel, import the repo and select the `angular-site` folder as the project root.
3. Add environment variables (Project Settings -> Environment Variables):
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
   - `CONTACT_RECEIVER`
   - `RESUME_PATH`
4. Vercel will deploy serverless functions from the `angular-site/api` folder. The resume API will be at `/api/resume`.

GitHub Actions and CI

- Add any necessary secrets to your GitHub repository (Settings -> Secrets & variables -> Actions):
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_RECEIVER` (if you want tests to send email in CI; otherwise you can leave them out). 
- The provided CI workflow runs parser tests and builds the Angular app.

Local testing and deployment tips

- To test Netlify functions locally, install `netlify-cli` and run `netlify dev` from `angular-site`.
- To test Vercel functions locally, install `vercel` and use `vercel dev`.

Security note

- Never commit SMTP credentials or personal secrets into the repo. Use environment variables or platform secret stores.

If you want, I can:
- Push a sample Netlify/TOML config and Vercel config file.
- Walk through linking the repo to Netlify or Vercel interactively and generating the build+functions settings.
