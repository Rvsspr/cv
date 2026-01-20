const fs = require('fs').promises;
const path = require('path');
const { parseBuffer } = require('../server/parse');

module.exports = async (req, res) => {
  try{
    const resumePath = process.env.RESUME_PATH || path.join(__dirname, '..', 'src', 'assets', 'resume.pdf');
    const data = await fs.readFile(resumePath);
    const parsed = await parseBuffer(data);
    res.status(200).json(parsed);
  }catch(err){
    res.status(500).json({ error: String(err) });
  }
};
