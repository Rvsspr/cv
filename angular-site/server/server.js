const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const nodemailer = require('nodemailer');
const { parseBuffer } = require('./parse');

const app = express();
app.use(cors());
app.use(express.json());

const DEFAULT_RESUME = path.join(__dirname, '..', 'src', 'assets', 'resume.pdf');

app.get('/api/resume', async (req, res) => {
  try{
    const resumePath = process.env.RESUME_PATH || DEFAULT_RESUME;
    const data = await fs.readFile(resumePath);
    const parsed = await parseBuffer(data);

    const section = req.query.section;
    if(section){
      const key = section.toLowerCase().replace(/\s+/g,'_');
      return res.json({ section: parsed.sections[key] || null });
    }

    res.json(parsed);
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Failed to parse resume', detail: String(err) });
  }
});

// Contact endpoint: tries to send via SMTP if configured, otherwise appends to a local file
app.post('/api/contact', async (req, res) => {
  try{
    const { name, email, message } = req.body || {};
    if(!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

    const smtpHost = process.env.SMTP_HOST;
    if(smtpHost){
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
      });

      const mail = {
        from: email,
        to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
        subject: `Website contact from ${name}`,
        text: message
      };
      await transporter.sendMail(mail);
      return res.json({ ok: true, sent: true });
    }

    // fallback: log to file
    const out = `---\n${new Date().toISOString()}\nName: ${name}\nEmail: ${email}\nMessage:\n${message}\n`;
    await fs.appendFile(path.join(__dirname, 'messages.log'), out);
    res.json({ ok: true, saved: true });
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Failed to deliver message', detail: String(err) });
  }
});

const port = process.env.PORT || 4201;
app.listen(port, ()=>console.log('Resume parser API running on port', port));
