Resume parser server

1. Install dependencies

```bash
cd angular-site/server
npm install
```

2. Place your resume at `angular-site/src/assets/resume.pdf` or set the `RESUME_PATH` env var to the absolute path of the PDF.

3. Run the server

```bash
npm start
```

4. API
- `GET /api/resume` — returns parsed JSON: `{ contact, sections, rawText }`.
- `GET /api/resume?section=experience` — returns only the named section when available.

Notes:
- This is a lightweight heuristic parser using `pdf-parse`. It extracts text and applies simple regexes and header heuristics. Improve parsing by integrating NLP or structured resume parsers if you need higher accuracy.
