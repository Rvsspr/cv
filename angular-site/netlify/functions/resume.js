const fs = require('fs').promises;
const path = require('path');
const { parseBuffer } = require('../../server/parse');

exports.handler = async function(event, context){
  try{
    const resumePath = process.env.RESUME_PATH || path.join(__dirname, '..', '..', 'src', 'assets', 'resume.pdf');
    const data = await fs.readFile(resumePath);
    const parsed = await parseBuffer(data);
    return { statusCode: 200, body: JSON.stringify(parsed) };
  }catch(err){
    return { statusCode: 500, body: JSON.stringify({ error: String(err) }) };
  }
};
