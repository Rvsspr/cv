const fs = require('fs').promises;
const path = require('path');
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
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
      await transporter.sendMail({ from: email, to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER, subject: `Website contact from ${name}`, text: message });
      return res.status(200).json({ ok: true, sent: true });
    }

    const out = `---\n${new Date().toISOString()}\nName: ${name}\nEmail: ${email}\nMessage:\n${message}\n`;
    await fs.appendFile(path.join(__dirname, '..', 'messages.log'), out);
    return res.status(200).json({ ok: true, saved: true });
  }catch(err){
    return res.status(500).json({ error: String(err) });
  }
};
